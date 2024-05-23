import express from "express";
import handlebars from 'express-handlebars';
import { Server } from "socket.io";

import cartRouter from './routes/cart.router.js';
import productRouter from './routes/product.router.js';
import viewsRouter from './routes/views.router.js'
import { __dirname } from './utils.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine()); 
app.set('view engine', 'handlebars');  
app.set('views', __dirname+'/views');  

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.use('/', viewsRouter);

const PORT = 8080;

const httpServer = app.listen(PORT, () => console.log(`Server ok on port ${PORT}`));

const socketServer = new Server(httpServer);

socketServer.on('connection', async(socket) => {
    console.log('User connected');

    socket.on('disconnect', ()=>{
        console.log('User disconnected', socket.id);
    })
})