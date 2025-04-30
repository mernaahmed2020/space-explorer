const { getAstronomyPicture } = require('./services/apod.service');
const { getCurrentISSLocation } = require('./services/iss.service');
const { fetchUpcomingLaunches } = require('./services/launches.service');

const main = async () => {
  try {
    const apod = await getAstronomyPicture();
    console.log('\n=== Astronomy Picture of the Day ===');
    console.log(`Title: ${apod.title}`);
    console.log(`Date: ${apod.date}`);
    console.log(`Explanation: ${apod.explanation.slice(0, 150)}...`);

    const trackISS = async () => {
      const updateLocation = async () => {
        const location = await getCurrentISSLocation();
        console.log(`\nISS Position (${new Date().toLocaleTimeString()}):`);
        console.log(`Latitude: ${location.latitude}`);
        console.log(`Longitude: ${location.longitude}`);
      };
      await updateLocation();
      setInterval(updateLocation, 10000);
    };
    
    const launches = await fetchUpcomingLaunches();
    console.log('\nUpcoming Launches');
    if (launches.length === 0) {
      console.log('No upcoming launches found');
    } else {
      launches.forEach((launch, index) => {
        console.log(`${index + 1}. ${launch.mission}`);
        console.log(`   Vehicle: ${launch.vehicle}`);
        console.log(`   Date: ${launch.date}`);
        console.log(`   Status: ${launch.status}`);
      });
    }

    trackISS();
    
  } catch (error) {
    console.error(`\nError: ${error.message}`);
    process.exit(1);
  }

 const launches = await fetchUpcomingLaunches({
    status: 2, 
    net__gte: '2024-07-01' 
  });
};

main();