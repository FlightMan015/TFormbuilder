import React from 'react';
import {useTheme} from 'react-native-paper';
import {View, StyleSheet, Text, TextInput} from 'react-native';

const paddingStrings = [
  'paddingTop',
  'paddingLeft',
  'paddingBottom',
  'paddingRight',
];

const SettingPadding = ({title, top, left, bottom, right, onChange}) => {
  const {colors, size} = useTheme();

  return (
    <View style={styles.settingView}>
      <Text style={styles.titleLabel}>{title}</Text>
      <TextInput
        style={styles.title}
        value={`${top},${left},${bottom},${right}`}
        placeholder={'top, left, bottom, right'}
        placeholderTextColor={'grey'}
        keyboardType='numeric'
        multiline
        numberOfLines={2}
        onChangeText={newText => {
          const spaceStrs = newText.split(',');
          var space = {};
          for (let i = 0; i < 4; i++) {
            if (spaceStrs[i] && typeof parseInt(spaceStrs[i], 10) === 'number') {
              space = {...space, [paddingStrings[i]]: parseInt(spaceStrs[i], 10)};
            } else {
              space = {...space, [paddingStrings[i]]: 0};
            }
          }
          onChange('padding', space);
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

export default SettingPadding;