import { Router } from "express";
import * as controller from "../controllers/products.controller.js"

import { upload } from "../middlewares/multer.js";
//const productManager = new ProductManager('./src/data/products.json');

const router = Router();

router.get("/", controller.getAll);

router.get("/:pid", controller.getById);

// router.post("/", upload.array('thumbnails'), controller.create);

// router.put("/:idProduct", controller.update);

// router.delete("/:idProduct", controller.delete);

export default router;