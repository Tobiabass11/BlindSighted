import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const MapScreen = ({route}) => {
  return (
    <SafeAreaView>
      <Text>{route.params.paramKey}</Text>
    </SafeAreaView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({});
