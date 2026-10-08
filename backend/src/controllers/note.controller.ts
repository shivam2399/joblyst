import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";

import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} from "../services/note.service";

export const create = async (
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

    const applicationId = Number(
      req.params.applicationId
    );

    if (Number.isNaN(applicationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID",
      });
    }

    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: "Note content is required",
      });
    }

    const note = await createNote(
      req.userId,
      applicationId,
      content
    );

    return res.status(201).json({
      success: true,
      data: note,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create note",
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

    const applicationId = Number(
      req.params.applicationId
    );

    if (Number.isNaN(applicationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID",
      });
    }

    const notes = await getNotes(
      req.userId,
      applicationId
    );

    return res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch notes",
    });
  }
};

export const update = async (
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

    const noteId = Number(req.params.id);

    if (Number.isNaN(noteId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
      });
    }

    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: "Note content is required",
      });
    }

    const note = await updateNote(
      req.userId,
      noteId,
      content
    );

    return res.status(200).json({
      success: true,
      data: note,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update note",
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

    const noteId = Number(req.params.id);

    if (Number.isNaN(noteId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
      });
    }

    await deleteNote(
      req.userId,
      noteId
    );

    return res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete note",
    });
  }
};