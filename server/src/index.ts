import './config/config';
import express from 'express';
import dbService from './services/db.service';
import packageJson from '../package.json';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { Application } from 'express-ws';
import router from './routes';
import errorMiddleware from './middlewares/error.middleware';
import path from 'path';

const PORT = process.env.PORT;
const API_VERSION = parseInt(packageJson.version);

const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.API_URL,
    credentials: true,
    exposedHeaders: ['access-token', 'total-count'],
    allowedHeaders: ['_limit', '_offset']
}));
app.use(cookieParser());
app.use(fileUpload());
app.use(`/api/v${API_VERSION}`, router);
app.use('/public', express.static(path.resolve(__dirname, '..', 'static')));
app.use(errorMiddleware);


const startApp = async () => {
    try {
        await dbService.connect();
        app.listen(PORT, () => console.log(`Server started on port - ${PORT}`));
    } catch(e) {
        console.log(e);
    }
}

startApp();