//backend/models/image.js

/* import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  filename: { type: String, required: true, unique: true }, 
  originalName: { type: String }, 
  path: { type: String, required: true }, 
  mimetype: { type: String },
  size: { type: Number },
  uploadedAt: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false }, 
});

const Image = mongoose.model("Image", imageSchema);
export default Image; */
//backend/models/image.js
import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  filename: { type: String, unique: true, sparse: true }, // optional, keep old unique index safe
  originalName: { type: String }, // original filename from user upload
  path: { type: String }, // for legacy /uploads path; optional now
  mimetype: { type: String }, // optional
  size: { type: Number }, // optional
  url: { type: String, required: true }, // Cloudinary URL
  public_id: { type: String, required: true }, // Cloudinary ID
  uploadedAt: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false }, // soft delete
});

const Image = mongoose.model("Image", imageSchema);
export default Image;
