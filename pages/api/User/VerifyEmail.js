import { getSession } from "next-auth/react";
const PoolConnection = require('../postgressql')
import SendInitialEmail from './Email/CreateEmail';
var jwt = require('jsonwebtoken');

const { environment } = process.env;

export default async (req, res) => {
  const session = await getSession({ req })
    if (req.method === 'POST') {
        if (session) {
            //   EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - last_sent)) AS difference
            let user_found = await PoolConnection.query('SELECT EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - UC.last_sent)) / 60 AS difference, email_sent FROM "USER_CUSTOM" UC WHERE userid = $1;', [session.id])
            if(user_found.rows.length > 0){
                let diff = user_found.rows[0]['difference']
                if(diff < 2 && diff) return res.status(200).json({error: 'Already sent'})
                if(user_found.rows[0]['email_sent'] > 6) return res.status(200).json({error: 'Too many emails'})
            }
            // var user_custom = await PoolConnection.query('SELECT DISTINCT * FROM "User" WHERE ID = $1', [session.id])
            let signed_url = jwt.sign({
                email: session.user.email,
                userid: session.id
              }, process.env[`JWT_SECRET_KEY_${environment}`], { expiresIn: '30m' });
            // console.log(session)
            await SendInitialEmail(session.user.name, session.user.email, `https://www.imaginated.com/verification?token=${signed_url}`)
            let user_sent = await PoolConnection.query('UPDATE "USER_CUSTOM" SET email_sent = email_sent + 1, last_sent = CURRENT_TIMESTAMP WHERE userid = $1;', [session.id])

            return res.status(200).json({sent: 'Email Sent'})
        }
    }
    return res.status(403).json({
        message:
            'You must be sign in to view the protected content on this page.',
        })
}