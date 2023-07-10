import { getSession, signOut } from "next-auth/react";
const PoolConnection = require('../postgressql')
import PasswordChanged from './Email/PasswordChanged';
import SendPasswordEmail from './Email/ResetPassword';
import bcrypt from 'bcryptjs';
const yup =  require('yup');
var jwt = require('jsonwebtoken');

const { environment } = process.env;

export default async (req, res) => {
    if (req.method === 'POST') {
            var user_custom = await PoolConnection.query('SELECT DISTINCT * FROM "USER_CUSTOM" WHERE EMAIL = $1', [req.body.email])

            if(user_custom.rows.length === 0) return res.status(200).json({});
            
            user_custom = user_custom.rows[0];
            let count = user_custom.password_reset
            console.log('PASS FORGOT COUNT: ', count, req.body)
            if(count > 20) return res.status(200).json({});

            const schema = yup.object().shape({
                email: yup
                    .string()
                    .min(3, 'email must be at least 3 characters')
                    .max(255)
                    .email('Please provide a valid email')
                });
            try {
                await schema.validate(req.body, { abortEarly: false });
            } catch (err) {
                return res.status(200).json({error: err[0]});
            }

            let signed_url = jwt.sign({
                email: req.body.email,
                userid: user_custom.userid
                }, process.env[`JWT_SECRET_KEY_${environment}`], { expiresIn: '30m' });

            await SendPasswordEmail(req.body.email, `https://www.imaginated.com/passwordreset?token=${signed_url}`)
            
            var user_changed = await PoolConnection.query('UPDATE "USER_CUSTOM" SET password_reset = password_reset + 1 WHERE userid = $1', [user_custom.userid]);

            var sum = user_changed.rowCount;
            return res.status(200).json({sent: sum})
            
 
        
    }
    return res.status(403).json({
        message:
            'You must be sign in to view the protected content on this page.',
        })
}