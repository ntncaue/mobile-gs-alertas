import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text } from 'react-native';
import AlertasScreen from './src/screens/AlertasScreen';
import SensoresScreen from './src/screens/SensoresScreen';
import AreasScreen from './src/screens/AreasScreen';
import EquipesScreen from './src/screens/EquipesScreen';
import LeiturasScreen from './src/screens/LeiturasScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import SobreNosScreen from './src/screens/SobreNosScreen';
import { colors } from './src/constants/colors'; 

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Dashboard') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Alertas') {
                iconName = focused ? 'alert-circle' : 'alert-circle-outline';
              } else if (route.name === 'Sensores') {
                iconName = focused ? 'hardware-chip' : 'hardware-chip-outline';
              } else if (route.name === 'Áreas') {
                iconName = focused ? 'map' : 'map-outline';
              } else if (route.name === 'Equipes') {
                iconName = focused ? 'people' : 'people-outline';
              } else if (route.name === 'Leituras') {
                iconName = focused ? 'analytics' : 'analytics-outline'; 
              } else if (route.name === 'Sobre') {
                iconName = focused ? 'information-circle' : 'information-circle-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: colors.primary, 
            tabBarInactiveTintColor: colors.onSurfaceVariant, 
            tabBarStyle: {
              backgroundColor: colors.surface, 
              borderTopWidth: 0, 
              elevation: 0, 
              shadowOpacity: 0, 
              height: 60, 
            },
            tabBarLabelStyle: {
              fontSize: 12,
              paddingBottom: 5, 
            },
            tabBarIconStyle: {
              marginTop: 5, 
            },
          })}
        >
          <Tab.Screen name="Dashboard" component={DashboardScreen} />
          <Tab.Screen name="Alertas" component={AlertasScreen} />
          <Tab.Screen name="Sensores" component={SensoresScreen} />
          <Tab.Screen name="Áreas" component={AreasScreen} />
          <Tab.Screen name="Equipes" component={EquipesScreen} />
          <Tab.Screen name="Leituras" component={LeiturasScreen} />
          <Tab.Screen name="Sobre" component={SobreNosScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

