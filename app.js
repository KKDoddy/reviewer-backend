import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRoutes from './routes';
import './config/googleStrategy';
import './config/facebookStrategy';
import socketInitializer from 'socket.io';
import { registerSocket } from './helpers/socketHelper';

const app = express();

dotenv.config();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ status: 200, message: 'welcome to the Reviewer api server' });
});

app.all('*', (req, res) => {
    res.status(404).json({ status: 404, message: 'Sorry! route not found' });
});

const listener = app.listen( process.env.PORT, () =>{
    console.log(`server is running on port ${process.env.PORT}`);
});

const serverSocket  = socketInitializer(listener);

serverSocket.on('connection', (socket) => {
    console.log('new client connected to server');
    registerSocket(socket);
});

export { serverSocket }
export default app;
