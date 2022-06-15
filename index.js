import express from 'express';
import cors from 'cors';

import config from './config.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', userRoutes.routes);

app.listen(config.port, () => console.log(`App is running on ${config.url}`));
