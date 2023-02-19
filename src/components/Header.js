import React, {useState, useRef} from 'react';
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
import { menuItems, newFormData } from '../constant';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PatternBackgroundView from '../common/PatternBackgroundView';
import SelectDropdown from 'react-native-select-dropdown';

const Header = ({deleteForm, renameForm, saveForm}) => {
  const {colors, size, fonts} = useTheme();
  const setSettingType = formStore(state => state.setSettingType);
  const setOpenSetting = formStore(state => state.setOpenSetting);
  const formData = formStore(state => state.formData);
  const formDatas = formStore(state => state.formDatas);
  const setFormData = formStore(state => state.setFormData);
  const visibleDlg = formStore(state => state.visibleDlg);
  const setVisibleDlg = formStore(state => state.setVisibleDlg);
  const [open, setOpen] = useState(true);

  const formNames = formDatas.map((item, index) => {
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
        <View style={styles.titleBar}>
          <View style={styles.subView}>
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
                          break;
                        case menuItems[1].name:
                          saveForm(formData);
                          break;
                        case menuItems[2].name:
                          setVisibleDlg({...visibleDlg, saveForm: true, rename: false, oldName: formData.name});
                          break;
                        case menuItems[3].name:
                          setVisibleDlg({...visibleDlg, saveForm: true, rename: true, oldName: formData.name});
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
                          <Text style={styles.fieldNameText}>{item.name}</Text>
                        </View>
                      </View>
                    </MenuOption>
                  );
                })}
              </MenuOptions>
            </Menu>
          </View>
          {/* <Text style={styles.title(fonts)}>{formData.title}</Text> */}
          <View style={{flex: 1, flexDirection: 'row-reverse'}}>
            <View style={styles.subView}>
              <IconButton
                icon="cog-outline"
                size={size.s20}
                iconColor={fonts.headings.color}
                onPress={() => {
                  setSettingType('formSetting');
                  setOpenSetting(true);
                }}
              />
              <Avatar.Image size={40} style={{marginHorizontal: 5}} source={formData.logo ? {uri: formData.logo} : require('../assets/icon_images/user_avatar.png')} />
            </View>
            <SelectDropdown
              data={formNames}
              onSelect={e => {
                const tempFormData = formDatas.find(data => data.name === e);
                setFormData(tempFormData);
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
            />
          </View>
        </View>
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
