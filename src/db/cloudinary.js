import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

// Конфігурація Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Функція завантаження
export const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'toolnext',
        transformation: [{ width: 1000, crop: 'limit' }],
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};
