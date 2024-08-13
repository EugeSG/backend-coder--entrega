import { Router } from "express";
import * as controller from "../controllers/user.controller.js";
import passport from "passport";
import { validate } from "../middlewares/validation.middleware.js";
import { userDto } from "../dtos/user.dto.js"
import { authDto } from "../dtos/auth.dto.js"
import { userPrvacyDto } from "../dtos/user.dto.js";
import { validateSensibleDataFromUser } from "../middlewares/validation.middleware.js";
const router = Router();

router.post(
  "/login",
  validate(authDto),
  passport.authenticate("login", {
    session: false,
    failurlRedirect: "/api/sessions/login",
  }),
  controller.login
);

router.post("/register", validate(userDto), controller.register);

router.get(
  "/current",
  passport.authenticate("current",
  { session: false }),
  validateSensibleDataFromUser(userPrvacyDto),
  (req, res) => {
    res.status(200).json({
      message: "Bienvenido",
      user: req.user,
    });
  }
);

router.get("/login", (req, res) => {
  res.status(401).json({
    error: "No autorizado",
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Sesión cerrada",
  });
}); 
export default router;
