import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { User, Profile } from "../models";
import env from "../config/env";

const generateToken = (userId: number)  => {
    const options: SignOptions = {
        expiresIn: "1d"
    } 
    return jwt.sign(
        {
            userId,
        },
        env.jwtSecret,
        options
    );
};

export const registerUser = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
) => {
    const existingUser = await User.findOne({
        where: { email },
    })

    if(existingUser) {
        throw new Error("User with this email already exists");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
        firstName,
        lastName,
        email,
        passwordHash
    });

    await Profile.create({
        userId: user.id
    });

    const token = generateToken(user.id);

    return {
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        },
        token
    }
};

export const loginUser = async(
    email: string,
    password: string
) => {
    const user = await User.findOne({
        where: { email },
    })
    if(!user) {
        throw new Error("Invalid email or password");
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if(!passwordMatch) {
        throw new Error("Invalid email or password");
    }

    const token = generateToken(user.id);

    return {
        user:{
            id: user.id,
            firtName: user.firstName,
            lastName: user.lastName,
            email: user.email
        },
        token,
    };
};

