import { compileFile } from 'pug';
const CreateUserEmail = compileFile('pages/api/User/Email/CreateUser.pug');
import { config, SES } from 'aws-sdk';
config.update({region: 'us-east-1',     
  accessKeyId: process.env.AWS_SECRET_KEY,
  accessSecretKey: process.env.AWS_SECRET_KEY
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
          Data: CreateUserEmail({name, link: verficationLink})
          },
          Text: {
          Charset: "UTF-8",
          Data: 'Thank you for signing up to Imaginated!'//CreateUserEmail({name, link: verficationLink})
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