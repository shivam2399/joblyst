import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";

import {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
} from "../services/application.service";

import {
  ApplicationPriority,
  ApplicationStatus,
} from "../models/Application";

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
      jobTitle,
      jobUrl,
      applicationDate,
      status,
      priority,
      location,
      employmentType,
      salaryMin,
      salaryMax,
      salaryCurrency,
      source,
    } = req.body;

    if (!companyId || !jobTitle) {
      return res.status(400).json({
        success: false,
        message: "companyId and jobTitle are required",
      });
    }

    const application = await createApplication(
      req.userId,
      {
        companyId: Number(companyId),
        jobTitle,
        jobUrl,
        applicationDate: applicationDate
          ? new Date(applicationDate)
          : undefined,
        status,
        priority,
        location,
        employmentType,
        salaryMin,
        salaryMax,
        salaryCurrency,
        source,
      }
    );

    return res.status(201).json({
      success: true,
      data: application,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create application",
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

    const search =
      typeof req.query.search === "string"
        ? req.query.search
        : undefined;

    const status =
      typeof req.query.status === "string"
        ? req.query.status as ApplicationStatus
        : undefined;

    const priority =
      typeof req.query.priority === "string"
        ? req.query.priority as ApplicationPriority
        : undefined;

    const page =
      typeof req.query.page === "string"
        ? Math.max(Number(req.query.page), 1)
        : 1;

    const limit =
      typeof req.query.limit === "string"
        ? Math.min(
            Math.max(Number(req.query.limit), 1),
            100
          )
        : 10;

    const sortBy =
      typeof req.query.sortBy === "string"
        ? req.query.sortBy
        : "createdAt";

    const sortOrder =
      req.query.sortOrder === "ASC"
        ? "ASC"
        : "DESC";

    const fromDate =
      typeof req.query.fromDate === "string"
        ? new Date(req.query.fromDate)
        : undefined;

    const toDate =
      typeof req.query.toDate === "string"
        ? new Date(req.query.toDate)
        : undefined;

    const result = await getApplications(
      req.userId,
      {
        search,
        status,
        priority,
        fromDate,
        toDate,
        page,
        limit,
        sortBy,
        sortOrder,
      }
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch applications",
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

    const applicationId = Number(req.params.id);

    if (Number.isNaN(applicationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID",
      });
    }

    const application = await getApplicationById(
      req.userId,
      applicationId
    );

    return res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Application not found",
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

    const applicationId = Number(req.params.id);

    if (Number.isNaN(applicationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID",
      });
    }

    const {
      companyId,
      jobTitle,
      jobUrl,
      applicationDate,
      status,
      priority,
      location,
      employmentType,
      salaryMin,
      salaryMax,
      salaryCurrency,
      source,
    } = req.body;

    const application = await updateApplication(
      req.userId,
      applicationId,
      {
        companyId: companyId
          ? Number(companyId)
          : undefined,
        jobTitle,
        jobUrl,
        applicationDate: applicationDate
          ? new Date(applicationDate)
          : undefined,
        status,
        priority,
        location,
        employmentType,
        salaryMin,
        salaryMax,
        salaryCurrency,
        source,
      }
    );

    return res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update application",
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

    const applicationId = Number(req.params.id);

    if (Number.isNaN(applicationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID",
      });
    }

    await deleteApplication(
      req.userId,
      applicationId
    );

    return res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete application",
    });
  }
};