import gmail from './helper.mjs';

const sendEmail = async (req, res) => {
  try {
    await gmail.sendMail(req.body);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export default sendEmail;
