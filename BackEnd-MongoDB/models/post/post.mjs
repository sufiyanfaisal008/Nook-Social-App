import mongoose from "mongoose";

const postschema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String, 
        required: true,
        trim: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Nook-Users",
    }

}, { timestamps: true })

export const postmodel = mongoose.model("Nook-Social", postschema)