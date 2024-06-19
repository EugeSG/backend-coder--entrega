import { Router } from "express";
import * as controller from "../controllers/carts.controller.js";

const router = Router();

router.post("/", controller.create);

router.get("/", controller.getAll);

router.get("/:cid", controller.getById);

router.post("/:cid/products/:pid", controller.addProductToCart);

router.delete("/:cid/products/:pid", controller.deleteProdToCart);

router.put("/:cid", controller.update);

router.put("/:cid/products/:pid", controller.updateQuantity);

router.delete("/:cid", controller.clear)
export default router;
