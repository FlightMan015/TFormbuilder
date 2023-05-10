import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from 'react-native';
import {useTheme} from 'react-native-paper';
import formStore from '../../store/formStore';

const Header = props => {
  const {element} = props;
  const {colors, fonts} = useTheme();
  const userRole = formStore(state => state.userRole);
  const role = element.role.find(e => e.name === userRole);

  return (
    <View style={styles.container(element)}>
      {role.view && (
        <Text
          style={{
            textAlign: element.meta.textAlign,
            ...fonts.headings,
            ...element.meta.font,
          }}>
          {element.meta.header}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: element => ({
    ...element.meta.padding
  }),
});

Header.propTypes = {
  element: PropTypes.object.isRequired,
};

export default Header;
