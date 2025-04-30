const { getAstronomyPicture } = require('../../services/apod.service');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

describe('APOD Service', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  test('successfully fetch data', async () => {
    const mockData = {
      title: 'Test Image',
      explanation: 'Test explanation',
      date: '2024-05-01'
    };
    
    mock.onGet(/planetary\/apod/).reply(200, mockData);
    
    const result = await getAstronomyPicture();
    expect(result.title).toBe(mockData.title);
    expect(result.explanation).toBe(mockData.explanation);
  });

  test('handles API errors', async () => {
    mock.onGet(/planetary\/apod/).reply(500);
    
    await expect(getAstronomyPicture())
      .rejects
      .toThrow('Request failed');
  });
});