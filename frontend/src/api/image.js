import axios from 'axios';
const CLOUDINARY_UPLOAD_TRANSFORM_PRESET = 'dfnrvqvx'; // img transformed to 200x200
const CLOUDINARY_UPLOAD_PRESET = 'nlczu2np';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/rengorum/upload';

export const imageUploadApi = (file, transform = true) => {
  const formData = new FormData();
  formData.append('file', file);
  const upload_preset = transform
    ? CLOUDINARY_UPLOAD_TRANSFORM_PRESET
    : CLOUDINARY_UPLOAD_PRESET;
  formData.append('upload_preset', upload_preset);
  return axios.post(CLOUDINARY_UPLOAD_URL, formData, null);
};
