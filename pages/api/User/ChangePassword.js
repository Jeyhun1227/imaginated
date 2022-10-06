const PoolConnection = require('../postgressql')
import SendInitialEmail from './Email/CreateEmail';
var jwt = require('jsonwebtoken');
const yup =  require('yup');
import bcrypt from 'bcryptjs';
import { signIn, signOut, useSession } from "next-auth/react";

export default async (req, res) => {
    if (req.method === 'POST') {
        // try{
            const schema = yup.object().shape({
                password: yup
                  .string()
                  .min(6, 'password must be at least 6 characters')
                  .max(255, 'password is at most 255 characters')
            }); 
            const validation = jwt.verify(req.body.token, process.env.JWT_SECRET_KEY)   
            try {
                await schema.validate({password: req.body.password}, { abortEarly: false });
            } catch (err) {
                return res.status(200).json({error: err[0]});
            }

            const hashedPassword = bcrypt.hashSync(req.body.password, 10);
            // const match = await bcrypt.compare(req.body.passwordnew, hashedPassword);
            // console.log(match, req.body.passwordnew, hashedPassword)
            // await PasswordChanged(session.user.name, session.user.email, `localhost:3000/passwordreset?token=${signed_url}`)

            var user_changed_custom = await PoolConnection.query('UPDATE "USER_CUSTOM" SET password = $1 WHERE userid = $2', [hashedPassword, validation.userid]);
            var sum = user_changed_custom.rowCount;
            signOut()
            
            return res.status(200).json({sent: sum});
            
        // }catch(e){
        //     return res.status(200).json({error: 'Error sending data'})
        // }
    
    }
    return res.status(403).json({
        message:
            'You must be sign in to view the protected content on this page.',
        })
}