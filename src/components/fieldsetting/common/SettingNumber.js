import React from 'react';
import {useTheme} from 'react-native-paper';
import {View, StyleSheet, Text, TextInput} from 'react-native';

const SettingNumber = ({title, value, onChange, keyName}) => {
  const {colors, size} = useTheme();

  return (
    <View style={styles.settingView}>
      <Text style={styles.titleLabel}>{title}</Text>
      <TextInput
        style={styles.title}
        value={value}
        keyboardType='numeric'
        onChangeText={newText => {
          if (!newText || parseInt(newText, 10) === 0) {
            onChange(keyName, '1');
          } else {
            onChange(keyName, newText);
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
  titleLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  settingView: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#4B5260',
  },
});

export default SettingNumber;
