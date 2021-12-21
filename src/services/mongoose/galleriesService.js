const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Gallery = require('../../models/Gallery');
const NotFoundError = require('../../exceptions/NotFoundError');

exports.addGallery = async (payload) => {
  const gallery = new Gallery(payload);
  await gallery.save();

  return gallery._id;
};

exports.addGalleries = async (payloads) => {
  const galleries = await Gallery.insertMany(payloads);
  const galleryIds = galleries.map((gallery) => gallery._id);
  return galleryIds;
};

exports.deleteGalleryById = async (id) => {
  try {
    const gallery = await Gallery.findOneAndDelete({ _id: id });

    const file = path.join(`public/uploads/breeds/${gallery.image}`);

    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }
  } catch (error) {
    if (error) {
      throw new NotFoundError(`Gallery dengan id '${id}' tidak ditemukan`);
    }
  }
};

exports.findGalleryById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new NotFoundError(`Gallery dengan id '${id}' tidak ditemukan`);
  }

  const gallery = await Gallery.exists({ _id: id });

  if (!gallery) {
    throw new NotFoundError(`Gallery dengan id '${id}' tidak ditemukan`);
  }
};
