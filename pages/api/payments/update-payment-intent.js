import Stripe from 'stripe';
import { getSessionFromCookie } from '../auth_token_response';
const PoolConnection = require('../postgressql')

const stripe = new Stripe('sk_test_51N8GfXHnVIn1RPeHYUwWGcfDsBtSBnCaNieoomEJ5MXZU2DOBsswU2Z9HQlIa5L0RYVSnaz600XXGrJgeYR90zVO00kaavxaYi');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
const session = await getSessionFromCookie({req});

  if(!session) return res.status(500).json({ error: 'You must be logged in.' });
  if (req.method === 'POST') {
    var user = await PoolConnection.query('SELECT DISTINCT * FROM "User" WHERE ID = $1', [session.user.id])
    var user_val = user.rows[0]
    const { paymentMethodId, clientSecret, productID } = req.body;
    
    try {
        var customerValueStripe = await PoolConnection.query('SELECT DISTINCT paymentintentid, status FROM user_purchase_charges WHERE userid = $1 and productid = $2and active_flag=true', [session.user.id, productID])
        if(customerValueStripe.rows.length === 0 ) return res.status(500).json({ error: 'No paymentintent found. Refresh Browser.' });
        let strip_customer = customerValueStripe.rows[0]
        if(strip_customer.status === 'Approved') return res.status(500).json({ error: 'Item already purchased' });
        // Retrieve the payment intent using the client secret
        const paymentIntent = await stripe.paymentIntents.retrieve(strip_customer.paymentintentid);
        console.log('paymentIntent: ', paymentIntent)
        // Update the payment intent with the selected payment method
        await stripe.paymentIntents.update(paymentIntent.id, {
        payment_method: paymentMethodId
        });
        
        // Confirm the payment intent
        const confirmedPaymentIntent = await stripe.paymentIntents.confirm(paymentIntent.id);
        var productidUpdate = await PoolConnection.query("UPDATE user_purchase_charges set active_flag = false WHERE productid = $1;", [productID]);

        var insert_values = await PoolConnection.query("UPDATE user_purchase_charges set status = 'Approved', active_flag=true WHERE paymentintentid = $1;", [paymentintentid]);

        res.status(200).json({ success: true, paymentIntent: confirmedPaymentIntent });
    } catch (error) {
        console.error('Error confirming payment intent:', error);
        res.status(500).json({ error: error });
    }
    }
}