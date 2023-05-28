import React, {useState, useRef, useEffect} from 'react';
import {useTheme} from 'react-native-paper';
import {StyleSheet, View, Text, Platform} from 'react-native';
import {IconButton, Avatar} from 'react-native-paper';
import formStore from '../store/formStore';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { menuItems, newFormData, languages } from '../constant';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PatternBackgroundView from '../common/PatternBackgroundView';
import SelectDropdown from 'react-native-select-dropdown';
import { updateField } from '../actions/formdata';

const Header = ({deleteForm, renameForm, saveForm, navigation}) => {
  const {colors, size, fonts} = useTheme();
  const setSettingType = formStore(state => state.setSettingType);
  const setOpenSetting = formStore(state => state.setOpenSetting);
  const formData = formStore(state => state.formData);
  const formDatas = formStore(state => state.formDatas);
  const formValues = formStore(state => state.formValues);
  const setFormData = formStore(state => state.setFormData);
  const visibleDlg = formStore(state => state.visibleDlg);
  const setVisibleDlg = formStore(state => state.setVisibleDlg);
  const setFormValue = formStore(state => state.setFormValue);
  const i18nValues = formStore(state => state.i18nValues);
  const seti18nValues = formStore(state => state.seti18nValues);
  const preview = formStore(state => state.preview);
  const userRole = formStore(state => state.userRole);
  const userEmail = formStore(state => state.userEmail);
  const [open, setOpen] = useState(true);
  const formsIsSet = formStore(state => state.formsIsSet);
  const tempFormData = formStore(state => state.tempFormData);
  const setTempFormData = formStore(state => state.setTempFormData);
  const dropdownRef = useRef();

  useEffect(() => {
    setFormData({...formData, makerId: userEmail});
  }, []);

  useEffect(() => {
    dropdownRef.current?.reset();
  }, [formData.name])

  const formNames = formsIsSet.map((item, index) => {
    return item.name;
  });

  return (
    <View style={{height: Platform.OS === 'ios' ? 85 : 60}}>
      <View style={{flex: 1}}>
        <PatternBackgroundView
          imageWidth={20}
          imageHeight={20}
          imageUri={formData.lightStyle.backgroundPatternImage}
          backgroundColor={colors.background}
          viewHeight={Platform.OS === 'ios' ? 85 : 60}
        />
      </View>
      <View style={{position: 'absolute', width: '100%', height: '100%'}}>
        <View style={{height: Platform.OS === 'ios' ? 25 : 0}}></View>
        {
          tempFormData.type === 'form' && (
            <View style={styles.titleBar}>
              <View style={styles.subView}>
                <IconButton
                  icon="arrow-left"
                  size={size.s20}
                  iconColor={fonts.headings.color}
                  onPress={() => {navigation.goBack();}}
                />
              </View>
              {/* <Text style={styles.title(fonts)}>{formData.title}</Text> */}
              <View style={{flex: 1, flexDirection: 'row-reverse', alignItems: 'center'}}>
                <Menu>
                  <MenuTrigger>
                    <IconButton
                      icon="menu"
                      size={size.s20}
                      iconColor={fonts.headings.color}
                    />
                  </MenuTrigger>
                  <MenuOptions>
                    {menuItems.map((item, index) => {
                      return (
                        <MenuOption key={index} style={{padding: 0}} onSelect={() => {
                          switch (item.name) {
                            case menuItems[0].name:
                              setFormData(newFormData);
                              setFormValue({});
                              break;
                            case menuItems[1].name:
                              // saveForm({...formData});
                              setVisibleDlg({...visibleDlg, saveForm: true, rename: false, oldName: formData.name, id: formData.id});
                              break;
                            // case menuItems[2].name:
                            //   setVisibleDlg({...visibleDlg, saveForm: true, rename: false, oldName: formData.name, id: formData.id});
                            //   break;
                            case menuItems[3].name:
                              setVisibleDlg({...visibleDlg, saveForm: true, rename: true, oldName: formData.name, id: formData.id});
                              break;
                            case menuItems[4].name:
                              deleteForm(formData.name);
                              break;
                          }
                        }}>
                          <View
                            key={index}
                            style={styles.fieldListItem}>
                            <View style={styles.fieldIcon}>
                              <Icon name={item.icon} size={18} color={'white'} />
                            </View>
                            <View style={styles.fieldText}>
                              <Text style={styles.fieldNameText}>{i18nValues.t(`menu_labels.${item.name}`)}</Text>
                            </View>
                          </View>
                        </MenuOption>
                      );
                    })}
                  </MenuOptions>
                </Menu>
                <View style={styles.subView}>
                {/* {
                  (userRole === 'admin' || userRole === 'builder') && (
                    <Menu>
                      <MenuTrigger>
                        <IconButton
                          icon="earth"
                          size={size.s20}
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
                  )
                } */}
                  <IconButton
                    icon="cog-outline"
                    size={size.s20}
                    iconColor={fonts.headings.color}
                    onPress={() => {
                      setSettingType('formSetting');
                      setOpenSetting(true);
                    }}
                  />
                  {/* <Avatar.Image size={40} style={{marginHorizontal: 5}} source={formData.logo ? {uri: formData.logo} : require('../assets/icon_images/user_avatar.png')} /> */}
                </View>
                {/* <SelectDropdown
                  ref={dropdownRef}
                  data={formNames}
                  onSelect={(e, selectedIndex) => {
                    const tempFormData = {...formDatas[selectedIndex]};
                    setFormData(tempFormData);
                    const tempFormValue = formValues.find(data => data.id === formDatas[selectedIndex].id);
                    setFormValue(tempFormValue ? tempFormValue.data : {});
                  }}
                  dropdownStyle={styles.dropdown(colors)}
                  rowStyle={styles.rowStyle}
                  rowTextStyle={styles.rowTextStyle(fonts)}
                  buttonStyle={styles.buttonStyle(colors)}
                  buttonTextStyle={{...styles.textStyle(fonts)}}
                  selectedRowTextStyle={styles.selectedRowTextStyle(fonts)}
                  renderDropdownIcon={
                    open
                      ? () => <Icon name="chevron-down" size={18} color={fonts.headings.color} />
                      : () => <Icon name="chevron-up" size={18} color={fonts.headings.color} />
                  }
                  dropdownIconPosition="right"
                  onFocus={() => setOpen(false)}
                  onBlur={() => setOpen(true)}
                  defaultButtonText={formData.name || 'New Form'}
                  defaultValue={formData.name}
                /> */}
                <Text style={{...styles.buttonStyle(colors), ...fonts.headings}}>{formData.name}</Text>
              </View>
            </View>
          )
        }
        {
          tempFormData.type === 'dialog' && (
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <IconButton
              icon="arrow-left"
              size={size.s25}
              iconColor={fonts.headings.color}
              onPress={() => {
                
                setFormData(tempFormData.data);
                setTempFormData({...tempFormData, type: 'form', index: [], data: {}, element: {}});
                setOpenSetting(false);
              }}
            />
            <Text style={{...fonts.headings, fontSize: 20}}>{i18nValues.t("setting_labels.dialog_view")}</Text>
            <IconButton
              icon="content-save-outline"
              size={size.s25}
              iconColor={fonts.headings.color}
              onPress={() => {
                const tempMeta = {...tempFormData.element.meta};
                setFormData({
                  ...tempFormData.data,
                  data: updateField(
                    tempFormData.data,
                    tempFormData.index,
                    {...tempFormData.element, meta: {...tempMeta, dialogData: formData.data}},
                  ),
                });
                setTempFormData({...tempFormData, type: 'form', index: [], data: {}, element: {}});
                setOpenSetting(false);
              }}
            />
          </View>
          )
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: (fonts) => ({
    marginLeft: 10,
    ...fonts.headings,
  }),
  titleBar: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  addFieldButton: colors => ({
    backgroundColor: colors.colorButton,
  }),
  subView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
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
  rowTextStyle: fonts => ({
    fontSize: 14,
    color: fonts.labels.color,
    textAlign: 'left',
    marginLeft: 20,
  }),
  selectedRowStyle: {
    backgroundColor: 'grey',
  },
  selectedRowTextStyle: fonts => ({
    color: fonts.values.color,
  }),
  dropdown: colors => ({
    borderRadius: 15,
    backgroundColor: colors.card,
    maxHeight: 500,
  }),
  buttonStyle: colors => ({
    flex: 1,
    backgroundColor: colors.background,
    textAlign: 'center',
  }),
  rowStyle: {
    height: 40,
    borderBottomWidth: 0,
  },
  textStyle: fonts => ({
    ...fonts.headings,
    textAlign: 'center',
  }),
});

export default Header;
