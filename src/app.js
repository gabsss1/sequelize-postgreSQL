import express from 'express';
import zonaRoute from './routes/zona.routes.js'

const app = express();

//middlewares
app.use(express.json());

app.use(zonaRoute)

export default app;