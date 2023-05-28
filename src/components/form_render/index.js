import React, {createContext, useRef, useEffect} from 'react';
import {useTheme, IconButton} from 'react-native-paper';
import {StyleSheet, View, Text} from 'react-native';
import formStore from '../../store/formStore';
import MemoField from './fields';
import MemoGroup from './groups';
import {componentName} from '../../constant';
import {ScrollView} from 'react-native-gesture-handler';
import PatternBackgroundView from '../../common/PatternBackgroundView';
import TextButton from '../../common/TextButton';
import RNFS from 'react-native-fs';
import DialogFieldDlg from '../../dialogs/DialogFieldDlg';
import BitmapMarkerAddDlg from '../../dialogs/BitmapMarkerAddDlg';

export const ScrollEnabledContext = createContext(null);

const FormRender = ({navigation, route}) => {
  const {colors, fonts, size} = useTheme();
  const formData = formStore(state => state.formData);
  const userRole = formStore(state => state.userRole);
  const formValue = formStore(state => state.formValue);
  const i18nValues = formStore(state => state.i18nValues);
  const userEmail = formStore(state => state.userEmail);
  const setFormValues = formStore(state => state.setFormValues);
  const selectedFormValueId = formStore(state => state.selectedFormValueId);
  const setFormValue = formStore(state => state.setFormValue);
  const setSelectedFormValueId = formStore(state => state.setSelectedFormValueId);

  const ref = useRef(true);
  const setIsEnabled = (bool) => {
    ref.current && ref.current.setNativeProps({scrollEnabled: bool});
  };

  const saveFormValue = async () => {
    var path = `${RNFS.ExternalDirectoryPath}/TForm`;
    const path2 = path + '/value_data.json';
    RNFS.exists(path2).then(exist => {
      if (exist) {
        RNFS.readFile(path2, 'utf8')
          .then((readdata) => {
            const tempValues = JSON.parse(readdata);
            const index = tempValues.findIndex(e => e.id === selectedFormValueId);
            if (index < 0) {
              tempValues.push({
                formId: formData.id,
                value: formValue,
                roleToPass: formData.roles[1].name,
                submitterId: userEmail,
                id: `value-${Date.now()}`,
                submittedDate: `${new Date(Date.now()).toISOString().replace('T', ' ').replace(new RegExp('-', 'g'), '/').split('.')[0]}`,
              });
            } else {
              const tempRoleIndex = formData.roles.findIndex(r => r.name === userRole.name);
              const oldValue = {...tempValues[index]};
              tempValues.splice(index, 1, {...oldValue, roleToPass: (tempRoleIndex + 1) < formData.roles.length ? formData.roles[tempRoleIndex + 1].name : ''});
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
        tempValues.push({
          formId: formData.id,
          value: formValue,
          roleToPass: formData.roles[0].name,
          submitterId: userEmail,
          id: `value-${Date.now()}`,
          submittedDate: `${new Date(Date.now()).toISOString().replace('T', ' ').replace(new RegExp('-', 'g'), '/').split('.')[0]}`,
        });
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

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <PatternBackgroundView
          imageWidth={20}
          imageHeight={20}
          imageUri={formData.lightStyle.backgroundPatternImage}
          backgroundColor={colors.background}
        />
      </View>
      <View
        style={{flex: 1, position: 'absolute', width: '100%', height: '100%'}}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <IconButton
            icon="arrow-left"
            size={size.s25}
            iconColor={fonts.headings.color}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text style={{...fonts.headings, fontSize: 20}}>{formData.name}</Text>
          <View></View>
        </View>
        <ScrollEnabledContext.Provider value={setIsEnabled}>
          <ScrollView ref={ref} style={styles.container(colors)}>
            <View style={{paddingBottom: 50}}>
              {formData.data.map((field, index) => {
                console.log('role---------------', userRole.name, formData.roles)
                const role = formData.roles.find(e => e.name === userRole.name).fieldRoles[field.field_name];
                
                return <View key={index}>
                  {field.component !== componentName.TABSECTION &&
                  field.component !== componentName.GROUP &&
                  field.component !== componentName.GRID &&
                  field.component !== componentName.LISTSECTION ? (
                    <MemoField
                      key={index}
                      element={field}
                      index={[index]}
                      role={role}
                    />
                  ) : (
                    <MemoGroup
                      key={index}
                      element={field}
                      index={[index]}
                      role={role}
                    />
                  )}
                </View>
              })}
              {
                !route?.params?.for && userRole.submit && (
                  <TextButton
                    style={styles.submitBtn(colors)}
                    text={i18nValues.t("setting_labels.submit")}
                    textStyle={{...fonts.values, color: '#FFFFFF'}}
                    onPress={() => {
                      saveFormValue(formValue);
                      navigation.goBack();
                      setFormValue({});
                      setSelectedFormValueId('');
                    }}
                  />
                )
              }
              {
                !route?.params?.for && userRole.view && (
                  <TextButton
                  style={styles.submitBtn(colors)}
                    text={i18nValues.t("setting_labels.approve")}
                    textStyle={{...fonts.values, color: '#FFFFFF'}}
                    onPress={() => {
                      saveFormValue(formValue);
                      navigation.goBack();
                      setFormValue({});
                      setSelectedFormValueId('');
                    }}
                  />
                )
              }
              {
                !route?.params?.for && userRole.edit && (
                  <TextButton
                    style={styles.submitBtn(colors)}
                    text={i18nValues.t("setting_labels.check")}
                    textStyle={{...fonts.values, color: '#FFFFFF'}}
                    onPress={() => {
                      saveFormValue(formValue);
                      navigation.goBack();
                      setFormValue({});
                      setSelectedFormValueId('');
                    }}
                  />
                )
              }
            </View>
          </ScrollView>
        </ScrollEnabledContext.Provider>
      </View>
      <DialogFieldDlg />
      <BitmapMarkerAddDlg />
    </View>
  );
};

const styles = StyleSheet.create({
  setIcons: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  container: colors => ({
    flex: 1,
    paddingHorizontal: 5,
    paddingBottom: 50,
  }),
  addFieldButton: colors => ({
    backgroundColor: colors.colorButton,
    margin: 10,
    position: 'absolute',
    bottom: 0,
  }),
  previewForm: colors => ({
    backgroundColor: 'green',
    margin: 10,
    position: 'absolute',
    bottom: 0,
    right: 0,
  }),
  previewJSON: colors => ({
    backgroundColor: 'grey',
    margin: 10,
    position: 'absolute',
    bottom: 0,
    right: 55,
  }),
  submitBtn: colors => ({
    backgroundColor: colors.colorButton,
    width: 200,
    height: 40,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 10
  })
});

export default FormRender;
