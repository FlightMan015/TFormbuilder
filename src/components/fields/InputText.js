import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, TextInput, Alert} from 'react-native';
import {useTheme} from 'react-native-paper';
import formStore from '../../store/formStore';
import FieldLabel from '../../common/FieldLabel';

const InputText = props => {
  const {element} = props;
  const {colors, fonts} = useTheme();
  const preview = formStore(state => state.preview);
  const userRole = formStore(state => state.userRole);
  const role = element.role.find(e => e.name === userRole);
  const formValue = formStore(state => state.formValue);
  const setFormValue = formStore(state => state.setFormValue);
  return (
    <View style={styles.container}>
      {
        role.view && (
          <>
            <FieldLabel label={element.meta.title || 'TextInput'} visible={!element.meta.hide_title} />
            <TextInput
              style={{
                ...styles.textBox,
                backgroundColor: colors.card,
                borderColor: colors.card,
                ...fonts.values,
              }}
              value={formValue[element.field_name] || ''}
              underlineColorAndroid="transparent"
              onChangeText={e => {
                if (element.event.onChangeText) {
                  Alert.alert('Rule Action', `Fired onChangeText action. rule - ${element.event.onChangeText}. newText - ${e}`);
                }
                setFormValue({...formValue, [element.field_name]:e})
              }}
              editable={preview || role.edit}
              placeholder={element.meta.placeholder || ''}
              placeholderTextColor={colors.placeholder}
              multiline={element.meta.multiline}
              numberOfLines={element.meta.multiline ? 2 : 1}
              onSubmitEditing={() => {
                if (element.event.onSubmitEditing) {
                  Alert.alert('Rule Action', `Fired onSubmitEditing action. rule - ${element.event.onSubmitEditing}. newText - ${formValue[element.field_name]}`);
                }
              }}
              onBlur={() => {
                if (element.event.onBlur) {
                  Alert.alert('Rule Action', `Fired onBlur action. rule - ${element.event.onBlur}. newText - ${formValue[element.field_name]}`);
                }
              }}
              onFocus={() => {
                if (element.event.onFocus) {
                  Alert.alert('Rule Action', `Fired onFocus action. rule - ${element.event.onFocus}. oldText - ${formValue[element.field_name]}`);
                }
              }}
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
  textBox: {
    paddingVertical: 3,
    borderWidth: 1,
    borderRadius: 10,
    padding: 0,
    paddingLeft: 10,
  },
});

InputText.propTypes = {
  element: PropTypes.object.isRequired,
};

export default InputText;
