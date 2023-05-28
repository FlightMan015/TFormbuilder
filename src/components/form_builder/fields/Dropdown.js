import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Alert} from 'react-native';
import {useTheme} from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Feather';
import FieldLabel from '../../../common/FieldLabel';
import formStore from '../../../store/formStore';

const DropDown = props => {
  const {element} = props;
  const {colors, fonts} = useTheme();
  const i18nValues = formStore(state => state.i18nValues);
  const [open, setOpen] = useState(true);

  return (
    <View style={styles.container(element)}>
      <FieldLabel label={element.meta.title || i18nValues.t("field_labels.dropdown")} visible={!element.meta.hide_title} />
      <SelectDropdown
        data={element.meta.options}
        dropdownStyle={styles.dropdown(colors)}
        rowStyle={styles.rowStyle}
        rowTextStyle={styles.rowTextStyle(fonts)}
        buttonStyle={styles.buttonStyle(colors)}
        buttonTextStyle={{...styles.textStyle(fonts)}}
        selectedRowTextStyle={styles.selectedRowTextStyle(fonts)}
        renderDropdownIcon={
          open
            ? () => <Icon name="chevron-down" size={18} color={colors.colorButton} />
            : () => <Icon name="chevron-up" size={18} color={colors.colorButton} />
        }
        dropdownIconPosition="right"
        onFocus={() => setOpen(false)}
        onBlur={() => setOpen(true)}
        defaultButtonText="Select Option"
        defaultValue={element.meta.options[0] || ''}
        disabled
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: element => ({
    ...element.meta.padding,
  }),
  textStyle: fonts => ({
    fontSize: 14,
    color: fonts.values.color,
    textAlign: 'left',
  }),
  rowTextStyle: fonts => ({
    fontSize: 14,
    color: fonts.labels.color,
    textAlign: 'left',
    marginLeft: 20,
  }),
  selectedRowTextStyle: fonts => ({
    color: fonts.values.color,
  }),
  dropdown: colors => ({
    borderRadius: 15,
    backgroundColor: colors.card,
    maxHeight: 300,
  }),
  buttonStyle: colors => ({
    width: '100%',
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.card,
  }),
  rowStyle: {
    height: 40,
    borderBottomWidth: 0,
  },
});

DropDown.propTypes = {
  element: PropTypes.object.isRequired,
};

export default DropDown;
