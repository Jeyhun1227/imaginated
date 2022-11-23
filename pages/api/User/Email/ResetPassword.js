import { compile } from 'pug';
import path from 'path';

const ChangePass = `<!DOCTYPE html>
                  <html>
                        <body>
                        <h3>Forgot your Password?</h3>
                        <p>Please click the button below to create a new password to access your account.</p>
                        <p><a href="#{link}" target="_blank">Change your password</a></p>
                        <p>Or simply copy this link and paste it in your browser: <a href="#{link}" target="_blank" rel="noreferrer">#{link}</a></p>

                        </body>
                  </html>`;
const ChangePassword = compile(ChangePass);
import { SES } from 'aws-sdk';

async function SendPasswordEmail(email, verficationLink){

    var params = {
      Destination: { 
        ToAddresses: [ email]
      },
      Message: { 
        Body: { 
          Html: {
          Charset: "UTF-8",
          Data: ChangePassword({link: verficationLink})
          },
          Text: {
          Charset: "UTF-8",
          Data: 'Your password reset link.'//NewEmailUser({name, link: verficationLink})
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Imaginated - Change your password'
        }
        },
      Source: 'support@imaginated.com', 
    };

    var sent_values = await new SES({apiVersion: '2010-12-01', region: "us-east-1",   credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
    }}).sendEmail(params).promise();
    console.log('sentEmail: ', sent_values)
    return true;
}

export default SendPasswordEmail;