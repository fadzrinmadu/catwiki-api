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

module.exports = { uploadSingleBreed };
