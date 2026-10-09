import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";

import {
  getStats,
} from "../controllers/dashboard.controller";

const router = Router();

router.use(authenticate);

router.get("/stats", getStats);

export default router;