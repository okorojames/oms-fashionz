import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  api_key: process.env.CLOUDINARY_KEY,
  cloud_name: process.env.CLOUDINARY_NAME,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const deleteUploadedFiles = async (files: { id: string }[]) => {
  try {
    const deletePromises = files.map((file) =>
      cloudinary.uploader.destroy(file.id)
    );

    await Promise.all(deletePromises);
  } catch (error) {
    throw error;
  }
};

export default deleteUploadedFiles;
