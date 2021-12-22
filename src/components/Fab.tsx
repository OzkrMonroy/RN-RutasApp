import React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  iconName: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const Fab = ({ iconName, onPress, style }: Props) => {
  return (
    <View style={{ ...(style as any) }}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={styles.blackButton}>
        <Icon name={iconName} size={35} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  blackButton: {
    zIndex: 999,
    height: 64,
    width: 64,
    backgroundColor: 'black',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: .27,
    elevation: 8,
  },
});
