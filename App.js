/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import type {Node} from 'react';
import {useColorScheme, PermissionsAndroid, Platform, StatusBar, SafeAreaView, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
import SchedularDlg from './src/dialogs/SchedularDlg';
import MapEditDlg from './src/dialogs/MapEditDlg';
import LogIn from './src/components/LogIn';

const Stack = createNativeStackNavigator();

const createData = async () => {
  var path = `${RNFS.ExternalDirectoryPath}/TForm`;
  await RNFS.exists(path).then(exist => {
    if (!exist) {
      RNFS.mkdir(path);
    } else {
      const path1 = path + '/form_data.json';
      RNFS.exists(path1).then(exist1 => {
        if (!exist1) {
          RNFS.writeFile(path1, '[]', 'utf8')
            .then((success) => {
              console.log(path1, 'Success Create');
            })
            .catch((err) => {
              console.log(path1, err.message);
            });
        }
      });
      const path2 = path + '/value_data.json';
      RNFS.exists(path2).then(exist1 => {
        if (!exist1) {
          RNFS.writeFile(path2, '[]', 'utf8')
            .then((success) => {
              console.log(path2, 'Success Create');
            })
            .catch((err) => {
              console.log(path2, err.message);
            });
        }
      });
    }
  });
}

const HomeScreen = (props) => {

  const scheme = useColorScheme();
  const setFormDatas = formStore(state => state.setFormDatas);
  const setFormValues = formStore(state => state.setFormValues);
  const setFormData = formStore(state => state.setFormData);
  const formValue = formStore(state => state.formValue);

  createData();

  const saveData = async (data) => {
    var path = `${RNFS.ExternalDirectoryPath}/TForm`;

    RNFS.exists(path).then(exist => {
      if (!exist) {
        RNFS.mkdir(path);
      }
    });

    const path1 = path + '/form_data.json';
    RNFS.exists(path1).then(exist => {
      if (exist) {
        RNFS.readFile(path1, 'utf8')
          .then((readdata) => {
            const tempformData = JSON.parse(readdata);
            const index = tempformData.findIndex(e => e.name === data.name);
            if (index < 0) {
              tempformData.push(data);
            } else {
              tempformData.splice(index, 1, data);
            }
            RNFS.writeFile(path1, JSON.stringify(tempformData), 'utf8')
              .then((success) => {
                console.log(path1, 'Success Adding');
                setFormDatas(tempformData);
              })
              .catch((err) => {
                console.log(path1, err.message);
              });
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        const tempformData = [];
        tempformData.push(data);
        RNFS.writeFile(path1, JSON.stringify(tempformData), 'utf8')
          .then((success) => {
            console.log(path1, 'Success Save');
          })
          .catch((err) => {
            console.log(path1, err.message);
          });
      }
    });

    const path2 = path + '/value_data.json';
    RNFS.exists(path2).then(exist => {
      if (exist) {
        RNFS.readFile(path2, 'utf8')
          .then((readdata) => {
            const tempValues = JSON.parse(readdata);
            const index = tempValues.findIndex(e => Object.keys(e)[0] === data.name);
            if (index < 0) {
              tempValues.push({[data.name] : formValue});
            } else {
              tempValues.splice(index, 1, {[data.name] : formValue});
            }
            RNFS.writeFile(path2, JSON.stringify(tempValues), 'utf8')
              .then((success) => {
                console.log(path2, 'Success Adding');
                setFormValues(tempValues);
              })
              .catch((err) => {
                console.log(path2, err.message);
              });
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        const tempValues = [];
        tempValues.push({[data.name] : formValue});
        RNFS.writeFile(path2, JSON.stringify(tempValues), 'utf8')
          .then((success) => {
            console.log(path2, 'Success Save');
          })
          .catch((err) => {
            console.log(path2, err.message);
          });
      }
    });
  };

  const deleteForm = (name) => {
    var path1 = `${RNFS.ExternalDirectoryPath}/TForm/form_data.json`;
    RNFS.exists(path1).then(exist => {
      if (exist) {
        RNFS.readFile(path1, 'utf8')
          .then((readdata) => {
            const tempformData = JSON.parse(readdata);
            const deleteIndex = tempformData.findIndex(e => e.name === name);
            tempformData.splice(deleteIndex, 1);

            RNFS.writeFile(path1, JSON.stringify(tempformData), 'utf8')
              .then((success) => {
                console.log(path1, 'Successful Delete');
                setFormDatas(tempformData);
              })
              .catch((err) => {
                console.log(path1, err.message);
              });
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    });

    var path2 = `${RNFS.ExternalDirectoryPath}/TForm/value_data.json`;
    RNFS.exists(path2).then(exist => {
      if (exist) {
        RNFS.readFile(path2, 'utf8')
          .then((readdata) => {
            const tempformData = JSON.parse(readdata);
            const deleteIndex = tempformData.findIndex(e => Object.keys(e)[0] === name);
            tempformData.splice(deleteIndex, 1);

            RNFS.writeFile(path2, JSON.stringify(tempformData), 'utf8')
              .then((success) => {
                console.log(path2, 'Successful Delete');
                setFormValues(tempformData);
              })
              .catch((err) => {
                console.log(path2, err.message);
              });
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    });
  };

  const renameForm = (data) => {
    var path1 = `${RNFS.ExternalDirectoryPath}/TForm/form_data.json`;
    RNFS.exists(path1).then(exist => {
      if (exist) {
        RNFS.readFile(path1, 'utf8')
          .then((readdata) => {
            const tempformData = JSON.parse(readdata);
            const changedIndex = tempformData.findIndex(
              form => form.name === data.oldName,
            );
            const changedFormData = Object.assign(tempformData[changedIndex]);
            const newFormData = {...changedFormData, name: data.newName};
            tempformData.splice(changedIndex, 1, newFormData);

            RNFS.writeFile(path1, JSON.stringify(tempformData), 'utf8')
              .then((success) => {
                console.log(path1, 'Successful Rename');

                setFormDatas(tempformData);
                setFormData(tempformData[changedIndex])
              })
              .catch((err) => {
                console.log(path1, err.message);
              });
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    });

    var path2 = `${RNFS.ExternalDirectoryPath}/TForm/value_data.json`;
    RNFS.exists(path2).then(exist => {
      if (exist) {
        RNFS.readFile(path2, 'utf8')
          .then((readdata) => {
            const tempformData = JSON.parse(readdata);
            const changedIndex = tempformData.findIndex(
              value => Object.keys(value)[0] === data.oldName,
            );
            tempformData.splice(changedIndex, 1, {[data.newName]: formValue});

            RNFS.writeFile(path2, JSON.stringify(tempformData), 'utf8')
              .then((success) => {
                console.log(path2, 'Successful Rename');

                setFormValues(tempformData);
                setFormValue(tempformData[changedIndex][data.newName]);
              })
              .catch((err) => {
                console.log(path2, err.message);
              });
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    });
  };

  return (
    <View style={{flex: 1}}>
      <Header deleteForm={deleteForm} renameForm={renameForm} saveForm={saveData} />
      <FieldMenu />
      <BitmapDrawingDlg />
      <BitmapEditLinkDlg />
      <CalendarDlg />
      <FormJsonDlg />
      <FormSaveDlg saveForm={saveData} renameForm={renameForm} />
      <SchedularDlg />
      <MapEditDlg />
    </View>
  )
}

const App: () => Node = () => {
  
  const formData = formStore(state => state.formData);
  const viewMode = formStore(state => state.viewMode);
  const setFormDatas = formStore(state => state.setFormDatas);
  const setFormValues = formStore(state => state.setFormValues);

  const getFormData = async (data) => {
    var path = `${RNFS.ExternalDirectoryPath}/TForm`;
    const path1 =  path + '/form_data.json';
    RNFS.exists(path1).then(exist => {
      if (exist) {
        RNFS.readFile(path1, 'utf8')
          .then((readdata) => {
            const formData = JSON.parse(readdata);
            setFormDatas(formData);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    });

    path2 = path + '/value_data.json';
    RNFS.exists(path2).then(exist => {
      if (exist) {
        RNFS.readFile(path2, 'utf8')
          .then((readdata) => {
            const formValue = JSON.parse(readdata);
            setFormValues(formValue);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    });
  };

  async function requestPermissions() {
    if (Platform.OS === 'ios') {
      // GeoLocation.setRNConfiguration({
      //   // skipPermissionRequests: false,
      //   authorizationLevel: 'whenInUse',
      // });
      const status = await GeoLocation.requestAuthorization('whenInUse');

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

  useEffect(() => {
    requestPermissions();
    createData();
  }, []);

  return (
    <PaperProvider
      theme={
        (viewMode === 'dark') ?
          {...darkTheme[formData.theme], colors: {...darkTheme[formData.theme].colors, background: formData.darkStyle.formBackgroundColor, card: formData.darkStyle.foregroundColor, colorButton: formData.darkStyle.buttonBackgroundColor}, fonts: {headings: formData.darkStyle.headings, labels: formData.darkStyle.labels, values: formData.darkStyle.values, buttonTexts: formData.darkStyle.buttonTexts}}
          : {...lightTheme[formData.theme], colors: {...lightTheme[formData.theme].colors, background: formData.lightStyle.formBackgroundColor, card: formData.lightStyle.foregroundColor, colorButton: formData.lightStyle.buttonBackgroundColor}, fonts: {headings: formData.lightStyle.headings, labels: formData.lightStyle.labels, values: formData.lightStyle.values, buttonTexts: formData.lightStyle.buttonTexts}}}>
      <MenuProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}>
            <Stack.Screen name="LogIn" component={LogIn} />
            <Stack.Screen name="Home"  component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </MenuProvider>
    </PaperProvider>
  );
};

export default App;
