
import { NextResponse } from "next/server";

import Notice from "@/models/Notice";
import { connectDB } from "@/lib/mongodb";
import { getAuthenticatedUser } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";

export async function DELETE(request, { params }) {
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

        // Next.js App Router
        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { message: "Notice ID is required" },
                { status: 400 }
            );
        }

        // Find notice
        const notice = await Notice.findById(id);

        if (!notice) {
            return NextResponse.json(
                { message: "Notice not found" },
                { status: 404 }
            );
        }

        // Delete image from Cloudinary if it exists
        if (notice.image) {
            try {
                const imageUrl = notice.image;

                const uploadIndex = imageUrl.indexOf("/upload/");

                if (uploadIndex !== -1) {
                    let publicId = imageUrl.substring(
                        uploadIndex + "/upload/".length
                    );

                    // Remove Cloudinary version
                    publicId = publicId.replace(/^v\d+\//, "");

                    // Remove file extension
                    publicId = publicId.replace(/\.[^/.]+$/, "");

                    await cloudinary.uploader.destroy(publicId);
                }
            } catch (cloudinaryError) {
                console.error(
                    "Cloudinary delete error:",
                    cloudinaryError
                );
            }
        }

        // Delete MongoDB document
        await Notice.findByIdAndDelete(id);

        return NextResponse.json({
            message: "Notice deleted successfully",
        });

    } catch (error) {
        console.error("Delete notice error:", error);

        return NextResponse.json(
            { message: "Failed to delete notice" },
            { status: 500 }
        );
    }
}