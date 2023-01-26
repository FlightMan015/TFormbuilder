import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, TouchableOpacity, Text, Alert} from 'react-native';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { color } from '../../theme/styles';
const Button = props => {

  const {element, contents, editRole} = props;
  const {colors} = useTheme();
  const [value, setValue] = useState('');
  console.log(editRole);

  return (
    <View style={styles.container}>
      {element.meta.iconPosition === 'left' && <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          if (element.event.onPress) {
            Alert.alert('Rule Action', `Fired onPress action. rule - ${element.event.onPress}.`);
          }
        }}
        disabled={!editRole}
        style={{
          ...styles.touchableContainer,
          backgroundColor: editRole ? element.meta.backgroundColor || colors.colorButton : colors.icon,
          width: element.meta.width || '100%',
          height: element.meta.height || 40,
          borderRadius: element.meta.borderRadius || 10,
        }}>
        {element.meta.isIcon &&
          <Icon
            name={element.meta.icon || 'account'}
            size={element.meta.iconSize}
            color={element.meta.textColor || color.WHITE}
            />}
        {element.meta.isText &&
          <Text
            style={{
              ...styles.buttonText,
              color: element.meta.textColor || color.WHITE,
              fontSize: element.meta.fontSize,
            }}>
          {element.meta.text || 'Button'}
        </Text>}
      </TouchableOpacity>}
      {element.meta.iconPosition === 'above' && <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          if (element.event.onPress) {
            Alert.alert('Rule Action', `Fired onPress action. rule - ${element.event.onPress}.`);
          }
        }}
        disabled={!editRole}
        style={{
          ...styles.touchableContainer1,
          backgroundColor: editRole ? element.meta.backgroundColor || colors.colorButton : colors.icon,
          width: element.meta.width || '100%',
          height: element.meta.height || 40,
          borderRadius: element.meta.borderRadius || 10,
        }}>
        <View style={styles.touchableContainer1}>
          {element.meta.isIcon &&
            <Icon
              name={element.meta.icon || 'account'}
              size={element.meta.iconSize}
              color={element.meta.textColor || color.WHITE}
              />}
          {element.meta.isText &&
            <Text
              style={{
                ...styles.buttonText,
                color: element.meta.textColor || color.WHITE,
                fontSize: element.meta.fontSize,
              }}>
            {element.meta.text || 'Button'}
          </Text>}
        </View>
      </TouchableOpacity>}
      {element.meta.iconPosition === 'below' && <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          if (element.event.onPress) {
            Alert.alert('Rule Action', `Fired onPress action. rule - ${element.event.onPress}.`);
          }
        }}
        disabled={!editRole}
        style={{
          ...styles.touchableContainer1,
          backgroundColor: editRole ? element.meta.backgroundColor || colors.colorButton : colors.icon,
          width: element.meta.width || '100%',
          height: element.meta.height || 40,
          borderRadius: element.meta.borderRadius || 10,
        }}>
        <View style={styles.touchableContainer1}>
          {element.meta.isText &&
            <Text
              style={{
                ...styles.buttonText,
                color: element.meta.textColor || color.WHITE,
                fontSize: element.meta.fontSize,
              }}>
              {element.meta.text || 'Button'}
            </Text>}
          {element.meta.isIcon &&
            <Icon
              name={element.meta.icon || 'account'}
              size={element.meta.iconSize}
              color={element.meta.textColor || color.WHITE}
              />}
        </View>
      </TouchableOpacity>}
      {element.meta.iconPosition === 'right' && <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          if (element.event.onPress) {
            Alert.alert('Rule Action', `Fired onPress action. rule - ${element.event.onPress}.`);
          }
        }}
        disabled={!editRole}
        style={{
          ...styles.touchableContainer,
          backgroundColor: editRole ? element.meta.backgroundColor || colors.colorButton : colors.icon,
          width: element.meta.width || '100%',
          height: element.meta.height || 40,
          borderRadius: element.meta.borderRadius || 10,
        }}>
        {element.meta.isText &&
          <Text
            style={{
              ...styles.buttonText,
              color: element.meta.textColor || color.WHITE,
              fontSize: element.meta.fontSize,
            }}>
          {element.meta.text || 'Button'}
        </Text>}
        {element.meta.isIcon &&
          <Icon
            name={element.meta.icon || 'account'}
            size={element.meta.iconSize}
            color={element.meta.textColor || color.WHITE}
            />}
      </TouchableOpacity>}
      {element.meta.iconPosition === 'middle' && <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          if (element.event.onPress) {
            Alert.alert('Rule Action', `Fired onPress action. rule - ${element.event.onPress}.`);
          }
        }}
        disabled={!editRole}
        style={{
          ...styles.touchableContainer,
          backgroundColor: editRole ? element.meta.backgroundColor || colors.colorButton : colors.icon,
          width: element.meta.width || 150,
          height: element.meta.height || 40,
          borderRadius: element.meta.borderRadius || 10,
        }}>
        <View style={{...styles.touchableContainer1, width: '100%'}}>
          {element.meta.isIcon &&
            <Icon
              name={element.meta.icon || 'account'}
              size={element.meta.iconSize}
              color={element.meta.textColor || color.WHITE}
              />}
          {element.meta.isText &&
            <Text
              style={{
                ...styles.buttonText,
                color: element.meta.textColor || color.WHITE,
                fontSize: element.meta.fontSize,
                position: 'absolute',
                alignSelf: 'center',
              }}>
            {element.meta.text || 'Button'}
          </Text>}
        </View>
      </TouchableOpacity>}
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
  touchableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-around',
  },
  touchableContainer1: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    paddingHorizontal: 10,
  },
});

Button.propTypes = {
  element: PropTypes.object.isRequired,
};

export default React.memo(Button);
