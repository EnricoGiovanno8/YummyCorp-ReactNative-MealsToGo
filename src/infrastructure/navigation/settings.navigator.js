import React from "react";

import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";

import { SettingsScreen} from "../../features/settings/screens/settings.screen"

const Stack = createStackNavigator()

export const SettingsNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerMode:"screen", cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }}>
            <Stack.Screen options={{ headerShown: false }} name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Favourites" component={() => null} />
        </Stack.Navigator>
    )
}