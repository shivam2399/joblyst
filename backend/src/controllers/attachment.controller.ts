import { Response } from "express";

import {
  AuthRequest,
} from "../middleware/auth.middleware";

import {
  createAttachment,
  getAttachments,
  deleteAttachment,
} from "../services/attachment.service";

export const upload = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const applicationId = Number(req.params.applicationId);

    if (!Number.isInteger(applicationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required",
      });
    }

    const attachment = await createAttachment(
      req.userId,
      applicationId,
      req.file
    );

    return res.status(201).json({
      success: true,
      message: "Attachment uploaded successfully",
      data: attachment,
    });
  } catch (error) {
    console.error("Upload attachment error:", error);

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to upload attachment",
    });
  }
};

export const getAll = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const applicationId = Number(req.params.applicationId);

    if (!Number.isInteger(applicationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID",
      });
    }

    const attachments = await getAttachments(
      req.userId,
      applicationId
    );

    return res.status(200).json({
      success: true,
      data: attachments,
    });
  } catch (error) {
    console.error("Get attachments error:", error);

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch attachments",
    });
  }
};

export const remove = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const attachmentId = Number(req.params.id);

    if (!Number.isInteger(attachmentId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid attachment ID",
      });
    }

    await deleteAttachment(
      req.userId,
      attachmentId
    );

    return res.status(200).json({
      success: true,
      message: "Attachment deleted successfully",
    });
  } catch (error) {
    console.error("Delete attachment error:", error);

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete attachment",
    });
  }
};