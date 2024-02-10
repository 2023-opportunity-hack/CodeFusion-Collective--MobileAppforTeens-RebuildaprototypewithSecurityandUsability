const router = require('express').Router();
const controllers = require('./controller.ts');

router.post('', controllers.sendMail);

module.exports = router;
