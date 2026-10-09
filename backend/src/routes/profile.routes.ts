import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";

import {
  get,
  update,
} from "../controllers/profile.controller";

const router = Router();

router.use(authenticate);

router.get("/", get);
router.patch("/", update);

export default router;