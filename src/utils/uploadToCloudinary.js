import cloudinary from "../config/cloudinary.js";

export const uploadBuffer = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      { folder: "products" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    upload.end(fileBuffer);
  });
};
