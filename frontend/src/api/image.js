import axios from 'axios';

const CLOUDINARY_UPLOAD_PRESET = 'dfnrvqvx';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/rengorum/upload';

export const imageUpload = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  return axios.post(CLOUDINARY_UPLOAD_URL, formData, null);
};
