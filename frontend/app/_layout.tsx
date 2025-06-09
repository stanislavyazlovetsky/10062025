import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './login';
import Registration from './registration';
import MainApp from './index';
import Detalinfo from './detalinfo';
import Deviceadd from './deviceadd';
import Profile from './ProfileScreen';
import ProfileSettingsScreen from './profsets';
import WaterDetails from './WaterDetails'

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Login">
              {(props) => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="Registration">
              {(props) => <Registration {...props} />}
            </Stack.Screen>
            <Stack.Screen name="ProfileSettings">
              {(props) => <ProfileSettingsScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="MainApp" component={MainApp} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="ProfileSettings">
              {(props) => <ProfileSettingsScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
          </>
        )}
        <Stack.Screen name="Detalinfo" component={Detalinfo} />
        <Stack.Screen name="Device" component={Deviceadd} />
        <Stack.Screen name="WaterDetails" component={WaterDetails} options={{ title: 'Water Details' }} />
      </Stack.Navigator>
  );
}
