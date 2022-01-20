import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import { LocationContextProvider } from "../../services/location/location.context";
import { RestaurantsContextProvider } from "../../services/restaurants/restaurants.context";
import { FavouritesContextProvider } from "../../services/favourites/favourites.context";

import { RestaurantsNavigator } from "./restaurants.navigator";
import { MapScreen } from "../../features/map/screens/map.screen";
import { SettingsScreen } from "../../features/restaurants/screens/settings.screen";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Restaurants: ["restaurant", "restaurant-outline"],
  Map: ["map", "map-outline"],
  Settings: ["md-settings-sharp", "md-settings-outline"],
};

const createScreenOptions = ({ route }) => {
  let iconName;
  return {
    tabBarIcon: ({ focused, size, color }) => {
      iconName = focused ? TAB_ICON[route.name][0] : TAB_ICON[route.name][1];
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: "tomato",
    tabBarInactiveTintColor: "gray",
    headerShown: false,
  };
};

export const AppNavigator = () => {
  return (
    <LocationContextProvider>
      <RestaurantsContextProvider>
        <FavouritesContextProvider>
          <Tab.Navigator screenOptions={createScreenOptions}>
            <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </FavouritesContextProvider>
      </RestaurantsContextProvider>
    </LocationContextProvider>
  );
};
