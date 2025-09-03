//backend/controllers/uploadController.js

/* import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import Image from "../models/Image.js";
import uploadDir from "../config/uploadDir.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const uploadPicture = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    
    const imageDoc = new Image({
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: `/uploads/${req.file.filename}`,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });

    await imageDoc.save();

    res.json(imageDoc);
  } catch (err) {
    console.error("Error saving image document:", err);
    res.status(500).json({ message: "Failed to save image info" });
  }
};

export const listPictures = async (req, res) => {
  try {
    
    
    const images = await Image.find({ deleted: false })
      .sort({ uploadedAt: -1 })
      .select("-__v")
      .lean();
    res.json(images);
  } catch (err) {
    console.error("Error listing images:", err);
    res.status(500).json({ message: "Failed to list images" });
  }
};

export const deletePicture = async (req, res) => {
  const { imageName } = req.params;

  try {
  
    const image = await Image.findOne({ filename: imageName });

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    
    image.deleted = true;
    await image.save();

  

    res.json({ message: "Image soft deleted" });
  } catch (err) {
    console.error("Error deleting image:", err);
    res.status(500).json({ message: "Failed to delete image" });
  }
};

export const listDeletedPictures = async (req, res) => {
  try {
    const images = await Image.find({ deleted: true })
      .sort({ uploadedAt: -1 })
      .select("-__v")
      .lean();
    res.json(images);
  } catch (err) {
    console.error("Error listing deleted images:", err);
    res.status(500).json({ message: "Failed to list deleted images" });
  }
};


export const restorePicture = async (req, res) => {
  const { imageName } = req.params;
  try {
    const image = await Image.findOne({ filename: imageName, deleted: true });
    if (!image) {
      return res.status(404).json({ message: "Deleted image not found" });
    }
    image.deleted = false;
    await image.save();
    res.json({ message: "Image restored" });
  } catch (err) {
    console.error("Error restoring image:", err);
    res.status(500).json({ message: "Failed to restore image" });
  }
};


export const hardDeletePicture = async (req, res) => {
  const { imageName } = req.params;
  try {
    const image = await Image.findOne({ filename: imageName });
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

   
    const filepath = path.join(uploadDir, imageName);
   
    fs.unlink(filepath, (err) => {
      if (err) console.error("Failed to delete file from disk:", err);
    });

    
    await Image.deleteOne({ filename: imageName });

    res.json({ message: "Image permanently deleted" });
  } catch (err) {
    console.error("Error hard deleting image:", err);
    res.status(500).json({ message: "Failed to permanently delete image" });
  }
};
 */

// backend/controllers/uploadController.js

import Image from "../models/Image.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

// Upload picture to Cloudinary

export const uploadPicture = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const uploadToCloudinary = (fileBuffer) =>
      new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "blog-project" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(uploadStream);
      });

    const result = await uploadToCloudinary(req.file.buffer);
    const uniqueFilename = `${Date.now()}-${req.file.originalname}`;

    const imageDoc = new Image({
      filename: uniqueFilename,
      originalName: req.file.originalname,
      path: "", // empty for Cloudinary
      mimetype: req.file.mimetype,
      size: req.file.size,
      url: result.secure_url,
      public_id: result.public_id,
    });

    await imageDoc.save();

    res.json(imageDoc);
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    res.status(500).json({
      message: "Failed to upload image",
      error: err.message, // <-- expose actual error for debugging
    });
  }
};

/* export const uploadPicture = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    // Upload buffer to Cloudinary using upload_stream
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "blog-project" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    });

    // Save Cloudinary info in MongoDB
    const imageDoc = new Image({
      originalName: req.file.originalname,
      url: result.secure_url,
      public_id: result.public_id,
    });

    await imageDoc.save();
    res.json(imageDoc);
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    res.status(500).json({ message: "Failed to upload image" });
  }
}; */

// List all images not deleted
export const listPictures = async (req, res) => {
  try {
    const images = await Image.find({ deleted: false })
      .sort({ uploadedAt: -1 })
      .select("-__v")
      .lean();
    res.json(images);
  } catch (err) {
    console.error("Error listing images:", err);
    res.status(500).json({ message: "Failed to list images" });
  }
};

// Soft delete image

// Soft delete by ID
export const deletePicture = async (req, res) => {
  const { id } = req.params;

  try {
    const image = await Image.findById(id);
    if (!image) return res.status(404).json({ message: "Image not found" });

    image.deleted = true;
    await image.save();

    res.json({ message: "Image soft deleted" });
  } catch (err) {
    console.error("Error soft deleting image:", err);
    res.status(500).json({ message: "Failed to delete image" });
  }
};

/* export const deletePicture = async (req, res) => {
  const { imageName } = req.params;

  try {
    const image = await Image.findOne({ originalName: imageName });
    if (!image) return res.status(404).json({ message: "Image not found" });

    image.deleted = true;
    await image.save();

    res.json({ message: "Image soft deleted" });
  } catch (err) {
    console.error("Error soft deleting image:", err);
    res.status(500).json({ message: "Failed to delete image" });
  }
}; */

// List deleted images
export const listDeletedPictures = async (req, res) => {
  try {
    const images = await Image.find({ deleted: true })
      .sort({ uploadedAt: -1 })
      .select("-__v")
      .lean();
    res.json(images);
  } catch (err) {
    console.error("Error listing deleted images:", err);
    res.status(500).json({ message: "Failed to list deleted images" });
  }
};

// Restore soft-deleted image

export const restorePicture = async (req, res) => {
  const { id } = req.params;

  try {
    const image = await Image.findOne({ _id: id, deleted: true });
    if (!image)
      return res.status(404).json({ message: "Deleted image not found" });

    image.deleted = false;
    await image.save();

    res.json({ message: "Image restored" });
  } catch (err) {
    console.error("Error restoring image:", err);
    res.status(500).json({ message: "Failed to restore image" });
  }
};
/* export const restorePicture = async (req, res) => {
  const { imageName } = req.params;

  try {
    const image = await Image.findOne({
      originalName: imageName,
      deleted: true,
    });
    if (!image)
      return res.status(404).json({ message: "Deleted image not found" });

    image.deleted = false;
    await image.save();

    res.json({ message: "Image restored" });
  } catch (err) {
    console.error("Error restoring image:", err);
    res.status(500).json({ message: "Failed to restore image" });
  }
}; */

// Hard delete image from Cloudinary and MongoDB
export const hardDeletePicture = async (req, res) => {
  const { id } = req.params;

  try {
    const image = await Image.findById(id);
    if (!image) return res.status(404).json({ message: "Image not found" });

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(image.public_id);

    // Remove from MongoDB
    await Image.deleteOne({ _id: id });

    res.json({ message: "Image permanently deleted" });
  } catch (err) {
    console.error("Error hard deleting image:", err);
    res.status(500).json({ message: "Failed to permanently delete image" });
  }
};
