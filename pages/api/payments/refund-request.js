const PoolConnection = require('../postgressql')
import RefundRequestEmail from '../User/Email/RefundRequestEmail';
import {getSessionFromCookie} from '../auth_token_response'
import axios from 'axios'


export default async (req, res) => {
    if (req.method === 'POST') {
            const session = await getSessionFromCookie({req});
            if(!session) return res.status(500).json({ error: 'You must be logged in.' });
            if(!req.body.productid || !session.user.id || !req.body.refund_reason || req.body.refund_reason === '') return res.status(500).json({ error: 'Error getting your product' });
            var user = await PoolConnection.query('SELECT DISTINCT * FROM "User" WHERE ID = $1', [session.user.id])
            var user_info = user.rows[0]
            var user_purchase_sql = await PoolConnection.query('select refund_requested, email, u.name, o."name" product_name, charge_amount, imagelink from user_purchase_charges c join "User" u on u.id = c.userid join individual_stripe_product sp on sp.productid = c.productid join individual_premium_offerings o on sp.premium_offeringid = o.id WHERE USERID = $1 AND c.PRODUCTID = $2 AND status = $3', [session.user.id, req.body.productid, 'Approved'])

            if(user_purchase_sql.rows.length === 0) return res.status(200).json({error: 'No purchase record found'});
            
            let user_requested_purchase = user_purchase_sql.rows[0];
            if(user_requested_purchase.refund_requested === true) return res.status(200).json({error: 'Refund already requested'});
            await PoolConnection.query('UPDATE user_purchase_charges set refund_requested = true, refund_reason = $1 WHERE userid = $2 and productid = $3 and active_flag = true;', [req.body.refund_reason, session.user.id, req.body.productid])
            await RefundRequestEmail(user_info.email, session.user.id, req.body.productid)


            var convertkit = await axios.post('https://api.convertkit.com/v3/forms/5288286/subscribe', {api_key: process.env.CONVERTKIT_API_KEY, email: user_info.email, first_name: user_info.name.split(' ')[0], fields: {course_name: user_requested_purchase.product_name, course_price: user_requested_purchase.charge_amount / 100, image_link: user_requested_purchase.imagelink}})
            var convertkit_data = await convertkit.data
            return res.status(200).json({status: 'Requested'})
            
 
        
    }
    return res.status(403).json({
        message:
            'You must be sign in to view the protected content on this page.',
        })
}