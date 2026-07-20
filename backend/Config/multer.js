const multer = require("multer");
const path = require("path");
const fs = require("fs");

const createStorage = (folder) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
    

      const dir = path.join(
        __dirname,
        `../uploads/${folder}`
      );

      fs.mkdirSync(dir, {
        recursive: true
      });

      cb(null, dir);
    },

    filename: (req, file, cb) => {
      console.log("FILE NAME HIT");

      const ext = path.extname(file.originalname);

      const filename = req.body.slug
        ? `${req.body.slug}${ext}`
        : `${Date.now()}${ext}`;

      cb(null, filename);
    },
  });
};

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
  fileFilter,
  limits: {
    fileSize: 3 * 1024 * 1024,
  },
};

const profileUpload = multer({
  ...options,
  storage: createStorage("profiles/profile-Images"),
});
const bannerUpload = multer({
  ...options,
  storage: createStorage("profiles/banner"),
});
const blogUpload = multer({
  ...options,
  storage: createStorage("blogs"),
});

module.exports = {
  profileUpload,
  blogUpload,
  bannerUpload
};