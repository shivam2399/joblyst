import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";

import {
  upload,
  getAll,
  remove,
} from "../controllers/attachment.controller";

import {
  upload as uploadMiddleware,
} from "../middleware/upload.middleware";

const router = Router();

router.use(authenticate);

router.post(
  "/applications/:applicationId/attachments",
  uploadMiddleware.single("file"),
  upload
);

router.get(
  "/applications/:applicationId/attachments",
  getAll
);

router.delete(
  "/attachments/:id",
  remove
);

export default router;