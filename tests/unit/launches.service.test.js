const { fetchUpcomingLaunches } = require('../../services/launches.service');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

describe('Launches Service', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  test('returns formatted launches data', async () => {
    const mockResponse = {
      results: [{
        name: 'Test Launch',
        rocket: { configuration: { full_name: 'Test Rocket' } },
        net: '2024-06-01T12:00:00Z',
        status: { abbrev: 'Go' }
      }]
    };
    
    mock.onGet(/launch\//).reply(200, mockResponse);
    
    const launches = await fetchUpcomingLaunches();
    expect(launches[0].mission).toBe('Test Launch');
    expect(launches[0].vehicle).toBe('Test Rocket');
  });

  test('handles empty API responses', async () => {
    mock.onGet(/launch\//).reply(200, {});
    
    const launches = await fetchUpcomingLaunches();
    expect(launches).toEqual([]);
  });
});