require('dotenv').config();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const client_id = process.env.GMAIL_client_id;
const client_secret = process.env.GMAIL_client_secret;
const redirect_uri = process.env.GMAIL_redirect_uri;
const refresh_token = process.env.GMAIL_refresh_token;

const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);
oAuth2Client.setCredentials({ refresh_token });

module.exports = {
  sendMail: (request:{hotlineCenter: string, message: string, name: string, phone: string, email: string, checked: string}) => oAuth2Client.getAccessToken()
    .then((accessToken: string) => {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'safespace4ever@gmail.com',
          clientId: client_id,
          clientSecret: client_secret,
          refreshToken: refresh_token,
          accessToken,
        },
      });
      const mailOptions = {
        from: 'safespace4ever@gmail.com',
        to: 'safespace4ever@gmail.com',
        subject: request.hotlineCenter,
        text: `Name: ${request.name}, Message: ${request.message}, Phone: ${request.phone}, email: ${request.email}, method: ${request.checked}`,
      };
      transporter.sendMail(mailOptions);
    }),
};
