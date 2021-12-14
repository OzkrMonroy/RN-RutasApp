import 'react-native-gesture-handler';
import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/navigator/Navigator';
import { PermissionsState } from './src/context/PermissionsState';

const AppState = ({ children }: any) => {
  return (
    <PermissionsState>
      {children}
    </PermissionsState>
  )
}

const App = () => {

  return (
    <NavigationContainer>
      <AppState>
        <Navigator/>
      </AppState>
    </NavigationContainer>
  );
};

export default App;
