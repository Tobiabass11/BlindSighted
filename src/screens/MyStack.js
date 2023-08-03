import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import MapScreen from './MapScreen';
import EmergencyScreen from './EmergencyScreen';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Group>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="EmergencyScreen" component={EmergencyScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default MyStack;
