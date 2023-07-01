const stripe = require('stripe')('sk_test_51N8GfXHnVIn1RPeHYUwWGcfDsBtSBnCaNieoomEJ5MXZU2DOBsswU2Z9HQlIa5L0RYVSnaz600XXGrJgeYR90zVO00kaavxaYi');
import {getSessionFromCookie} from '../auth_token_response'
const PoolConnection = require('../postgressql')


export default async (req, res) => {
    const session = await getSessionFromCookie({req});
  
    
    if(!session) return res.status(500).json({ error: 'You must be logged in.' });
    var user = await PoolConnection.query('SELECT DISTINCT * FROM "User" WHERE ID = $1', [session.user.id])
    var user_val = user.rows[0];
    if(!user_val.individual) return res.status(500).json({ error: 'Claim account first.' });
    var account_query = await PoolConnection.query('SELECT DISTINCT * FROM individual_stripe_account WHERE individualid = $1', [user_val.individual])
    var accountid = null;
    if(account_query.rows.length === 0){
        const account = await stripe.accounts.create({
            type: 'express',
          });
        accountid = account.id
        await PoolConnection.query('INSERT INTO individual_stripe_account(individualid, accountid) VALUES($1, $2);',[user_val.individual, accountid]);

    }else{
      const account = await stripe.accounts.retrieve(account_query.rows[0].accountid);
      console.log('account: ', account)
      if (account.charges_enabled && account.payouts_enabled) {
        // Account already linked to Stripe, return the link to the Stripe dashboard
        return res.status(200).json({url: `https://dashboard.stripe.com/${account_query.rows[0].accountid}`})
        
      }
      accountid  = account_query.rows[0].accountid

    }

    console.log('account: ', `${req.headers.origin}/account_creation`)

    const accountLink = await stripe.accountLinks.create({
        account: accountid,
        refresh_url: `${req.headers.origin}/payments/account_creation/`,
        return_url: `${req.headers.origin}/manage-profile/`,
        type: 'account_onboarding',
      });
    console.log('accountLink: ', accountLink)
    return res.status(200).json({url: accountLink.url})
}