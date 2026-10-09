import fs from "fs/promises";

import {
  Application,
  Attachment,
} from "../models";

export const createAttachment = async (
  userId: number,
  applicationId: number,
  file: Express.Multer.File
) => {
  const application = await Application.findOne({
    where: {
      id: applicationId,
      userId,
    },
  });

  if (!application) {
    throw new Error("Application not found");
  }

  const attachment = await Attachment.create({
    userId,
    applicationId,
    fileName: file.originalname,
    fileType: file.mimetype,
    fileSize: file.size,
    storagePath: file.path,
  });

  return attachment;
};

export const getAttachments = async (
  userId: number,
  applicationId: number
) => {
  const application = await Application.findOne({
    where: {
      id: applicationId,
      userId,
    },
  });

  if (!application) {
    throw new Error("Application not found");
  }

  return Attachment.findAll({
    where: {
      userId,
      applicationId,
    },
    order: [["createdAt", "DESC"]],
  });
};

export const deleteAttachment = async (
  userId: number,
  attachmentId: number
) => {
  const attachment = await Attachment.findOne({
    where: {
      id: attachmentId,
      userId,
    },
  });

  if (!attachment) {
    throw new Error("Attachment not found");
  }

  try {
    await fs.unlink(attachment.storagePath);
  } catch {
    // File may already be missing.
  }

  await attachment.destroy();

  return true;
};