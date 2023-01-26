import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Alert, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Feather';

const DropDown = props => {
  const {element, contents, editRole, value, onChangeValue} = props;
  const {colors} = useTheme();
  const [dropdownValue, setDropDownValue] = useState(value || '');
  const [open, setOpen] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.carouselTitle(colors)}>{element.meta.title || 'Dropdown'}</Text>
      <SelectDropdown
        data={element.meta.options}
        onSelect={e => {
          setDropDownValue(e);
          if (onChangeValue) {
            onChangeValue({[element.field_name]: e});
          }
          if (element.event.onSelect) {
            Alert.alert('Rule Action', `Fired onSelect action. rule - ${element.event.onSelect}. selectedItem - ${e}`);
          }
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
        disabled={editRole ? false : true}
        defaultButtonText="Select Option"
        defaultValue={dropdownValue}
        // search={element.meta.search}
        // searchInputStyle={styles.searchInput}
        // searchInputTxtColor={colors.text}
        // searchPlaceHolder="Search"
        // searchPlaceHolderColor={color.GREY}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  carouselTitle: colors => ({
    fontSize: 16,
    padding: 5,
    color: colors.text,
  }),
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
  searchInput: {
    height: 40,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
});

DropDown.propTypes = {
  element: PropTypes.object.isRequired,
};

export default React.memo(DropDown);
