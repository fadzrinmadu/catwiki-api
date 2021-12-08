const Breed = require('../../models/Breed');

exports.addBreed = async (payload) => {
  const breed = new Breed(payload);
  await breed.save();
};

exports.getBreeds = async () => {
  const breeds = await Breed.select('_id name');
  return breeds;
};
