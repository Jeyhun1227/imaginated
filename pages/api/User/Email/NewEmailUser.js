import { compileFile } from 'pug';
const NewEmailUser = compileFile('pages/api/User/Email/NewEmailUser.pug');
import { config, SES } from 'aws-sdk';
config.update({region: 'us-east-1',     
  accessKeyId: process.env.ACCESS_KEY_ID,
  accessSecretKey: process.env.SECRET_ACCESS_KEY
});
async function SendInitialEmail(name, email, verficationLink){
    // Create sendEmail params 

    var params = {
      Destination: { 
        ToAddresses: [ email]
      },
      Message: { 
        Body: { 
          Html: {
          Charset: "UTF-8",
          Data: NewEmailUser({name, link: verficationLink})
          },
          Text: {
          Charset: "UTF-8",
          Data: 'Your Email has changed for Imaginated!'//NewEmailUser({name, link: verficationLink})
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Imaginated - Verify your email'
        }
        },
      Source: 'support@imaginated.com', 
      // ReplyToAddresses: [
      //   'EMAIL_ADDRESS',
      //   /* more items */
      // ],
    };

    // Create the promise and SES service object
    var sent_values = await new SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();
    console.log('sentEmail: ', sent_values)
}

export default SendInitialEmail;