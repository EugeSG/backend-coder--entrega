import { Router } from "express";
import * as controller from "../controllers/mocks.controller.js";

const router = Router();
router.get("/mockingusers", controller.createUsers);
router.post("/generateData/:user/:pets", controller.createUsers)

export default router;
