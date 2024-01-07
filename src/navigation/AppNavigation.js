import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, SearchScreen, MovieDetailScreen } from "../screens";

import colors from "../constants/colors";
import React from "react";

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.black
          },
          headerTintColor: colors.white,
          animation: 'fade_from_bottom'
        }}>
        <Stack.Screen name="Home"
          component={HomeScreen}/>
        <Stack.Screen name="Search"
          component={SearchScreen}/>
        <Stack.Screen name="MovieDetail"
          component={MovieDetailScreen}
          options={{
            title: ''
          }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
