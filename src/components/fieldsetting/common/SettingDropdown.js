import React, {useState} from 'react';
import {useTheme} from 'react-native-paper';
import {View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import SelectDropdown from 'react-native-select-dropdown';

const SettingDropdown = ({title, options, onChange, keyName, defaultValue}) => {
  const {colors, size} = useTheme();
  const [open, setOpen] = useState(true);

  return (
    <View style={styles.settingView}>
      <Text style={styles.titleLabel}>{title}</Text>
      <SelectDropdown
        data={options}
        onSelect={e => {
          onChange(keyName, e);
        }}
        dropdownStyle={{...styles.dropdown, backgroundColor: colors.inputTextBackground}}
        rowStyle={styles.rowStyle}
        rowTextStyle={styles.textStyle}
        buttonStyle={{...styles.buttonStyle, backgroundColor: colors.inputTextBackground, borderColor: colors.border}}
        buttonTextStyle={{...styles.textStyle, color: colors.text}}
        selectedRowStyle={styles.selectedRowStyle}
        selectedRowTextStyle={styles.selectedRowTextStyle}
        renderDropdownIcon={
          open
            ? () => <Icon name="chevron-down" size={18} color={colors.text} />
            : () => <Icon name="chevron-up" size={18} color={colors.text} />
        }
        dropdownIconPosition="right"
        onFocus={() => setOpen(false)}
        onBlur={() => setOpen(true)}
        defaultButtonText="Select Option"
        defaultValue={defaultValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    width: 200,
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
    color: 'grey',
  },
  selectedRowStyle: {
    backgroundColor: 'grey',
  },
  selectedRowTextStyle: {
    color: '#000000',
  },
  dropdown: {
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    maxHeight: 150,
  },
  buttonStyle: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 1,
  },
  rowStyle: {
    height: 40,
  },
});

export default SettingDropdown;
