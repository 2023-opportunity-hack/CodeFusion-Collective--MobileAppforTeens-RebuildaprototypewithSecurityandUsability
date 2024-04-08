import express from 'express';
import sendEmail from './controller.mjs';

const router = express.Router();

router.post('', sendEmail);

export default router;
