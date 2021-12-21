const breedsService = require('../../services/mongoose/breedsService');
const ClientError = require('../../exceptions/ClientError');

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
