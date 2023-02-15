import React from 'react';
import {useTheme, RadioButton} from 'react-native-paper';
import {View, StyleSheet, Text} from 'react-native';

const SettingRadioGroup = ({title, options, value, keyName, onChange}) => {
  const {colors, size} = useTheme();

  return (
    <View style={styles.settingView}>
      <Text style={styles.titleLabel}>{title}</Text>
      {
        options.map((option, index) => (
          <View key={'group_option_' + index} style={styles.radioButton}>
            <RadioButton
              value="first"
              status={ option === value ? 'checked' : 'unchecked' }
              uncheckedColor='#FFFFFF'
              color={'#FFFFFF'}
              onPress={() => {
                onChange(keyName, options[index])
              }}
            />
            <Text style={styles.text}>{option}</Text>
          </View>
        ))
      }
    </View>
  );
};

const styles = StyleSheet.create({
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
  radioButton: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems:'center',
  },
  text: {
    color: '#FFFFFF'
  },
});

export default SettingRadioGroup;
