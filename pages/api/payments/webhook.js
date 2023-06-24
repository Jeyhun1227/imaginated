import Stripe from "stripe";
const PoolConnection = require('../postgressql')
import { buffer } from "micro";
import axios from 'axios';


const stripe = new Stripe('sk_test_51N8GfXHnVIn1RPeHYUwWGcfDsBtSBnCaNieoomEJ5MXZU2DOBsswU2Z9HQlIa5L0RYVSnaz600XXGrJgeYR90zVO00kaavxaYi');

export const config = {
    api: {
      bodyParser: false,
    },
  };
export default async function webhookHandler(req, res) {
  let data, eventType;
  const buf = await buffer(req);

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

    console.log('productId: ', paymentIntent, paymentIntentId)

    // var productidUpdate = await PoolConnection.query("UPDATE user_purchase_charges set active_flag = false WHERE productid = $1;", [productId]);

    var insert_values = await PoolConnection.query("UPDATE user_purchase_charges set status = 'Approved', active_flag=true, purchase_date = current_timestamp WHERE paymentintentid = $1;", [paymentIntentId]);

    var user_info_query = await PoolConnection.query('select email, u.name, o."name" product_name, charge_amount, imagelink from user_purchase_charges c join "User" u on u.id = c.userid join individual_stripe_product sp on sp.productid = c.productid join individual_premium_offerings o on sp.premium_offeringid = o.id WHERE paymentintentid = $1;', [paymentIntentId]);

    var user_info = user_info_query.rows[0]
    console.log('user_info: ', user_info)
    var convertkit = await axios.post('https://api.convertkit.com/v3/forms/5288282/subscribe', {api_key: process.env.CONVERTKIT_API_KEY, email: user_info.email, first_name: user_info.name.split(' ')[0], fields: {course_name: user_info.product_name, course_price: user_info.charge_amount / 100, image_link: user_info.imagelink}})
    var convertkit_data = await convertkit.data
    console.log("convertkit_data: ", convertkit_data)

  } else if (eventType === 'payment_intent.payment_failed') {
    console.log('❌ Payment failed.');
  }
  res.status(200).end();
}