import React, { useState } from 'react'
import { permissionInitialState, PermissionsContext } from './PermissionsContext'

export const PermissionsState = ({ children }: any) => {
  const [permissions, setPermissions] = useState(permissionInitialState)

  const checkLocationPermission = () => {}
  const askLocationPermission = () => {}

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
