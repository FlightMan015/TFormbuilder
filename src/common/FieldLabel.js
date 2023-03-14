import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from 'react-native-paper';

const FieldLabel = ({visible, label, is_mandatory}) => {
  const {fonts} = useTheme();
  if (visible) {
    return (
      <Text style={styles.label(fonts)}>{`${label}${is_mandatory ? '*' : ''}`}</Text>
    );
  }
};

const styles = StyleSheet.create({
  label: fonts => ({
    padding: 5,
    ...fonts.labels,
  }),
});

FieldLabel.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default React.memo(FieldLabel);
