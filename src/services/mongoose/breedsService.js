const mongoose = require('mongoose');
const Breed = require('../../models/Breed');
const NotFoundError = require('../../exceptions/NotFoundError');

exports.addBreed = async (payload) => {
  const breed = new Breed(payload);
  await breed.save();
};

exports.getBreeds = async (query) => {
  const {
    limit = 4, term = '', page = 1, top = 'false',
  } = query;

  const startIndex = (limit && page) ? (page - 1) * limit : 0;

  const breeds = await Breed
    .find({ name: { $regex: `${term}`, $options: 'i' } })
    .limit(limit ? parseInt(limit) : 0)
    .skip(startIndex)
    .sort(`${top === 'true' ? '-count' : 'name'}`)
    .select(`_id name ${top === 'true' && 'image'}`);

  if (term !== '' && breeds.length < 1) {
    throw new NotFoundError(`Breed dengan kata kunci '${term}' tidak ditemukan`);
  }

  return breeds;
};

exports.getBreedById = async (id) => {
  const breed = await Breed.findOne({ _id: id })
    .select('-__v')
    .populate({ path: 'galleries', select: '-_id -__v -count' });

  return breed;
};

exports.editBreedById = async (id, payload) => {
  const breed = await Breed.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true, runValidators: true },
  );

  await breed.save();
};

exports.deleteBreedById = async (id) => {
  await Breed.findOneAndDelete({ _id: id });
};

exports.findBreedById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new NotFoundError(`Breed dengan id '${id}' tidak ditemukan`);
  }

  const breed = await Breed.exists({ _id: id });

  if (!breed) {
    throw new NotFoundError(`Breed dengan id '${id}' tidak ditemukan`);
  }
};

exports.addBreedGallery = async (breedId, galleryId) => {
  const breed = await Breed.findOne({ _id: breedId });
  breed.galleries.push({ _id: galleryId });
  await breed.save();
};

exports.deleteBreedGalleryById = async (breedId, galleryId) => {
  const breed = await Breed.findOne({ _id: breedId });

  breed.galleries.forEach((gallery) => {
    if (JSON.stringify(gallery) === JSON.stringify(galleryId)) {
      breed.galleries.pull({ _id: galleryId });
    }
  });

  await breed.save();
};

exports.updateBreedCount = async (id) => {
  const breed = await Breed.findOne({ _id: id });
  breed.count += 1;
  await breed.save();
};
