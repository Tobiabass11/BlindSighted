import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';

const MapScreen = ({route}) => {
  const navigation = useNavigation();
  console.log(route.params.paramKey);
  const currentLatitude = 55.872589;
  const currentLongitude = -4.28994;
  const latDelta = 0.015;
  const lngDelta = 0.0121;
  const destinationLatitude = 55.864368;
  const destinationLongitude = -4.29096;
  const [markersList, setMarkersList] = useState([
    {
      id: 1,
      latitude: currentLatitude,
      longitude: currentLongitude,
      title: 'I am here',
      description: 'This is my current location',
    },
    {
      id: 2,
      latitude: destinationLatitude,
      longitude: destinationLongitude,
      title: 'I want to go there',
      description: 'This is my destination location',
    },
  ]);
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: currentLatitude,
          longitude: currentLongitude,
          latitudeDelta: latDelta,
          longitudeDelta: lngDelta,
        }}>
        {markersList.map(marker => {
          return (
            <Marker
              key={marker.id}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.title}
              description={marker.description}
            />
          );
        })}
      </MapView>
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
