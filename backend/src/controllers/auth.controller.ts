import { Request, Response } from "express";
import {
    registerUser,
    loginUser
} from "../services/auth.service";

export const register = async (
    req: Request,
    res: Response
) => {
    try{
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;

        if(!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const result = await registerUser(
            firstName,
            lastName,
            email,
            password
        )

        return res.status(201).json({
            success: true,
            data: result
        });
    } catch (error) {
        return res.status(400).json({
        success: false,
        message:
            error instanceof Error
            ? error.message
            : "Registration failed",
        });
    }
};

export const login = async (
    req: Request,
    res: Response
) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const result = await loginUser(email, password);

        return res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 
                error instanceof Error
                   ? error.message
                   : "Login failed"
        });
    };
};