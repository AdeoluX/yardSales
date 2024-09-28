import { v2 as cloudinary } from "cloudinary";



// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
/**
 * Upload and optimize image using Cloudinary.
 * @param filePath - Path to the image file to upload
 * @returns - Cloudinary URL of the optimized image
 */
export const uploadImage = async (filePath: string, folder: string): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder, // Store images in the 'products' folder on Cloudinary
      transformation: [
        { width: 800, height: 800, crop: "limit" }, // Resize image
        { quality: "auto" }, // Automatically set quality
        { fetch_format: "auto" }, // Automatically convert format to webp or the best supported format
      ],
    });
    return result.secure_url; // Return the optimized image URL
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image");
  }
};
