// Require the Cloudinary library
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'YOUR_CLOUDINARY_CLOUD_NAME',
    api_key: 'YOUR_CLOUDINARY_API_KEY',
    api_secret: 'YOUR_CLOUDINARY_API_SECRET',
  });
  export const cloud=cloudinary  