import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';

const MapScreen = ({route}) => {
  const navigation = useNavigation();
  console.log(route.params.paramKey);
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}></MapView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={styles.buttonText}>CANCEL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: 'absolute',
    width: '90%',
    padding: 12,
    borderRadius: 8,
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
