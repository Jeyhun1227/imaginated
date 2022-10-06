const PoolConnection = require('../postgressql')
import SendInitialEmail from './Email/CreateEmail';
import { getSession } from "next-auth/react";


export default async (req, res) => {
    const session = await getSession({ req })

    if (req.method === 'POST') {
        if (session) {
            if(req.body.listing){
                var category_added = await PoolConnection.query('INSERT INTO add_category(userid, category, you, listing) VALUES($1, $2, $3, $4);', [session.id, req.body.category, req.body.you, req.body.listing]);
                return res.status(200).json({sent: category_added.rowCount});
            }else{
                var category_added = await PoolConnection.query('INSERT INTO add_category(userid, category) VALUES($1, $2);', [session.id, req.body.category]);
                return res.status(200).json({sent: category_added.rowCount});
            }
        }
    }

            

    return res.status(403).json({
        message:
            'You must be sign in to view the protected content on this page.',
        })
}