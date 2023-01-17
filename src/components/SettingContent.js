import React from 'react';
import {View, StyleSheet} from 'react-native';
import FieldSetting from './fieldsetting';

const SettingContent = props => {
  return (
    <View style={styles.container}>
      <FieldSetting />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#404651',
  },
});

export default SettingContent;
