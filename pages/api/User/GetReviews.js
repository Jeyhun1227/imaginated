import {getSessionFromCookie} from '../auth_token_response'
const PoolConnection = require('../postgressql')
var xss = require("xss");
const yup =  require('yup');


export default async (req, res) => {
  const session = await getSessionFromCookie({ req })
    if (req.method === 'POST') {
        if (session) {
            let countReviews = await PoolConnection.query('SELECT * FROM REVIEWSRATINGS WHERE INDIVIDUAL = $1 AND (verified_custom IS NOT FALSE OR "user" = $2);', [req.body.Individual, session.user.id])
            return res.status(200).json({rows: countReviews.rows})

        }
    }
    return res.status(403).json({
        message:
            'You must be sign in to view the protected content on this page.',
        })
}