import { useEffect, useRef, useState } from 'react'
import Geolocation from '@react-native-community/geolocation';
import { Location } from '../interfaces/appInterfaces';

export const useLocation = () => {
  const [hasLocation, setHasLocation] = useState(false)
  const [routesLine, setRoutesLine] = useState<Location[]>([])
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
          setRoutesLine(routes => [ ...routes, location ])
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
        const location : Location = { latitude: coords.latitude, longitude: coords.longitude } 
        setUserLocation(location)
        setRoutesLine(routes => [ ...routes, location ])
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
    routesLine,
    getCurrentPosition,
    followUserLocation,
    stopFollowUserLocation
  }
}
