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
import RNFS from 'react-native-fs';
import FormSaveDlg from './src/dialogs/FormSaveDlg';

const App: () => Node = () => {
  const scheme = useColorScheme();
  const formData = formStore(state => state.formData);
  const formDatas = formStore(state => state.formDatas);
  const setFormDatas = formStore(state => state.setFormDatas);
  const viewMode = formStore(state => state.viewMode);
  const setFormData = formStore(state => state.setFormData);

  const getFormData = async (data) => {
    var path = `${RNFS.DocumentDirectoryPath}/TForm`;
    path += '/form_data.json';
    RNFS.exists(path).then(exist => {
      if (exist) {
        RNFS.readFile(path, 'utf8')
          .then((readdata) => {
            const formData = JSON.parse(readdata);
            setFormDatas(formData);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    });
  };

  async function requestPermissions() {
    if (Platform.OS === 'ios') {
      GeoLocation.setRNConfiguration({
        // skipPermissionRequests: false,
        authorizationLevel: 'whenInUse',
      });
      GeoLocation.requestAuthorization();

      return null;
    }

    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]).then(e => {
        getFormData();
      });
    }
  }

  const saveData = async (data) => {
    var path = `${RNFS.DocumentDirectoryPath}/TForm`;
    RNFS.mkdir(path);
    path += '/form_data.json';
    RNFS.exists(path).then(exist => {
      if (exist) {
        RNFS.readFile(path, 'utf8')
          .then((readdata) => {
            const tempformData = JSON.parse(readdata);
            const index = tempformData.findIndex(e => e.name === data.name);
            if (index < 0) {
              tempformData.push(data);
            } else {
              tempformData.splice(index, 1, data);
            }
            RNFS.writeFile(path, JSON.stringify(tempformData), 'utf8')
              .then((success) => {
                console.log(path, 'Success Adding');
                setFormDatas(tempformData);
              })
              .catch((err) => {
                console.log(path, err.message);
              });
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        const tempformData = [];
        tempformData.push(data);
        RNFS.writeFile(path, JSON.stringify(tempformData), 'utf8')
          .then((success) => {
            console.log(path, 'Success Save');
          })
          .catch((err) => {
            console.log(path, err.message);
          });
      }
    });
  };

  const deleteForm = (name) => {
    var path = `${RNFS.DocumentDirectoryPath}/TForm/form_data.json`;
    RNFS.exists(path).then(exist => {
      if (exist) {
        RNFS.readFile(path, 'utf8')
          .then((readdata) => {
            const tempformData = JSON.parse(readdata);
            const deleteIndex = tempformData.findIndex(e => e.name === name);
            tempformData.splice(deleteIndex, 1);

            RNFS.writeFile(path, JSON.stringify(tempformData), 'utf8')
              .then((success) => {
                console.log(path, 'Successful Delete');
                setFormDatas(tempformData);
              })
              .catch((err) => {
                console.log(path, err.message);
              });
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    });
  };

  const renameForm = (data) => {
    var path = `${RNFS.DocumentDirectoryPath}/TForm/form_data.json`;
    RNFS.exists(path).then(exist => {
      if (exist) {
        RNFS.readFile(path, 'utf8')
          .then((readdata) => {
            const tempformData = JSON.parse(readdata);
            const changedIndex = tempformData.findIndex(
              form => form.name === data.oldName,
            );
            const changedFormData = Object.assign(tempformData[changedIndex]);
            const newFormData = {...changedFormData, name: data.newName};
            tempformData.splice(changedIndex, 1, newFormData);

            RNFS.writeFile(path, JSON.stringify(tempformData), 'utf8')
              .then((success) => {
                console.log(path, 'Successful Rename');

                setFormDatas(tempformData);
                setFormData(tempformData[changedIndex])
              })
              .catch((err) => {
                console.log(path, err.message);
              });
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    });
  };

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
          <Header deleteForm={deleteForm} renameForm={renameForm} saveForm={saveData} />
          <FieldMenu />
          <BitmapDrawingDlg />
          <BitmapEditLinkDlg />
          <CalendarDlg />
          <FormJsonDlg />
          <FormSaveDlg saveForm={saveData} renameForm={renameForm} />
        </NavigationContainer>
      </MenuProvider>
    </PaperProvider>
  );
};

export default App;
