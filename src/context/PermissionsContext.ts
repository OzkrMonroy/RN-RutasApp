import { createContext } from 'react';
import { PermissionStatus } from 'react-native-permissions';

export interface PermissionsStateInterface {
  locationStatus: PermissionStatus;
}

export const permissionInitialState: PermissionsStateInterface = {
  locationStatus: 'unavailable'
}

export type permissionsContextProps = {
  permissions: PermissionsStateInterface,
  askLocationPermission: () => void,
  checkLocationPermission: () => void
}

export const PermissionsContext = createContext({} as permissionsContextProps)