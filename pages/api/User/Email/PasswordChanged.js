import { compile } from 'pug';

const PasswordEmail = `
<!DOCTYPE html>
<html>
<body>
<h4>Hi #{name}</h4>
<h5>Your password has been changed for Imaginated.</h5>
<p>If this wasn’t you, please reset your password immediately.</p>
<p><a href="#{link}" target="_blank">Click Here To Reset Your Password</a></p>
<p>Or simply copy this link and paste it in your browser: <a href="#{link}" target="_blank" rel="noreferrer">#{link}</a></p>
</body>
</html>`
const PasswordChanged = compile(PasswordEmail);
import { config, SES } from 'aws-sdk';

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
    var sent_values = await new SES({apiVersion: '2010-12-01', region: "us-east-1"}).sendEmail(params).promise();
    console.log('sentEmail: ', sent_values)
}

export default SentPasswordChange;