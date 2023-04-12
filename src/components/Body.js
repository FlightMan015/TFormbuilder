import React, {useEffect, useMemo} from 'react';
import {useTheme, IconButton} from 'react-native-paper';
import {StyleSheet, Dimensions, View, Text} from 'react-native';
import formStore from '../store/formStore';
import MemoField from './fields';
import MemoGroup from './groups';
import {useNavigation} from '@react-navigation/native';
import {useDrawerStatus} from '@react-navigation/drawer';
import {componentName, radioButton} from '../constant';
import {ScrollView, FlatList} from 'react-native-gesture-handler';
import DraggableFlatList from 'react-native-draggable-flatlist';
import PatternBackgroundView from '../common/PatternBackgroundView';

const Body = props => {
  const {colors, size} = useTheme();
  const formData = formStore(state => state.formData);
  const selectedFieldIndex = formStore(state => state.selectedFieldIndex);
  const setSelectedFieldIndex = formStore(state => state.setSelectedFieldIndex);
  const setVisibleJsonDlg = formStore(state => state.setVisibleJsonDlg);
  const setIndexToAdd = formStore(state => state.setIndexToAdd);
  const setOpenMenu = formStore(state => state.setOpenMenu);
  const openMenu = formStore(state => state.openMenu);
  const openSetting = formStore(state => state.openSetting);
  const setOpenSetting = formStore(state => state.setOpenSetting);
  const preview = formStore(state => state.preview);
  const setPreview = formStore(state => state.setPreview);
  const userRole = formStore(state => state.userRole);
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
      <View style={{flex: 1}}>
        <PatternBackgroundView
          imageWidth={20}
          imageHeight={20}
          imageUri={formData.lightStyle.backgroundPatternImage}
          backgroundColor={colors.background}
        />
      </View>
      <View
        style={{flex: 1, position: 'absolute', width: '100%', height: '100%'}}>
        <ScrollView style={styles.container(colors)}>
          <View
            style={{flexDirection: 'row', paddingBottom: 50, flexWrap: 'wrap'}}>
            {formData.data.map((field, index) => {
              if (
                field.component !== componentName.TABSECTION &&
                field.component !== componentName.GROUP &&
                field.component !== componentName.GRID &&
                field.component !== componentName.LISTSECTION
              ) {
                return (
                  <MemoField
                    key={index}
                    onSelect={() => onSelect([index])}
                    element={field}
                    index={[index]}
                    selected={
                      JSON.stringify([index]) === JSON.stringify(selectedFieldIndex)
                    }
                    isFirstField={index === 0}
                    isLastField={index + 1 === formData.data.length}
                  />
                );
              } else {
                return (
                  <MemoGroup
                    key={index}
                    onSelect={e => onSelect(e)}
                    element={field}
                    index={[index]}
                    selected={
                      JSON.stringify([index]) === JSON.stringify(selectedFieldIndex)
                    }
                    isFirstGroup={index === 0}
                    isLastGroup={index + 1 === formData.data.length}
                  />
                );
              }
            })}
          </View>
        </ScrollView>
        {(userRole === 'admin' || userRole === 'builder') && !preview && (
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
        )}
        {(userRole === 'admin' || userRole === 'builder') && (
          <>
            <IconButton
              icon={preview ? 'pencil-outline' : 'eye-outline'}
              size={size.s30}
              iconColor={colors.card}
              style={styles.previewForm(colors)}
              onPress={() => {
                setPreview(!preview);
              }}
            />
            <IconButton
              icon="code-json"
              size={size.s30}
              iconColor={colors.card}
              style={styles.previewJSON(colors)}
              onPress={() => {
                setVisibleJsonDlg(true);
              }}
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: colors => ({
    flex: 1,
    paddingHorizontal: 5,
    paddingBottom: 50,
  }),
  addFieldButton: colors => ({
    backgroundColor: colors.colorButton,
    margin: 10,
    position: 'absolute',
    bottom: 0,
  }),
  previewForm: colors => ({
    backgroundColor: 'green',
    margin: 10,
    position: 'absolute',
    bottom: 0,
    right: 0,
  }),
  previewJSON: colors => ({
    backgroundColor: 'grey',
    margin: 10,
    position: 'absolute',
    bottom: 0,
    right: 55,
  }),
});

export default Body;
