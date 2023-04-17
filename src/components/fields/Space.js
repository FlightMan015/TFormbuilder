import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from 'react-native';
import {useTheme} from 'react-native-paper';
import formStore from '../../store/formStore';

const Space = props => {
  const {element} = props;
  const {colors, fonts} = useTheme();
  const userRole = formStore(state => state.userRole);
  const role = element.role.find(e => e.name === userRole);

  return (
    <View
      style={{
        // width: `${element.meta.width}%`,
        width: element.meta.width,
        height: element.meta.height,
        backgroundColor: element.meta.backgroundColor,
      }}>
      {role.view && <View></View>}
    </View>
  );
};

Space.propTypes = {
  element: PropTypes.object.isRequired,
};

export default Space;
