import { useEffect, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { Alert } from 'react-native';

export default function useDevicePhotos(limit = 50, albumId?: string) {
    const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);

    useEffect(() => {
        (async () => {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            setHasPermission(status === 'granted');
            if (status !== 'granted') {
                Alert.alert(
                    'Permission required',
                    'Permission to access media library is needed to show photos.'
                );
                return;
            }
            const options: any = {
                first: limit,
                mediaType: ['photo'],
                sortBy: ['creationTime'],
            };
            if (albumId) {
                options.album = albumId;
            }
            const assets = await MediaLibrary.getAssetsAsync(options);
            setPhotos(assets.assets);
        })();
    }, [limit, albumId]);

    return { photos, hasPermission };
}
