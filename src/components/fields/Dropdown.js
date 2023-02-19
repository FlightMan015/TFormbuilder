import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Alert} from 'react-native';
import {useTheme} from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Feather';
import FieldLabel from '../../common/FieldLabel';
import formStore from '../../store/formStore';

const DropDown = props => {
  const {element} = props;
  const {colors, fonts} = useTheme();
  const preview = formStore(state => state.preview);
  const userRole = formStore(state => state.userRole);
  const role = element.role.find(e => e.name === userRole);
  const formValue = formStore(state => state.formValue);
  const setFormValue = formStore(state => state.setFormValue);
  const [open, setOpen] = useState(true);

  return (
    <View style={styles.container}>
      {
        role.view && (
          <>
            <FieldLabel label={element.meta.title || 'Dropdown'} visible={!element.meta.hide_title} />
            <SelectDropdown
              data={element.meta.options}
              onSelect={e => {
                setFormValue({...formValue, [element.field_name]: e});
                if (element.event.onSelect) {
                  Alert.alert('Rule Action', `Fired onSelect action. rule - ${element.event.onSelect}. selectedItem - ${e}`);
                }
              }}
              dropdownStyle={styles.dropdown(colors)}
              rowStyle={styles.rowStyle}
              rowTextStyle={styles.rowTextStyle(fonts)}
              buttonStyle={styles.buttonStyle(colors)}
              buttonTextStyle={{...styles.textStyle(fonts)}}
              selectedRowTextStyle={styles.selectedRowTextStyle(fonts)}
              renderDropdownIcon={
                open
                  ? () => <Icon name="chevron-down" size={18} color={fonts.values.color} />
                  : () => <Icon name="chevron-up" size={18} color={fonts.values.color} />
              }
              dropdownIconPosition="right"
              onFocus={() => setOpen(false)}
              onBlur={() => setOpen(true)}
              disabled={(role.edit || preview)? false : true}
              defaultButtonText="Select Option"
              defaultValue={formValue[element.field_name] || ''}
            />
          </>
        )
      }
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
  selectedRowStyle: {
    backgroundColor: 'grey',
  },
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
  searchInput: {
    height: 40,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
});

DropDown.propTypes = {
  element: PropTypes.object.isRequired,
};

export default DropDown;
