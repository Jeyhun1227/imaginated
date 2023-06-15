const stripe = require('stripe')('sk_test_51N8GfXHnVIn1RPeHYUwWGcfDsBtSBnCaNieoomEJ5MXZU2DOBsswU2Z9HQlIa5L0RYVSnaz600XXGrJgeYR90zVO00kaavxaYi');


export default async (req, res) => {

    // const account = await stripe.accounts.create({
    //     type: 'express',
    //   });
    // const accountLink = await stripe.accountLinks.create({
    //     account: account.id,
    //     refresh_url: 'https://localhost:3000/reauth',
    //     return_url: 'https://localhost:3000/return',
    //     type: 'account_onboarding',
    //   });
    // // console.log('account', account)
    // console.log('accountLink: ', accountLink)
    // return account
}