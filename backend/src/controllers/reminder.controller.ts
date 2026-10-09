import { Response } from "express";

import { AuthRequest } from "../middleware/auth.middleware";

import {
  createReminder,
  getReminders,
  updateReminder,
  deleteReminder,
} from "../services/reminder.service";

import {
  ReminderStatus,
} from "../models/Reminder";

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

    const {
      title,
      description,
      reminderAt,
    } = req.body;

    if (!title || !reminderAt) {
      return res.status(400).json({
        success: false,
        message: "Title and reminderAt are required",
      });
    }

    const reminderDate = new Date(reminderAt);

    if (Number.isNaN(reminderDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid reminder date",
      });
    }

    const reminder = await createReminder(
      req.userId,
      applicationId,
      {
        title,
        description,
        reminderAt: reminderDate,
      }
    );

    return res.status(201).json({
      success: true,
      data: reminder,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create reminder",
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

    const reminders = await getReminders(
      req.userId,
      applicationId
    );

    return res.status(200).json({
      success: true,
      data: reminders,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch reminders",
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

    const reminderId = Number(req.params.id);

    if (Number.isNaN(reminderId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid reminder ID",
      });
    }

    const {
      title,
      description,
      reminderAt,
      status,
    } = req.body;

    let parsedReminderAt: Date | undefined;

    if (reminderAt) {
      parsedReminderAt = new Date(reminderAt);

      if (Number.isNaN(parsedReminderAt.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid reminder date",
        });
      }
    }

    const reminder = await updateReminder(
      req.userId,
      reminderId,
      {
        title,
        description,
        reminderAt: parsedReminderAt,
        status,
      }
    );

    return res.status(200).json({
      success: true,
      data: reminder,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update reminder",
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

    const reminderId = Number(req.params.id);

    if (Number.isNaN(reminderId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid reminder ID",
      });
    }

    await deleteReminder(
      req.userId,
      reminderId
    );

    return res.status(200).json({
      success: true,
      message: "Reminder deleted successfully",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete reminder",
    });
  }
};