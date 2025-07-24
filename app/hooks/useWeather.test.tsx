// useWeather.test.ts
import { renderHook, act } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react-native';
import { useWeather } from './useWeather';
import { weatherService } from '../services/weather';
import { locationService } from '../services/location';

jest.mock('../services/weather');
jest.mock('../services/location');

describe('useWeather hook', () => {
    const mockLocation = { lat: 1, lon: 2 };
    const mockWeather = { temp: 25, condition: 'Sunny' };
    const mockForecast = [{ day: 'Monday', temp: 23 }, { day: 'Tuesday', temp: 24 }];

    beforeEach(() => {
        (locationService.getCurrentLocation as jest.Mock).mockResolvedValue(mockLocation);
        (weatherService.getCurrentWeather as jest.Mock).mockResolvedValue(mockWeather);
        (weatherService.getWeatherForecast as jest.Mock).mockResolvedValue(mockForecast);
    });

    it('fetches weather data on mount', async () => {
        const { result } = renderHook(() => useWeather());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.location).toEqual(mockLocation);
        expect(result.current.currentWeather).toEqual(mockWeather);
        expect(result.current.forecast).toEqual(mockForecast);
        expect(result.current.error).toBeNull();
    });

    it('handles location error', async () => {
        (locationService.getCurrentLocation as jest.Mock).mockRejectedValue(new Error('Location error'));

        const { result } = renderHook(() => useWeather());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.error).toBe('Location error');
        expect(result.current.loading).toBe(false);
    });
});
