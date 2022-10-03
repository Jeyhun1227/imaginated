import { getSession } from "next-auth/react";
const PoolConnection = require('../postgressql')


export default async (req, res) => {
  const session = await getSession({ req })
    if (req.method === 'POST') {
        if (session) {
            // return res.status(200);
            var returning_json = {}
            if(req.body.addIndividual){
                let countedFollowers = await PoolConnection.query('SELECT * FROM user_follow WHERE userid = $1 AND individualid = $2;', [session.id, req.body.IndividualId])
                if(countedFollowers.rows.length > 0) return res.status(200);
                let user_add = await PoolConnection.query('INSERT INTO user_follow(userid, individualid, name, aka, imagelink, link) VALUES($1, $2, $3, $4, $5, $6);', [session.id, req.body.IndividualId, req.body.name, req.body.aka, req.body.imagelink, req.body.link])
                returning_json.user_follow = user_add.rowCount;
            }else{
                let user_delete = await PoolConnection.query('DELETE FROM user_follow WHERE userid = $1 AND individualid = $2;', [session.id, req.body.IndividualId])
                returning_json.user_delete = user_delete.rowCount;
            }
            return res.status(200).json(returning_json)
        }
    }
    return res.status(403).json({
        message:
            'You must be sign in to view the protected content on this page.',
        })
}