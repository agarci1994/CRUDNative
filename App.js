import "react-native-gesture-handler";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from "react-native";

import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import { NavigationContainer, ThemeProvider } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Nav from "./components/UI/Nav";
import Init from "./views/init";
import DetailsClient from "./views/DetailsClient";
import NewClient from "./views/NewClient";

const Stack = createStackNavigator();
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#1774f2",
    accent: "#0655BF",
  },
};

const App: () => React$Node = () => {
  return (
    <>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Init"
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerTintColor: theme.colors.surface,
              headertitleStyle: {
                fontWeight: "bold",
              },
            }}
          >
            <Stack.Screen
              name="Init"
              component={Init}
              options={({ navigation, route }) => ({
                headerTitleAlign: "center",
                title: "Inicio",
                headerLeft: (props) => (
                  <Nav {...props} navigation={navigation} route={route} />
                ),
              })}
            />
            <Stack.Screen
              name="NewClient"
              component={NewClient}
              options={{ title: "Nuevo Cliente" }}
            />
            <Stack.Screen
              name="DetailsClient"
              component={DetailsClient}
              options={{ title: "Detalles Clientes" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
};

const styles = StyleSheet.create({
  text: {},
});

export default App;
