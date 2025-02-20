import React from 'react';
import {useTheme} from 'react-native-paper';
import {View, StyleSheet, Text, TextInput} from 'react-native';

const SettingLabel = ({title, label, onChange, keyName, multiline}) => {
  const {colors, size} = useTheme();

  return (
    <View style={styles.settingView}>
      <Text style={styles.titleLabel}>{title}</Text>
      <TextInput
        style={styles.title}
        value={label}
        onChangeText={newText => {
          onChange(keyName, newText);
        }}
        multiline={multiline}
        numberOfLines={multiline ? 2 : 1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    // height: 40,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#303339',
    backgroundColor: '#555F6E',
    paddingLeft: 10,
    paddingVertical: 5,
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

export default SettingLabel;
