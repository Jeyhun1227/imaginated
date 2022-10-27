import { getSession } from "next-auth/react";
const PoolConnection = require('../postgressql')
var xss = require("xss");
const yup =  require('yup');


export default async (req, res) => {
  const session = await getSession({ req })
    if (req.method === 'POST') {
        if (session) {
            // DELETE REVIEWS
            let deleted = 0;
            if(req.body.delete){
              if(req.body.type === 'Paid'){
                let insert_deleted = await PoolConnection.query('INSERT INTO all_reviews_deleted SELECT * FROM all_reviews WHERE "user" = $1 AND individual = $2 AND (premium_offer = $3);', [session.id, req.body.Individual, req.body.id]);
                let deleted = await PoolConnection.query('DELETE FROM all_reviews WHERE "user" = $1 AND individual = $2 AND (premium_offer = $3);', [session.id, req.body.Individual, req.body.id]);
                deleted = deleted.rowCount + insert_deleted.rowCount

              }
              if(req.body.type === 'Free'){
                console.log(session.id, req.body.Individual, req.body.id)
                let insert_deleted = await PoolConnection.query('INSERT INTO all_reviews_deleted SELECT * FROM all_reviews WHERE "user" = $1 AND individual = $2 AND free_offer = $3;', [session.id, req.body.Individual, req.body.id]);
                let deleted = await PoolConnection.query('DELETE FROM all_reviews WHERE "user" = $1 AND individual = $2 AND (free_offer = $3);', [session.id, req.body.Individual, req.body.id]);
                deleted = deleted.rowCount + insert_deleted.rowCount

              }

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
                type: yup
                  .string(),
                Individual: yup
                  .number(),
                premium_offer: yup
                  .number().nullable(true),
                free_offer: yup
                  .string().nullable(true)
            }); 
            
            try {
                await schema.validate(req.body, { abortEarly: false });
            } catch (err) {
                return res.status(200).json({error: err.errors[0]});
            }

            let userDisXSS = xss(req.body.UserDislike);
            let userLikeXSS = xss(req.body.UserLike);
            let free_offer = req.body.free_offer ? req.body.free_offer.trim() : null;
            let countReviews = await PoolConnection.query('SELECT * FROM all_reviews WHERE "user" = $1 AND individual = $2 AND (premium_offer = $3 or free_offer = $4);', [session.id, req.body.Individual, req.body.premium_offer, free_offer])
            // UPDATE AN EXISTING REVIEW EDIT
            if(countReviews.rows.length > 0 && req.body.editable){
              let updateReviews = await PoolConnection.query('UPDATE all_reviews SET review= $5, "like" = $6, dislike = $7 WHERE "user" = $1 AND individual = $2 AND (premium_offer = $3 or free_offer = $4);', [session.id, req.body.Individual, req.body.premium_offer, free_offer, req.body.UserRating, userLikeXSS, userDisXSS])
              updateReviews = updateReviews.rowCount
              return res.status(200).json({count: updateReviews, type: 'Edited'})
            }

            if(req.body.editable) return res.status(200).json({error: 'No Review found'});
            if(countReviews.rows.length > 0) return res.status(200).json({error: 'You have already reviewed this course'});
            let review_add = await PoolConnection.query('INSERT INTO all_reviews("user", individual, review, "like", dislike, premium_offer, free_offer, "type", createdate) VALUES($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP);', [session.id, req.body.Individual, req.body.UserRating, userLikeXSS, userDisXSS, req.body.premium_offer, free_offer, req.body.type])
            let reviewed = review_add.rowCount
            let user_custom = await PoolConnection.query('SELECT verified FROM "USER_CUSTOM" WHERE userid = $1;', [session.id])
            let verified = true;
            if(user_custom.rows.length > 0){
              verified = user_custom.rows[0]['verified']
            } 
            return res.status(200).json({reviewed, verified})
        }
    }
    return res.status(403).json({
        message:
            'You must be sign in to view the protected content on this page.',
        })
}