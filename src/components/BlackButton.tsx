import React from 'react'
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native'

interface Props {
  title: string;
  onPress: () => void
  styles?: StyleProp<ViewStyle>
}

export const BlackButton = ({ title, onPress, styles = {} }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={{
        ...styles as any,
        ...buttonStyles.blackButton
      }}
    >
      <Text style={buttonStyles.blackButtonText}>{title}</Text>
    </TouchableOpacity>
  )
}

const buttonStyles = StyleSheet.create({
  blackButton: {
    height: 50,
    width: 200,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: .27,
    elevation: 8,
    marginBottom: 20
  },
  blackButtonText: {
    color: 'white',
    fontSize: 18
  }
})