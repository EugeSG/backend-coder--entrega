import { Router } from "express";
import * as controller from "../controllers/products.controller.js"
import { authorization } from "../middlewares/authorization.middleware.js";
import passport from "passport";
import { upload } from "../middlewares/multer.middleware.js";
import { productDto } from "../dtos/product.dto.js";
import { validate } from "../middlewares/validation.middleware.js"

const router = Router();

router.get("/", controller.getAll);

router.get("/:pid", controller.getById);

router.post("/", passport.authenticate("current",
    { session: false }),
    authorization(["admin"]), 
    validate(productDto),
    upload.array('thumbnails'), 
    controller.create
);

router.put("/:pid", passport.authenticate("current", { session: false }), authorization(["admin"]), controller.update);

router.delete("/:pid", passport.authenticate("current", { session: false }), authorization(["admin"]), controller.remove);

export default router;