// weather.test.ts
import { weatherService } from './weather';
import { WeatherData, WeatherForecast, Location } from '../types';

describe('weatherService', () => {
    const location: Location = { latitude: 10, longitude: 20 };

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getCurrentWeather', () => {
        it('returns weather data from API', async () => {
            const mockApiResponse = {
                current: {
                    temperature_2m: 25,
                    apparent_temperature: 27,
                    relative_humidity_2m: 60,
                    wind_speed_10m: 10,
                    wind_direction_10m: 90,
                    pressure_msl: 1012,
                    visibility: 9000,
                    precipitation: 0.5,
                    weather_code: 1,
                    time: '2024-07-01T12:00:00Z',
                },
            };
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(mockApiResponse),
                })
            ) as jest.Mock;

            const data = await weatherService.getCurrentWeather(location);
            expect(data.temperature).toBe(25);
            expect(data.humidity).toBe(60);
            expect(data.timestamp).toBe('2024-07-01T12:00:00Z');
        });

        it('returns mock data on API error', async () => {
            global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));
            const data = await weatherService.getCurrentWeather(location);
            expect(data).toHaveProperty('temperature');
            expect(typeof data.temperature).toBe('number');
        });
    });

    describe('getWeatherForecast', () => {
        it('returns forecast data from API', async () => {
            const mockApiResponse = {
                daily: {
                    time: ['2024-07-01', '2024-07-02'],
                    temperature_2m_min: [15, 16],
                    temperature_2m_max: [25, 26],
                    weather_code: [1, 2],
                    precipitation_sum: [0, 1],
                },
            };
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(mockApiResponse),
                })
            ) as jest.Mock;

            const data = await weatherService.getWeatherForecast(location);
            expect(data.length).toBe(2);
            expect(data[0].date).toBe('2024-07-01');
            expect(data[1].temperature.max).toBe(26);
        });

        it('returns mock forecast on API error', async () => {
            global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));
            const data = await weatherService.getWeatherForecast(location);
            expect(Array.isArray(data)).toBe(true);
            expect(data.length).toBeGreaterThan(0);
        });
    });
}); 