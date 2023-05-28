import React, {useEffect, useMemo} from 'react';
import {useTheme} from 'react-native-paper';
import {StyleSheet, View, Text} from 'react-native';
import {getComponent} from './componentMap';
import formStore from '../../../store/formStore';

const Field = props => {
  const {element, index, role} = props;
  const {colors, fonts} = useTheme();
  const submit = formStore(state => state.submit);
  const formValue = formStore(state => state.formValue);
  const FieldComponent = getComponent(element.component);

  const setValidation = formStore(state => state.setValidation);
  const validation = formStore(state => state.validation);
  const formValidation = formStore(state => state.formValidation);
  const setFormValidation = formStore(state => state.setFormValidation);
  const selectedFieldIndex = formStore(state => state.selectedFieldIndex);

  if (
    formValidation &&
    element.is_mandatory &&
    !formValue[element.field_name]
  ) {
    setFormValidation(false);
  }

  useEffect(() => {
    if (element.is_mandatory && !formValue[element.field_name]) {
      setValidation({...validation, [element.field_name]: false});
    } else if (!validation[element.field_name]) {
      setValidation({...validation, [element.field_name]: true});
    }
  }, [element.is_mandatory, !!formValue[element.field_name]]);

  if (role.view) {
    return (
      <View
        style={styles.field(element)}>
        <FieldComponent
          element={element}
          index={index}
          role={role}
        />
        {element.is_mandatory &&
          !validation[element.field_name] &&
          submit && (
            <Text style={styles.note(colors, fonts)}>
              {element.meta.title} field is required.
            </Text>
          )}
      </View>
    );
  }
};

const MemoField = ({element, index, role}) => {
  const formData = formStore(state => state.formData);
  const viewMode = formStore(state => state.viewMode);
  const validation = formStore(state => state.validation);
  const formValidation = formStore(state => state.formValidation);
  const i18nValues = formStore(state => state.i18nValues);

  return useMemo(
    () => (
      <Field
        element={element}
        index={index}
        role={role}
      />
    ),
    [
      JSON.stringify(element),
      JSON.stringify(index),
      JSON.stringify(formData.lightStyle),
      JSON.stringify(formData.darkStyle),
      viewMode,
      validation[element.field_name],
      formValidation,
      i18nValues.locale,
    ],
  );
};

const styles = StyleSheet.create({
  setIcons: {
    marginTop: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    // position: 'absolute',
    // bottom: -50,
    // zIndex: 999,
  },
  field: (element) => ({
    borderRadius: 5,
    width: element.meta.field_width.indexOf('%') === -1 ? parseInt(element.meta.field_width, 10) : element.meta.field_width,
    // marginVertical: 3,
    // zIndex: 0,
  }),
  note: (colors, fonts) => ({
    color: colors.warning,
    fontFamily: fonts.values.fontFamily,
    fontSize: fonts.values.fontSize,
    marginHorizontal: 5,
    marginLeft: 10,
  }),
});

export default MemoField;
