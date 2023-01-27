import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const CustomButton = props => {
  const {onPress, style, text, textStyle, icon, iconSize, iconColor} = props;

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={{flexDirection: 'row', alignItems: 'center', ...style}}>
      {icon && (
        <Icon
          name={icon}
          size={iconSize}
          color={iconColor || 'blue'}
          style={{
            width: text ? '15%' : '100%',
            alignSelf: 'center',
            textAlign: 'center',
          }}
        />
      )}
      {text && (
        <Text
          style={{
            width: icon ? '85%' : '100%',
            height: '100%',
            textAlign: 'center',
            textAlignVertical: 'center',
            color: 'blue',
            ...textStyle,
          }}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
