import { Request, Response } from 'express';
const gmail = require('./helper.tsx');

module.exports = {
  sendEmail: (req: Request, res: Response) => {
    gmail.sendMail(req.body)
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err: Error) => {
        console.log(err);
        res.sendStatus(500);
      });
  },
}