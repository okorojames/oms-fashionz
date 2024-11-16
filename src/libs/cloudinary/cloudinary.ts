import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  api_key: process.env.CLOUDINARY_KEY,
  cloud_name: process.env.CLOUDINARY_NAME,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadToCloud = async (file: File, folder: string) => {
  try {
    // convert the file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64String = buffer.toString("base64");
    const url = `data:${file.type};base64,${base64String}`;
    // upload to cloudinary
    const result = await cloudinary.uploader.upload(url, {
      folder,
      transformation: {
        width: 850,
        height: 650,
        crop: "fill",
        quality: 95,
      },
    });
    return {
      url: result?.secure_url,
      id: result?.public_id,
    };
  } catch (error) {
    throw error;
  }
};

export default uploadToCloud;
