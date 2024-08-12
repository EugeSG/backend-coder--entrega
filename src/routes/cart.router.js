import { Router } from "express";
import * as controller from "../controllers/carts.controller.js";
import passport from "passport";
import { authorization } from "../middlewares/authorization.middleware.js";

const router = Router();

router.post("/", passport.authenticate("current", { session: false }), controller.create);

router.get("/", controller.getAll);

router.get("/:cid", controller.getById);

router.post("/:cid/products/:pid", passport.authenticate("current", { session: false }),  authorization(["user", "admin"], true), controller.addProductToCart);

router.delete("/:cid/products/:pid", passport.authenticate("current", { session: false }), authorization(["user", "admin"], true), controller.deleteProdToCart);

router.put("/:cid", passport.authenticate("current", { session: false }), authorization(["user", "admin"], true), controller.update);

router.put("/:cid/products/:pid", passport.authenticate("current", { session: false }), authorization(["user", "admin"], true), controller.updateQuantity);

router.delete("/:cid", controller.clear);

router.post("/:cid/purchase", passport.authenticate("current", { session: false }), authorization(["user", "admin"], true), controller.finishPurchase)
export default router;
