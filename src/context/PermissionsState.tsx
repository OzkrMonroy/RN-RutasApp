import React, { useEffect, useState } from 'react'
import { AppState, Platform } from 'react-native'
import { check, openSettings, PERMISSIONS, PermissionStatus, request } from 'react-native-permissions'
import { permissionInitialState, PermissionsContext } from './PermissionsContext'

export const PermissionsState = ({ children }: any) => {
  const [permissions, setPermissions] = useState(permissionInitialState)

  useEffect(() => {
    checkLocationPermission()
    AppState.addEventListener('change', state => {
      if(state !== 'active') return
      checkLocationPermission()
    })

    return () => {
      // AppState.
    }
  }, [])

  const askLocationPermission = async () => {
    let permissionStatus: PermissionStatus;

    if(Platform.OS === 'ios'){
      permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
    }else {
      permissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
    }

    if(permissionStatus === 'blocked'){
      openSettings()
    }

    setPermissions({...permissions, locationStatus: permissionStatus  })
  }

  const checkLocationPermission = async () => {
    let permissionStatus: PermissionStatus;

    if(Platform.OS === 'ios'){
      permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
    }else {
      permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
    }
    setPermissions({...permissions, locationStatus: permissionStatus  })
  }

  return (
    <PermissionsContext.Provider value={{
      permissions,
      checkLocationPermission,
      askLocationPermission
    }}>
      { children }
    </PermissionsContext.Provider>
  )
}
