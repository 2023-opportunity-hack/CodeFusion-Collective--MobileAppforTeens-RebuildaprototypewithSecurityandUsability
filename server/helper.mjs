import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const sendMail = async (request) => {
  try {
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
      to: request.hotlineCenter,
      subject: 'SafeSpace Anonymous Contact Request',
      text: `${request.name} has sent this message via the SafeSpace app, a secure platform for individuals seeking help and support for abuse. ${request.name} is reaching out for assistance regarding personal experiences of abuse and wishes to remain anonymous until further communication is established. Please respond with utmost confidentiality and provide guidance on the next steps.\n\nPreferred method of contact: ${request.checked}\nPhone Number: ${request.phone}\nEmail: ${request.email}${request.availability.length > 3 ? `\nAvailability for contact: ${request.availability}` : ''} \nTheir message: ${request.text}`,
    };

    // Send mail
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return info.response;
  } catch (error) {
    console.log('Error sending email:', error);
    throw error;
  }
}

export default { sendMail };
