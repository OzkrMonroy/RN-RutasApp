import React, { useEffect, useRef } from 'react'
import MapView, { Polyline } from 'react-native-maps'
import { useLocation } from '../hooks/useLocation'
import { LoadingScreen } from '../screens/LoadingScreen'
import { Fab } from './Fab'

export const Map = () => {
  const { hasLocation, initialPosition, userLocation, routesLine, getCurrentPosition, followUserLocation, stopFollowUserLocation } = useLocation()
  const mapViewRef = useRef<MapView>()
  const following = useRef(true)

  useEffect(() => {
    followUserLocation()
    return () => {
      stopFollowUserLocation()
    }
  }, [])

  useEffect(() => {
    if(!following.current) return
    mapViewRef.current?.animateCamera({
      center: userLocation
    })
  }, [userLocation])

  if(!hasLocation){
    return <LoadingScreen/>
  }

  const centerCamera = async () => {
    const location = await getCurrentPosition()
    following.current = true
    mapViewRef.current?.animateCamera({
      center: location
    })
  }

  return (
    <>
      <MapView
        ref={el => mapViewRef.current = el!}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: initialPosition.latitude,
          longitude: initialPosition.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation
        onTouchStart={() => following.current = false}
      >
        <Polyline
          coordinates={routesLine}
          strokeColor='black'
          strokeWidth={3}
        />
        {/* <Marker
          image={require('../assets/custom-marker.png')}
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title={'This is a title'}
          description={'This is a description'}
        /> */}
      </MapView>
      <Fab
        iconName='compass-outline'
        onPress={centerCamera}
        style={{ position: 'absolute', right: 20, bottom: 20 }}
      />
    </>
  )
}
