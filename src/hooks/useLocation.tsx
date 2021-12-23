import { useEffect, useRef, useState } from 'react'
import Geolocation from '@react-native-community/geolocation';
import { Location } from '../interfaces/appInterfaces';

export const useLocation = () => {
  const [hasLocation, setHasLocation] = useState(false)
  const [initialPosition, setInitialPosition] = useState<Location>({
    longitude: 0,
    latitude: 0
  })
  const [userLocation, setUserLocation] = useState<Location>({ latitude: 0, longitude: 0})
  const watchId = useRef<number>()

  useEffect(() => {;
      getCurrentPosition()
        .then(location => {
          setInitialPosition(location)
          setUserLocation(location)
          setHasLocation(true)
        })
        .catch(error => {})
  }, [])

  const getCurrentPosition = () : Promise<Location> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        ({ coords }) => {
          resolve({ latitude: coords.latitude, longitude: coords.longitude })
        }, 
        (error) => {
          reject({ error })
          // setHasLocation(true)
        }
      );
    })
  }

  const followUserLocation = () => {
    watchId.current = Geolocation.watchPosition(
      ({ coords }) => {
        setUserLocation({ latitude: coords.latitude, longitude: coords.longitude })
      },
      (error) => console.log(error),
      { distanceFilter: 20 }
      
    )
  }

  const stopFollowUserLocation = () => {
    if(watchId.current)
    Geolocation.clearWatch(watchId.current)
  }

  return  {
    hasLocation,
    initialPosition,
    userLocation,
    getCurrentPosition,
    followUserLocation,
    stopFollowUserLocation
  }
}
