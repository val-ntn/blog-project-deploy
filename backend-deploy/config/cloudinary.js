// backend/config/cloudinary.js

import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Uses CLOUDINARY_URL automatically if set
cloudinary.config();

export default cloudinary;
