import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";

import {
  createSavedJob,
  getSavedJobs,
  getSavedJobById,
  updateSavedJob,
  deleteSavedJob,
} from "../services/saved-job.service";

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

    const {
      companyId,
      title,
      description,
      url,
      location,
      employmentType,
      experienceLevel,
      salaryMin,
      salaryMax,
      source,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Job title is required",
      });
    }

    const savedJob = await createSavedJob(
      req.userId,
      {
        companyId: companyId
          ? Number(companyId)
          : undefined,
        title,
        description,
        url,
        location,
        employmentType,
        experienceLevel,
        salaryMin,
        salaryMax,
        source,
      }
    );

    return res.status(201).json({
      success: true,
      data: savedJob,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to save job",
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

    const savedJobs = await getSavedJobs(
      req.userId
    );

    return res.status(200).json({
      success: true,
      data: savedJobs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch saved jobs",
    });
  }
};

export const getOne = async (
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

    const savedJobId = Number(req.params.id);

    if (Number.isNaN(savedJobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid saved job ID",
      });
    }

    const savedJob = await getSavedJobById(
      req.userId,
      savedJobId
    );

    return res.status(200).json({
      success: true,
      data: savedJob,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Saved job not found",
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

    const savedJobId = Number(req.params.id);

    if (Number.isNaN(savedJobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid saved job ID",
      });
    }

    const savedJob = await updateSavedJob(
      req.userId,
      savedJobId,
      req.body
    );

    return res.status(200).json({
      success: true,
      data: savedJob,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update saved job",
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

    const savedJobId = Number(req.params.id);

    if (Number.isNaN(savedJobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid saved job ID",
      });
    }

    await deleteSavedJob(
      req.userId,
      savedJobId
    );

    return res.status(200).json({
      success: true,
      message: "Saved job deleted successfully",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete saved job",
    });
  }
};