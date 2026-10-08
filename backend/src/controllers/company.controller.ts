import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";

import {
    createCompany,
    getCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany
} from "../services/company.service";

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
        name,
        website,
        industry,
        companySize,
        location,
        contactName,
        contactEmail,
        contactPhone,
        notes,
        } = req.body;

        if (!name) {
        return res.status(400).json({
            success: false,
            message: "Company name is required",
        });
        }

        const company = await createCompany(req.userId, {
        name,
        website,
        industry,
        companySize,
        location,
        contactName,
        contactEmail,
        contactPhone,
        notes,
        });

        return res.status(201).json({
        success: true,
        data: company,
        });
    } catch(error) {
        return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create company",
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

    const companies = await getCompanies(req.userId);

    return res.status(200).json({
      success: true,
      data: companies,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch companies",
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

    const companyId = Number(req.params.id);

    if (Number.isNaN(companyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid company ID",
      });
    }

    const company = await getCompanyById(
      req.userId,
      companyId
    );

    return res.status(200).json({
      success: true,
      data: company,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Company not found",
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

    const companyId = Number(req.params.id);

    if (Number.isNaN(companyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid company ID",
      });
    }

    const {
      name,
      website,
      industry,
      companySize,
      location,
      contactName,
      contactEmail,
      contactPhone,
      notes,
    } = req.body;

    const company = await updateCompany(
      req.userId,
      companyId,
      {
        name,
        website,
        industry,
        companySize,
        location,
        contactName,
        contactEmail,
        contactPhone,
        notes,
      }
    );

    return res.status(200).json({
      success: true,
      data: company,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update company",
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

    const companyId = Number(req.params.id);

    if (Number.isNaN(companyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid company ID",
      });
    }

    await deleteCompany(
      req.userId,
      companyId
    );

    return res.status(200).json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete company",
    });
  }
};

