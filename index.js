import express from 'express';
import dotenv from "dotenv";
import routerAPI from './routes/index.js';
import connectDB from './config/db.js';

dotenv.config(); 


const app = express();
app.use(express.urlencoded());
app.use(express.json())
app.use(express.static('public'));

const port = process.env.PORT;
connectDB();

app.get('/', (request, response) => {
    console.log('Conectado')
    response.send('Hola');
});

app.listen(port, () => {
    console.log(`Servidor en el puerto ${port}`)
})

routerAPI(app);