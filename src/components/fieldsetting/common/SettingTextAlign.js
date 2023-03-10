import React from 'react';
import {IconButton, useTheme} from 'react-native-paper';
import {View, StyleSheet, Text} from 'react-native';

const SettingTextAlign = ({title, textAlign, onChange, keyName}) => {
  const {colors, size} = useTheme();

  return (
    <View style={styles.settingView}>
      <Text style={styles.titleLabel}>{title}</Text>
      <View style={{flexDirection: 'row'}}>
        <IconButton
          icon="format-align-left"
          iconColor='#FFFFFF'
          size={20}
          style={{
            flex: 1,
            backgroundColor: textAlign === 'left' ? colors.colorButton : '#555F6E',
            borderWidth: 1,
            borderRadius: 3,
            borderColor: '#303339'
          }}
          onPress={() => {
            onChange(keyName, 'left');
          }}
        />
        <IconButton
          icon="format-align-center"
          iconColor='#FFFFFF'
          size={20}
          style={{
            flex: 1,
            backgroundColor: textAlign === 'center' ? colors.colorButton : '#555F6E',
            borderWidth: 1,
            borderRadius: 3,
            borderColor: '#303339'
          }}
          onPress={() => {
            onChange(keyName, 'center');
          }}
        />
        <IconButton
          icon="format-align-right"
          iconColor='#FFFFFF'
          size={20}
          style={{
            flex: 1,
            backgroundColor: textAlign === 'right' ? colors.colorButton : '#555F6E',
            borderWidth: 1,
            borderRadius: 3,
            borderColor: '#303339'
          }}
          onPress={() => {
            onChange(keyName, 'right');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  settingView: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#4B5260',
  },
  titleLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
});

export default SettingTextAlign;
