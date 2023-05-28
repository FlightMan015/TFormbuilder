import React from 'react';
import {useTheme} from 'react-native-paper';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import formStore from '../store/formStore';
import Icon from 'react-native-vector-icons/Feather';
import {IconButton} from 'react-native-paper';
import { useEffect, useState } from 'react';
import { newFormData, languages } from '../constant';
import {useNavigation} from '@react-navigation/native';
import RNFS from 'react-native-fs';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const HomeScreen = ({navigation}) => {
    const {colors, fonts, size} = useTheme();
    const i18nValues = formStore(state => state.i18nValues);
    const userEmail = formStore(state => state.userEmail);
    const formDatas = formStore(state => state.formDatas);
    const setFormsIsSet = formStore(state => state.setFormsIsSet);
    const setFormsIsView = formStore(state => state.setFormsIsView);
    const formsIsSet = formStore(state => state.formsIsSet);
    const setFormData = formStore(state => state.setFormData);
    const setFormDatas = formStore(state => state.setFormDatas);
    const setUserRole = formStore(state => state.setUserRole);
    const formValues = formStore(state => state.formValues);
    const seti18nValues = formStore(state => state.seti18nValues);
    const [inboxNum, setInboxNum] = useState(0);


    const deleteForm = (formId) => {
      var path1 = `${RNFS.ExternalDirectoryPath}/TForm/form_data.json`;
      RNFS.exists(path1).then(exist => {
        if (exist) {
          RNFS.readFile(path1, 'utf8')
            .then((readdata) => {
              const tempformData = JSON.parse(readdata);
              const deleteIndex = tempformData.findIndex(e => e.id === formId);
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
  
      // var path2 = `${RNFS.ExternalDirectoryPath}/TForm/value_data.json`;
      // RNFS.exists(path2).then(exist => {
      //   if (exist) {
      //     RNFS.readFile(path2, 'utf8')
      //       .then((readdata) => {
      //         const tempformData = JSON.parse(readdata);
      //         const deleteIndex = tempformData.findIndex(e => e.formId === formId);
      //         tempformData.splice(deleteIndex, 1);
  
      //         RNFS.writeFile(path2, JSON.stringify(tempformData), 'utf8')
      //           .then((success) => {
      //             console.log(path2, 'Successful Delete');
      //             setFormValues(tempformData);
      //           })
      //           .catch((err) => {
      //             console.log(path2, err.message);
      //           });
      //       })
      //       .catch((err) => {
      //         console.log(err.message);
      //       });
      //   }
      // });
    };

    useEffect(() => {
      const tempFormsIsSet = [];
      const tempFormsIsView = [];

      var numberOfSubmissions = 0;
      formDatas.map((formData, formIndex) => {
        if (formData.makerId === userEmail || `${formData.isPublic}` === 'true' || formData.isShared.findIndex(id => id === userEmail) !== -1) {
          tempFormsIsSet.push(formData);
        } else {
          const userRole = [];
          var isInRole = false;
          formData.roles.map((role, roleIndex) => {
            if (!role.submit && (role.enableAllUsers || role.users.findIndex(id => id === userEmail) !== -1)) {
              userRole.push(role.name);
              isInRole = true;
            }
            if (role.submit && (role.enableAllUsers || role.users.findIndex(id => id === userEmail) !== -1)) {
              tempFormsIsSet.push(formData);
            }
          });
          if (isInRole) {
            tempFormsIsView.push(formData);
            const roles = [];
            formData.roles.map(r => {
              if (r.users.includes(userEmail) || r.enableAllUsers) {
                roles.push(r.name);
              }
            });
            const valuesToView = formValues.filter(value => value.formId === formData.id && roles.includes(value.roleToPass));
            numberOfSubmissions += valuesToView.length;
          }
        }
      });
      setInboxNum(numberOfSubmissions);
      setFormsIsSet(tempFormsIsSet);
      setFormsIsView(tempFormsIsView);
    }, [JSON.stringify(formDatas), JSON.stringify(formValues)]);

    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row'}}>
            <IconButton
              icon="inbox"
              size={size.s25}
              iconColor={fonts.headings.color}
              onPress={() => {
                navigation.navigate('Inbox');
              }}
            />
            <Text
              style={{
                ...fonts.values,
                backgroundColor: 'red',
                color: '#FFFFFF',
                borderRadius: 50,
                width: 20,
                height: 20,
                textAlign: 'center',
                position: 'relative',
                top: 5,
                left: -25
              }}>{inboxNum}</Text>
          </View>
          <Text style={{...fonts.headings, fontSize: 20}}>{i18nValues.t("setting_labels.forms")}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Menu>
              <MenuTrigger>
                <IconButton
                  icon="earth"
                  size={size.s25}
                  iconColor={fonts.headings.color}
                />
              </MenuTrigger>
              <MenuOptions>
                {languages.map((item, index) => {
                  return (
                    <MenuOption key={index} style={{padding: 0}} onSelect={() => {
                      const tempValues = {...i18nValues};
                      tempValues.locale = item.code;
                      seti18nValues(tempValues);
                    }}>
                      <View
                        key={index}
                        style={styles.fieldListItem}>
                        <View style={styles.fieldIcon}>
                          {
                            item.code === i18nValues.locale && (
                              <Icon name="check" size={18} color={'white'} />
                            )
                          }
                        </View>
                        <View style={styles.fieldText}>
                          <Text style={styles.fieldNameText}>{item.name}</Text>
                        </View>
                      </View>
                    </MenuOption>
                  );
                })}
              </MenuOptions>
            </Menu>
            <IconButton
              icon="logout-variant"
              size={size.s25}
              iconColor={fonts.headings.color}
              onPress={() => {
                navigation.navigate('LogIn');
              }}
            />
          </View>
        </View>
        {
          formsIsSet.map((data, dataIndex) => {
            const numberOfSubmissions = formValues.filter((value, index) => value.submitterId === userEmail && value.formId === data.id).length;
            return <TouchableOpacity
              key={dataIndex}
              style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingVertical: 5, marginVertical: 2, marginHorizontal: 10}}
              onPress={() => {
                setFormData(data);
                navigation.navigate('Submission', {from: 'home'});
              }}>
              <Icon name="file-text" size={25} color={fonts.values.color} />
              <View style={{marginLeft: 10, flex: 1}}>
                <Text style={{...fonts.values, fontSize: 18}}>{data.name}</Text>
                <Text style={{...fonts.values, fontSize: 12}}>{`${numberOfSubmissions} ${i18nValues.t("setting_labels.submissions")}`}</Text>
              </View>
              {
                data.makerId === userEmail && (
                  <>
                    <IconButton
                      icon="pencil-outline"
                      size={size.s20}
                      iconColor={fonts.headings.color}
                      onPress={() => {
                        setFormData(data);
                        navigation.navigate('Builder');
                      }}
                    />
                    <IconButton
                      icon="delete-outline"
                      size={size.s20}
                      iconColor={fonts.headings.color}
                      onPress={() => {
                        deleteForm(data.id);
                      }}
                    />
                  </>
                )
              }
            </TouchableOpacity>;
          })
        }
        <IconButton
          icon="plus"
          size={size.s30}
          iconColor={colors.background}
          style={{position: 'absolute', bottom: 10, right: 10, backgroundColor: colors.colorButton}}
          onPress={() => {
            setFormData(newFormData);
            navigation.navigate('Builder');
          }}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  fieldListItem: {
    height: 40,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#4C5360',
  },
  fieldNameText: {
    color: '#fff',
  },
  fieldText: {
    flex: 1,
    backgroundColor: '#565F6E',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  fieldIcon: {
    backgroundColor: '#394049',
    width: 40,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default HomeScreen;