import { Router } from "express";
import * as controller from "../controllers/products.controller.js"

import { upload } from "../middlewares/multer.js";

const router = Router();

router.get("/", controller.getAll);

router.get("/:pid", controller.getById);

router.post("/", upload.array('thumbnails'), controller.create);

router.put("/:pid", controller.update);

router.delete("/:pid", controller.remove);

export default router;