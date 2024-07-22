import { Router } from "express";
import * as service from "../services/user.services.js";

const router = Router();


router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await service.findUserById(id).populate("role");;
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener el usuario", details: error.message });
  }
});

export default router;