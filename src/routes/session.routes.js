import { Router } from "express";
import * as controller from "../controllers/user.controller.js";
import passport from "passport";

const router = Router();

router.post(
  "/login",
  passport.authenticate("login", {
    session: false,
    failurlRedirect: "/api/sessions/login",
  }),
  controller.login
);

router.post("/register", controller.register);

router.get(
  "/current",
  passport.authenticate("current",
  { session: false }),
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
