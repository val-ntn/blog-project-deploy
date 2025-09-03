//backend/models/image.js

import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  originalName: { type: String },
  url: { type: String, required: true }, // Cloudinary URL
  public_id: { type: String, required: true }, // Cloudinary ID for deletion
  uploadedAt: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false },
});

const Image = mongoose.model("Image", imageSchema);
export default Image;
