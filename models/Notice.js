

import mongoose from "mongoose"

const NoticeSchema = new mongoose.Schema(
    {
        title: String,
        text: String,
        image: String,
        isPriority: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

export default mongoose.models.Notice || mongoose.model("Notice", NoticeSchema);
