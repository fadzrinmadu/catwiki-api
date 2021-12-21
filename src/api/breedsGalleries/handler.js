const breedsService = require('../../services/mongoose/breedsService');
const galleriesService = require('../../services/mongoose/galleriesService');
const ClientError = require('../../exceptions/ClientError');

exports.deleteBreedGalleryHandler = async (request, response) => {
  try {
    const { breedId, galleryId } = request.params;

    await breedsService.findBreedById(breedId);
    await galleriesService.findGalleryById(galleryId);

    await breedsService.deleteBreedGalleryById(breedId, galleryId);
    await galleriesService.deleteGalleryById(galleryId);

    response.status(204);
    return response.end();
  } catch (error) {
    if (error instanceof ClientError) {
      response.status(error.statusCode);
      return response.json({
        errorMessages: error.message,
      });
    }

    // SERVER ERROR
    console.log(error);
    response.status(500);
    return response.end();
  }
};
