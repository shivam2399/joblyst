import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "../controllers/application.controller";

const router = Router();

router.use(authenticate);

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getOne);
router.patch("/:id", update);
router.delete("/:id", remove);

export default router;