/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import type {Node} from 'react';
import {useColorScheme} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import FieldMenu from './src/components/FieldMenu';
import Header from './src/components/Header';
import {darkTheme, lightTheme} from './src/theme';
import {Provider as PaperProvider, MD3LightTheme as DefaultTheme, MD3DarkTheme as DefaultDarkTheme} from 'react-native-paper';
import GeoLocation from 'react-native-geolocation-service';
import {
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import BitmapDrawingDlg from './src/dialogs/BitmapDrawingDlg';
import BitmapEditLinkDlg from './src/dialogs/BitmapEditLinkDlg';

const App: () => Node = () => {
  const scheme = useColorScheme();
  async function requestPermissions() {
    if (Platform.OS === 'ios') {
      GeoLocation.setRNConfiguration({
        // skipPermissionRequests: false,
        authorizationLevel: 'whenInUse',
      });
      GeoLocation.requestAuthorization();
    }

    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]).then(e => {
        // getFormData();
      });
    }
  }
  useEffect(() => {
    requestPermissions();
  }, []);
  return (
    <PaperProvider theme={scheme === 'dark' ? darkTheme : lightTheme}>
      <MenuProvider>
        <NavigationContainer>
          <Header />
          <FieldMenu />
          <BitmapDrawingDlg />
          <BitmapEditLinkDlg />
        </NavigationContainer>
      </MenuProvider>
    </PaperProvider>
  );
};

export default App;
