const multer = require('multer');
const path = require('path');

const uploadSingleBreed = multer({
  storage: multer.diskStorage({
    destination: 'public/uploads/breeds',
    filename: (request, file, callback) => {
      callback(null, `breed-${Date.now()}${path.extname(file.originalname)}`);
    },
  }),
}).single('image');

const uploadMultipleBreed = multer({
  storage: multer.diskStorage({
    destination: null,
    filename: (request, file, callback) => {
      callback(null, `breed-${Date.now()}${path.extname(file.originalname)}`);
    },
  }),
  fileFilter: (request, file, callback) => {
    // cek jika fieldname untuk image tidak sesuai
    const fieldNamePattern = /galleries\[[0-9]\]\[image\]/;
    if (fieldNamePattern.test(file.fieldname)) {
      return callback(null, true);
    }
  },
}).any();

module.exports = { uploadSingleBreed, uploadMultipleBreed };
