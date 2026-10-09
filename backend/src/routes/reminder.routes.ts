import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";

import {
  create,
  getAll,
  update,
  remove,
} from "../controllers/reminder.controller";

const router = Router();

router.use(authenticate);

router.post(
  "/applications/:applicationId/reminders",
  create
);

router.get(
  "/applications/:applicationId/reminders",
  getAll
);

router.patch(
  "/reminders/:id",
  update
);

router.delete(
  "/reminders/:id",
  remove
);

export default router;