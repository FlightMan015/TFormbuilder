import React from 'react';
import {useTheme} from 'react-native-paper';
import {StyleSheet, View, Text} from 'react-native';
import {IconButton} from 'react-native-paper';
import formStore from '../store/formStore';

const Header = props => {
  const {formName, preview, onClick} = props;
  const {colors, size} = useTheme();
  const openMenu = formStore(state => state.openMenu);
  const setOpenMenu = formStore(state => state.setOpenMenu);

  return (
    <View style={styles.titleBar(colors)}>
      <View style={styles.subView}>
        <IconButton
          icon="plus"
          size={size.s22}
          iconColor={colors.card}
          style={styles.addFieldButton(colors)}
          onPress={() => {
            setOpenMenu(!openMenu);
          }}
        />
        <Text style={styles.title(colors, size)}>TForm</Text>
      </View>
      <View style={styles.subView}>
        <IconButton
          icon="cog-outline"
          size={size.s20}
          iconColor={colors.text}
          onPress={() => {
            onClick('setting');
          }}
        />
        <IconButton
          icon="menu"
          size={size.s20}
          iconColor={colors.text}
          onPress={() => {
            onClick('menu');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: (colors, size) => ({
    fontSize: size.s18,
    color: colors.text,
    marginLeft: 10,
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
});

export default Header;
