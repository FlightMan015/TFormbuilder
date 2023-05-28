import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, TextInput} from 'react-native';
import {useTheme} from 'react-native-paper';
import formStore from '../../../store/formStore';
import FieldLabel from '../../../common/FieldLabel';

const InputText = props => {
  const {element} = props;
  const {colors, fonts} = useTheme();
  const i18nValues = formStore(state => state.i18nValues);

  console.log('element--------------------------', element);

  return (
    <View style={styles.container(element)}>
      <FieldLabel
        label={element.meta.title || i18nValues.t('field_labels.textbox')}
        visible={!element.meta.hide_title}
      />
      <TextInput
        style={{
          ...styles.textBox,
          backgroundColor: colors.card,
          borderColor: colors.card,
          ...fonts.values,
        }}
        underlineColorAndroid="transparent"
        editable={false}
        placeholder={element.meta.placeholder || ''}
        placeholderTextColor={colors.placeholder}
        multiline={element.meta.multiline}
        numberOfLines={element.meta.multiline ? 2 : 1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: element => ({
    ...element.meta.padding,
  }),
  textBox: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 5,
    paddingLeft: 10,
  },
});

InputText.propTypes = {
  element: PropTypes.object.isRequired,
};

export default InputText;
