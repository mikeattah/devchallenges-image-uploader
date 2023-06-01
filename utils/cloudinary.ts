import { ImageFile } from "./validatefiletype";

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export function uploadImage(image: ImageFile) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      image,
      { width: 400, height: 300, crop: "fill" },
      (error, result) => {
        if (error) reject(error);
        resolve(result);
      }
    );
  });
}
