import { Router } from "express";
import * as controller from "../controllers/carts.controller.js";

const router = Router();

router.post("/", controller.create);

router.get("/:cid", controller.getById);

router.post("/:cid/product/:pid", controller.addProductToCart);

export default router;
