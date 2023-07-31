import {StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [destinationAddress, setDestinationAddress] = useState();

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={setDestinationAddress}
        value={destinationAddress}
        placeholder="Enter Address"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('MapScreen', {paramKey: destinationAddress})
        }>
        <Text>MAP</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('EmergencyScreen')}>
        <Text>EMERGENCY</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});
