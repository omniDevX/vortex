import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, Alert, ActivityIndicator, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { lightTheme, darkTheme } from '../constants/theme';
import { useColorScheme } from 'react-native';
import { StormType, StormDocumentation, WeatherData, Location } from '../types';
import { cameraService } from '../services/camera';
import { useStormDocumentation } from '../hooks/useStormDocumentation';
import { generateId } from '../utils/helpers';
import { getCaptureStormScreenStyles } from '../constants/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { StormStackParamList } from '../types/navigation';
import { useWeatherContext } from '../contexts/WeatherContext';
import { useBackground } from '../contexts/BackgroundContext';

interface CaptureStormScreenProps {
    navigation: StackNavigationProp<StormStackParamList, 'CaptureStorm'>;
}

export const CaptureStormScreen: React.FC<CaptureStormScreenProps> = ({ navigation }) => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? 'dark' : 'light';
    const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

    const { addStorm } = useStormDocumentation();
    const { weather: currentWeather, location: currentLocation } = useWeatherContext();
    const { currentBackgroundUrl } = useBackground();

    const [photoUri, setPhotoUri] = useState<string | null>(null);
    const [stormType, setStormType] = useState<StormType>(StormType.THUNDERSTORM);
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);

    // Remove useEffect(() => { fetchCurrentData(); }, []);
    // Remove fetchCurrentData function
    // Remove useState for currentWeather and currentLocation
    // Use currentWeather and currentLocation from context in handleSave and render logic

    if (!currentWeather || !currentLocation) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
                <Text style={{ marginTop: 16 }}>Getting latest weather and location...</Text>
            </SafeAreaView>
        );
    }

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
            Alert.alert('Error', 'Please take or select a photo before saving.');
            return;
        }

        console.log('Saving storm documentation:', {
            photoUri,
        });
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
            navigation.goBack()
        } catch (error) {
            Alert.alert('Error', 'Failed to save storm documentation');
        } finally {
            setLoading(false);
        }
    };

    const styles = getCaptureStormScreenStyles(currentTheme);

    return (
        <ImageBackground
            source={{ uri: currentBackgroundUrl || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800' }}
            style={{ flex: 1 }}
            resizeMode="cover"
        >
            <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.1)', // Lighter overlay for better text readability
            }} />
            
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <Text style={styles.title}>Capture Moment</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.cancelButton}>Cancel</Text>
                    </TouchableOpacity>
                </View>

            <ScrollView style={styles.content}>
                <View style={styles.photoSection}>
                    
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
                        <TouchableOpacity 
                            style={[styles.photoButton, { backgroundColor: 'rgba(255, 255, 255, 0.9)' }]} 
                            onPress={handleTakePhoto}
                        >
                            <Ionicons name="camera" size={20} color="#000" />
                            <Text style={[styles.photoButtonText, { color: '#000' }]}>Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.photoButton, { backgroundColor: 'rgba(255, 255, 255, 0.9)' }]} 
                            onPress={handlePickPhoto}
                        >
                            <Ionicons name="images" size={20} color="#000" />
                            <Text style={[styles.photoButtonText, { color: '#000' }]}>Gallery</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.formSection}>
                    
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
                            placeholder="Add notes..."
                            placeholderTextColor={currentTheme.colors.textSecondary}
                            value={notes}
                            onChangeText={setNotes}
                            multiline
                            numberOfLines={6}
                        />
                    </View>
                </View>

                

                <TouchableOpacity
                    style={[styles.saveButton, { 
                        backgroundColor: 'rgba(34, 197, 94, 0.9)',
                        marginBottom: 250
                    }]}
                    onPress={handleSave}
                    disabled={loading }
                >
                    <Text style={[styles.saveButtonText, { color: '#fff' }]}>
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
        </ImageBackground>
    );
}; 