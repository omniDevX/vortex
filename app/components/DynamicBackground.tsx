import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, useColorScheme, View } from 'react-native';
import { darkTheme, lightTheme } from '../constants/theme';
import { useSettings } from '../contexts/SettingsContext';
import { WeatherData } from '../types';
import { WeatherAnimations } from './WeatherAnimations';

interface DynamicBackgroundProps {
  weather: WeatherData | null;
  children: React.ReactNode;
}

interface WeatherBackground {
  colors: string[];
  overlay?: string;
  animation?: 'rain' | 'snow' | 'wind' | 'clear' | 'cloudy';
}

export const DynamicBackground: React.FC<DynamicBackgroundProps> = ({ 
  weather, 
  children 
}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
  const { settings } = useSettings();
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const rainAnim = useRef(new Animated.Value(0)).current;
  const snowAnim = useRef(new Animated.Value(0)).current;
  const windAnim = useRef(new Animated.Value(0)).current;

  const getWeatherBackground = (weatherData: WeatherData): WeatherBackground => {
    const temp = weatherData.temperature;
    const description = weatherData.weatherDescription.toLowerCase();
    // All gradients are now light for text readability
    // Thunderstorm
    if (description.includes('thunderstorm') || description.includes('storm')) {
      return {
        colors: ['#e0e7ef', '#b6c6e3', '#dbeafe'], // light blue/grey
        animation: 'rain'
      };
    }
    // Rain
    if (description.includes('rain') || description.includes('drizzle')) {
      return {
        colors: ['#e3f2fd', '#b3e5fc', '#b2ebf2'], // very light blue
        animation: 'rain'
      };
    }
    // Snow
    if (description.includes('snow') || description.includes('blizzard')) {
      return {
        colors: ['#f8fafc', '#e0f7fa', '#e3eafc'], // white/light blue
        animation: 'snow'
      };
    }
    // Clear sky
    if (description.includes('clear')) {
      return {
        colors: ['#e0f7fa', '#b2ebf2', '#b3e5fc'], // light blue
        animation: 'clear'
      };
    }
    // Cloudy
    if (description.includes('cloud') || description.includes('overcast')) {
      return {
        colors: ['#f1f5f9', '#e0e7ef', '#cbd5e1'], // light grey/blue
        animation: 'cloudy'
      };
    }
    // Fog
    if (description.includes('fog') || description.includes('mist')) {
      return {
        colors: ['#f1f5f9', '#e0e7ef', '#cbd5e1'], // light grey
        animation: 'cloudy'
      };
    }
    // Temperature-based fallback
    if (temp < 0) {
      return {
        colors: ['#f8fafc', '#e0f7fa', '#e3eafc'], // white/light blue
        animation: 'snow'
      };
    }
    if (temp > 25) {
      return {
        colors: ['#e0f7fa', '#b2ebf2', '#b3e5fc'], // light blue
        animation: 'clear'
      };
    }
    // Default
    return {
      colors: ['#f1f5f9', '#e0e7ef', '#cbd5e1'], // light grey/blue
      animation: 'clear'
    };
  };

  const background = weather ? getWeatherBackground(weather) : {
    colors: currentTheme.colors.background === '#ffffff' 
      ? ['#f8fafc', '#e2e8f0', '#cbd5e1']
      : ['#0f172a', '#1e293b', '#334155'],
    animation: 'clear'
  };

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    // Weather-specific animations
    if (background.animation === 'rain') {
      Animated.loop(
        Animated.timing(rainAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        })
      ).start();
    } else if (background.animation === 'snow') {
      Animated.loop(
        Animated.timing(snowAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: false,
        })
      ).start();
    } else if (background.animation === 'wind') {
      Animated.loop(
        Animated.timing(windAnim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: false,
        })
      ).start();
    }
  }, [weather, background.animation]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    background: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    content: {
      flex: 1,
      zIndex: 1,
    },
    rainDrop: {
      position: 'absolute',
      width: 2,
      height: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      borderRadius: 1,
    },
    snowflake: {
      position: 'absolute',
      width: 4,
      height: 4,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 2,
    },
    cloud: {
      position: 'absolute',
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderRadius: 50,
    },
  });

  const renderRainDrops = () => {
    const drops = [];
    for (let i = 0; i < 20; i++) {
      const left = Math.random() * 100;
      const delay = Math.random() * 2000;
      
      drops.push(
        <Animated.View
          key={`rain-${i}`}
          style={[
            styles.rainDrop,
            {
              left: `${left}%`,
              transform: [{
                translateY: rainAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-20, 800],
                })
              }],
            }
          ]}
        />
      );
    }
    return drops;
  };

  const renderSnowflakes = () => {
    const flakes = [];
    for (let i = 0; i < 15; i++) {
      const left = Math.random() * 100;
      const size = Math.random() * 3 + 2;
      
      flakes.push(
        <Animated.View
          key={`snow-${i}`}
          style={[
            styles.snowflake,
            {
              left: `${left}%`,
              width: size,
              height: size,
              borderRadius: size / 2,
              transform: [{
                translateY: snowAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-10, 800],
                })
              }, {
                translateX: snowAnim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, 10, 0],
                })
              }],
            }
          ]}
        />
      );
    }
    return flakes;
  };

  const renderClouds = () => {
    const clouds = [];
    for (let i = 0; i < 5; i++) {
      const left = Math.random() * 100;
      const size = Math.random() * 60 + 40;
      const top = Math.random() * 200 + 50;
      
      clouds.push(
        <Animated.View
          key={`cloud-${i}`}
          style={[
            styles.cloud,
            {
              left: `${left}%`,
              top: top,
              width: size,
              height: size * 0.6,
              opacity: windAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 0.6],
              }),
              transform: [{
                translateX: windAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 50],
                })
              }],
            }
          ]}
        />
      );
    }
    return clouds;
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.background, { opacity: fadeAnim }]}>
        <LinearGradient
          colors={background.colors as any}
          style={styles.background}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        
        {/* Weather animations */}
        {background.animation === 'rain' && renderRainDrops()}
        {background.animation === 'snow' && renderSnowflakes()}
        {background.animation === 'cloudy' && renderClouds()}
        {background.animation === 'wind' && renderClouds()}
        
        {/* Advanced weather effects */}
        <WeatherAnimations weather={weather} />
      </Animated.View>
      
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}; 