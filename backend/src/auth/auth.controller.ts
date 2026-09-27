import type { Request, Response } from "express";
import { addPatient, addUser, findUserByEmail } from "../data";
import type { Patient, User } from "../models";
import { generateToken, generateUserId, tokens } from "./auth";

export function loginHandler(req: Request, res: Response) {
    const { email, password } = req.body ?? {};

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    const user = findUserByEmail(email);

    if (!user || user.password !== password) {
        return res.status(401).json({ error: "Incorrect email or password" });
    }

    const token = generateToken();
    tokens.set(token, { userId: user.id });

    return res.json({
        token,
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        },
    });
}

export function logoutHandler(req: Request, res: Response) {
    const authHeader = req.header("authorization");

    if (authHeader?.startsWith("Bearer ")) {
        const token = authHeader.slice("Bearer ".length);
        tokens.delete(token);
    }

    return res.status(204).end();
}

export function registerHandler(req: Request, res: Response) {
    const { email, password, firstName, lastName, confirmPassword } = req.body ?? {};

    if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({
            error: "Email, password, name and surname are required",
        });
    }

    if (findUserByEmail(email)) {
        return res.status(409).json({
            error: "User with this email address already exists",
        });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({
            error: "Incorrect email address format",
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            error: "Password must be at least 6 characters long",
        });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({
            error: "Passwords must match",
        });
    }

    const patientId = generateUserId();

    const newUser: User = {
        id: `u-${generateUserId()}`,
        email,
        password,
        firstName,
        lastName,
        patientId,
    };

    const newPatient: Patient = {
        id: patientId,
        name: `${newUser.firstName} ${newUser.lastName}`,
    };

    addUser(newUser);
    addPatient(newPatient);

    const token = generateToken();
    tokens.set(token, { userId: newUser.id });

    return res.status(201).json({
        token,
        user: {
            id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
        },
    });
}