import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { BlackButton } from '../components/BlackButton'
import { PermissionsContext } from '../context/PermissionsContext'

export const PermissionsScreen = () => {
  const { permissions, askLocationPermission } = useContext(PermissionsContext)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Es necesario elpermiso del gps para usar esta aplicación.</Text>
      <BlackButton title='GPS permission' onPress={askLocationPermission}/>
      <Text style={{ color: 'black' }}>{JSON.stringify(permissions, null, 5)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    width: 250,
    textAlign: 'center',
    marginBottom: 20
  }
})