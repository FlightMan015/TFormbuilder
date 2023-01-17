import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const TextButton = props => {
  const {onPress, style, text, textStyle} = props;

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={{...styles.touchableOpacity, ...style}}>
      <Text
        style={{
          ...styles.textStyle,
          ...textStyle,
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableOpacity: {
    justifyContent: 'space-around',
  },
  textStyle: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default TextButton;
