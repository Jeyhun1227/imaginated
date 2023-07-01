import Stripe from 'stripe';
import {getSessionFromCookie} from '../auth_token_response'
const PoolConnection = require('../postgressql')

const stripe = new Stripe('sk_test_51N8GfXHnVIn1RPeHYUwWGcfDsBtSBnCaNieoomEJ5MXZU2DOBsswU2Z9HQlIa5L0RYVSnaz600XXGrJgeYR90zVO00kaavxaYi');

const getPaymentMethods = async (customerid) => {
    const paymentMethods = await stripe.paymentMethods.list({
        customer: customerid,
        type: 'card',
      });
      if(paymentMethods.data.length > 0){
        // console.log('paymentMethods.data[0]: ', paymentMethods.data[0])
        let payment_id = paymentMethods.data[0].id
        let card_info = paymentMethods.data[0].card;
        return {id: payment_id, brand: card_info.brand, exp_month: card_info.exp_month, exp_year: card_info.exp_year, last4: card_info.last4}
      }
      return {}
}

export default async function handler(req, res) {
  const session = await getSessionFromCookie({req});
  const { productID, paymentMethod, billing_details } = req.body;

  
  if(!session) return res.status(500).json({ error: 'You must be logged in.' });
  if (req.method === 'POST') {
    try {
        var user = await PoolConnection.query('SELECT DISTINCT * FROM "User" WHERE ID = $1', [session.user.id])
        var user_val = user.rows[0]
        var customerlist = await PoolConnection.query('SELECT DISTINCT customerid FROM user_purchase_charges WHERE userid = $1', [session.user.id])
        // console.log('customerlist.rows: ', customerlist.rows)
        var customerid = null;
        // console.log('customerlist.rows: ', customerlist.rows)
        // if customer exists check
        if(customerlist.rows.length > 0){
            const customer_value = customerlist.rows[0]  
            customerid = customer_value.customerid
            // INCASE THE ITEM IS ALREADY PURCHASED BY USER
            var user_product_purchase = await PoolConnection.query("SELECT DISTINCT customerid, status, paymentintentid FROM user_purchase_charges WHERE userid = $1 and productid = $2 and active_flag = true", [session.user.id, productID])
            if(user_product_purchase.rows.length > 0){
                const user_product_purchase_value = user_product_purchase.rows[0];
                if(user_product_purchase_value.status === 'Approved') return res.status(200).json({alreadyOwned:true});
                if(user_product_purchase_value.paymentintentid){
                    const paymentIntentExisting = await stripe.paymentIntents.retrieve(user_product_purchase_value.paymentintentid);
                    // console.log('paymentIntentExisting: ', paymentIntentExisting)
                    let payment_methods = await getPaymentMethods(customerid);
                    return res.status(200).json({
                        client_secret: paymentIntentExisting.client_secret,
                        payment_methods,
                        status: 'Existing'
                    });
                }
            }
            // const paymentIntents = await stripe.paymentIntents.list({
            //     customer: customerid,
            // });
            // console.log('paymentIntents: ', paymentIntents)
            // if (paymentIntents.data.length > 0) {
            //     return res.send({
            //         paymentIntents: paymentIntents,
            //     });
            // }

        }else{
            // Create a customer in Stripe
            const customer = await stripe.customers.create({
            email: user_val.email,
            name: user_val.name,
            payment_method: paymentMethod,
            invoice_settings: {
                default_payment_method: req.body.payment_method,
            },
            });
            customerid = customer.id
        }
    

        const connectedAccountIDRows = await PoolConnection.query('SELECT DISTINCT sp.accountid, sp.individualid, sp.premium_offeringid, o.name FROM individual_stripe_product sp join individual_premium_offerings o on sp.premium_offeringid = o.id WHERE sp.productid = $1', [productID])
        if(connectedAccountIDRows.rows.length != 1) return res.status(500).json({error: 'more than one productid found'})
        const connectedAccountID = connectedAccountIDRows.rows[0]
        // Retrieve the product information from Stripe
        const product = await stripe.products.retrieve(productID, {
            stripeAccount: connectedAccountID.accountid, // Pass the connected account ID as stripeAccount parameter
        });


        // Get the price associated with the product
        const price = await stripe.prices.retrieve(product.default_price, {
            stripeAccount: connectedAccountID.accountid, // Pass the connected account ID as stripeAccount parameter
        });
        var paymentIntent = null;
        try{
            // console.log('connectedAccountID: ', connectedAccountID)
            // Charge the customer for the product through the connected account
            paymentIntent = await stripe.paymentIntents.create({
                amount: price.unit_amount,
                currency: price.currency,
                customer: customerid,
                setup_future_usage: 'off_session',
                description: `Purchase of Product: ${connectedAccountID.name}`,
                application_fee_amount: Math.floor(price.unit_amount * 0.15), // 15% commission
                metadata: {
                    // Other metadata fields if needed
                    product_id: productID, // Custom product reference
                },
                transfer_data: {
                destination: connectedAccountID.accountid, // Connected account ID
                },
            });

            var customerInsertion = await PoolConnection.query('SELECT DISTINCT customerid FROM user_purchase_charges WHERE userid = $1 and productid = $2 and status != $3 and active_flag=true', [session.user.id, productID, 'Approved'])
    
            if(customerInsertion.rows.length === 0){
                var insert_values = await PoolConnection.query('INSERT INTO user_purchase_charges(userid, customerid, productid, paymentintentid, status, charge_amount, active_flag) VALUES($1, $2, $3, $4, $5, $6, $7);',
                [session.user.id, customerid, productID, paymentIntent.id, 'Pending', price.unit_amount, true]);
            }
            let payment_methods = await getPaymentMethods(customerid);

            return res.status(200).json({
                client_secret: paymentIntent.client_secret,
                payment_methods,
                status: 'Created'
            });
              
        }catch(e){
            return res.status(500).json({error: e})
        }

        } catch (error) {
        // Return error response
        console.error('Error processing payment:', error);
        var error_message = null;
        if(error.raw){
            error_message = error.raw.message
        }else{
            error_message = 'An error occurred while processing the payment.'
        }
        res.status(500).json({ error: error_message });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
