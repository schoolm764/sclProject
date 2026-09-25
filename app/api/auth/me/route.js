
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";

export async function GET(request) {
    try {
        // 1. Get the token from the cookies
        const token = request.cookies.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized: No token provided" },
                { status: 401 }
            );
        }

        // 2. Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Connect to the database and find the user (excluding password)
        await connectDB();
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        // 4. Return the user data
        return NextResponse.json({
            success: true,
            user,
            role: "admin"
        });

    } catch (error) {
        console.error("Auth check error:", error);

        return NextResponse.json(
            { message: "Invalid or expired token" },
            { status: 401 }
        );
    }
}