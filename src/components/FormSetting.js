import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, Animated, TextInput, useColorScheme} from 'react-native';
import {Avatar, IconButton, Checkbox, useTheme} from 'react-native-paper';
import { componentName } from '../constant';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import formStore from '../store/formStore';
import TextButton from '../common/TextButton';
import ColorPicker from '../common/ColorPicker';
import FontSetting from '../common/FontSetting';
import SettingSwitch from './fieldsetting/common/SettingSwitch';
import SettingDropdown from './fieldsetting/common/SettingDropdown';
import SettingImage from './fieldsetting/common/SettingImage';
import { darkTheme, lightTheme } from '../theme';

const defaultThemes = [
  'Native',
  'Trivergence',
];

const FormSetting = () => {
  const scheme = useColorScheme();
  const formData = formStore(state => state.formData);
  const setFormData = formStore(state => state.setFormData);
  const roles = formStore(state => state.roles);
  const setRoles = formStore(state => state.setRoles);
  const setOpenSetting = formStore(state => state.setOpenSetting);
  const viewMode = formStore(state => state.viewMode);
  const setViewMode = formStore(state => state.setViewMode);

  const {colors} = useTheme();
  const [roleDatas, setRoleDatas] = useState(roles || []);
  const [checkedRoles, setCheckedRoles] = useState(formData.checkedRoles || []);
  const opacity = new Animated.Value(1);
  const previousRoles = useRef(roles || []);
  const [selectedTab, setSelectedTab] = useState('general');


  useEffect(() => {
    if (formData.checkedRoles) {
      const checkedRoleNames = formData.checkedRoles.map(checkedRole => checkedRole.name);
      const tempRoles = roles.map(e => {
        if (checkedRoleNames.indexOf(e.name) >= 0) {
          return {
            ...e,
            check: true,
          };
        } else {
          return e;
        }
      });
      setRoleDatas(tempRoles);
    } else {
      setRoleDatas(roles);
    }
  }, [roles, formData.checkedRoles]);

  const animate1 = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const animate2 = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const onCheckRole = index => {
    const tempRoles = JSON.parse(JSON.stringify(roleDatas));
    const selectedItem = tempRoles[index];
    tempRoles[index] = {
      ...selectedItem,
      check: !selectedItem.check,
    };
    setRoleDatas(tempRoles);
    const tempRoles1 = JSON.parse(JSON.stringify(tempRoles));
    let tempCheckedRoles = [];
    tempCheckedRoles.push({name: 'admin', check: true});
    tempRoles1.map(e => {
      if (e.check) {
        const tempitem = e;
        // delete tempitem.check;
        tempCheckedRoles.push(tempitem);
      }
    });
    // setCheckedRoles(tempCheckedRoles);
    setFormData({...formData,  checkedRoles: tempCheckedRoles});
  };

  const onClickRoles = () => {
    const tempFormData = JSON.parse(JSON.stringify(formData.data));
    const newFormData = tempFormData.map(fieldData => {
      const tempCheckedRoles = JSON.parse(JSON.stringify(checkedRoles));
      let returnRoles = JSON.parse(JSON.stringify(tempCheckedRoles));
      if (fieldData.component === componentName.GROUP) {
        if (fieldData.meta.is_tab) {
          const tempFieldData = JSON.parse(JSON.stringify(fieldData.meta.childs));
          const newFieldData = tempFieldData.map(childData => {
            const tempTabFieldData = JSON.parse(JSON.stringify(childData.meta.childs));
            const newTabFieldData = tempTabFieldData.map(tabChildData => {
              if (tabChildData.role) {
                const oldRoles = JSON.parse(JSON.stringify(tabChildData.role));
                const oldRolesNames = oldRoles.map(r => r.name);
                returnRoles = tempCheckedRoles.map(checkedRole => {
                  const sameIndex = oldRolesNames.indexOf(checkedRole.name);
                  if (sameIndex >= 0) {
                    return oldRoles[sameIndex];
                  } else {
                    if (fieldData.component === componentName.LINECHART || fieldData.component === componentName.RADARCHART) {
                      return {...checkedRole, view: true, editSeries: false, editAxes: false};
                    } else if (fieldData.component === componentName.PAYMENT) {
                      return {...checkedRole, read: true, pay: false};
                    } else {
                      return {...checkedRole, view: true, edit: false};
                    }
                  }
                });
              }
              const tempTabChildData = {
                ...tabChildData,
                role: returnRoles,
              };
              return tempTabChildData;
            });
            const tempTabData = {
              ...childData,
              meta: {
                ...childData.meta,
                childs: newTabFieldData,
              },
            };
            return tempTabData;
          });
          const tempData = {
            ...fieldData,
            meta: {
              ...fieldData.meta,
              childs: newFieldData,
            },
          };
          return tempData;
        } else {
          const tempFieldData = JSON.parse(JSON.stringify(fieldData.meta.childs));
          const newFieldData = tempFieldData.map(childData => {
            if (childData.role) {
              const oldRoles = JSON.parse(JSON.stringify(childData.role));
              const oldRolesNames = oldRoles.map(r => r.name);
              returnRoles = tempCheckedRoles.map(checkedRole => {
                const sameIndex = oldRolesNames.indexOf(checkedRole.name);
                if (sameIndex >= 0) {
                  return oldRoles[sameIndex];
                } else {
                  if (fieldData.component === componentName.LINECHART || fieldData.component === componentName.RADARCHART) {
                    return {...checkedRole, view: true, editSeries: false, editAxes: false};
                  } else if (fieldData.component === componentName.PAYMENT) {
                    return {...checkedRole, read: true, pay: false};
                  } else {
                    return {...checkedRole, view: true, edit: false};
                  }
                }
              });
            }
            const tempChildData = {
              ...childData,
              role: returnRoles,
            };
            return tempChildData;
          });
          const tempData = {
            ...fieldData,
            meta: {
              ...fieldData.meta,
              childs: newFieldData,
            },
          };
          return tempData;
        }
      } else {
        if (fieldData.role) {
          const oldRoles = JSON.parse(JSON.stringify(fieldData.role));
          const oldRolesNames = oldRoles.map(r => r.name);
          returnRoles = tempCheckedRoles.map(checkedRole => {
            const sameIndex = oldRolesNames.indexOf(checkedRole.name);
            if (sameIndex >= 0) {
              return oldRoles[sameIndex];
            } else {
              if (fieldData.component === componentName.LINECHART || fieldData.component === componentName.RADARCHART) {
                return {...checkedRole, view: true, editSeries: false, editAxes: false};
              } else if (fieldData.component === componentName.PAYMENT) {
                return {...checkedRole, read: true, pay: false};
              } else {
                return {...checkedRole, view: true, edit: false};
              }
            }
          });
        }
        const tempData = {
          ...fieldData,
          role: returnRoles,
        };
        return tempData;
      }
    });
    const newFormTemplate = {
      ...formData,
      data: newFormData,
      checkedRoles: checkedRoles,
    };
    setFormData(newFormTemplate);
    hideDialog();
  };

  const onClickCancelDialog = () => {
    hideDialog();
    setRoleDatas(previousRoles.current);
  };

  const renderItem = ({item, drag, isActive, getIndex}) => {
    const index = getIndex();
    const avatarIndex = index + 1;
    return (
      <ScaleDecorator>
        <View style={styles.roleItem}>
          <Animated.View style={{...styles.itemView, opacity}}>
            <Icon
              name="more-vertical"
              size={20}
              color={colors.placeholder}
              style={styles.itemIcon(index)}
            />
            <Avatar.Text
              size={20}
              label={avatarIndex}
              style={{...styles.itemAvatarText, backgroundColor: '#555F6E', borderColor: '#303339'}}
              color={'#FFFFFF'}
            />
          </Animated.View>
          <View style={styles.roleName}>
            <Text style={styles.roleNameText}>{item.name}</Text>
            <IconButton
              icon="drag-horizontal"
              size={20}
              iconColor="#FFFFFF"
              onPress={() => {}}
              // onPressIn={drag}
              onLongPress={drag}
              style={styles.iconBtn}
            />
          </View>
          <Animated.View
            style={{...styles.icon, opacity}}>
            <Checkbox
              status={item.check ? 'checked' : 'unchecked'}
              color='#FFFFFF'
              uncheckedColor='#303339'
              onPress={() => {
                onCheckRole(index);
              }}
            />
          </Animated.View>
        </View>
      </ScaleDecorator>
    );
  };

  const onChange = (key, subkey, value) => {
    if (viewMode === 'light') {
      const newStyles = {...formData.lightStyle, [key]: {...formData.lightStyle[key], [subkey]: value}};
      setFormData({...formData, lightStyle: newStyles});
    } else {
      const newStyles = {...formData.darkStyle, [key]: {...formData.darkStyle[key], [subkey]: value}};
      setFormData({...formData, darkStyle: newStyles});
    }
  }

  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.menuHeader}>
				<Text style={styles.menuTitle}>Form Setting</Text>
				<IconButton
					icon="close"
					size={20}
					iconColor="#FFFFFF"
					onPress={() => {
            setOpenSetting(false);
					}}
				/>
			</View>
      <View style={styles.settingTab}>
        <TextButton
          style={styles.tab(selectedTab === 'general')}
          text="GENERAL"
          textStyle={styles.tabText(selectedTab === 'general')}
          onPress={() => setSelectedTab('general')}
        />
        <TextButton
          style={styles.tab(selectedTab === 'style')}
          text="STYLE"
          textStyle={styles.tabText(selectedTab === 'style')}
          onPress={() => setSelectedTab('style')}
        />
      </View>
      {selectedTab === 'general' && (
        <>
          <View style={styles.settingView}>
            <Text style={styles.titleLabel}>Form Title</Text>
            <TextInput
              style={styles.title}
              value={formData.title}
              onChangeText={newText => {
                setFormData({...formData, title: newText});
              }}
            />
          </View>
          <SettingImage
            title={'Logo'}
            imageUri={formData.logo}
            keyName={'logo'}
            onSelect={(keyname, value) => {
              setFormData({...formData, [keyname]: value});
            }}
          />
          {/* <View style={styles.settingView}>
            <Text style={styles.titleLabel}>Roles</Text>
            <GestureHandlerRootView style={styles.dragItem}>
              <DraggableFlatList
                nestedScrollEnabled
                data={roleDatas}
                onDragBegin={() => {
                  animate1();
                }}
                onDragEnd={({data}) => {
                  setRoleDatas(data);
                  animate2();
                }}
                keyExtractor={(item, i) => i}
                renderItem={renderItem}
              />
            </GestureHandlerRootView>
          </View> */}
        </>
      )}
      {selectedTab === 'style' && (
        <>
          <SettingSwitch
            title={'Display'}
            value={scheme === 'dark' ? viewMode === 'light' ? true : false : viewMode === 'light' ? false : true}
            onChange={(keyName, value) => {
              if (scheme === 'dark') {
                setViewMode(value ? 'light' : 'dark');
              } else {
                setViewMode(value ? 'dark' : 'light');
              }
            }}
            keyName={'darkMode'}
            description={scheme === 'dark' ? 'Light mode' : 'Dark mode'}
          />
          <SettingDropdown
            title={'Theme'}
            options={defaultThemes}
            onChange={(keyName, value) => {
                const darkThemeStyle = {...darkTheme[value].fonts, formBackgroundColor: darkTheme[value].colors.background, foregroundColor: darkTheme[value].colors.card, backgroundPatternImage: darkTheme[value].patternUri};
                const newDarkStyle = {...formData.darkStyle, ...darkThemeStyle};
                const ligthThemeStyle = {...lightTheme[value].fonts, formBackgroundColor: lightTheme[value].colors.background, foregroundColor: lightTheme[value].colors.card, backgroundPatternImage: lightTheme[value].patternUri};
                const newLightStyle = {...formData.lightStyle, ...ligthThemeStyle};
                setFormData({...formData, [keyName]: value, darkStyle: newDarkStyle, lightStyle: newLightStyle});
            }}
            keyName={'theme'}
            defaultValue={formData.theme}
          />
          <SettingImage
            title={'Background Pattern'}
            imageUri={formData.lightStyle.backgroundPatternImage}
            keyName={'backgroundPatternImage'}
            onSelect={(keyname, value) => {
              const newLightStyle = {...formData.lightStyle, [keyname]: value};
              const newDarkStyle = {...formData.darkStyle, [keyname]: value};
              setFormData({...formData, lightStyle: newLightStyle, darkStyle: newDarkStyle});
            }}
          />
          <ColorPicker
            color={viewMode === 'light' ? formData.lightStyle.formBackgroundColor : formData.darkStyle.formBackgroundColor}
            label={'Background Color'}
            selectColor={e => {
              if (viewMode === 'light') {
                const newStyle = {...formData.lightStyle, formBackgroundColor: e};
                setFormData({...formData, lightStyle: newStyle});
              }
              if (viewMode === 'dark') {
                const newStyle = {...formData.darkStyle, formBackgroundColor: e};
                setFormData({...formData, darkStyle: newStyle});
              }
            }}
          />
          <ColorPicker
            color={viewMode === 'light' ? formData.lightStyle.foregroundColor : formData.darkStyle.foregroundColor}
            label={'Foreground'} selectColor={e => {
              if (viewMode === 'light') {
                const newStyle = {...formData.lightStyle, foregroundColor: e};
                setFormData({...formData, lightStyle: newStyle});
              }
              if (viewMode === 'dark') {
                const newStyle = {...formData.darkStyle, foregroundColor: e};
                setFormData({...formData, darkStyle: newStyle});
              }
            }}
          />
          <FontSetting
            label={'Headings'}
            fontColor={viewMode === 'light' ? formData.lightStyle.headings.color : formData.darkStyle.headings.color}
            fontSize={viewMode === 'light' ? formData.lightStyle.headings.fontSize : formData.darkStyle.headings.fontSize}
            fontType={viewMode === 'light' ? formData.lightStyle.headings.fortFamily : formData.darkStyle.headings.fortFamily}
            onChange={(type, e) => {onChange('headings', type, e);}}
          />
          <FontSetting
            label={'Labels'}
            fontColor={viewMode === 'light' ? formData.lightStyle.labels.color : formData.darkStyle.labels.color}
            fontSize={viewMode === 'light' ? formData.lightStyle.labels.fontSize : formData.darkStyle.labels.fontSize}
            fontType={viewMode === 'light' ? formData.lightStyle.labels.fortFamily : formData.darkStyle.labels.fortFamily}
            onChange={(type, e) => {onChange('labels', type, e);}}
          />
          <FontSetting
            label={'Values'}
            fontColor={viewMode === 'light' ? formData.lightStyle.values.color : formData.darkStyle.values.color}
            fontSize={viewMode === 'light' ? formData.lightStyle.values.fontSize : formData.darkStyle.values.fontSize}
            fontType={viewMode === 'light' ? formData.lightStyle.values.fortFamily : formData.darkStyle.values.fortFamily}
            onChange={(type, e) => {onChange('values', type, e);}}
          />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: formBackgroundColor => ({
    width: '100%',
    padding: 7,
    backgroundColor: formBackgroundColor,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#303339',
  }),
  addCardBtn: {
    width: '100%',
    padding: 7,
    backgroundColor: '#626E81',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#303339',
    marginTop: 10,
  },
  addCardText: {
    color: '#ffffff',
    fontSize: 16,
  },
  settingTab: {
    flexDirection: 'row',
  },
  tab: selected => ({
    width: '50%',
    height: 50,
    backgroundColor: '#303339',
    borderBottomColor: '#9B61D5',
    borderBottomWidth: selected ? 4 : 0,
  }),
  colortab: selected => ({
    width: '50%',
    height: 45,
    backgroundColor: '#303339',
    borderBottomColor: '#0099FF',
    borderBottomWidth: selected ? 4 : 0,
  }),
  tabText: selected => ({
    fontSize: 15,
    color: selected ? '#FFFFFF' : '#CBCCCD',
  }),
  menuHeader: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: 18,
    color: '#fff',
    paddingLeft: 15,
  },
  settingView: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#4B5260',
  },
  settingView1: {
    padding: 10,
    backgroundColor: '#555F6E',
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
  },
  titleLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  itemIcon: index => ({
    alignSelf: 'center',
    marginBottom: 3,
    opacity: index === 0 ? 0 : 1,
  }),
  itemAvatarText: {
    alignSelf: 'center',
    borderWidth: 1,
    fontFamily: 'PublicSans-Regular',
    fontSize: 14,
  },
  itemView: {
    marginTop: -10,
    alignItems: 'center',
    flexDirection: 'column',
    alignContent: 'center',
    width: '12%',
  },
  roleName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 35,
    alignSelf: 'center',
    paddingLeft: 10,
    paddingRight: 5,
    width: '75%',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#303339',
    backgroundColor: '#555F6E',
  },
  roleItem: {
    flexDirection: 'row',
    height: 45,
  },
  dragItem: {
    width: '100%',
    maxHeight: 300,
  },
  iconBtn: {
    padding: 0,
    margin: 0,
  },
  icon: {
    alignSelf: 'center',
    width: '13%',
  },
  roleNameText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  title: {
    height: 40,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#303339',
    backgroundColor: '#555F6E',
    paddingLeft: 10,
  },
  textStyle: {
    fontSize: 14,
    color: 'grey',
  },
  selectedRowStyle: {
    backgroundColor: 'grey',
  },
  selectedRowTextStyle: {
    color: '#000000',
  },
  dropdown: {
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    maxHeight: 150,
  },
  buttonStyle: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 1,
  },
  rowStyle: {
    height: 40,
  },
});

export default FormSetting;
