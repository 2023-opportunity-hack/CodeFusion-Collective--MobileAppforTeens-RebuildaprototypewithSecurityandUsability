require('dotenv').config();
const express = require('express');
const routes = require('./routes.tsx');

const app = express();

app.use(express.json());

app.use('/contactProfessional', routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
