const breedsService = require('../../services/mongoose/breedsService');
const galleriesService = require('../../services/mongoose/galleriesService');

exports.deleteBreedGalleryHandler = async (request, response, next) => {
  try {
    const { breedId, galleryId } = request.params;

    await breedsService.findBreedById(breedId);
    await galleriesService.findGalleryById(galleryId);

    await breedsService.deleteBreedGalleryById(breedId, galleryId);
    await galleriesService.deleteGalleryById(galleryId);

    response.status(204);
    return response.end();
  } catch (error) {
    return next(error);
  }
};
