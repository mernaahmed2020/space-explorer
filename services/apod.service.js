const axios = require('axios');
const { nasaApiKey } = require('../utils/config');

const getAstronomyPicture = async () => {
  try {
    const response = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}`
    );
    return response.data;
  } catch (error) {
    throw new Error(`APOD API Error: ${error.message}`);
  }
};

module.exports = { getAstronomyPicture };