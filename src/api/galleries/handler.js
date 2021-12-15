const fs = require('fs');
const breedsService = require('../../services/mongoose/breedsService');
const galleriesService = require('../../services/mongoose/galleriesService');
const ClientError = require('../../exceptions/ClientError');

exports.postGalleryHandler = async (request, response) => {
  try {
    const { breedId } = request.params;
    const payload = {
      ...request.body,
      image: request.file.filename,
    };

    await breedsService.findBreedById(breedId);
    const galleryId = await galleriesService.addGallery(payload);
    await breedsService.addBreedGallery(breedId, galleryId);

    response.status(201);
    return response.end();
  } catch (error) {
    if (request.file && request.file.path) {
      fs.unlinkSync(request.file.path);
    }

    if (error instanceof ClientError) {
      response.status(error.statusCode);
      return response.json({
        errorMessages: error.message,
      });
    }

    if (error.name === 'ValidationError') {
      const errorMessages = [];

      Object.values(error.errors).forEach(({ properties }) => {
        errorMessages.push({
          field: properties.path,
          message: properties.message,
        });
      });

      response.status(400);
      return response.json({ errorMessages });
    }

    // SERVER ERROR
    console.log(error);
    response.status(500);
    return response.end();
  }
};

exports.deleteGalleryHandler = async (request, response) => {
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
