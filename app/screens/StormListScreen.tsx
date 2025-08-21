import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, RefreshControl, ImageBackground } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StormCard } from '../components/StormCard';
import { useBackground } from '../contexts/BackgroundContext';
import { useStormDocumentation } from '../hooks/useStormDocumentation';
import { lightTheme, darkTheme } from '../constants/theme';
import { useColorScheme } from 'react-native';
import { StormDocumentation } from '../types';
import { getStormListScreenStyles } from '../constants/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { StormStackParamList } from '../types/navigation';

interface StormListScreenProps {
    navigation: StackNavigationProp<StormStackParamList, 'StormList'>;
}

export const StormListScreen: React.FC<StormListScreenProps> = ({ navigation }) => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? 'dark' : 'light';
    const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
    const { currentBackgroundUrl } = useBackground();

    const { storms, loading, error, deleteStorm, refreshStorms } = useStormDocumentation();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await refreshStorms();
        } catch (err) {
            Alert.alert('Error', 'Failed to refresh storm data');
        } finally {
            setRefreshing(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            refreshStorms();
        }, [refreshStorms])
    );

    const handleDeleteStorm = (storm: StormDocumentation) => {
        Alert.alert(
            'Delete Storm Documentation',
            'Are you sure you want to delete this storm documentation? This action cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteStorm(storm.id);
                        } catch (err) {
                            Alert.alert('Error', 'Failed to delete storm documentation');
                        }
                    },
                },
            ]
        );
    };

    const handleStormPress = (storm: StormDocumentation) => {
        navigation.navigate('StormDetail', { storm });
    };

    const styles = getStormListScreenStyles(currentTheme);

    const renderStormItem = ({ item }: { item: StormDocumentation }) => (
        <StormCard
            storm={item}
            theme={theme}
            onPress={() => handleStormPress(item)}
            onDelete={() => handleDeleteStorm(item)}
        />
    );

    if (loading && storms.length === 0) {
        return (
            <View style={{ flex: 1 }}>
                {currentBackgroundUrl ? (
                    <ImageBackground
                        source={{ uri: currentBackgroundUrl }}
                        style={{ flex: 1 }}
                        resizeMode="cover"
                    >
                        <View style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.3)', // Dark overlay for better text readability
                        }} />
                        <SafeAreaView style={styles.container}>
                            <View style={styles.loadingContainer}>
                                <Text style={styles.loadingText}>Loading  data...</Text>
                            </View>
                        </SafeAreaView>
                    </ImageBackground>
                ) : (
                    <SafeAreaView style={styles.container}>
                        <View style={styles.loadingContainer}>
                            <Text style={styles.loadingText}>Loading storm data...</Text>
                        </View>
                    </SafeAreaView>
                )}
            </View>
        );
    }

    if (error && storms.length === 0) {
        return (
            <View style={{ flex: 1 }}>
                {currentBackgroundUrl ? (
                    <ImageBackground
                        source={{ uri: currentBackgroundUrl }}
                        style={{ flex: 1 }}
                        resizeMode="cover"
                    >
                        <View style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.3)', // Dark overlay for better text readability
                        }} />
                        <SafeAreaView style={styles.container}>
                            <View style={styles.errorContainer}>
                                <Text style={styles.errorText}>{error}</Text>
                                <TouchableOpacity style={styles.retryButton} onPress={refreshStorms}>
                                    <Text style={styles.retryButtonText}>Retry</Text>
                                </TouchableOpacity>
                            </View>
                        </SafeAreaView>
                    </ImageBackground>
                ) : (
                    <SafeAreaView style={styles.container}>
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{error}</Text>
                            <TouchableOpacity style={styles.retryButton} onPress={refreshStorms}>
                                <Text style={styles.retryButtonText}>Retry</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                )}
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            {currentBackgroundUrl ? (
                <ImageBackground
                    source={{ uri: currentBackgroundUrl }}
                    style={{ flex: 1 }}
                    resizeMode="cover"
                >
                    <View style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Dark overlay for better text readability
                    }} />
                    <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Nota</Text>
                <TouchableOpacity
                    style={[styles.addButton, { 
                        backgroundColor: 'rgba(34, 197, 94, 0.9)',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 4,
                        elevation: 5
                    }]}
                    onPress={() => navigation.navigate('CaptureStorm')}
                >
                    <Ionicons name="add" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <FlatList
                style={styles.content}
                data={storms}
                renderItem={renderStormItem}
                keyExtractor={(item) => item.id}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyIcon}>🌩️</Text>
                        <Text style={styles.emptyText}>No moments yet</Text>
                        <Text style={styles.emptySubtext}>
                            Tap the + button to capture your first moment
                        </Text>
                    </View>
                }
                            />
            </SafeAreaView>
                </ImageBackground>
            ) : (
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Documentation</Text>
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => navigation.navigate('CaptureStorm')}
                        >
                            <Ionicons name="add" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        style={styles.content}
                        data={storms}
                        renderItem={renderStormItem}
                        keyExtractor={(item) => item.id}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                        
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyIcon}>🌩️</Text>
                                <Text style={styles.emptyText}>No storm documentation yet</Text>
                                <Text style={styles.emptySubtext}>
                                    Tap the + button to capture your first storm
                                </Text>
                            </View>
                        }
                    />
                </SafeAreaView>
            )}
        </View>
    );
}; 