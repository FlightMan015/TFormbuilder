import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

const Title = ({visible, onPress, name, style}) => {
  const {fonts, colors} = useTheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{...style, ...styles.showItem}}>
        <Text style={{...styles.text(fonts, colors)}}>{name}</Text>
        <Icon
          name={visible ? 'chevron-down' : 'chevron-right'}
          size={20}
          color={colors.colorButton}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  showItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: (fonts, colors) => ({
    marginLeft: 5,
    marginRight: 10,
    ...fonts.values,
    color: colors.colorButton,
  }),
});

Title.propTypes = {
  visible: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default React.memo(Title);
