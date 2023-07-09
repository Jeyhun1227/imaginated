import {getSessionFromCookie} from '../auth_token_response'

const PoolConnection = require('../postgressql')
var xss = require("xss");
const yup =  require('yup');


export default async (req, res) => {
  const session = await getSessionFromCookie({ req })
    if (req.method === 'POST') {
        if (session) {
            let individual_user_edit = await PoolConnection.query('SELECT * FROM individual_user_edit WHERE ACTIVE IS TRUE AND USERID = $1 AND APPROVED IS FALSE', [session.user.id]);

           
            return res.status(200).json({rows: individual_user_edit.rows})
        }
    }
    return res.status(403).json({
        message:
            'You must be sign in to view the protected content on this page.',
        })
}