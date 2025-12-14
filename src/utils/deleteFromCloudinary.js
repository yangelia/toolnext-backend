import { cloudinary } from '../config/cloudinary.js';

export const deleteFromCloudinary = async (publicId) => {
  const result = await cloudinary.uploader.destroy(publicId, {
    invalidate: true,
  });

  if (result?.result !== 'ok' && result?.result !== 'not found') {
    const err = new Error(
      `Cloudinary destroy failed for ${publicId}: ${result?.result}`,
    );
    err.status = 502;
    throw err;
  }
  return result;
};
