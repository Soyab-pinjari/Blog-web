const cloudinary = require("cloudinary").v2;

console.log("Cloudinary configured:",{
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRATE,
});

module.exports = cloudinary;