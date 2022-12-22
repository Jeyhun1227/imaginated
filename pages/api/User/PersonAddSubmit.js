import { getSession } from "next-auth/react";
const PoolConnection = require('../postgressql')
import SendNotificationEmail from './Email/SendNotificationEmail';


export default async (req, res) => {
  const session = await getSession({ req })
    if (req.method === 'POST') {
        if (session) {
            // let individual_user_edit = await PoolConnection.query('SELECT * FROM individual_user_edit WHERE ACTIVE IS TRUE AND USERID = $1 AND APPROVED IS FALSE', [session.id]);
            await SendNotificationEmail(session.id, session.user.email, 'Send for Review', `<div>Need review of changes.</div>`)

           
            return res.status(200).json({})
        }
    }
    return res.status(403).json({
        message:
            'You must be sign in to view the protected content on this page.',
        })
}