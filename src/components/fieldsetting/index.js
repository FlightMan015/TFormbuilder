import React from 'react';
import {useTheme} from 'react-native-paper';
import {ScrollView, StyleSheet} from 'react-native';
import {getSettingComponent} from './settingComponentMap';
import formStore from '../../store/formStore';

const FieldSetting = props => {
  const {colors, size} = useTheme();
  const index = formStore(state => state.selectedFieldIndex);
  const element = formStore(state => state.selectedField);
  if (element) {
    const FieldSettingComponent = getSettingComponent(element.component);

    return (
      <ScrollView style={styles.container}>
        <FieldSettingComponent element={element} index={index} />
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FieldSetting;
