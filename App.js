import 'react-native-gesture-handler';
import React from 'react';
import { Root } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './views/Login';
import MainTemplate from './views/MainTemplate';

const RootStack = createStackNavigator();
const Stack = createStackNavigator();

export default function App() {

  function LoginStackScreen() {
    return (
      <Stack.Navigator>
        <Stack.Screen options={{headerShown:false}} name="Login" component={Login} teste="1" />
      </Stack.Navigator>
    )
  }

  return (
    <Root>
      <NavigationContainer>
        <RootStack.Navigator mode="modal">
          <RootStack.Screen
            name="Main"
            component={ LoginStackScreen }
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="MainTemplate"
            component={ MainTemplate }
            options={{ headerShown: false }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </Root>
  );
}