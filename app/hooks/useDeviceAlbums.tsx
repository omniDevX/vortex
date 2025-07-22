import { useEffect, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { Alert } from 'react-native';

export type AlbumWithCover = MediaLibrary.Album & { coverUri?: string };

export default function useDeviceAlbums() {
  const [albums, setAlbums] = useState<AlbumWithCover[]>([]);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === 'granted');

      if (status !== 'granted') {
        Alert.alert('Permission required', 'Please enable media permissions to view albums.');
        return;
      }

      const fetchedAlbums = await MediaLibrary.getAlbumsAsync();

      // Fetch the first asset of each album for its cover
      const albumsWithCovers = await Promise.all(
        fetchedAlbums.map(async (album) => {
          const assets = await MediaLibrary.getAssetsAsync({
            album,
            first: 1,
            mediaType: ['photo'],
            sortBy: ['creationTime'],
          });

          return {
            ...album,
            coverUri: assets.assets[0]?.uri,
          };
        })
      );

      setAlbums(albumsWithCovers);
    })();
  }, []);

  return { albums, hasPermission };
}
