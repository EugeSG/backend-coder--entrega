import { Router } from "express";
const router = Router();

import ProductManager from "../manager/product.manager.js";
import { upload } from "../middlewares/multer.js";

const productManager = new ProductManager('./src/data/products.json');


router.get("/", async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts();
        if (limit) res.status(299).json(products.slice(0, limit));
        else res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server Error: " + error.message });
    }
});

router.get("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productManager.getProducById(pid);
        if (product[0] == "Error") res.status(404).json({ message: product[1] });
        else res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Server Error: " + error.message });
    }
});

router.post("/", upload.array('thumbnails'), async (req, res) => {
    try {
        const productBody = { ...req.body };
        let thumbnails = [];

        for (const file of req.files) {
            thumbnails.push(file.path);
        }
        
        productBody.thumbnails = thumbnails;
        const product = await productManager.createProduct(productBody);
        if (product[0] == "Error") res.status(422).json({ message: product[1] });
        else res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: "Server Error: " + error.message });
    }
});

router.put("/:idProduct", async (req, res) => {
    try {
        const { idProduct } = req.params;
        const productUpdate = await productManager.updateProduct(req.body, idProduct);
        if (productUpdate[0] == "Error") res.status(422).json({ message: productUpdate[1] });
        else res.status(200).json(productUpdate);
    } catch (error) {
        res.status(500).json({ message: "Server Error: " + error.message });
    }
});

router.delete("/:idProduct", async (req, res) => {
    try {
        const { idProduct } = req.params;
        const productDelete = await productManager.deleteProduct(idProduct);
        if (productDelete[0] == "Error") res.status(404).json({ message: productDelete[1] });
        else res.status(200).json({ message: `Product with id: ${idProduct} deleted successfully` });
    } catch (error) {
        res.status(500).json({ message: "Server Error: " + error.message });
    }
});



export default router;