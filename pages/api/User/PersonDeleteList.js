import { getSession } from "next-auth/react";
const PoolConnection = require('../postgressql')
import SendNotificationEmail from './Email/SendNotificationEmail';


export default async (req, res) => {
  const session = await getSession({ req })
    if (req.method === 'POST') {
        if (session) {
            // let p_result = await PoolConnection.query('SELECT * FROM "User" WHERE id = $1', [session.id])
            // if(p_result.rows.length === 0) return {error: 'No Individual'}
            // let individualId = p_result.rows[0].individual
            // if(!individualId) return {error: 'No Individual'}

            let sql_command = `UPDATE individual_user_edit SET ACTIVE = FALSE, END_DATE = CURRENT_TIMESTAMP, STATUS = 'Deleted' WHERE userid = $1 AND id = $2`
            let values = [session.id, req.body.id]
            await PoolConnection.query(sql_command, values)

            // let individual_user_edit = await PoolConnection.query('SELECT * FROM individual_user_edit WHERE ACTIVE IS TRUE AND USERID = $1 AND APPROVED IS FALSE', [session.id]);

           
            return res.status(200).json({})
        }
    }
    return res.status(403).json({
        message:
            'You must be sign in to view the protected content on this page.',
        })
}