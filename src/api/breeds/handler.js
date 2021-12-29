const Breed = require('../../models/Breed');
const cloudinary = require('../../utils/cloudinary');
const breedsService = require('../../services/mongoose/breedsService');
const galleriesService = require('../../services/mongoose/galleriesService');

exports.postBreedHandler = async (request, response, next) => {
  try {
    const payload = request.body;

    if (request.files.length > 0) {
      // upload image to cloudinary
      request.files.map(async (file) => {
        await cloudinary.uploader.upload(file.path, {
          folder: 'catwiki/breeds',
          use_filename: true,
          unique_filename: false,
        });
      });

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
    return next(error);
  }
};

exports.getBreedsHandler = async (request, response, next) => {
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
    return next(error);
  }
};

exports.getBreedByIdHandler = async (request, response, next) => {
  try {
    const { id } = request.params;

    await breedsService.findBreedById(id);
    const breed = await breedsService.getBreedById(id);

    response.status(200);
    return response.json(breed);
  } catch (error) {
    return next(error);
  }
};

exports.putBreedByIdHandler = async (request, response, next) => {
  try {
    const { id } = request.params;
    const payload = request.body;

    await breedsService.findBreedById(id);

    if (request.files.length > 0) {
      // upload image to cloudinary
      request.files.map(async (file) => {
        await cloudinary.uploader.upload(file.path, {
          folder: 'catwiki/breeds',
          use_filename: true,
          unique_filename: false,
        });
      });

      await breedsService.findBreedById(id);

      // // delete old galleries
      // breed.galleries.forEach(async (gallery) => {
      //   await galleriesService.deleteGalleryById(gallery._id);
      // });

      const payloadGalleries = payload.galleries.map((gallery, index) => ({
        name: gallery.name,
        image: request.files[index].filename,
      }));

      const galleryIds = await galleriesService.addGalleries(payloadGalleries);
      const breed = await Breed.findOne({ _id: id });

      const payloadBreed = {
        ...payload,
        galleries: [...breed.galleries.map((gallery) => gallery._id), ...galleryIds],
      };

      await breedsService.editBreedById(id, payloadBreed);
    } else {
      delete payload.galleries;
      await breedsService.editBreedById(id, payload);
    }

    response.status(204);
    return response.end();
  } catch (error) {
    return next(error);
  }
};

exports.deleteBreedByIdHandler = async (request, response, next) => {
  try {
    const { id } = request.params;

    await breedsService.findBreedById(id);

    const breed = await breedsService.getBreedById(id);

    // delete all galleries
    breed.galleries.forEach(async (gallery) => {
      await galleriesService.deleteGalleryById(gallery._id);
    });

    await breedsService.deleteBreedById(id);

    response.status(204);
    return response.end();
  } catch (error) {
    return next(error);
  }
};
