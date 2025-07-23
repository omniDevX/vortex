import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { lightTheme, darkTheme } from '../constants/theme';
import { useColorScheme } from 'react-native';
import { StormType, StormDocumentation, WeatherData, Location } from '../types';
import { cameraService } from '../services/camera';
import { locationService } from '../services/location';
import { weatherService } from '../services/weather';
import { useStormDocumentation } from '../hooks/useStormDocumentation';
import { generateId } from '../utils/helpers';
import { getCaptureStormScreenStyles } from '../constants/styles';

interface CaptureStormScreenProps {
    navigation: any;
}

export const CaptureStormScreen: React.FC<CaptureStormScreenProps> = ({
    navigation
}) => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? 'dark' : 'light';
    const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

    const { addStorm } = useStormDocumentation();

    const [photoUri, setPhotoUri] = useState<string | null>(null);
    const [stormType, setStormType] = useState<StormType>(StormType.THUNDERSTORM);
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
    const [currentLocation, setCurrentLocation] = useState<Location | null>(null);

    useEffect(() => {
        fetchCurrentData();
    }, []);

    const fetchCurrentData = async () => {
        try {
            setLoading(true);
            const location = await locationService.getCurrentLocation();
            setCurrentLocation(location);

            const weather = await weatherService.getCurrentWeather(location);
            setCurrentWeather(weather);
        } catch (error) {
            console.error('Error fetching current data:', error);
            Alert.alert('Error', 'Failed to fetch location and weather data');
        } finally {
            setLoading(false);
        }
    };

    const handleTakePhoto = async () => {
        try {
            const uri = await cameraService.takePhoto();
            if (uri) {
                setPhotoUri(uri);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to take photo. Please check camera permissions.');
        }
    };

    const handlePickPhoto = async () => {
        try {
            const uri = await cameraService.pickPhotoFromLibrary();
            if (uri) {
                setPhotoUri(uri);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to pick photo. Please check media library permissions.');
        }
    };

    const handleSave = async () => {
        if (!photoUri) {
            Alert.alert('Error', 'Please take or select a photo first');
            return;
        }

        if (!currentWeather || !currentLocation) {
            Alert.alert('Error', 'Weather and location data not available');
            return;
        }

        try {
            setLoading(true);

            const storm: StormDocumentation = {
                id: generateId(),
                photoUri,
                weatherConditions: currentWeather,
                location: currentLocation,
                dateTime: new Date().toISOString(),
                notes: notes.trim(),
                stormType,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            await addStorm(storm);
            Alert.alert('Success', 'Storm documentation saved successfully!', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);
        } catch (error) {
            Alert.alert('Error', 'Failed to save storm documentation');
        } finally {
            setLoading(false);
        }
    };

    const styles = getCaptureStormScreenStyles(currentTheme);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Capture Storm</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.cancelButton}>Cancel</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.photoSection}>
                    <Text style={styles.sectionTitle}>Photo</Text>
                    <View style={styles.photoContainer}>
                        {photoUri ? (
                            <Image source={{ uri: photoUri }} style={styles.photo} />
                        ) : (
                            <View style={{ alignItems: 'center' }}>
                                <Text style={styles.photoPlaceholder}>📷</Text>
                                <Text style={styles.photoText}>Take or select a photo</Text>
                            </View>
                        )}
                    </View>
                    <View style={styles.photoButtons}>
                        <TouchableOpacity style={styles.photoButton} onPress={handleTakePhoto}>
                            <Ionicons name="camera" size={20} color="#fff" />
                            <Text style={styles.photoButtonText}>Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.photoButton} onPress={handlePickPhoto}>
                            <Ionicons name="images" size={20} color="#fff" />
                            <Text style={styles.photoButtonText}>Gallery</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.formSection}>
                    <Text style={styles.sectionTitle}>Storm Details</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={stormType}
                            onValueChange={(value: StormType) => setStormType(value)}
                            style={styles.picker}
                        >
                            {Object.values(StormType).map((type) => (
                                <Picker.Item key={type} label={type} value={type} />
                            ))}
                        </Picker>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Add notes about the storm..."
                            placeholderTextColor={currentTheme.colors.textSecondary}
                            value={notes}
                            onChangeText={setNotes}
                            multiline
                            numberOfLines={4}
                        />
                    </View>
                </View>

                {currentWeather && (
                    <View style={styles.weatherInfo}>
                        <Text style={styles.sectionTitle}>Current Weather</Text>
                        <View style={styles.weatherRow}>
                            <Text style={styles.weatherLabel}>Temperature:</Text>
                            <Text style={styles.weatherValue}>
                                {currentWeather.temperature.toFixed(1)}°C
                            </Text>
                        </View>
                        <View style={styles.weatherRow}>
                            <Text style={styles.weatherLabel}>Conditions:</Text>
                            <Text style={styles.weatherValue}>
                                {currentWeather.weatherDescription}
                            </Text>
                        </View>
                        <View style={styles.weatherRow}>
                            <Text style={styles.weatherLabel}>Wind Speed:</Text>
                            <Text style={styles.weatherValue}>
                                {currentWeather.windSpeed.toFixed(1)} km/h
                            </Text>
                        </View>
                        <View style={styles.weatherRow}>
                            <Text style={styles.weatherLabel}>Humidity:</Text>
                            <Text style={styles.weatherValue}>
                                {currentWeather.humidity.toFixed(0)}%
                            </Text>
                        </View>
                    </View>
                )}

                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSave}
                    disabled={loading || !photoUri}
                >
                    <Text style={styles.saveButtonText}>
                        {loading ? 'Saving...' : 'Save Storm Documentation'}
                    </Text>
                </TouchableOpacity>
            </ScrollView>

            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color={currentTheme.colors.primary} />
                </View>
            )}
        </SafeAreaView>
    );
}; 