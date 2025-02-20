import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Image, TouchableOpacity, Alert} from 'react-native';
import {useTheme} from 'react-native-paper';
import {radioButton} from '../../../constant';
import FieldLabel from '../../../common/FieldLabel';
import formStore from '../../../store/formStore';

const Radio = props => {
  const {element, role} = props;
  const {colors, fonts} = useTheme();
  const userRole = formStore(state => state.userRole);
  const formValue = formStore(state => state.formValue);
  const setFormValue = formStore(state => state.setFormValue);
  const i18nValues = formStore(state => state.i18nValues);

  return (
    <View style={styles.container(element)}>
      {
        role.view && (
          <>
            <FieldLabel label={element.meta.title || i18nValues.t("field_labels.radio_group")} visible={!element.meta.hide_title} />
            <View style={styles.radioGroup(colors)}>
              {element.meta.options.map((item, index) => (
                <View key={index} style={styles.radioContainer}>
                  <TouchableOpacity
                    onPressIn={() => {
                      setFormValue({...formValue, [element.field_name]: item});
                      if (element.event.onSelect) {
                        Alert.alert('Rule Action', `Fired onSelect action. rule - ${element.event.onSelect}. selectedValue - ${item}`);
                      }
                    }}
                    hitSlop={styles.slop}
                    style={styles.buttonContainer}
                    disabled={!role.edit || !(userRole.edit || userRole.submit)}
                    key={index}>
                    <Image
                      accessibilityLabel={`choose-option-${item}`}
                      style={styles.radioButtonImage}
                      source={
                        formValue[element.field_name] === (item)
                          ? radioButton.selected
                          : radioButton.unselected
                      }
                    />
                    <Text style={styles.text(fonts)}>{item}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: element => ({
    ...element.meta.padding
  }),
  carouselTitle: colors => ({
    fontSize: 16,
    padding: 5,
    color: colors.text,
  }),
  buttonContainer: {
    flexDirection: 'row',
  },
  radioButtonImage: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  text: fonts => ({
    paddingLeft: 10,
    ...fonts.values,
  }),
  heading: {
    margin: 10,
  },
  slop: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
  radioContainer: {
    paddingVertical: 10,
    width: '100%',
    height: 40,
    paddingLeft: 10,
  },
  radioGroup: colors => ({
    backgroundColor: colors.card,
    borderRadius: 10,
  }),
});

Radio.propTypes = {
  element: PropTypes.object.isRequired,
};

export default Radio;
