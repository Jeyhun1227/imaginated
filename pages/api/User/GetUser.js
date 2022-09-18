import { getSession } from "next-auth/react";
const PoolConnection = require('../postgressql')


export default async (req, res) => {
  const session = await getSession({ req })
    // if (req.method === 'POST') {
        if (session) {
            const user = session.user;
            var user_custom = await PoolConnection.query('SELECT DISTINCT EMAIL, VERIFIED, NAME FROM "USER_CUSTOM" WHERE EMAIL = $1', [user.email])
            if(!user_custom.rows) user_custom = await PoolConnection.query('SELECT DISTINCT * FROM "User" WHERE EMAIL = $1', [user.email])
            let user_value = user_custom.rows[0]
            var user_follow = await PoolConnection.query('SELECT DISTINCT EMAIL, VERIFIED, NAME FROM "USER_CUSTOM" WHERE EMAIL = $1', [user_value.userid])

            return res.status(200).json({
                user: user_custom.rows[0]
            })
        }
    // }
    return res.status(403).json({
        message:
            'You must be sign in to view the protected content on this page.',
        })
}