import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../config/env";


export interface AuthRequest extends Request {
  userId?: number;
}

export const authenticate = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        const token = authHeader.split(" ")[1];

        if(!token) {
            return res.status(401).json({
                success: false,
                message: "Invalid authorization header"
            });
        }

        const decoded = jwt.verify(
            token,
            env.jwtSecret
        ) as { userId: number };

        req.userId = decoded.userId
        next();
    } catch(error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        })
    }
}

