import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, TouchableOpacity, Text, Alert} from 'react-native';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { color } from '../../theme/styles';
import formStore from '../../store/formStore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

const Button = props => {
  const {element} = props;
  const {colors} = useTheme();
  const userRole = formStore(state => state.userRole);
  const preview = formStore(state => state.preview);
  const role = element.role.find(e => e.name === userRole);

  return (
    <View style={styles.container}>
      {
        role.view && (
          <>
            {element.meta.iconPosition === 'left' && <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                if (element.event.onPress) {
                  Alert.alert('Rule Action', `Fired onPress action. rule - ${element.event.onPress}.`);
                }
              }}
              disabled={!role.edit || !preview}
              style={{
                ...styles.touchableContainer,
                backgroundColor: role.edit ? element.meta.backgroundColor || colors.colorButton : colors.icon,
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
              onPress={() => {
                if (element.event.onPress) {
                  Alert.alert('Rule Action', `Fired onPress action. rule - ${element.event.onPress}.`);
                }
              }}
              disabled={!role.edit || !preview}
              style={{
                ...styles.touchableContainer1,
                backgroundColor: role.edit ? element.meta.backgroundColor || colors.colorButton : colors.icon,
                borderRadius: element.meta.isRound ? 1000 : 10,
              }}>
              <View style={styles.touchableContainer1}>
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
              onPress={() => {
                if (element.event.onPress) {
                  Alert.alert('Rule Action', `Fired onPress action. rule - ${element.event.onPress}.`);
                }
              }}
              disabled={!role.edit || !preview}
              style={{
                ...styles.touchableContainer1,
                backgroundColor: role.edit ? element.meta.backgroundColor || colors.colorButton : colors.icon,
                borderRadius: element.meta.isRound ? 1000 : 10,
              }}>
              <View style={styles.touchableContainer1}>
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
              onPress={() => {
                if (element.event.onPress) {
                  Alert.alert('Rule Action', `Fired onPress action. rule - ${element.event.onPress}.`);
                }
              }}
              disabled={!role.edit || !preview}
              style={{
                ...styles.touchableContainer,
                backgroundColor: role.edit ? element.meta.backgroundColor || colors.colorButton : colors.icon,
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
              onPress={() => {
                if (element.event.onPress) {
                  Alert.alert('Rule Action', `Fired onPress action. rule - ${element.event.onPress}.`);
                }
              }}
              disabled={!role.edit || !preview}
              style={{
                ...styles.touchableContainer,
                backgroundColor: role.edit ? element.meta.backgroundColor || colors.colorButton : colors.icon,
                borderRadius: element.meta.isRound ? 1000 : 10,
              }}>
              <View style={{...styles.touchableContainer1, width: '100%'}}>
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
          </>
        )
      }
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'center',
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
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  touchableContainer1: {
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  buttonText: {
    paddingHorizontal: 10,
  },
});

Button.propTypes = {
  element: PropTypes.object.isRequired,
};

export default React.memo(Button);
