import React, {useEffect} from 'react';
import {useTheme} from 'react-native-paper';
import {ScrollView, StyleSheet, Dimensions, View} from 'react-native';
import formStore from '../store/formStore';
import MemoField from './fields';
import { useNavigation } from '@react-navigation/native';
import { useDrawerStatus } from '@react-navigation/drawer'

const ScreenHeight = Dimensions.get('window').height;

const Body = props => {
  const {formName, preview, onClick} = props;
  const {colors, size} = useTheme();
  const formData = formStore(state => state.formData);
  const selectedFieldIndex = formStore(state => state.selectedFieldIndex);
  const setSelectedFieldIndex = formStore(state => state.setSelectedFieldIndex);

  const openMenu = formStore(state => state.openMenu);
  const openSetting = formStore(state => state.openSetting);
  const setOpenSetting = formStore(state => state.setOpenSetting);
  const navigation = useNavigation();
  const status = useDrawerStatus();

  useEffect(() => {
    if (openMenu) {
      navigation.getParent('FieldMenu').openDrawer();
    } else {
      navigation.getParent('FieldMenu').closeDrawer();
    }
  }, [openMenu]);

  useEffect(() => {
    if (status === 'closed') {
      setOpenSetting(false);
    } else {
      setOpenSetting(true);
    }
  }, [status]);

  useEffect(() => {
    if (openSetting) {
      navigation.getParent('RightDrawer').openDrawer();
    } else {
      navigation.getParent('RightDrawer').closeDrawer();
    }
  }, [openSetting]);

  const onSelect = fieldIndex => {
    setSelectedFieldIndex(fieldIndex);
  };

  return (
    <ScrollView style={styles.container(colors)}>
      <View style={{paddingBottom: 50}}>
        {formData.data.map((field, index) => (
          <MemoField key={index} onSelect={() => onSelect(index)} element={field} index={{childIndex: index}} selected={selectedFieldIndex === index} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: colors => ({
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: colors.background,
    paddingBottom: 50,
  }),
});

export default Body;
