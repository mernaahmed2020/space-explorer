const { getCurrentISSLocation } = require('../../services/iss.service');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

describe('ISS Service', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  test('fetches ISS location successfully', async () => {
    const mockResponse = {
      iss_position: { latitude: '51.9382', longitude: '-176.4231' },
      timestamp: 1716143700
    };
    
    mock.onGet('http://api.open-notify.org/iss-now.json').reply(200, mockResponse);
    
    const result = await getCurrentISSLocation();
    expect(result.latitude).toBe('51.9382');
    expect(result.longitude).toBe('-176.4231');
  });

  test('handles network errors', async () => {
    mock.onGet('http://api.open-notify.org/iss-now.json').networkError();
    
    await expect(getCurrentISSLocation())
      .rejects
      .toThrow('ISS API Error: Network Error');
  });
});