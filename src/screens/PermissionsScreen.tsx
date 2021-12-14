import React from 'react'
import { View, Text, StyleSheet, Button, Platform } from 'react-native'
import { PERMISSIONS, PermissionStatus, request } from 'react-native-permissions'

export const PermissionsScreen = () => {

  const checkPermission = async () => {
    let permissionStatus: PermissionStatus;

    if(Platform.OS === 'ios'){
      permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
    }else {
      permissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
    }
  }

  return (
    <View style={styles.container}>
      <Text>Permissions screen</Text>
      <Button
        title='GPS permission'
        onPress={checkPermission}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})