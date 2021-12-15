const mongoose = require('mongoose');

const breedSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nama harus di isi'],
  },
  description: {
    type: String,
  },
  temperament: {
    type: String,
    required: [true, 'Temperament harus di isi'],
  },
  origin: {
    type: String,
  },
  lifeSpan: {
    type: String,
  },
  metaData: {
    adaptability: {
      type: Number,
    },
    affectionLevel: {
      type: Number,
    },
    childFriendly: {
      type: Number,
    },
    intelligence: {
      type: Number,
    },
    grooming: {
      type: Number,
    },
    healthIssues: {
      type: Number,
    },
    socialNeeds: {
      type: Number,
    },
    strangerFriendly: {
      type: Number,
    },
  },
  galleries: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Gallery',
  }],
});

module.exports = mongoose.model('Breed', breedSchema);
