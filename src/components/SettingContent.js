import React from 'react';
import {View, StyleSheet} from 'react-native';
import FieldSetting from './fieldsetting';
import FieldAction from './FieldAction';
import FieldRole from './FieldRole';
import formStore from '../store/formStore';
import FormSetting from './FormSetting';

const SettingContent = props => {
  const settingType = formStore(state => state.settingType);
  return (
    <View style={styles.container}>
      {settingType === 'setting' && <FieldSetting />}
      {settingType === 'action' && <FieldAction />}
      {settingType === 'role' && <FieldRole />}
      {settingType === 'formSetting' && <FormSetting />}
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
