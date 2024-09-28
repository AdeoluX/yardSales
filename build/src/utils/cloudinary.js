"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const cloudinary_1 = require("cloudinary");
// Configure Cloudinary
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
/**
 * Upload and optimize image using Cloudinary.
 * @param filePath - Path to the image file to upload
 * @returns - Cloudinary URL of the optimized image
 */
const uploadImage = (filePath, folder) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cloudinary_1.v2.uploader.upload(filePath, {
            folder, // Store images in the 'products' folder on Cloudinary
            transformation: [
                { width: 800, height: 800, crop: "limit" }, // Resize image
                { quality: "auto" }, // Automatically set quality
                { fetch_format: "auto" }, // Automatically convert format to webp or the best supported format
            ],
        });
        return result.secure_url; // Return the optimized image URL
    }
    catch (error) {
        console.error("Error uploading image:", error);
        throw new Error("Failed to upload image");
    }
});
exports.uploadImage = uploadImage;
//# sourceMappingURL=cloudinary.js.map