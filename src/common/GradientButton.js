import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientButton = props => {
  const {onPress, style, text, textStyle, colors, start, end, disabled} = props;
  return (
    <LinearGradient colors={colors} start={start} end={end} style={style}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        disabled={disabled}
        style={{...styles.touchableOpacity, ...style}}>
        <Text
          style={{
            ...styles.textStyle,
            ...textStyle,
          }}>
          {text}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  touchableOpacity: {
    justifyContent: 'space-around',
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  textStyle: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default GradientButton;
