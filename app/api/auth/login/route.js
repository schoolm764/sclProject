
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";



export async function POST(request) {

    try {
        const { username, password } = await request.json();

        await connectDB();

        let user = await User.findOne({ username });

        // If the user doesn't exist in the database yet
        if (!user) {
            // Check if the input matches the fallback credentials in .env
            if (
                username === process.env.ADMIN_USERNAME &&
                password === process.env.ADMIN_PASSWORD
            ) {
                // Automatically hash the password and create the user data in DB
                const hashedPassword = await bcrypt.hash(password, 10);
                user = await User.create({
                    username,
                    password: hashedPassword,
                });
            } else {
                return NextResponse.json(
                    { message: "Invalid login" },
                    { status: 401 }
                );
            }
        } else {
            // If user exists, compare the password normally
            const valid = await bcrypt.compare(password, user.password);

            if (!valid) {
                return NextResponse.json(
                    { message: "Invalid login" },
                    { status: 401 }
                );
            }
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id.toString() },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );

        const response = NextResponse.json({
            message: "Login successful",
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
        });

        return response;

    } catch (error) {
        console.error("Login error:", error);

        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}