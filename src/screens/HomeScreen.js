import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_API_KEY} from '../../environments';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [destinationAddress, setDestinationAddress] = useState();

  const [destination, setDestination] = useState({
    latitude: 55.8752632,
    longitude: -4.2934001,
  });
  console.log('This is your destination', destination);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <GooglePlacesAutocomplete
          fetchDetails={true}
          placeholder="Search"
          onPress={(data, details = null) => {
            const destinationCoords = {
              latitude: details?.geometry?.location.lat,
              longitude: details?.geometry?.location.lng,
            };
            setDestination(destinationCoords);
          }}
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: 'en',
          }}
        />
      </View>
      <View style={{flex: 2}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('MapScreen', {paramKey: destination})
          }>
          <Text style={styles.buttonText}>MAP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('EmergencyScreen')}>
          <Text style={styles.buttonText}>EMERGENCY</Text>
        </TouchableOpacity>
      </View>
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
