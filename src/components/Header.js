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
import PatternBackgroundView from '../common/PatternBackgroundView';

const Header = () => {
  const {colors, size, fonts} = useTheme();
  const setSettingType = formStore(state => state.setSettingType);
  const setOpenSetting = formStore(state => state.setOpenSetting);
  const formData = formStore(state => state.formData);

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
          </View>
          <Text style={styles.title(fonts)}>{formData.title}</Text>
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
});

export default Header;
