// App.tsx
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Linking, Share, View, Text } from 'react-native';
import HomeScreen from './app/screens/HomeScreen';
import AlbumDetailScreen from './app/screens/AlbumDetailScreen';
import Constants from 'expo-constants';
import "./global.css";
import type { DrawerContentComponentProps } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function ContactScreen({ navigation }: { navigation: any }) {
    React.useEffect(() => {
        Linking.openURL('mailto:aiautoinvoicing@gmail.com');
        navigation.navigate('My Gallery');
    }, []);
    return null;
}
function RateMeScreen({ navigation }: { navigation: any }) {
    React.useEffect(() => {
        Linking.openURL('market://details?id=com.aixpertlab.GallerySlideshow');
        navigation.navigate('My Gallery');
    }, []);
    return null;
}
function ShareScreen({ navigation }: { navigation: any }) {
    React.useEffect(() => {
        Share.share({ message: 'Check out My Gallery! https://play.google.com/store/apps/details?id=com.aixpertlab.GallerySlideshow' });
        navigation.navigate('My Gallery');
    }, []);
    return null;
}
function BuyMeACoffeeScreen({ navigation }: { navigation: any }) {
    React.useEffect(() => {
        Linking.openURL('https://ko-fi.com/aiautoinvoicing');
        navigation.navigate('My Gallery');
    }, []);
    return null;
}

function CustomDrawerContent(props: DrawerContentComponentProps) {
    const version = (Constants.manifest as any)?.version || Constants.expoConfig?.version || 'Unknown';
    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}>
            <View>
                <DrawerItemList {...props} />
            </View>
            <View style={{ padding: 16, borderTopWidth: 1, borderColor: '#eee' }}>
                <Text style={{ textAlign: 'center', color: '#888' }}>Version {version}</Text>
            </View>
        </DrawerContentScrollView>
    );
}

function DrawerNavigator() {
    return (
        <Drawer.Navigator initialRouteName="My Gallery" drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="My Gallery" component={HomeScreen} />
            <Drawer.Screen name="Contact" component={ContactScreen} />
            <Drawer.Screen name="Rate Me" component={RateMeScreen} />
            <Drawer.Screen name="Share" component={ShareScreen} />
            <Drawer.Screen name="Buy Me a Coffee" component={BuyMeACoffeeScreen} />
        </Drawer.Navigator>
    );
}

export default function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Root" component={DrawerNavigator} />
                    <Stack.Screen name="AlbumDetail" component={AlbumDetailScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

