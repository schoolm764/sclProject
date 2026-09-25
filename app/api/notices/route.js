
import { NextResponse } from "next/server";

import Notice from "@/models/Notice";
import { connectDB } from "@/lib/mongodb";
import { getAuthenticatedUser } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";

// PUBLIC: Get notices
export async function GET() {
    try {
        await connectDB();

        const notices = await Notice.find()
            .sort({ createdAt: -1 });

        return NextResponse.json(notices);

    } catch (error) {
        console.error("Get notices error:", error);

        return NextResponse.json(
            { message: "Failed to get notices" },
            { status: 500 }
        );
    }
}


// ADMIN: Add notice
export async function POST(request) {
    try {
        // Check authentication
        const user = await getAuthenticatedUser();

        if (!user) {
            return NextResponse.json(
                { message: "Not authenticated" },
                { status: 401 }
            );
        }

        await connectDB();

        // Read multipart/form-data
        const formData = await request.formData();

        const title = formData.get("title");
        const text = formData.get("text");
        const image = formData.get("image");
        const isPriority = formData.get("isPriority");

        let imageUrl = "";

        // If an image was uploaded
        if (image && image instanceof File) {
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "school-notices",
                    },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );

                stream.end(buffer);
            });

            imageUrl = result.secure_url;
        }

        const notice = await Notice.create({
            title,
            text,
            image: imageUrl,
            isPriority
        });

        return NextResponse.json(notice, {
            status: 201,
        });

    } catch (error) {
        console.error("Create notice error:", error);

        return NextResponse.json(
            { message: "Failed to create notice" },
            { status: 500 }
        );
    }
}

