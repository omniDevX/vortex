import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, StatusBar, Animated } from 'react-native';
import { useRoute } from '@react-navigation/native';
import useDevicePhotos from '../hooks/useDevicePhotos';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SLIDESHOW_INTERVAL = 3500;
const INDICATOR_DURATION = 1500;
const FADE_DURATION = 3000;

export default function AlbumDetailScreen() {
    const route = useRoute<any>();
    const { albumId, title } = route.params;
    const { photos, hasPermission } = useDevicePhotos(100, albumId);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const [slideshow, setSlideshow] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [showIndicator, setShowIndicator] = useState(false);
    const indicatorTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (photos.length > 0) {
            setCurrentIndex(Math.floor(Math.random() * photos.length));
        }
    }, [photos.length]);

    useEffect(() => {
        if (slideshow && photos.length > 0 && currentIndex !== null) {
            intervalRef.current = setInterval(() => {
                setCurrentIndex(() => Math.floor(Math.random() * photos.length));
            }, SLIDESHOW_INTERVAL);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [slideshow, photos.length, currentIndex]);

    useEffect(() => {
        if (showIndicator) {
            if (indicatorTimeoutRef.current) clearTimeout(indicatorTimeoutRef.current);
            indicatorTimeoutRef.current = setTimeout(() => setShowIndicator(false), INDICATOR_DURATION);
        }
        return () => {
            if (indicatorTimeoutRef.current) clearTimeout(indicatorTimeoutRef.current);
        };
    }, [showIndicator]);

    // Fade animation when currentIndex changes
    useEffect(() => {
        fadeAnim.setValue(0);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: FADE_DURATION,
            useNativeDriver: true,
        }).start();
    }, [currentIndex]);

    const showPrev = () => {
        if (photos.length === 0 || currentIndex === null) return;
        setCurrentIndex((prev) => (prev! - 1 + photos.length) % photos.length);
    };
    const showNext = () => {
        if (photos.length === 0 || currentIndex === null) return;
        setCurrentIndex((prev) => (prev! + 1) % photos.length);
    };

    const handleImagePress = () => {
        setSlideshow((prev) => {
            if (!prev) {
                // If turning slideshow ON, shrink the image to 0, then show next image at normal scale
                scaleAnim.setValue(1);
                Animated.timing(scaleAnim, {
                    toValue: 0.5,
                    duration: 1400,
                    useNativeDriver: true,
                }).start(() => {
                    // After shrink, advance to a random image and reset scale
                    setCurrentIndex(() => Math.floor(Math.random() * photos.length));
                    scaleAnim.setValue(1);
                });
            }
            return !prev;
        });
        setShowIndicator(true);
    };

    if (hasPermission === null) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <Text>Requesting permissions...</Text>
            </View>
        );
    }

    if (hasPermission === false) {
        return (
            <View className="flex-1 justify-center items-center bg-white px-4">
                <Text className="text-center">
                    Permission denied. Please enable photo permissions in settings.
                </Text>
            </View>
        );
    }

    if (!photos.length || currentIndex === null) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <Text>No photos found in this album.</Text>
            </View>
        );
    }

    const currentPhoto = photos[currentIndex];

    return (
        <View className="flex-1 bg-black justify-center items-center">
            <StatusBar hidden />
            {showIndicator && (
                <Text style={{ position: 'absolute', top: 30, left: 0, right: 0, textAlign: 'center', color: 'white', zIndex: 10, fontSize: 16, opacity: 0.7 }}>{`Slideshow: ${slideshow ? 'On' : 'Off'}`}</Text>
            )}
            <TouchableOpacity activeOpacity={1} style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT, justifyContent: 'center', alignItems: 'center' }} onPress={handleImagePress}>
                <Animated.Image
                    source={{ uri: currentPhoto.uri }}
                    style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT, resizeMode: 'contain', opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}
                />
            </TouchableOpacity>
            {/* Left/Right Arrows only when slideshow is off */}
            {!slideshow && (
                <>
                    <TouchableOpacity
                        style={{ position: 'absolute', left: 20, top: SCREEN_HEIGHT / 2 - 30, zIndex: 20, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 20, padding: 10 }}
                        onPress={showPrev}
                    >
                        <Text style={{ color: 'white', fontSize: 32 }}>{'<'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ position: 'absolute', right: 20, top: SCREEN_HEIGHT / 2 - 30, zIndex: 20, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 20, padding: 10 }}
                        onPress={showNext}
                    >
                        <Text style={{ color: 'white', fontSize: 32 }}>{'>'}</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
} 