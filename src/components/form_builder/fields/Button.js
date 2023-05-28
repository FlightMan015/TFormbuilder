import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, TouchableOpacity, Text, Alert} from 'react-native';
import {useTheme} from 'react-native-paper';
import { color } from '../../../theme/styles';
import formStore from '../../../store/formStore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

const Button = props => {
  const {element, onProcess} = props;
  const {colors} = useTheme();
  const preview = formStore(state => state.preview);
  const submit = formStore(state => state.submit);
  const setSubmit = formStore(state => state.setSubmit);
  const formValue = formStore(state => state.formValue);
  const formValidation = formStore(state => state.formValidation);
  const setFormValidation = formStore(state => state.setFormValidation);

  const onClick = () => {
    if (element.meta.function === 'formSubmit') {
      if (!submit) {
        setSubmit(true);
      }

      if (formValidation) {
        setSubmit(false);
        if (onProcess) {
          onProcess(formValue);
        }
      } else {
        setFormValidation(true);
      }
    }
  };

  return (
    <View style={styles.container(element)}>
      {element.meta.iconPosition === 'left' && <TouchableOpacity
        activeOpacity={0.6}
        disabled
        style={{
          ...styles.touchableContainer(element.meta.width, element),
          backgroundColor: element.meta.backgroundColor || colors.colorButton,
          borderRadius: element.meta.isRound ? 1000 : 10,
        }}>
        {element.meta.isIcon && element.meta.icon?.family === 'Ionicons' && (
          <Ionicons name={element.meta.icon.icon} size={element.meta.iconSize} color={element.meta.color || color.WHITE} />
        )}
        {element.meta.isIcon && element.meta.icon?.family === 'Entypo' && (
          <Entypo name={element.meta.icon.icon} size={element.meta.iconSize} color={element.meta.color || color.WHITE} />
        )}
        {element.meta.isIcon && element.meta.icon?.family === 'AntDesign' && (
          <AntDesign name={element.meta.icon.icon} size={element.meta.iconSize} color={element.meta.color || color.WHITE} />
        )}
        {element.meta.isText &&
          <Text
            style={{
              ...styles.buttonText,
              color: element.meta.color || color.WHITE,
              fontSize: element.meta.fontSize,
              fontFamily: element.meta.fontFamily,
            }}>
          {element.meta.title || 'Button'}
        </Text>}
      </TouchableOpacity>}
      {element.meta.iconPosition === 'above' && <TouchableOpacity
        activeOpacity={0.6}
        disabled
        style={{
          ...styles.touchableContainer1(element.meta.width),
          backgroundColor: element.meta.backgroundColor || colors.colorButton,
          borderRadius: element.meta.isRound ? 1000 : 10,
        }}>
        <View style={styles.touchableContainer1(element.meta.width, element)}>
          {element.meta.isIcon && element.meta.icon?.family === 'Ionicons' && (
            <Ionicons name={element.meta.icon.icon} size={element.meta.iconSize} color={element.meta.color || color.WHITE} />
          )}
          {element.meta.isIcon && element.meta.icon?.family === 'Entypo' && (
            <Entypo name={element.meta.icon.icon} size={element.meta.iconSize} color={element.meta.color || color.WHITE} />
          )}
          {element.meta.isIcon && element.meta.icon?.family === 'AntDesign' && (
            <AntDesign name={element.meta.icon.icon} size={element.meta.iconSize} color={element.meta.color || color.WHITE} />
          )}
          {element.meta.isText &&
            <Text
              style={{
                ...styles.buttonText,
                color: element.meta.color || color.WHITE,
                fontSize: element.meta.fontSize,
                fontFamily: element.meta.fontFamily,
              }}>
            {element.meta.title || 'Button'}
          </Text>}
        </View>
      </TouchableOpacity>}
      {element.meta.iconPosition === 'below' && <TouchableOpacity
        activeOpacity={0.6}
        disabled
        style={{
          ...styles.touchableContainer1(element.meta.width),
          backgroundColor: element.meta.backgroundColor || colors.colorButton,
          borderRadius: element.meta.isRound ? 1000 : 10,
        }}>
        <View style={styles.touchableContainer1(element.meta.width, element)}>
          {element.meta.isText &&
            <Text
              style={{
                ...styles.buttonText,
                color: element.meta.color || color.WHITE,
                fontSize: element.meta.fontSize,
                fontFamily: element.meta.fontFamily,
              }}>
              {element.meta.title || 'Button'}
            </Text>}
          {element.meta.isIcon && element.meta.icon?.family === 'Ionicons' && (
            <Ionicons name={element.meta.icon.icon} size={element.meta.iconSize} color={element.meta.color || color.WHITE} />
          )}
          {element.meta.isIcon && element.meta.icon?.family === 'Entypo' && (
            <Entypo name={element.meta.icon.icon} size={element.meta.iconSize} color={element.meta.color || color.WHITE} />
          )}
          {element.meta.isIcon && element.meta.icon?.family === 'AntDesign' && (
            <AntDesign name={element.meta.icon.icon} size={element.meta.iconSize} color={element.meta.color || color.WHITE} />
          )}
        </View>
      </TouchableOpacity>}
      {element.meta.iconPosition === 'right' && <TouchableOpacity
        activeOpacity={0.6}
        disabled
        style={{
          ...styles.touchableContainer(element.meta.width, element),
          backgroundColor: element.meta.backgroundColor || colors.colorButton,
          borderRadius: element.meta.isRound ? 1000 : 10,
        }}>
        {element.meta.isText &&
          <Text
            style={{
              ...styles.buttonText,
              color: element.meta.color || color.WHITE,
              fontSize: element.meta.fontSize,
              fontFamily: element.meta.fontFamily,
            }}>
          {element.meta.title || 'Button'}
        </Text>}
        {element.meta.isIcon && element.meta.icon?.family === 'Ionicons' && (
          <Ionicons name={element.meta.icon.icon} size={element.meta.iconSize} color={element.meta.color || color.WHITE} />
        )}
        {element.meta.isIcon && element.meta.icon?.family === 'Entypo' && (
          <Entypo name={element.meta.icon.icon} size={element.meta.iconSize} color={element.meta.color || color.WHITE} />
        )}
        {element.meta.isIcon && element.meta.icon?.family === 'AntDesign' && (
          <AntDesign name={element.meta.icon.icon} size={element.meta.iconSize} color={element.meta.color || color.WHITE} />
        )}
      </TouchableOpacity>}
      {element.meta.iconPosition === 'middle' && <TouchableOpacity
        activeOpacity={0.6}
        disabled
        style={{
          ...styles.touchableContainer(element.meta.width),
          backgroundColor: element.meta.backgroundColor || colors.colorButton,
          borderRadius: element.meta.isRound ? 1000 : 10,
        }}>
        <View style={{...styles.touchableContainer1(element.meta.width, element), width: '100%'}}>
          {element.meta.isIcon && element.meta.icon?.family === 'Ionicons' && (
            <Ionicons name={element.meta.icon.icon} size={element.meta.iconSize} color={element.meta.color || color.WHITE} />
          )}
          {element.meta.isIcon && element.meta.icon?.family === 'Entypo' && (
            <Entypo name={element.meta.icon.icon} size={element.meta.iconSize} color={element.meta.color || color.WHITE} />
          )}
          {element.meta.isIcon && element.meta.icon?.family === 'AntDesign' && (
            <AntDesign name={element.meta.icon.icon} size={element.meta.iconSize} color={element.meta.color || color.WHITE} />
          )}
          {element.meta.isText &&
            <Text
              style={{
                ...styles.buttonText,
                color: element.meta.color || color.WHITE,
                fontSize: element.meta.fontSize,
                position: 'absolute',
                alignSelf: 'center',
                fontFamily: element.meta.fontFamily,
              }}>
            {element.meta.title || 'Button'}
          </Text>}
        </View>
      </TouchableOpacity>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: element => ({
    ...element.meta.padding,
    flexDirection: 'row',
    justifyContent: 'center',
  }),
  carouselTitle: colors => ({
    fontSize: 16,
    padding: 5,
    color: colors.text,
  }),
  touchableContainer: (autoWidth, element) => ({
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-around',
    // paddingHorizontal: 15,
    // paddingVertical: 10,
    width: autoWidth === 'auto' ? '65%' : null,
    ...element.meta.padding,
  }),
  touchableContainer1: (autoWidth, element) => ({
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 2,
    width: autoWidth === 'auto' ? '65%' : null,
    ...element?.meta.padding,
  }),
  buttonText: {
    paddingHorizontal: 10,
  },
});

Button.propTypes = {
  element: PropTypes.object.isRequired,
};

export default React.memo(Button);
