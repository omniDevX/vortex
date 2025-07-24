// weather.integration.test.ts
import { weatherService } from './weather';

describe('weatherService (integration)', () => {
    // Example: New York City coordinates
    const realLocation = { latitude: 40.7128, longitude: -74.0060 };

    it('fetches real current weather data', async () => {
        const data = await weatherService.getCurrentWeather(realLocation);
        expect(data).toHaveProperty('temperature');
        expect(data).toHaveProperty('humidity');
        expect(typeof data.temperature).toBe('number');
        expect(typeof data.humidity).toBe('number');
        expect(data).toHaveProperty('weatherDescription');
        expect(data).toHaveProperty('timestamp');
    });

    it('fetches real weather forecast data', async () => {
        const data = await weatherService.getWeatherForecast(realLocation);
        expect(Array.isArray(data)).toBe(true);
        expect(data.length).toBeGreaterThan(0);
        expect(data[0]).toHaveProperty('date');
        expect(data[0]).toHaveProperty('temperature');
        expect(data[0].temperature).toHaveProperty('min');
        expect(data[0].temperature).toHaveProperty('max');
        expect(data[0]).toHaveProperty('weatherDescription');
    });
}); 