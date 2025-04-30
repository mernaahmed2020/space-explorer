const axios = require('axios');

const API_BASE = 'https://lldev.thespacedevs.com/2.2.0/launch/';


const fetchUpcomingLaunches = async (filters = {}) => {
  try {
    const response = await axios.get(API_BASE, {
      params: {
        mode: 'list',
        ordering: 'net',  
        limit: 10,      
        ...filters      
      },
      timeout: 5000      
    });

    if (!response.data?.results) {
      return [];
    }

    return response.data.results.map(launch => ({
      mission: launch.name || 'Unnamed Mission',
      vehicle: launch.rocket?.configuration?.full_name ?? 'Unknown Vehicle',
      date: launch.net ? new Date(launch.net).toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }) : 'TBD',
      status: launch.status?.abbrev || 'Unknown'
    }));

  } catch (error) {
    const errorMessage = error.response?.data?.detail 
      || error.message 
      || 'Unknown error occurred';
    throw new Error(`Launch Library Error: ${errorMessage}`);
  }
};

module.exports = { fetchUpcomingLaunches };