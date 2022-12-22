import { getSession } from "next-auth/react";
const PoolConnection = require('../postgressql')


export default async (req, res) => {
  const session = await getSession({ req })
    // if (req.method === 'POST') {
        if (session) {
            let p_result = await PoolConnection.query('SELECT * FROM "User" WHERE id = $1', [session.id])
            if(p_result.rows.length === 0) return {error: 'No Individual'}
            let individualId = p_result.rows[0].individual
            if(!individualId) return {error: 'No Individual'}
            // let individual_found = await PoolConnection.query('SELECT feature FROM "individual" WHERE id = $1', [individualId])
            // let feature = individual_found.rows[0].feature;
            // if(feature && feature.length > 3){
            //     feature = `${feature} || ${req.body.link}`
            // }
            // let p_result = await PoolConnection.query('UPDATE "individual" WHERE id = $1', [session.id])
            if(req.body.free_offer_main){
                req.body.free_offer_main.map(async(e) => {
                    await PoolConnection.query('UPDATE individual_user_edit SET active = FALSE, END_DATE = CURRENT_TIMESTAMP WHERE record_type = $1 AND userid = $2 AND individualid = $3 AND category = $4 AND ACTIVE IS TRUE', ['free', session.id, individualId, e.image[1]])
                    await PoolConnection.query('INSERT INTO individual_user_edit(record_type, userid, individualid, category, name) VALUES($1, $2, $3, $4, $5)', ['free', session.id, individualId, e.image[1], e.name])
                })
                Object.keys(req.body.main_changes).map(async(object_name) => {
                    await PoolConnection.query('UPDATE individual_user_edit SET active = FALSE, END_DATE = CURRENT_TIMESTAMP WHERE record_type = $1 AND userid = $2 AND individualid = $3 AND category = $4 AND ACTIVE IS TRUE', ['info', session.id, individualId, object_name])
                    await PoolConnection.query('INSERT INTO individual_user_edit(record_type, userid, individualid, category, description) VALUES($1, $2, $3, $4, $5)', ['info', session.id, individualId, object_name, req.body.main_changes[object_name]])
                })
            }else{
                let individual_found = await PoolConnection.query('INSERT INTO individual_user_edit(record_type, userid, individualid, link) VALUES($1, $2, $3, $4)', ['feature', session.id, individualId, req.body.link])
            }


            return res.status(200).json({sent: 'success'})
        }
    // }
    return res.status(403).json({
        message:
            'You must be sign in to view the protected content on this page.',
        })
}