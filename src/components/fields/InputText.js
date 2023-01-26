import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, TextInput, Alert, Text} from 'react-native';
import {useTheme} from 'react-native-paper';
import { useEffect } from 'react';
import formStore from '../../store/formStore';

const InputText = props => {

  const {element, value, onChangeValue, userRole} = props;
  const {colors} = useTheme();
  const [inputValue, setInputValue] = useState('');
  const renderMode = formStore(state => state.renderMode);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <View style={styles.container}>
      <Text style={styles.carouselTitle(colors)}>{element.meta.title || 'TextInput'}</Text>
      <TextInput
        style={{
          ...styles.textBox(parseInt(element.meta.numberOfLines, 10) > 1, parseInt(element.meta.numberOfLines, 10)),
          backgroundColor: colors.inputTextBackground,
          borderColor: colors.border,
        }}
        value={inputValue}
        underlineColorAndroid="transparent"
        onChangeText={e => {
          if (element.event.onChangeText) {
            Alert.alert('Rule Action', `Fired onChangeText action. rule - ${element.event.onChangeText}. newText - ${e}`);
          }
          setInputValue(e);
          if (onChangeValue) {
            onChangeValue({[element.field_name]: e});
          }
        }}
        editable={renderMode}
        placeholder={element.meta.placeholder || ''}
        placeholderTextColor={colors.placeholder}
        multiline={parseInt(element.meta.numberOfLines, 10) > 1 ? true : false}
        numberOfLines={parseInt(element.meta.numberOfLines, 10)}
        onSubmitEditing={() => {
          if (element.event.onSubmitEditing) {
            Alert.alert('Rule Action', `Fired onSubmitEditing action. rule - ${element.event.onSubmitEditing}. newText - ${inputValue}`);
          }
        }}
        onBlur={() => {
          if (element.event.onBlur) {
            Alert.alert('Rule Action', `Fired onBlur action. rule - ${element.event.onBlur}. newText - ${inputValue}`);
          }
        }}
        onFocus={() => {
          if (element.event.onFocus) {
            Alert.alert('Rule Action', `Fired onFocus action. rule - ${element.event.onFocus}. oldText - ${inputValue}`);
          }
        }}
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
  textBox: (multiline, numberOfLines) => ({
    height: !multiline ? 35 : 35 * numberOfLines,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 14,
    padding: 0,
    paddingLeft: 5,
  }),
});

InputText.propTypes = {
  element: PropTypes.object.isRequired,
};

export default React.memo(InputText);