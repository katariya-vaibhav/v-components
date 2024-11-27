import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  [key: string]: string | number | boolean | null;
}

export const uploadFileToCloudinary = async (
  file: string | Buffer,
  resourceType: "image" | "video" | "auto" = "auto",
  folder: string = "components"
): Promise<string> => {
  try {
    const uploadOptions = {
      folder,
      use_filename: true, // Retain the original filename
      resource_type: resourceType,
    };

    const result = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          uploadOptions,
          (error, result) => {
            if (error) reject(error);
            else resolve(result as CloudinaryUploadResult);
          }
        );

        // Pass the file (Buffer or string) to the upload stream
        if (typeof file === "string") {
          uploadStream.end(Buffer.from(file, "base64"));
        } else {
          uploadStream.end(file);
        }
      }
    );

    return result.secure_url;
  } catch (error) {
    console.error("Error uploading media to Cloudinary:", error);
    throw new Error("Media upload failed");
  }
};

export const deleteFileFromCloudinary = async (
  publicId: string,
  resourceType: "image" | "video" | "auto" = "auto"
): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
  } catch (error) {
    console.error("Error deleting media from Cloudinary:", error);
    throw new Error("Media deletion failed");
  }
};
