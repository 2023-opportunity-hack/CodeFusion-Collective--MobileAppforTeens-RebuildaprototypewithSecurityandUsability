import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const sendMail = (request) => {
  // Get credentials from .env file
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  // Create a Nodemailer transporter using SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user,
      pass,
    },
  });

  // Construct email options
  const mailOptions = {
    from: `jimenezgabriel12@gmail.com`,
    to: 'jimenez.gabriel12@outlook.com', // Replace with your organization's email address
    subject: request.hotlineCenter,
    text: `Name: ${request.name}, Message: ${request.message}, Phone: ${request.phone}, Email: ${request.email}, Method: ${request.checked}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

export default { sendMail };
