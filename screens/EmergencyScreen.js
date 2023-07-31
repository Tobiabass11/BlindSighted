import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

const EmergencyScreen = () => {
  const navigation = useNavigation();
  const [emergencyContact, setEmergencyContact] = useState();
  // TO MAKE CONTACT WITH EMERGENCY CONTACT
  const makePhoneCall = () => {
    if (Platform.OS == 'android') {
      Linking.openURL(`tel:${emergencyContact}`);
    } else {
      Linking.openURL(`telprompt:${emergencyContact}`);
    }
  };
  // TO CALL THE POLICE
  const callPolice = () => {
    if (Platform.OS == 'android') {
      Linking.openURL('tel:999');
    } else {
      Linking.openURL('telprompt:999');
    }
  };

  // TO CALL THE HOSPITAL
  const callHospital = () => {
    if (Platform.OS == 'android') {
      Linking.openURL('tel:111');
    } else {
      Linking.openURL('telprompt:111');
    }
  };
  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={setEmergencyContact}
        value={emergencyContact}
        placeholder="Enter Address"
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={() => makePhoneCall()}>
        <Text style={styles.buttonText}>CALL</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => makePhoneCall()}>
        <Text style={styles.buttonText}>TEXT</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => callPolice()}>
        <Text style={styles.buttonText}>POLICE</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => callHospital()}>
        <Text style={styles.buttonText}>HOSPITAL</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('HomeScreen')}>
        <Text style={styles.buttonText}>CANCEL</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EmergencyScreen;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 8,
    margin: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});
