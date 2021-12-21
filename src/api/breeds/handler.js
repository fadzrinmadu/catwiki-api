const breedsService = require('../../services/mongoose/breedsService');
const galleriesService = require('../../services/mongoose/galleriesService');
const ClientError = require('../../exceptions/ClientError');

exports.postBreedHandler = async (request, response) => {
  try {
    const payload = request.body;

    if (request.files.length > 0) {
      const payloadGalleries = payload.galleries.map((gallery, index) => ({
        name: gallery.name,
        image: request.files[index].filename,
      }));

      const galleryIds = await galleriesService.addGalleries(payloadGalleries);

      const payloadBreed = {
        ...payload,
        galleries: galleryIds,
      };

      await breedsService.addBreed(payloadBreed);
    } else {
      delete payload.galleries;
      await breedsService.addBreed(payload);
    }

    response.status(201);
    return response.end();
  } catch (error) {
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

exports.getBreedsHandler = async (request, response) => {
  try {
    const { query } = request;
    const breeds = await breedsService.getBreeds(query);

    response.status(200);
    return response.json({
      limit: query.limit,
      page: query.page,
      results: breeds,
    });
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

exports.getBreedByIdHandler = async (request, response) => {
  try {
    const { id } = request.params;

    await breedsService.findBreedById(id);
    const breed = await breedsService.getBreedById(id);

    response.status(200);
    return response.json(breed);
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

exports.putBreedByIdHandler = async (request, response) => {
  try {
    const { id } = request.params;
    const payload = request.body;

    await breedsService.findBreedById(id);
    await breedsService.editBreedById(id, payload);

    response.status(204);
    return response.end();
  } catch (error) {
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

exports.putBreedCountHandler = async (request, response) => {
  try {
    const { id } = request.params;

    await breedsService.findBreedById(id);
    await breedsService.updateBreedCount(id);

    response.status(204);
    return response.end();
  } catch (error) {
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

exports.deleteBreedByIdHandler = async (request, response) => {
  try {
    const { id } = request.params;

    await breedsService.findBreedById(id);
    await breedsService.deleteBreedById(id);

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
