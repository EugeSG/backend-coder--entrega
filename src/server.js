import express from "express";
import handlebars from 'express-handlebars';
import { Server } from "socket.io";

import cartRouter from './routes/cart.router.js';
import productRouter from './routes/product.router.js';
import viewsRouter from './routes/views.router.js';
import ProductManager from "./manager/product.manager.js";
import { __dirname } from './utils.js';

const app = express();
const productManager = new ProductManager(`${__dirname}/data/products.json`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

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

    socketServer.emit('getProducts', await productManager.getProducts());

    socket.on('addNewProduct', async(prod) => {
        const product = await productManager.createProduct(prod);
        socketServer.emit('getProducts', await productManager.getProducts());
    })

    socket.on('deleteProduct', async(id) => {
        const product = await productManager.deleteProduct(id);
        socketServer.emit('getProducts', await productManager.getProducts());
    })

    socket.on('disconnect', ()=>{
        console.log('User disconnected', socket.id);
    })
})