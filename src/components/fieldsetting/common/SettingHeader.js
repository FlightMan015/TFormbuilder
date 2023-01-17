import React from 'react';
import {useTheme, IconButton} from 'react-native-paper';
import {View, StyleSheet, Text} from 'react-native';
import formStore from '../../../store/formStore';

const SettingHeader = ({title}) => {
  const {colors, size} = useTheme();
  const setOpenSetting = formStore(state => state.setOpenSetting);

  return (
    <View>
      <View style={styles.menuHeader}>
        <Text style={styles.menuTitle}>{title}</Text>
        <IconButton
          icon="close"
          size={20}
          iconColor="#FFFFFF"
          onPress={() => {
            setOpenSetting(false);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default SettingHeader;
