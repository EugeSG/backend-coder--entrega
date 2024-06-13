import express from "express";
import handlebars from 'express-handlebars';
import { Server } from "socket.io";

import cartRouter from './routes/cart.router.js';
import productRouter from './routes/product.router.js';
import viewsRouter from './routes/views.router.js';

import { __dirname } from './utils.js';
import { initMongoDB } from "./daos/mongodb/connection.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));


// Configurar handlebars
app.engine('handlebars', handlebars.engine()); 
app.set('view engine', 'handlebars');  
app.set('views', __dirname+'/views');  


//Endpoints
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);


//Vistas productos y websockets
app.use('/', viewsRouter);

// Mongo persistencia -- usar .env para dinamizar las persistencias
const PERSISTENCE = 'mongo';
if(PERSISTENCE === 'mongo') initMongoDB();


const PORT = 8080;
app.listen(PORT, () => console.log(`Server ok on port ${PORT}`));


//Conexión al socket
// const socketServer = new Server(httpServer);

// socketServer.on('connection', async(socket) => {
//     console.log('User connected');

//     socketServer.emit('getProducts', await productManager.getProducts());

//     socket.on('addNewProduct', async(prod) => {
//         const product = await productManager.createProduct(prod);
//         console.log(prod)
//         console.log(product)
//         socketServer.emit('getProducts', await productManager.getProducts());
//     })

//     socket.on('disconnect', ()=>{
//         console.log('User disconnected', socket.id);
//     })
// });