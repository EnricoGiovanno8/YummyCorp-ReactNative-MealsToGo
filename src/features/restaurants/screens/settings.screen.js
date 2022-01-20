import React, { useContext } from "react";
import { Button, Text } from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";

import { AuthenticationContext } from "../../../services/authentication/authentication.context";

export const SettingsScreen = () => {
    const { onLogout } = useContext(AuthenticationContext)
    return (
        <SafeArea>
            <Text>Settings Screen</Text>
            <Button title="LOGOUT" onPress={() => onLogout()}/>
        </SafeArea>
    )
}