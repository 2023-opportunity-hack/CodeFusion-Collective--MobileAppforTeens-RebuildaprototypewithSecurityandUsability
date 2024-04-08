import gmail from './helper.mjs';

const sendEmail = (req, res) => {
  gmail.sendMail(req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};

export default sendEmail;