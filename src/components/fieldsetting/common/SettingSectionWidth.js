import React from 'react';
import {useTheme} from 'react-native-paper';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import { useState } from 'react';
import formStore from '../../../store/formStore';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Feather';
import { useEffect } from 'react';

const options = ['%', 'px']

const SettingSectionWidth = ({title, value, onChange, keyName}) => {
  const {colors, size} = useTheme();
  const [unit, setUnit] = useState(value.indexOf('%') === -1 ? options[1] : options[0]);
  const i18nValues = formStore(state => state.i18nValues);
  const [open, setOpen] = useState(true);

  return (
    <View style={styles.settingView}>
      <Text style={styles.titleLabel}>{title}</Text>
      <View style={styles.widthValue}>
        <SelectDropdown
          data={options}
          onSelect={e => {
            setUnit(e);
            if (e === options[0]) {
              onChange(keyName, `${value}%`);
            } else {
              onChange(keyName, value.replace('%', ''));
            }
          }}
          dropdownStyle={styles.dropdown}
          rowStyle={styles.rowStyle}
          rowTextStyle={styles.textStyle}
          buttonStyle={styles.buttonStyle}
          buttonTextStyle={{...styles.textStyle, color: '#FFFFFF'}}
          selectedRowStyle={styles.selectedRowStyle}
          selectedRowTextStyle={styles.selectedRowTextStyle}
          renderDropdownIcon={
            open
              ? () => <Icon name="chevron-down" size={18} color={'#FFFFFF'} />
              : () => <Icon name="chevron-up" size={18} color={'#FFFFFF'} />
          }
          dropdownIconPosition="right"
          onFocus={() => setOpen(false)}
          onBlur={() => setOpen(true)}
          defaultButtonText={i18nValues.t("setting_labels.select_option")}
          defaultValue={value.indexOf('%') === -1 ? options[1] : options[0]}
        />
        <TextInput
          style={styles.title}
          value={value.indexOf('%') === -1 ? value : value.replace('%', '')}
          keyboardType='numeric'
          onChangeText={newText => {
            if (!newText || parseInt(newText, 10) === 0) {
              onChange(keyName, '100%');
            } else {
              if (unit === '%') {
                onChange(keyName, `${newText}%`);
              } else {
                onChange(keyName, newText);
              }
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    flex: 1,
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
  textStyle: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  selectedRowStyle: {
    backgroundColor: '#555F6E',
  },
  selectedRowTextStyle: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  dropdown: {
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#404651',
  },
  buttonStyle: {
    width: 70,
    height: 40,
    borderWidth: 1,
    backgroundColor: '#555F6E',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#303339',
  },
  rowStyle: {
    height: 40,
  },
  widthValue: {
    flexDirection: 'row-reverse'
  }
});

export default SettingSectionWidth;
