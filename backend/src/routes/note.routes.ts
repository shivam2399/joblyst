import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";

import {
  create,
  getAll,
  update,
  remove,
} from "../controllers/note.controller";

const router = Router();

router.use(authenticate);

router.post(
  "/applications/:applicationId/notes",
  create
);

router.get(
  "/applications/:applicationId/notes",
  getAll
);

router.patch(
  "/notes/:id",
  update
);

router.delete(
  "/notes/:id",
  remove
);

export default router;