import Stripe from 'stripe';
import {getSessionFromCookie} from '../auth_token_response'
// const PoolConnection = require('../postgressql')

// const stripe = new Stripe('sk_test_51N8GfXHnVIn1RPeHYUwWGcfDsBtSBnCaNieoomEJ5MXZU2DOBsswU2Z9HQlIa5L0RYVSnaz600XXGrJgeYR90zVO00kaavxaYi');

export default async function handler(req, res) {
  res.status(200).end();

  // const session = await getSessionFromCookie({req});
  // // console.log('session: ', session)
  // // const session = await getSession({ req })
  // if(!session) return res.status(500).json({ error: 'You must be logged in.' });
  // if (req.method === 'POST') {
  //   try {
  //     var user = await PoolConnection.query('SELECT DISTINCT * FROM "User" WHERE ID = $1', [session.user.id])
  //     var user_val = user.rows[0]
  //     var customerlist = await PoolConnection.query('SELECT DISTINCT customerid FROM user_purchase_charges WHERE userid = $1', [session.user.id])
  //     const { productID, paymentMethod, billing_details } = req.body;
  //     // console.log('productID: ', productID)
  //     var customerid = null;
  //    if(customerlist.rows.length === 0) return res.status(500).json({error: 'Please refresh browser. Customer not found'});
  //     const customer_value = customerlist.rows[0]  
  //     customerid = customer_value.customerid
  //     // INCASE THE ITEM IS ALREADY PURCHASED BY USER
  //     var user_product_purchase = await PoolConnection.query('SELECT DISTINCT customerid FROM user_purchase_charges WHERE userid = $1 and productid = $2 and status = $3', [session.user.id, productID, 'Approved'])
  //     if(user_product_purchase.rows.length > 0){
  //       return res.status(500).json({error: 'Item already owned'});
  //     }
    



  //     const connectedAccountIDRows = await PoolConnection.query('SELECT DISTINCT accountid, individualid, premium_offeringid FROM individual_stripe_product WHERE productid = $1', [productID])
  //     if(connectedAccountIDRows.rows.length != 1) return res.status(500).json({error: 'more than one productid found'})
  //     const connectedAccountID = connectedAccountIDRows.rows[0]
  //     // console.log('connectedAccountID: ', connectedAccountID)
  //     // Retrieve the product information from Stripe
  //     const product = await stripe.products.retrieve(productID, {
  //       stripeAccount: connectedAccountID.accountid, // Pass the connected account ID as stripeAccount parameter
  //     });
  //     // console.log('product: ', product)
  //     // console.log('paymentMethod: ', paymentMethod)


  //     // Get the price associated with the product
  //     const price = await stripe.prices.retrieve(product.default_price, {
  //       stripeAccount: connectedAccountID.accountid, // Pass the connected account ID as stripeAccount parameter
  //     });
  //     var paymentIntent = null;
  //     try{
  //       var user_product_purchase = await PoolConnection.query('SELECT DISTINCT customerid, status, paymentintentid FROM user_purchase_charges WHERE userid = $1 and productid = $2', [session.user.id, productID])
        
  //       // Charge the customer for the product through the connected account
  //       if(user_product_purchase.rows.length === 0) return res.status(500).json({error: 'Please refresh browser. Customer not found'});
        
  //       const user_product_purchase_value = user_product_purchase.rows[0];
  //       paymentIntent = await stripe.paymentIntents.update(user_product_purchase_value.paymentintentid, {
  //         payment_method: paymentMethod, // Attach the payment method to the payment intent
  //       });

  //     // paymentIntent = await stripe.paymentIntents.create({
  //     //   amount: price.unit_amount,
  //     //   currency: price.currency,
  //     //   customer: customerid,
  //     //   description: `Purchase of Product ID: ${productID}`,
  //     //   application_fee_amount: Math.floor(price.unit_amount * 0.15), // 15% commission
  //     //   transfer_data: {
  //     //     destination: connectedAccountID.accountid, // Connected account ID
  //     //   },
  //     //   payment_method: paymentMethod, // Attach the payment method to the payment intent

  //     // });
  //     }catch(e){
  //       return res.status(500).json({error: e})
  //     }

  //     if (paymentIntent.status === 'requires_confirmation') {

  //       var insert_values = await PoolConnection.query('UPDATE user_purchase_charges set status = $1 WHERE userid = $2 and productid = $3;', ['Pending_verify', session.user.id, productID])
  //       return res.status(200).json({
  //         client_secret: paymentIntent.client_secret,
  //         status: 'requires_confirmation'
  //       });
      
  //     }


  //     console.log('error Failed: ', paymentIntent)
  //     res.status(500).json({ error: 'An error occurred while processing the payment payment intent.' });


  //   } catch (error) {
  //     // Return error response
  //     console.error('Error processing payment:', error);
  //     var error_message = null;
  //     if(error.raw){
  //       error_message = error.raw.message
  //     }else{
  //       error_message = 'An error occurred while processing the payment.'
  //     }
  //     res.status(500).json({ error: error_message });
  //   }
  // } else {
  //   res.setHeader('Allow', 'POST');
  //   res.status(405).end('Method Not Allowed');
  // }
}
