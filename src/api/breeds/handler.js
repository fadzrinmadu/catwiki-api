const breedsService = require('../../services/mongoose/breedsService');

exports.postBreadHandler = async (request, response) => {
  try {
    const payload = request.body;
    await breedsService.addBreed(payload);

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
    response.status(500);
    return response.end();
  }
};

exports.getBreedsHandler = async (request, response) => {
  const breeds = await breedsService.getBreeds();

  response.status(200);
  return response.json({
    limit: 1,
    page: 1,
    results: breeds,
  });
};
