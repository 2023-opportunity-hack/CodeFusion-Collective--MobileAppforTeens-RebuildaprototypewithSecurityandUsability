const router = require('express').Router();
const controllers = require('./controller.tsx');

router.post('', controllers.sendMail);

module.exports = router;
