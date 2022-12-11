import { getSession } from "next-auth/react";
const PoolConnection = require('../postgressql')


export default async (req, res) => {
  const session = await getSession({ req })
    // if (req.method === 'POST') {
        if (session) {
            var user_custom = await PoolConnection.query('SELECT DISTINCT u.*, a.provider FROM "User" u LEFT JOIN "Account" a on a."userId" = u.id WHERE u.ID = $1', [session.id])
            // console.log('user_custom.rows: ', user_custom.rows)
            // if(user_custom.rows.length > 0){
            //     user_custom.id = user_custom.userid
            // }else{
            //     console.log('USERID: ', user_custom)

            // }
            if(user_custom.rows.length === 0) return res.status(403);
            let user_value = user_custom.rows[0];
            var user_follow = await PoolConnection.query('SELECT DISTINCT follow_date, individualID, aka, name, imagelink, link FROM "user_follow" WHERE userid = $1', [session.id])
            var user_follow = user_follow.rows.length > 0 ? user_follow.rows : [];
            var reviews = await PoolConnection.query('SELECT DISTINCT a.id, a."user", premium_name, individual, review, "like", dislike, premium_offer, "type", createdate, i.first_name, i.last_name FROM reviewsratings a LEFT JOIN INDIVIDUAL i on i.id = a.individual WHERE a."user" = $1', [session.id])
            var reviews_engagement = await PoolConnection.query('SELECT * FROM all_reviews_engagement WHERE userid = $1 AND individual = $2', [session.id, req.body.id])
            reviews = reviews.rows.length > 0 ? reviews.rows : [];
            return res.status(200).json({
                user: user_value,
                user_follow,
                reviews,
                reviews_engagement: reviews_engagement.rows
            })
        }
    // }
    return res.status(403).json({
        message:
            'You must be sign in to view the protected content on this page.',
        })
}