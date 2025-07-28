import React, { useEffect, useState, useRef } from 'react';
import { Animated, StyleSheet, useColorScheme, View, ImageBackground } from 'react-native';
import { darkTheme, lightTheme } from '../constants/theme';
import { useSettings } from '../contexts/SettingsContext';
import { useBackground } from '../contexts/BackgroundContext';
import { WeatherData } from '../types';

interface DynamicBackgroundProps {
    weather: WeatherData | null;
    children: React.ReactNode;
}

interface GitHubFile {
    name: string;
    path: string;
    download_url: string;
    type: string;
}

export const DynamicBackground: React.FC<DynamicBackgroundProps> = ({ 
  weather, 
  children 
}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
  const { settings } = useSettings();
  const { setCurrentBackgroundUrl } = useBackground();

    const [backgroundImages, setBackgroundImages] = useState<string[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    // Fetch background images from GitHub
    const fetchBackgroundImages = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('https://api.github.com/repos/silkbeauty/ssart/contents/zzz');

            if (!response.ok) {
                throw new Error('Failed to fetch images from GitHub');
            }

            const files: GitHubFile[] = await response.json();

            // Filter for image files and get their download URLs
            const imageFiles = files.filter(file =>
                file.type === 'file' &&
                /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name)
            );

            const imageUrls = imageFiles.map(file => file.download_url);
            setBackgroundImages(imageUrls);

            // Set initial random image
            if (imageUrls.length > 0) {
                const randomIndex = Math.floor(Math.random() * imageUrls.length);
                setCurrentImageIndex(randomIndex);
                // Save the initial URL to context
                setCurrentBackgroundUrl(imageUrls[randomIndex]);
            }
        } catch (error) {
            console.error('Error fetching background images:', error);
            // Fallback to a default background
            setBackgroundImages(['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800']);
        } finally {
            setIsLoading(false);
        }
    };

    // Change background image every hour
    useEffect(() => {
        const changeBackgroundHourly = () => {
            if (backgroundImages.length > 1) {
                const newIndex = (currentImageIndex + 1) % backgroundImages.length;
                setCurrentImageIndex(newIndex);
                // Save the new URL to context
                setCurrentBackgroundUrl(backgroundImages[newIndex]);

                // Fade animation
                fadeAnim.setValue(0);
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }).start();
            }
        };

        // Change immediately on first load
        if (backgroundImages.length > 0) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }).start();
        }

        // Set up hourly interval
        const interval = setInterval(changeBackgroundHourly, 60 * 60 * 1000); // 1 hour

        return () => clearInterval(interval);
    }, [backgroundImages]);

    // Fetch images on component mount
    useEffect(() => {
        fetchBackgroundImages();
    }, []);

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
        overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)', // Dark overlay for better text readability
        },
    });

    // Show loading state or fallback
    if (isLoading || backgroundImages.length === 0) {
        return (
            <View style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
                <View style={styles.content}>
                    {children}
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.background, { opacity: fadeAnim }]}>
                <ImageBackground
                    source={{ uri: backgroundImages[currentImageIndex] }}
                    style={styles.background}
                    resizeMode="cover"
                >
                    <View style={styles.overlay} />
                </ImageBackground>
            </Animated.View>

            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
}; 