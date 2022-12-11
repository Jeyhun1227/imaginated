const PoolConnection = require('../postgressql')

import { getSession } from "next-auth/react";


export default async (req, res) => {
    const session = await getSession({ req })

    if (req.method === 'POST') {
        if (session) {
            let engagement = req.body.engagement;
            if(engagement > 1 || engagement < -1) return res.status(403).json({message: 'Error engagement'})
            let reviewfound = await PoolConnection.query('SELECT * FROM all_reviews_engagement WHERE userid = $1 AND reviewid = $2;', [session.id, req.body.reviewid])
            // IF FOUND A VALUE IN TABLE
            if(reviewfound.rows.length > 0){
                let updateReviews = await PoolConnection.query('UPDATE all_reviews_engagement SET  engagement = $1 WHERE userid = $2 AND reviewid = $3;', [engagement, session.id, req.body.reviewid])
                return res.status(200).json({sent: updateReviews.rowCount});

            }
            let insertReviews = await PoolConnection.query('INSERT INTO all_reviews_engagement(individual, userid, engagement, reviewid) VALUES($1, $2, $3, $4);', [req.body.Individual, session.id, engagement, req.body.reviewid])
            return res.status(200).json({sent: insertReviews.rowCount});
            
        }
    }

            

    return res.status(403).json({
        message:
            'You must be sign in to view the protected content on this page.',
        })
}