const PoolConnection = require('../postgressql')
import SendNotificationEmail from './Email/SendNotificationEmail';
var xss = require("xss");

import { getSession } from "next-auth/react";


export default async (req, res) => {
    const session = await getSession({ req })

    if (req.method === 'POST') {
        if (session) {
            // console.log('sessions: ', session)
            let category = xss(req.body.category);
            if(req.body.listing){
                let you = xss(req.body.you);
                let listing = xss(req.body.listing);
                var category_added = await PoolConnection.query('INSERT INTO add_category(userid, category, you, listing) VALUES($1, $2, $3, $4);', [session.id, req.body.category, req.body.you, req.body.listing]);
                const param_val = `<p>Name of individual? ${listing}</p>
                <p>Category: ${category}</p>
                <p>Is this you? ${you}</p>
                `
                await SendNotificationEmail(session.id, session.user.email, 'Add New Listing', param_val)
                return res.status(200).json({sent: category_added.rowCount});
            }else{
                var category_added = await PoolConnection.query('INSERT INTO add_category(userid, category) VALUES($1, $2);', [session.id, req.body.category]);
                // console.log('req.body: ', req.body)
                const param_val = `<p>Add Category: ${category}</p>`
                await SendNotificationEmail(session.id, session.user.email, 'Add New Category', param_val)

                return res.status(200).json({sent: category_added.rowCount});
            }
        }
    }

            

    return res.status(403).json({
        message:
            'You must be sign in to view the protected content on this page.',
        })
}