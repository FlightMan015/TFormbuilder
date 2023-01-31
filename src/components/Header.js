import React from 'react';
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
import { menuItems } from '../constant';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Header = props => {
  const {formName, preview, onClick} = props;
  const {colors, size, fonts} = useTheme();
  // const setIndexToAdd = formStore(state => state.setIndexToAdd);
  // const openMenu = formStore(state => state.openMenu);
  // const setOpenMenu = formStore(state => state.setOpenMenu);
  const setSettingType = formStore(state => state.setSettingType);
  const setOpenSetting = formStore(state => state.setOpenSetting);
  const formData = formStore(state => state.formData);

  return (
    <View>
      
      <View style={{height: Platform.OS === 'ios' ? 25 : 0, backgroundColor: '#FFFFFF'}}></View>
      <View style={styles.titleBar(colors)}>
        <View style={styles.subView}>
          {/* <IconButton
            icon="plus"
            size={size.s22}
            iconColor={colors.card}
            style={styles.addFieldButton(colors)}
            onPress={() => {
              setIndexToAdd({});
              setOpenMenu(!openMenu);
            }}
          /> */}
          {/* <IconButton
            icon="menu"
            size={size.s20}
            iconColor={colors.text}
            onPress={() => {
              onClick('menu');
            }}
          /> */}
          <Menu>
            <MenuTrigger>
              <IconButton
                icon="menu"
                size={size.s20}
                iconColor={colors.text}
              />
            </MenuTrigger>
            <MenuOptions>
              {menuItems.map((item, index) => {
                return (
                  <MenuOption key={index} style={{padding: 0}} onSelect={() => {}}>
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
          <Text style={styles.title(fonts)}>{formData.title}</Text>
        </View>
        <View style={styles.subView}>
          <IconButton
            icon="cog-outline"
            size={size.s20}
            iconColor={colors.text}
            onPress={() => {
              setSettingType('formSetting');
              setOpenSetting(true);
            }}
          />
          <Avatar.Image size={40} style={{marginHorizontal: 5}} source={formData.logo ? {uri: formData.logo} : require('../assets/icon_images/user_avatar.png')} />
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
  titleBar: colors => ({
    width: '100%',
    height: 60,
    backgroundColor: colors.background,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  }),
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
});

export default Header;
