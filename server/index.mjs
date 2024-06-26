import dotenv from 'dotenv';
import express from 'express';
import routes from './routes.mjs';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/contactProfessional', routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
