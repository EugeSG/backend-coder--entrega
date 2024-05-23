import { Router } from "express";
import ProductManager from "../manager/product.manager.js";


const router = Router();
const productManager = new ProductManager('./src/data/products.json');

router.get("/products", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('index', {products});
    } catch (error) {
        res.render('errors');
    }
});

router.get("/realtimeproducts", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('realTimeProducts', {products});
    } catch (error) {
        res.render('errors');
    }
});

export default router;