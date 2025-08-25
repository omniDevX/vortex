import React from 'react';
import { View, Text } from 'react-native';
import { WeatherData, HourlyForecast } from '../types';
import { lightTheme, darkTheme } from '../constants/theme';
import { getWeatherCardStyles } from '../constants/styles';
import { formatTemperature } from '../utils/helpers';

interface WeatherCardProps {
    weather: WeatherData;
    hourlyForecast?: HourlyForecast[];
    theme?: 'light' | 'dark';
    location?: { latitude: number; longitude: number };
    placeName?: string;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
    weather,
    hourlyForecast = [],
    theme = 'light',
    location,
    placeName
}) => {
    const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
    const styles = getWeatherCardStyles(currentTheme);

    const formatHour = (timeString: string) => {
        const date = new Date(timeString);
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            hour12: true
        });
    };

    /**
     * Generate 6 slots:
     *   - Slot 1 = current + 2h
     *   - Slots 2-6 = +3h steps, skipping 9pm–6am (jump to 6am if inside)
     */
    const generateSlots = () => {
        if (hourlyForecast.length === 0) return [];

        const now = new Date();
        const slots: HourlyForecast[] = [];

        // helper to find forecast entry closest to a given Date
        const findClosestForecast = (target: Date) => {
            let closest = hourlyForecast[0];
            let minDiff = Math.abs(new Date(closest.time).getTime() - target.getTime());
            for (const f of hourlyForecast) {
                const diff = Math.abs(new Date(f.time).getTime() - target.getTime());
                if (diff < minDiff) {
                    closest = f;
                    minDiff = diff;
                }
            }
            return closest;
        };

        // Slot 1: current + 2h
        let slotTime = new Date(now.getTime() + 2 * 60 * 60 * 1000);
        slots.push(findClosestForecast(slotTime));

        // Slots 2-6
        for (let i = 0; i < 5; i++) {
            slotTime = new Date(slotTime.getTime() + 3 * 60 * 60 * 1000);

            const hour = slotTime.getHours();
            if (hour >= 21 || hour < 6) {
                // skip to 6am next day
                slotTime.setDate(slotTime.getDate() + (hour >= 21 ? 1 : 0));
                slotTime.setHours(6, 0, 0, 0);
            }

            slots.push(findClosestForecast(slotTime));
        }

        return slots;
    };

    const renderHourlyGrid = () => {
        const selected = generateSlots();
        if (selected.length === 0) return null;

        // Determine top3 hottest, rest coldest
        const sortedByTemp = [...selected].sort((a, b) => b.temperature - a.temperature);
        const hottest = sortedByTemp.slice(0, 3);
        const coldest = sortedByTemp.slice(-3);

        return (
            <View style={styles.hourlyGridRow}>
                {selected.map((hour, idx) => {
                    let marker = '';
                    if (hottest.includes(hour)) {
                        marker = '🔥';
                    } else if (coldest.includes(hour)) {
                        marker = '🧊';
                    }

                    return (
                        <View key={idx} style={styles.hourlyGridItem}>
                            <Text style={styles.hourlyTime}>{formatHour(hour.time)}</Text>
                            <Text style={styles.hourlyIcon}>{hour.weatherIcon}</Text>
                            <Text style={styles.hourlyTemp}>
                                {formatTemperature(hour.temperature)}
                            </Text>
                            <Text style={styles.hourlyPrecipitation}>
                                {hour.precipitationProbability}%
                            </Text>
                            {marker !== '' && (
                                <Text style={{ textAlign: 'center', marginTop: 2 }}>
                                    {marker}
                                </Text>
                            )}
                        </View>
                    );
                })}
            </View>
        );
    };

    return (
        <View
            style={[
                styles.gradient,
                {
                    backgroundColor: currentTheme.colors.surface,
                    borderRadius: currentTheme.borderRadius.lg,
                    margin: currentTheme.spacing.md
                }
            ]}
        >
            <View style={styles.header}>
                <View style={styles.temperatureContainer}>
                    <Text style={styles.temperature}>
                        {formatTemperature(weather.temperature)}
                    </Text>
                    <Text style={styles.description}>{weather.weatherDescription}</Text>
                </View>
                <Text style={styles.weatherIcon}>{weather.weatherIcon}</Text>
            </View>

            {hourlyForecast.length > 0 && (
                <View style={styles.hourlySection}>
                    <Text style={styles.hourlyTitle}>Next 24 Hours</Text>
                    <View style={styles.hourlyGrid}>{renderHourlyGrid()}</View>
                </View>
            )}
        </View>
    );
};
