
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Notice from "@/models/Notice"; // Adjust path to your Notice model

export async function GET() {
    try {
        // Connect to database if not already connected
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(process.env.MONGODB_URI);
        }

        // Find the latest priority notice
        const priorityNotice = await Notice.findOne({ isPriority: true })
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json(priorityNotice || null, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch priority notice" }, { status: 500 });
    }
}