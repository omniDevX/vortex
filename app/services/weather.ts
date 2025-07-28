import { WeatherData, Location, WeatherForecast, HourlyForecast } from '../types';
import { API_ENDPOINTS, API_PARAMS, WEATHER_CODES } from '../constants/api';

class WeatherService {
    async getCurrentWeather(location: Location): Promise<WeatherData> {
        try {
            const url = new URL(API_ENDPOINTS.WEATHER_CURRENT);
            url.searchParams.set('latitude', location.latitude.toString());
            url.searchParams.set('longitude', location.longitude.toString());
            url.searchParams.set('current', API_PARAMS.CURRENT_WEATHER.current);
            url.searchParams.set('timezone', API_PARAMS.CURRENT_WEATHER.timezone);

            const response = await fetch(url.toString());

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (!data.current) {
                throw new Error('Invalid weather data received');
            }

            const current = data.current;
            const weatherCode = current.weather_code;
            const weatherInfo = WEATHER_CODES[weatherCode as keyof typeof WEATHER_CODES] ||
                { description: 'Unknown', icon: '❓' };

            return {
                temperature: current.temperature_2m,
                feelsLike: current.apparent_temperature,
                humidity: current.relative_humidity_2m,
                windSpeed: current.wind_speed_10m,
                windDirection: current.wind_direction_10m,
                pressure: current.pressure_msl,
                visibility: current.visibility,
                precipitation: current.precipitation,
                weatherDescription: weatherInfo.description,
                weatherIcon: weatherInfo.icon,
                timestamp: current.time,
            };
        } catch (error) {
            console.error('Error fetching weather data:', error);
            // Return mock data as fallback
            return this.getMockWeatherData();
        }
    }

    async getWeatherForecast(location: Location): Promise<WeatherForecast[]> {
        try {
            const url = new URL(API_ENDPOINTS.WEATHER_FORECAST);
            url.searchParams.set('latitude', location.latitude.toString());
            url.searchParams.set('longitude', location.longitude.toString());
            url.searchParams.set('daily', API_PARAMS.FORECAST.daily);
            url.searchParams.set('timezone', API_PARAMS.FORECAST.timezone);

            const response = await fetch(url.toString());

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (!data.daily) {
                throw new Error('Invalid forecast data received');
            }

            const daily = data.daily;
            const forecasts: WeatherForecast[] = [];

            for (let i = 0; i < daily.time.length; i++) {
                const weatherCode = daily.weather_code[i];
                const weatherInfo = WEATHER_CODES[weatherCode as keyof typeof WEATHER_CODES] ||
                    { description: 'Unknown', icon: '❓' };

                forecasts.push({
                    date: daily.time[i],
                    temperature: {
                        min: daily.temperature_2m_min[i],
                        max: daily.temperature_2m_max[i],
                    },
                    weatherDescription: weatherInfo.description,
                    weatherIcon: weatherInfo.icon,
                    precipitation: daily.precipitation_sum[i],
                    windSpeed: 0, // Not available in daily forecast
                });
            }

            return forecasts;
        } catch (error) {
            console.error('Error fetching weather forecast:', error);
            // Return mock forecast data as fallback
            return this.getMockForecastData();
        }
    }

    async getHourlyForecast(location: Location): Promise<HourlyForecast[]> {
        try {
            const url = new URL(API_ENDPOINTS.WEATHER_FORECAST);
            url.searchParams.set('latitude', location.latitude.toString());
            url.searchParams.set('longitude', location.longitude.toString());
            url.searchParams.set('hourly', API_PARAMS.FORECAST.hourly);
            url.searchParams.set('timezone', API_PARAMS.FORECAST.timezone);

            const response = await fetch(url.toString());

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (!data.hourly) {
                throw new Error('Invalid hourly forecast data received');
            }

            const hourly = data.hourly;
            const forecasts: HourlyForecast[] = [];

            // Get next 24 hours from current time
            const now = new Date();
            const currentHour = now.getHours();

            for (let i = 0; i < 24; i++) {
                const hourIndex = currentHour + i;
                if (hourIndex < hourly.time.length) {
                    const weatherCode = hourly.weather_code[hourIndex];
                    const weatherInfo = WEATHER_CODES[weatherCode as keyof typeof WEATHER_CODES] ||
                        { description: 'Unknown', icon: '❓' };

                    // Determine if it's day or night (6 AM to 6 PM is day)
                    const hourOfDay = new Date(hourly.time[hourIndex]).getHours();
                    const isDaytime = hourOfDay >= 6 && hourOfDay < 18;
                    
                    // Use appropriate icon based on time of day
                    let icon = weatherInfo.icon;
                    if (weatherCode === 0) { // Clear sky
                        icon = isDaytime ? '☀️' : '🌙';
                    } else if (weatherCode === 1) { // Mainly clear
                        icon = isDaytime ? '🌤️' : '🌙';
                    } else if (weatherCode === 2) { // Partly cloudy
                        icon = isDaytime ? '⛅' : '☁️';
                    } else if (weatherCode === 3) { // Overcast
                        icon = '☁️'; // Same for day and night
                    }

                    forecasts.push({
                        time: hourly.time[hourIndex],
                        temperature: hourly.temperature_2m[hourIndex],
                        weatherDescription: weatherInfo.description,
                        weatherIcon: icon,
                        precipitationProbability: hourly.precipitation_probability[hourIndex],
                    });
                }
            }

            return forecasts;
        } catch (error) {
            console.error('Error fetching hourly forecast:', error);
            // Return mock hourly forecast data as fallback
            return this.getMockHourlyForecastData();
        }
    }

    private getMockWeatherData(): WeatherData {
        return {
            temperature: 22.5,
            feelsLike: 24.2,
            humidity: 65,
            windSpeed: 12.3,
            windDirection: 180,
            pressure: 1013.25,
            visibility: 10000,
            precipitation: 0,
            weatherDescription: 'Partly cloudy',
            weatherIcon: '⛅',
            timestamp: new Date().toISOString(),
        };
    }

    private getMockForecastData(): WeatherForecast[] {
        const forecasts: WeatherForecast[] = [];
        const today = new Date();

        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);

            forecasts.push({
                date: date.toISOString().split('T')[0],
                temperature: {
                    min: 15 + Math.random() * 10,
                    max: 25 + Math.random() * 10,
                },
                weatherDescription: 'Partly cloudy',
                weatherIcon: '⛅',
                precipitation: Math.random() * 5,
                windSpeed: 8 + Math.random() * 8,
            });
        }

        return forecasts;
    }

    private getMockHourlyForecastData(): HourlyForecast[] {
        const forecasts: HourlyForecast[] = [];
        const now = new Date();

        for (let i = 0; i < 24; i++) {
            const time = new Date(now);
            time.setHours(now.getHours() + i);
            
            const hourOfDay = time.getHours();
            const isDaytime = hourOfDay >= 6 && hourOfDay < 18;
            
            // Use appropriate icon based on time of day
            const icon = isDaytime ? '☀️' : '🌙';

            forecasts.push({
                time: time.toISOString(),
                temperature: 20 + Math.random() * 10,
                weatherDescription: 'Clear sky',
                weatherIcon: icon,
                precipitationProbability: Math.random() * 100,
            });
        }

        return forecasts;
    }
}

export const weatherService = new WeatherService(); 