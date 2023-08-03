import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MyStack from './src/screens/MyStack';

const App = () => {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};

export default App;
