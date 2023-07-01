const PoolConnection = require('../postgressql')
import PasswordChanged from './Email/PasswordChanged';
import NewEmailUser from './Email/NewEmailUser';
import bcrypt from 'bcryptjs';
const yup =  require('yup');
var jwt = require('jsonwebtoken');
import { getSessionFromCookie } from '../auth_token_response';


export default async (req, res) => {
  const session = await getSessionFromCookie({ req })
    if (req.method === 'POST') {
        if (session) {
            var user_custom = await PoolConnection.query('SELECT DISTINCT * FROM "USER_CUSTOM" WHERE USERID = $1', [session.id])

            if(user_custom.rows.length === 0) return res.status(403);
            
            let user_value = user_custom.rows[0];
            const match = await bcrypt.compare(req.body.password, user_value.password);
            console.log('pass: ', match, req.body.password, user_value.password)

            if(!match) return res.status(200).json({error: 'Incorrect Password'})

            if(req.body.email){
                const schema = yup.object().shape({
                    email: yup
                      .string()
                      .min(3, 'email must be at least 3 characters')
                      .max(255)
                      .email('Please provide a valid email'),
                    password: yup
                      .string()
                      .min(6, 'password must be at least 6 characters')
                      .max(255, 'password is at most 255 characters')
                  });
                try {
                    await schema.validate(req.body, { abortEarly: false });
                } catch (err) {
                    return res.status(200).json({error: err[0]});
                }

                var user_found = await PoolConnection.query('SELECT DISTINCT * FROM "User" WHERE email = $1', [req.body.email])
                if(user_found.rows.length > 0) return res.status(200).json({error: 'Email already in use'})

                let user_timechanged = await PoolConnection.query('SELECT EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - UC.last_email_changed)) / 60 AS difference, email_sent, previous_emails FROM "USER_CUSTOM" UC WHERE userid = $1;', [session.id])
                if(user_timechanged.rows.length > 0){
                    let diff = user_timechanged.rows[0]['difference']
                    let previous_emails = user_timechanged.rows[0]['previous_emails']
                    console.log('diff: ', diff, user_timechanged.rows, previous_emails)
                    if(diff < 2880 && diff && previous_emails.length > 2) return res.status(200).json({error: 'Email changed too many times in short period of time'})
                    if(user_timechanged.rows[0]['email_sent'] > 6) return res.status(200).json({error: 'Too many emails'})
                }
                let signed_url = jwt.sign({
                    email: session.user.email,
                    userid: session.id
                  }, process.env.JWT_SECRET_KEY, { expiresIn: '30m' });

                await NewEmailUser(session.user.name, req.body.email, `https://www.imaginated.com/verification?token=${signed_url}`)
                var user_changed = await PoolConnection.query('UPDATE "User" SET email = $1, VERIFIED = TRUE WHERE id = $2', [req.body.email, session.id]);
                var user_changed_custom = await PoolConnection.query('UPDATE "USER_CUSTOM" SET email = $1, previous_emails = array_append(previous_emails, email), last_email_changed= CURRENT_TIMESTAMP, VERIFIED = TRUE WHERE userid = $2', [req.body.email, session.id]);
                var sum = user_changed.rowCount + user_changed_custom.rowCount;
                return res.status(200).json({sent: sum})
            
            
            
            }else{


                const schema = yup.object().shape({
                    passwordnew: yup
                      .string()
                      .min(6, 'password must be at least 6 characters')
                      .max(255, 'password is at most 255 characters'),
                    password: yup
                      .string()
                      .min(6, 'password must be at least 6 characters')
                      .max(255, 'password is at most 255 characters')
                }); 
                try {
                    await schema.validate(req.body, { abortEarly: false });
                } catch (err) {
                    return res.status(200).json({error: err[0]});
                }
                let signed_url = jwt.sign({
                    email: session.user.email,
                    userid: session.id
                }, process.env.JWT_SECRET_KEY, { expiresIn: '15m' });

                const hashedPassword = bcrypt.hashSync(req.body.passwordnew, 10);
                // const match = await bcrypt.compare(req.body.passwordnew, hashedPassword);
                // console.log(match, req.body.passwordnew, hashedPassword)
                await PasswordChanged(session.user.name, session.user.email, `https://www.imaginated.com/passwordreset?token=${signed_url}`)

                var user_changed_custom = await PoolConnection.query('UPDATE "USER_CUSTOM" SET password = $1 WHERE userid = $2', [hashedPassword, session.id]);
                var sum = user_changed_custom.rowCount;

                
                return res.status(200).json({sent: sum});
            }

        }
    }
    return res.status(403).json({
        message:
            'You must be sign in to view the protected content on this page.',
        })
}