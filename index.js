import express from 'express';
import cors from 'cors';

import config from './config.js';

const app = express();
app.use(express.json());
app.use(cors());

app.listen(config.port, () => console.log(`App is running on ${config.url}`));
