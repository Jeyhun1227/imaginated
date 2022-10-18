import { compileFile } from 'pug';
const PasswordChanged = compileFile(path.resolve(__dirname, 'PasswordChanged.pug'));
import { config, SES } from 'aws-sdk';
config.update({region: 'us-east-1',     
  accessKeyId: process.env.ACCESS_KEY_ID,
  accessSecretKey: process.env.SECRET_ACCESS_KEY
});
async function SentPasswordChange(name, email, verficationLink){
    // Create sendEmail params 

    var params = {
      Destination: { 
        ToAddresses: [ email]
      },
      Message: { 
        Body: { 
          Html: {
          Charset: "UTF-8",
          Data: PasswordChanged({name, link: verficationLink})
          },
          Text: {
          Charset: "UTF-8",
          Data: 'Your password has been changed for Imaginated.' //PasswordChanged({name, link: verficationLink})
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Imaginated - Your password has been changed'
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

export default SentPasswordChange;