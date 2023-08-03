import React, {useEffect, useRef, useState} from 'react';
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
import Geolocation from '@react-native-community/geolocation';
import ImagePath from '../constants/ImagePath';
import {GOOGLE_MAPS_API_KEY} from '../../environments';

const MapScreen = ({route}) => {
  // MAP FIT SETTINGS
  const {width, height} = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.02;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const navigation = useNavigation();

  // STATES FOR ORIGIN AND DESTINATION
  const [origin, setOrigin] = useState({
    latitude: 55.8752632,
    longitude: -4.2934001,
  });
  const destination = {
    latitude: route.params.paramKey.latitude,
    longitude: route.params.paramKey.longitude,
  };
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);

  // REQUESTING FOR USER PERMISSIONS
  useEffect(() => {
    const requestLocationPermission = async () => {
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
            getCurrentLocation();
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
            getCurrentLocation();
          },
          () => {
            console.log('error');
          },
        );
      }
    };
    requestLocationPermission();
  }, []);

  // GETTING CURRENT LOCATION ONCE
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const originCoords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setOrigin(originCoords);
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  // TO GET LIVE LOCATION EVERY
  useEffect(() => {
    const interval = setInterval(() => {
      getCurrentLocation();
      console.log('You have moved');
    }, 6000);
    return () => clearInterval(interval);
  });

  // CONSOLE LOGS FOR TESTING
  console.log('This is destination address', route.params.paramKey);
  console.log('This is current location:', origin);
  console.log('This is destination location:', destination);
  console.log(distance);

  // TO GET JOURNEY DISTANCE AND DURATION
  const fetchTime = (d, t) => {
    setDistance(d);
    setDuration(t);
  };
  const mapRef = useRef();
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}>
        {origin !== undefined ? (
          <Marker coordinate={origin} image={ImagePath.icCurLoc}></Marker>
        ) : null}
        {destination !== undefined ? (
          <Marker coordinate={destination}></Marker>
        ) : null}

        {origin && destination ? (
          <MapViewDirections
            origin={origin}
            destination={destination}
            strokeColor="blue"
            strokeWidth={4}
            apikey={GOOGLE_MAPS_API_KEY}
            mode="WALKING"
            optimizeWaypoints={true}
            onStart={params => {
              console.log(
                `Started routing between "${params.origin}" and "${params.destination}"`,
              );
            }}
            onReady={result => {
              console.log(`Distance: ${result.distance} km`);
              console.log(`Duration: ${result.duration} min.`);
              fetchTime(result.distance, result.duration);
              mapRef.current.fitToCoordinates([origin, destination], {
                edgePadding: {
                  // right: width / 20,
                  // bottom: height / 20,
                  // left: width / 20,
                  // top: height / 20,
                },
              });
            }}
            onError={errorMessage => {
              // console.log('GOT AN ERROR');
            }}
          />
        ) : null}
      </MapView>
      {distance && duration ? (
        <View style={styles.journeyInfoContainer}>
          <Text>DISTANCE: {distance.toFixed(2)} km</Text>
          <Text>DURATION: {Math.ceil(duration)} min</Text>
        </View>
      ) : null}

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
  journeyInfoContainer: {
    position: 'absolute',
    width: 'auto',
    height: 'auto',
    padding: 100,
    borderRadius: 8,
  },
  journeyInfoText: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
