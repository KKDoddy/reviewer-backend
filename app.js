import express from 'express';
import dotenv from 'dotenv';
import apiRoutes from './routes';
import './config/googleStrategy';
import './config/facebookStrategy';

const app = express();

dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ status: 200, message: 'welcome to the Reviewer api server' });
});

app.all('*', (req, res) => {
    res.status(404).json({ status: 404, message: 'Sorry! route not found' });
});

app.listen( process.env.PORT, () =>{
    console.log(`server is running on port ${process.env.PORT}`);
});

export default app;
