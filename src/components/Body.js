import React, {useEffect} from 'react';
import {useTheme, IconButton} from 'react-native-paper';
import {ScrollView, StyleSheet, Dimensions, View, Text} from 'react-native';
import formStore from '../store/formStore';
import MemoField from './fields';
import MemoGroup from './groups';
import { useNavigation } from '@react-navigation/native';
import { useDrawerStatus } from '@react-navigation/drawer';
import { componentName } from '../constant';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const ScreenHeight = Dimensions.get('window').height;

const Body = props => {
  const {formName, preview, onClick} = props;
  const {colors, size} = useTheme();
  const formData = formStore(state => state.formData);
  const selectedFieldIndex = formStore(state => state.selectedFieldIndex);
  const setSelectedFieldIndex = formStore(state => state.setSelectedFieldIndex);

  const setIndexToAdd = formStore(state => state.setIndexToAdd);
  const setOpenMenu = formStore(state => state.setOpenMenu);
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
    <View style={{flex: 1}}>
      <ScrollView style={styles.container(colors)}>
        <View style={{paddingBottom: 50}}>
          {formData.data.map((field, index) => {
            if (field.component !== componentName.TABSECTION && field.component !== componentName.GROUP) {
              return (
                <MemoField
                  key={index}
                  onSelect={() => onSelect({childIndex: index})}
                  element={field}
                  index={{childIndex: index}}
                  selected={!('groupIndex' in selectedFieldIndex) && 'childIndex' in selectedFieldIndex && selectedFieldIndex.childIndex === index}
                  isLastField={(index + 1) === formData.data.length} />
              );
            } else {
              return (
                <MemoGroup
                  key={index}
                  onSelect={e => onSelect(e)}
                  element={field}
                  index={{groupIndex: index}}
                  selected={'groupIndex' in selectedFieldIndex && selectedFieldIndex.groupIndex === index}
                  isLastGroup={(index + 1) === formData.data.length} />
              );
            }
          })}
        </View>
      </ScrollView>
      <IconButton
        icon="plus"
        size={size.s30}
        iconColor={colors.card}
        style={styles.addFieldButton(colors)}
        onPress={() => {
          setIndexToAdd({});
          setOpenMenu(!openMenu);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: colors => ({
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: colors.background,
    paddingBottom: 50,
  }),
  addFieldButton: colors => ({
    backgroundColor: colors.colorButton,
    margin: 10,
    position: 'absolute',
    bottom: 0,
    right: 0,
  }),
});

export default Body;
