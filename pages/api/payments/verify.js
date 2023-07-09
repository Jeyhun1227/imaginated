import Stripe from 'stripe';
import { getSessionFromCookie } from '../auth_token_response';
const PoolConnection = require('../postgressql')

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  res.status(200).end();

  // if (req.method === 'POST') {
  //   try {
  //     const { billing_details, productID, paymentMethod, paymentIntent } = req.body;

  //     // Retrieve the session from Next.js session
  //     const session = await getSessionFromCookie({ req });

  //     if (!session) {
  //       return res.status(500).json({ error: 'You must be logged in.' });
  //     }

  //     // Retrieve the connected account ID for the product
  //     const connectedAccountIDRows = await PoolConnection.query('SELECT DISTINCT accountid FROM individual_stripe_product WHERE productid = $1', [productID]);

  //     if (connectedAccountIDRows.rows.length !== 1) {
  //       return res.status(500).json({ error: 'Invalid product.' });
  //     }
  //     var customerlist = await PoolConnection.query('SELECT DISTINCT customerid FROM user_purchase_charges WHERE userid = $1', [session.user.id])
  //     // console.log('productID: ', productID)
  //     var customerid = null;
  //     if(customerlist.rows.length > 0){
  //       customerid = customerlist.rows[0].customerid  
  //     }

  //       const connectedAccountID = connectedAccountIDRows.rows[0].accountid;

  //     // Perform any necessary verification or authentication here
  //     // ...
  //       console.log('paymentMethodVerify: ', paymentMethod)
  //     // Capture the payment intent using the payment method
  //       const paymentIntentCapture = await stripe.paymentIntents.retrieve(paymentIntent);

  //   //   const paymentIntentCapture = await stripe.paymentIntents.capture(paymentIntent, {
  //   //     stripeAccount: connectedAccountID,
  //   //   });
  //       console.log('verifypaymentIntent: ', paymentIntentCapture)
  //       if(paymentIntentCapture.status !== 'succeeded') return res.status(500).json({ error: 'Payment verification failed: ' + paymentIntent.status });

  //       // Perform any further actions after successful payment verification
  //       // ...
  //       // var insert_values = await PoolConnection.query("UPDATE user_purchase_charges set status = 'Approved' where ;");

  //       return res.status(200).json({ message: 'Payment verification successful.' });

  //   } catch (error) {
  //     console.error('Error verifying payment:', error);
  //     return res.status(500).json({ error: 'An error occurred while verifying the payment.' });
  //   }
  // } else {
  //   res.setHeader('Allow', 'POST');
  //   res.status(405).end('Method Not Allowed');
  // }
}