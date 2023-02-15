import React, { useMemo } from 'react';
import {StyleSheet} from 'react-native';
import {getSettingComponent} from './settingComponentMap';
import formStore from '../../store/formStore';
import { ScrollView } from 'react-native-gesture-handler';

const FieldSetting = () => {
  const index = formStore(state => state.selectedFieldIndex);
  const element = formStore(state => state.selectedField);

  return useMemo(() => {
    if (element) {
      const FieldSettingComponent = getSettingComponent(element.component);
      return (
        <ScrollView style={styles.container}>
          <FieldSettingComponent element={element} index={index} />
        </ScrollView>
      )
    }
  }, [JSON.stringify(element), JSON.stringify(index)]);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FieldSetting;
