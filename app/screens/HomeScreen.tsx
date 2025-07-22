import React from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity, Image } from 'react-native';
import useDeviceAlbums from '../hooks/useDeviceAlbums';
import { useNavigation } from '@react-navigation/native';

const NUM_COLUMNS = 2;
const SCREEN_WIDTH = Dimensions.get('window').width;
const HORIZONTAL_PADDING = 16; // px-4
const ITEM_MARGIN = 8; // m-2 = 8px

const ITEM_SIZE = (SCREEN_WIDTH - HORIZONTAL_PADDING - ITEM_MARGIN * (NUM_COLUMNS * 2)) / NUM_COLUMNS;

export default function GalleryScreen() {
    const { albums, hasPermission } = useDeviceAlbums();
    const navigation = useNavigation<any>();

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

    const renderItem = ({ item, index }: { item: any; index: number }) => {
        const isLastColumn = (index + 1) % NUM_COLUMNS === 0;

        return (
            <TouchableOpacity
                className="mb-2"
                style={{
                    width: ITEM_SIZE,
                    marginRight: isLastColumn ? 0 : ITEM_MARGIN,
                }}
                onPress={() => navigation.navigate('AlbumDetail', { albumId: item.id, title: item.title })}
            >
                <Image
                    source={item.coverUri ? { uri: item.coverUri } : require('../../assets/placeholder.png')}
                    style={{
                        width: ITEM_SIZE,
                        height: ITEM_SIZE,
                        backgroundColor: '#ccc',
                        borderRadius: 12,
                    }}
                    resizeMode="cover"
                />

                <View className="mt-1">
                    <Text className="text-base font-semibold text-center">{item.title}</Text>
                    <Text className="text-gray-600 text-sm text-center">{item.assetCount} images</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View className="flex-1 bg-white px-4 pt-6">
            <FlatList
                data={albums}
                keyExtractor={(item) => item.id}
                numColumns={NUM_COLUMNS}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}
