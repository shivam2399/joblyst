import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";

import {
  getProfile,
  updateProfile,
} from "../services/profile.service";

export const get = async (
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

    const profile = await getProfile(req.userId);

    return res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Profile not found",
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

    const {
      phone,
      location,
      linkedinUrl,
      githubUrl,
      portfolioUrl,
      headline,
      careerGoal,
    } = req.body;

    const profile = await updateProfile(
      req.userId,
      {
        phone,
        location,
        linkedinUrl,
        githubUrl,
        portfolioUrl,
        headline,
        careerGoal,
      }
    );

    return res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update profile",
    });
  }
};