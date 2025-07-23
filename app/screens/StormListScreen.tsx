import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StormCard } from '../components/StormCard';
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
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Loading storm data...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (error && storms.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity style={styles.retryButton} onPress={refreshStorms}>
                        <Text style={styles.retryButtonText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Storm Documentation</Text>
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
                ListHeaderComponent={
                    storms.length > 0 ? (
                        <View style={styles.statsContainer}>
                            <View style={styles.statItem}>
                                <Text style={styles.statNumber}>{storms.length}</Text>
                                <Text style={styles.statLabel}>Total Storms</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Text style={styles.statNumber}>
                                    {storms.filter(s => s.stormType === 'Thunderstorm').length}
                                </Text>
                                <Text style={styles.statLabel}>Thunderstorms</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Text style={styles.statNumber}>
                                    {new Set(storms.map(s => new Date(s.dateTime).toDateString())).size}
                                </Text>
                                <Text style={styles.statLabel}>Days Active</Text>
                            </View>
                        </View>
                    ) : null
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
    );
}; 