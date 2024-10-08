const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1920 * 1920;

const createUploadMiddleware = (uploadDir) => {
  let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const __dirname = 'C:\\Users\\gossi\\OneDrive\\Documents\\project\\Project-Random-fiction\\front-app-v3\\public\\images\\';
      const destinationPath = `${__dirname}${uploadDir}`;
      console.log('Upload directory:', destinationPath);
      cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload only images.'), false);
    }
  };

  return multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: maxSize },
  })
};

module.exports = createUploadMiddleware;
