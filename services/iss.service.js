const axios = require('axios');

const getCurrentISSLocation = async () => {
  try {
    const response = await axios.get(
      'http://api.open-notify.org/iss-now.json'
    );
    return {
      latitude: response.data.iss_position.latitude,
      longitude: response.data.iss_position.longitude,
      timestamp: response.data.timestamp
    };
  } catch (error) {
    throw new Error(`ISS API Error: ${error.message}`);
  }
};

module.exports = { getCurrentISSLocation };