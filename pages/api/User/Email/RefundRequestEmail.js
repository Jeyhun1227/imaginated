import { compile } from 'pug';


import { config, SES } from 'aws-sdk';

async function RefundRequestEmail(email, userid, productid){
    // Create sendEmail params 
    const notify_new = `
<!DOCTYPE html>
<html>
<body>
<h4>Refund request</h4>
<p>User Email: #{email}</p>
<p>User ID: #{userid}</p>
<p>Product ID: #{productid}</p>
</body>
</html>
    `
    const notify_email = compile(notify_new);

    var params = {
      Destination: { 
        ToAddresses: [ 'nate@imaginated.com', 'sorooshnikaein@gmail.com']
      },
      Message: { 
        Body: { 
          Html: {
          Charset: "UTF-8",
          Data: notify_email({email, userid, productid})
          },
          Text: {
          Charset: "UTF-8",
          Data: `Refund request made by: ${email}` //PasswordChanged({name, link: verficationLink})
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Refund request made by: ${email}`
        }
        },
      Source: 'support@imaginated.com', 
      // ReplyToAddresses: [
      //   'EMAIL_ADDRESS',
      //   /* more items */
      // ],
    };

    // Create the promise and SES service object
    var sent_values = await new SES({apiVersion: '2010-12-01', region: "us-east-1",   credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
    }}).sendEmail(params).promise();
    console.log('sentEmail: ', sent_values)
}

export default RefundRequestEmail;