import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import MapViewDirections from 'react-native-maps-directions';
import GetLocation from 'react-native-get-location';
import Geolocation from '@react-native-community/geolocation';
import {SafeAreaView} from 'react-native-safe-area-context';

const MapScreen = ({route}) => {
  const [permssionGranter, setPermissionGranter] = useState(false);
  const {width, height} = Dimensions.get('window');

  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.02;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const navigation = useNavigation();
  console.log(route.params.paramKey);
  const latDelta = LATITUDE_DELTA;
  const lngDelta = LONGITUDE_DELTA;
  const origin = {latitude: 55.872589, longitude: -4.28994};
  const destination = {
    latitude: 55.864368,
    longitude: -4.29096,
  };
  const GOOGLE_MAPS_APIKEY = 'YOUR_GOOGLE_API_KEY';

  useEffect(() => {
    _getLocationPermission();
  }, []);

  const _getLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'BlindSighted App Location Permission',
            message:
              'BlindSighted App needs access to your location ' +
              'so you can use GPS in the app.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the location');
          setPermissionGranter(true);
          _getCurrentLocation();
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    } else if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization(
        () => {
          console.log('success');
          setPermissionGranter(true);
        },
        () => {
          console.log('error');
        },
      );
    }
  };

  const _getCurrentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        console.log('My current is =>', location);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };
  if (!permssionGranter) {
    return (
      <SafeAreaView>
        <Text>Please allow location permission to continue</Text>
      </SafeAreaView>
    );
  }
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: latDelta,
          longitudeDelta: lngDelta,
        }}>
        {origin !== undefined ? <Marker coordinate={origin}></Marker> : null}
        {destination !== undefined ? (
          <Marker coordinate={destination}></Marker>
        ) : null}

        {origin !== undefined && destination !== undefined ? (
          <MapViewDirections
            origin={origin}
            destination={destination}
            strokeColor="blue"
            strokeWidth={3}
            apikey={GOOGLE_MAPS_APIKEY}
          />
        ) : null}
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
