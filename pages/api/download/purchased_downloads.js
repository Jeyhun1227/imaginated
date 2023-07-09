import Stripe from 'stripe';
import {getSessionFromCookie} from '../auth_token_response'
const PoolConnection = require('../postgressql')
const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: 'us-east-1' // Replace 'your-region' with your AWS region
  });
export default async function handler(req, res) {
  const session = await getSessionFromCookie({req});
  const { productID, paymentMethod, billing_details } = req.body;

  
  if(!session) return res.status(500).json({ error: 'You must be logged in.' });
  if (req.method === 'POST') {

        var user = await PoolConnection.query('SELECT DISTINCT * FROM "User" WHERE ID = $1', [session.user.id])
        var user_val = user.rows[0]

        var user_product_purchase = await PoolConnection.query("SELECT DISTINCT customerid, status, paymentintentid FROM user_purchase_charges WHERE userid = $1 and productid = $2 and status = 'Approved'", [session.user.id, productID])
        if(user_product_purchase.rows.length > 0){
            const user_product_purchase_value = user_product_purchase.rows[0];
            if(user_product_purchase_value.status === 'Approved'){
                const fileName = `${productID}.zip`; // Modify this line if the file extension is different
                const bucketName = 'imaginated-premium-products';
                console.log('files: ', bucketName, fileName)
        
                try {
                  const s3 = new AWS.S3();
                  // Get a presigned URL for accessing the file
                  const fileKey = `${productID}.zip`; // The file key in the S3 bucket
                  const params = {
                    Bucket: bucketName, 
                    Key: fileKey,
                    Expires: 240, // The expiration time for the signed URL in seconds (e.g., 1 hour)
                  };
          
                  // Generate a signed URL for downloading the file
                  const signedUrl = s3.getSignedUrl('getObject', params);
          
                  return res.status(200).json({ url: signedUrl });
                } catch (error) {
                  // Handle any errors that occur during the S3 operation
                  console.log('error: ', error)
                  return res.status(500).json({ error: 'Error accessing the S3 bucket.' });
                }
                
            } 
            
        }
        return res.status(401).json({error: 'Not authorized purchase'})
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
