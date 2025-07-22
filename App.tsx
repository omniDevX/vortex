// App.tsx
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Linking, Share, View, Text, useColorScheme, StatusBar   } from 'react-native';
import HomeScreen from './app/screens/HomeScreen';
import AlbumDetailScreen from './app/screens/AlbumDetailScreen';
import Constants from 'expo-constants';
import "./global.css";
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { darkTheme, lightTheme } from './app/constants/theme';
import { WeatherScreen } from './app/screens/WeatherScreen';
import { SettingsScreen } from './app/screens/SettingsScreen';
import { SettingsProvider } from './app/contexts/SettingsContext';
import { CaptureStormScreen } from './app/screens/CaptureStormScreen';
import { StormDocumentationScreen } from './app/screens/StormDocumentationScreen';
import { StormDetailScreen } from './app/screens/StormDetailScreen';
import { StormDocumentation } from './app/types';
import type { StackScreenProps } from '@react-navigation/stack';

type StormStackParamList = {
    StormList: undefined;
    CaptureStorm: undefined;
    StormDetail: { storm: StormDocumentation };
  };
// const Drawer = createDrawerNavigator();
const Stack = createStackNavigator<StormStackParamList>();
const Tab = createBottomTabNavigator();

const StormStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="StormList" component={StormDocumentationScreen} />
        <Stack.Screen name="CaptureStorm" component={CaptureStormScreen} />
        <Stack.Screen name="StormDetail" component={StormDetailScreen} />
      </Stack.Navigator>
    );
  };
  

const TabNavigator = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? 'dark' : 'light';
    const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap;

                    if (route.name === 'Weather') {
                        iconName = focused ? 'partly-sunny' : 'partly-sunny-outline';
                    } else if (route.name === 'Storms') {
                        iconName = focused ? 'thunderstorm' : 'thunderstorm-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    } else {
                        iconName = 'help-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: currentTheme.colors.primary,
                tabBarInactiveTintColor: currentTheme.colors.textSecondary,
                tabBarStyle: {
                    backgroundColor: currentTheme.colors.surface,
                    borderTopColor: currentTheme.colors.border,
                },
                headerShown: false,
            })}
        >
            <Tab.Screen
                name="Weather"
                component={WeatherScreen}
                options={{
                    title: 'Weather',
                }}
            />
            <Tab.Screen
                name="Storms"
                component={StormStack}
                options={{
                    title: 'Storm Documentation',
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    title: 'Settings',
                }}
            />
        </Tab.Navigator>
    );
};

export default function App() {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? 'dark' : 'light';
    const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

    return (
        <SettingsProvider>
            <SafeAreaProvider>
                <NavigationContainer>
                    <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
                    <TabNavigator />
                </NavigationContainer>
            </SafeAreaProvider>
        </SettingsProvider>
    );
}
