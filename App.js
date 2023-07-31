import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MyStack from './screens/MyStack';

const App = () => {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};

export default App;
