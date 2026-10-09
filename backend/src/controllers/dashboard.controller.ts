import { Response } from "express";

import {
  AuthRequest,
} from "../middleware/auth.middleware";

import {
  getDashboardStats,
} from "../services/dashboard.service";

export const getStats = async (
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

    const stats = await getDashboardStats(req.userId);

    return res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch dashboard statistics",
    });
  }
};