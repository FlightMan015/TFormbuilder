import React, {useState} from 'react';
import {useTheme} from 'react-native-paper';
import {View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import SelectDropdown from 'react-native-select-dropdown';
import formStore from '../../../store/formStore';

const SettingDropdown = ({title, options, onChange, keyName, defaultValue}) => {
  const {colors, fonts} = useTheme();
  const i18nValues = formStore(state => state.i18nValues);
  const [open, setOpen] = useState(true);

  return (
    <View style={styles.settingView}>
      <Text style={styles.titleLabel}>{title}</Text>
      <SelectDropdown
        data={options}
        onSelect={e => {
          onChange(keyName, e);
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
    maxHeight: 150,
    backgroundColor: '#404651',
  },
  buttonStyle: {
    width: '100%',
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
});

export default SettingDropdown;
