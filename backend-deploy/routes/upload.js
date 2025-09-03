// backend/routes/upload.js
/* 
import express from "express";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";
import uploadMiddleware from "../middleware/uploadMiddleware.js";
import {
  uploadPicture,
  listPictures,
  deletePicture,
  listDeletedPictures,
  restorePicture,
  hardDeletePicture,
} from "../controllers/uploadController.js";

const router = express.Router();



router.post(
  "/images",
  verifyToken,
  requireRole("admin"),
  (req, res, next) => {
    uploadMiddleware.single("image")(req, res, (err) => {
      if (err) {
        console.error("Multer error:", err);
        
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  },
  uploadPicture
);

router.get("/images/bin", listDeletedPictures); 

router.get("/images", listPictures); 
router.patch("/images/restore/:imageName", restorePicture); 
router.delete("/images/hard/:imageName", hardDeletePicture); 

router.delete("/images/:imageName", deletePicture); 

export default router; */

// backend/routes/upload.js

import express from "express";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";
import uploadMiddleware from "../middleware/uploadMiddleware.js";
import {
  uploadPicture,
  listPictures,
  deletePicture,
  listDeletedPictures,
  restorePicture,
  hardDeletePicture,
} from "../controllers/uploadController.js";

const router = express.Router();

// -----------------------------
// Upload image (admin only)
// -----------------------------
router.post(
  "/images",
  verifyToken,
  requireRole("admin"),
  (req, res, next) => {
    // Multer memory storage
    uploadMiddleware.single("image")(req, res, (err) => {
      if (err) {
        console.error("Multer error:", err);
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  },
  uploadPicture
);

// -----------------------------
// List images
// -----------------------------
router.get("/images", listPictures); // Active images
router.get("/images/bin", listDeletedPictures); // Soft-deleted images

// -----------------------------
// Restore soft-deleted image
// -----------------------------
router.patch("/images/restore/:imageName", restorePicture);

// -----------------------------
// Delete images
// -----------------------------
router.delete("/images/:imageName", deletePicture); // Soft delete
router.delete("/images/hard/:imageName", hardDeletePicture); // Hard delete

export default router;
