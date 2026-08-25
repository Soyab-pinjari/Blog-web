const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  console.log("FILE FILTER HIT");

  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(
      new Error("Only image files are allowed"),
      false
    );
  }
};

const options = {
  storage,
  fileFilter,
  limits: {
    fileSize: 3 * 1024 * 1024,
  },
};

const profileUpload = multer(options);
const bannerUpload = multer(options);
const blogUpload = multer(options);

module.exports = {
  profileUpload,
  blogUpload,
  bannerUpload,
};