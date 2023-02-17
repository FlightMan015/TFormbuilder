/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import type {Node} from 'react';
import {useColorScheme, PermissionsAndroid, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import FieldMenu from './src/components/FieldMenu';
import Header from './src/components/Header';
import {darkTheme, lightTheme} from './src/theme';
import {Provider as PaperProvider, MD3LightTheme as DefaultTheme, MD3DarkTheme as DefaultDarkTheme} from 'react-native-paper';
import GeoLocation from 'react-native-geolocation-service';
import { MenuProvider } from 'react-native-popup-menu';
import BitmapDrawingDlg from './src/dialogs/BitmapDrawingDlg';
import BitmapEditLinkDlg from './src/dialogs/BitmapEditLinkDlg';
import formStore from './src/store/formStore';
import CalendarDlg from './src/dialogs/CalendarDlg';
import FormJsonDlg from './src/dialogs/FormJsonDlg';

const App: () => Node = () => {
  const scheme = useColorScheme();
  const formData = formStore(state => state.formData);
  const viewMode = formStore(state => state.viewMode);
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
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]).then(e => {
        // getFormData();
      });
    }
  }
  useEffect(() => {
    requestPermissions();
  }, []);
  return (
    <PaperProvider
      theme={
        (viewMode === 'dark') ?
          {...darkTheme[formData.theme], colors: {...darkTheme[formData.theme].colors, background: formData.darkStyle.formBackgroundColor, card: formData.darkStyle.foregroundColor}, fonts: {headings: formData.darkStyle.headings, labels: formData.darkStyle.labels, values: formData.darkStyle.values}}
          : {...lightTheme[formData.theme], colors: {...lightTheme[formData.theme].colors, background: formData.lightStyle.formBackgroundColor, card: formData.lightStyle.foregroundColor}, fonts: {headings: formData.lightStyle.headings, labels: formData.lightStyle.labels, values: formData.lightStyle.values}}}>
      <MenuProvider>
        <NavigationContainer>
          <Header />
          <FieldMenu />
          <BitmapDrawingDlg />
          <BitmapEditLinkDlg />
          <CalendarDlg />
          <FormJsonDlg />
        </NavigationContainer>
      </MenuProvider>
    </PaperProvider>
  );
};

export default App;
