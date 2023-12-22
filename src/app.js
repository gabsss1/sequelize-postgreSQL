import express from 'express';
import cors from 'cors';
import zonaRoute from './routes/zona.routes.js'
import dotenv from 'dotenv';

dotenv.config();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

app.use(zonaRoute)

export default app;