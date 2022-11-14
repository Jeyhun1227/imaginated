import { getSession } from "next-auth/react";
const PoolConnection = require('../postgressql')
var xss = require("xss");
const yup =  require('yup');


export default async (req, res) => {
  const session = await getSession({ req })
    if (req.method === 'POST') {
        if (session) {
            let countReviews = await PoolConnection.query('SELECT * FROM REVIEWSRATINGS WHERE INDIVIDUAL = $1 AND (verified_custom IS NOT FALSE OR "user" = $2);', [req.body.Individual, session.id])
            return res.status(200).json({rows: countReviews.rows})

        }
    }
    return res.status(403).json({
        message:
            'You must be sign in to view the protected content on this page.',
        })
}