import { v2 as cloudinary } from "cloudinary";
import type { UploadApiResponse, DeleteApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});

export { UploadApiResponse, DeleteApiResponse };

export function uploadImage(image: string) {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    tags: "",
    width: 400,
    height: 300,
    gavity: "auto",
    crop: "fill",
    format: "jpg",
  };

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, options, (error, data) => {
      if (error) reject(error);
      resolve(data);
    });
  });
}

export function deleteImage(id: string) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(
      id,
      { resource_type: "image" },
      (error, result) => {
        if (error) reject(error);
        resolve(result);
      }
    );
  });
}
