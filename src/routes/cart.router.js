import { Router } from "express";
import CartManager from "../manager/carts.manager.js";

const router = Router();
const cartManager = new CartManager('./src/data/carts.json');

router.post("/", async (re, res) => {
    try {
        const cart = await cartManager.createCart();
        res.status(201).json(cart);
    } catch(error) {
        res.status(500).json({message: "Server Error: " + error.message})
    }
})

router.get("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartManager.getCartById(cid);
        if(cart[0] == "Error") res.status(422).json({ message: cart[1]});
        else res.status(200).json(cart);
    } catch(error) {
        res.status(500).json({ message: "Server Error: " + error.message});
    }
})

router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid } = req.params;
        const { pid } = req. params;
        const productInCart = await cartManager.addProductToCart(cid, pid);
        if(productInCart[0] == "Error") {
            res.status(422).json( { message: productInCart[1]});
        }
        else res.status(201).json(productInCart);
    } catch(error) {
        res.status(500).json({message: "Server Error :" + error.message})
    }
})
export default router;
