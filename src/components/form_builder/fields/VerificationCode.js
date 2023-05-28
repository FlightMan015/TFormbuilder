import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from 'react-native';
import {useTheme} from 'react-native-paper';

const VerificationCode = props => {
  const {element} = props;
  const {colors, fonts} = useTheme();

  return (
    <View style={styles.container(element)}>
      <Text style={{
        textAlign: element.meta.textAlign,
        ...fonts.headings,
        ...element.meta.font
      }}>
        {element.meta.header}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: element => ({
    ...element.meta.padding
  }),
  textBox: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 5,
    paddingLeft: 10,
  },
});

VerificationCode.propTypes = {
  element: PropTypes.object.isRequired,
};

export default VerificationCode;
