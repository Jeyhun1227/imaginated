import { getSession } from "next-auth/react";
const PoolConnection = require('../postgressql')
var xss = require("xss");
const yup =  require('yup');


export default async (req, res) => {
  const session = await getSession({ req })
    if (req.method === 'POST') {
        if (session) {
            if(req.body.delete){
              // all_reviews_deleted
              let insert_deleted = await PoolConnection.query('INSERT INTO all_reviews_deleted SELECT * FROM WHERE "user" = $1 AND individual = $2 AND premium_offer = $3;', [session.id, req.body.Individual, req.body.premium_offer]);
              let deleted = await PoolConnection.query('DELETE FROM all_reviews WHERE "user" = $1 AND individual = $2 AND premium_offer = $3;', [session.id, req.body.Individual, req.body.premium_offer]);
              deleted = deleted.rowCount + insert_deleted.rowCount
              return res.status(200).json(deleted)
            }
            // UserRating, UserDislike, UserLike, selected: selected.name, Individual: Individual_values.id, premium_offer: selected.id
            const schema = yup.object().shape({
                UserRating: yup
                  .number().min(.5).max(5),
                UserDislike: yup
                  .string(),
                UserLike: yup
                  .string(),
                selected: yup
                  .string(),
                Individual: yup
                  .number(),
                premium_offer: yup
                  .number()
            }); 
            
            try {
                await schema.validate(req.body, { abortEarly: false });
            } catch (err) {
                return res.status(200).json({error: err[0]});
            }

            let userDisXSS = xss(req.body.UserDislike);
            let userLikeXSS = xss(req.body.UserLike);

            let countReviews = await PoolConnection.query('SELECT * FROM all_reviews WHERE "user" = $1 AND individual = $2 AND premium_offer = $3;', [session.id, req.body.Individual, req.body.premium_offer])
            
            if(countReviews.rows.length > 0 && req.body.editable){
              let updateReviews = await PoolConnection.query('UPDATE all_reviews SET review= $4, "like" = $5, dislike = $6 WHERE "user" = $1 AND individual = $2 AND premium_offer = $3;', [session.id, req.body.Individual, req.body.premium_offer, req.body.UserRating, userLikeXSS, userDisXSS])
              updateReviews = updateReviews.rowCount
              return res.status(200).json({count: updateReviews, type: 'Edited'})
            }

            if(req.body.editable) return res.status(200).json({error: 'No Review found'});
            if(countReviews.rows.length > 0) return res.status(200).json({error: 'You have already reviewed this course'});
            let review_add = await PoolConnection.query('INSERT INTO all_reviews("user", individual, review, "like", dislike, premium_offer, "type", createdate) VALUES($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP);', [session.id, req.body.Individual, req.body.UserRating, userLikeXSS, userDisXSS, req.body.premium_offer, 'Paid'])
            let reviewed = review_add.rowCount
            return res.status(200).json(reviewed)
        }
    }
    return res.status(403).json({
        message:
            'You must be sign in to view the protected content on this page.',
        })
}