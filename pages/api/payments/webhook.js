import Stripe from "stripe";
const PoolConnection = require('../postgressql')
import { buffer } from "micro";


const stripe = new Stripe('sk_test_51N8GfXHnVIn1RPeHYUwWGcfDsBtSBnCaNieoomEJ5MXZU2DOBsswU2Z9HQlIa5L0RYVSnaz600XXGrJgeYR90zVO00kaavxaYi');

export const config = {
    api: {
      bodyParser: false,
    },
  };
export default async function webhookHandler(req, res) {
  let data, eventType;
  const buf = await buffer(req);

//   if (process.env.STRIPE_WEBHOOK_SECRET) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    let signature = req.headers['stripe-signature'];
    try {
        event = stripe.webhooks.constructEvent(buf, signature,         process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.log(err, `⚠️  Webhook signature verification failed.`);
      return res.status(400).end();
    }
    data = event.data;
    eventType = event.type;
//   }
  if (eventType === 'payment_intent.succeeded') {
    console.log('Payment captured: ', eventType, data.object)
    const paymentIntentId = data.object.id;
    
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    // Extract the product ID from the payment details
    const productId = paymentIntent.metadata.product_id;
    const customerId = paymentIntent.customer;
    const paymentMethodId = paymentIntent.payment_method;
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });

    // const updatedCustomer = await stripe.customers.update(customerId, {
    //   invoice_settings: {
    //     default_payment_method: paymentMethodId,
    //   },
    // });


    console.log('productId: ', paymentIntent)
    // Funds have been captured
    // let productid_query = PoolConnection.query("SELECT productid from user_purchase_charges where paymentintentid = $1;", [data.object.id]);
    // const productid = productid_query.rows[0]
    var productidUpdate = await PoolConnection.query("UPDATE user_purchase_charges set active_flag = false WHERE productid = $1;", [productId]);

    var insert_values = await PoolConnection.query("UPDATE user_purchase_charges set status = 'Approved', active_flag=true WHERE paymentintentid = $1;", [paymentIntentId]);

  } else if (eventType === 'payment_intent.payment_failed') {
    console.log('❌ Payment failed.');
  }
  res.status(200).end();
}