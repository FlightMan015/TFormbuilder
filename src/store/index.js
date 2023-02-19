import React from 'react';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, View, Text} from 'react-native';
import {IconButton} from 'react-native-paper';

const Body = props => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Body;