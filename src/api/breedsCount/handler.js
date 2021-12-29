const breedsService = require('../../services/mongoose/breedsService');

exports.putBreedCountHandler = async (request, response, next) => {
  try {
    const { id } = request.params;

    await breedsService.findBreedById(id);
    await breedsService.updateBreedCount(id);

    response.status(204);
    return response.end();
  } catch (error) {
    return next(error);
  }
};
