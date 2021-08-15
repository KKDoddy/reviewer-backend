import dotenv from 'dotenv';
import { v2 } from 'cloudinary';

dotenv.config();

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary = async (image) => {
    try {
      const result = await v2.uploader.upload(image.path);
      const { url } = result;
      return url;
    } catch (error) {
      const customError = `${error} '${image.originalFilename}'`;
      throw customError;
    }
  };
  
export  { uploadToCloudinary };
  

