const mongoose = require('mongoose');

const gallerySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nama harus diisi'],
  },
  image: {
    type: String,
    require: [true, 'Gambar belum diupload'],
  },
});

module.exports = mongoose.model('Gallery', gallerySchema);
