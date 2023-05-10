import React, {useEffect, useMemo, createContext, useRef} from 'react';
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
import {moveDown, moveUp} from '../actions/formdata';

export const ScrollEnabledContext = createContext(null);

const Body = props => {
  const {colors, size} = useTheme();
  const formData = formStore(state => state.formData);
  const selectedFieldIndex = formStore(state => state.selectedFieldIndex);
  const setSelectedFieldIndex = formStore(state => state.setSelectedFieldIndex);
  const setSelectedField = formStore(state => state.setSelectedField);
  const setVisibleJsonDlg = formStore(state => state.setVisibleJsonDlg);
  const setIndexToAdd = formStore(state => state.setIndexToAdd);
  const setOpenMenu = formStore(state => state.setOpenMenu);
  const openMenu = formStore(state => state.openMenu);
  const openSetting = formStore(state => state.openSetting);
  const setOpenSetting = formStore(state => state.setOpenSetting);
  const preview = formStore(state => state.preview);
  const setPreview = formStore(state => state.setPreview);
  const userRole = formStore(state => state.userRole);
  const deleteFormData = formStore(state => state.deleteFormData);
  const setFormData = formStore(state => state.setFormData);
  const setSettingType = formStore(state => state.setSettingType);
  const selectedField = formStore(state => state.selectedField);

  const navigation = useNavigation();
  const status = useDrawerStatus();

  const ref = useRef(true);
  const setIsEnabled = (bool) => {
    ref.current && ref.current.setNativeProps({scrollEnabled: bool});
  };

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

    let currentElement = formData.data;

    for (let i = 0; i < fieldIndex.length; i++) {
      currentElement = currentElement[fieldIndex[i]];
      if (i < fieldIndex.length - 1) {
        currentElement = currentElement.meta.childs;
      }
    }

    setSelectedField(currentElement);
  };

  const getElementByIndex = index => {
    let currentElement = formData.data;

    for (let i = 0; i < index.length; i++) {
      currentElement = currentElement[index[i]];
      if (i < index.length - 1) {
        currentElement = currentElement.meta.childs;
      }
    }

    return currentElement;
  };

  const checkIfLastField = index => {
    if (index.length === 1) {
      return formData.data.length === index[0] + 1;
    }

    let currentElement = formData.data;

    for (let i = 0; i < index.length; i++) {
      currentElement = currentElement[index[i]];
      if (i < index.length - 1) {
        currentElement = currentElement.meta.childs;
      }
    }

    return getElementByIndex(index.slice(0, index.length - 1))?.meta?.childs.length === index[index.length - 1] + 1;
  };

  const onClick = type => {
    if (type === 'delete') {
      setSelectedFieldIndex([]);
      deleteFormData(selectedFieldIndex);
    }
    if (type === 'setting') {
      // setSelectedField(element);
      setSettingType('setting');
      navigation.getParent('RightDrawer').openDrawer();
    }
    if (type === 'moveup') {
      setFormData({...formData, data: moveUp(formData, selectedFieldIndex)});
      setSelectedFieldIndex([...selectedFieldIndex.slice(0, selectedFieldIndex.length - 1), selectedFieldIndex[selectedFieldIndex.length - 1] - 1]);
    }
    if (type === 'movedown') {
      setFormData({...formData, data: moveDown(formData, selectedFieldIndex)});
      setSelectedFieldIndex([...selectedFieldIndex.slice(0, selectedFieldIndex.length - 1), selectedFieldIndex[selectedFieldIndex.length - 1] + 1]);
    }
    if (type === 'role') {
      setSettingType('role');
      navigation.getParent('RightDrawer').openDrawer();
    }
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
        <ScrollEnabledContext.Provider value={setIsEnabled}>
          <ScrollView ref={ref} style={styles.container(colors)}>
            <View style={{paddingBottom: 50}}>
              {formData.data.map((field, index) => (
                <View key={index}>
                  {field.component !== componentName.TABSECTION &&
                  field.component !== componentName.GROUP &&
                  field.component !== componentName.GRID &&
                  field.component !== componentName.LISTSECTION ? (
                    <MemoField
                      key={index}
                      onSelect={() => onSelect([index])}
                      element={field}
                      index={[index]}
                      selected={
                        JSON.stringify([index]) ===
                        JSON.stringify(selectedFieldIndex)
                      }
                      isFirstField={index === 0}
                      isLastField={index + 1 === formData.data.length}
                    />
                  ) : (
                    <MemoGroup
                      key={index}
                      onSelect={e => onSelect(e)}
                      element={field}
                      index={[index]}
                      selected={
                        JSON.stringify([index]) ===
                        JSON.stringify(selectedFieldIndex)
                      }
                      isFirstGroup={index === 0}
                      isLastGroup={index + 1 === formData.data.length}
                    />
                  )}
                  {selectedField?.role.find(e => e.name === userRole)?.setting &&
                    index === selectedFieldIndex[0] && !preview && (
                    <View style={styles.setIcons}>
                      {(userRole === 'admin' || userRole === 'builder') && !preview && selectedField.component === componentName.GROUP && (
                        <IconButton
                          icon="plus"
                          size={24}
                          iconColor={colors.card}
                          style={{margin: 3, backgroundColor: colors.colorButton}}
                          onPress={() => {
                            setIndexToAdd([]);
                            setOpenMenu(!openMenu);
                          }}
                        />
                      )}
                      {selectedFieldIndex[selectedFieldIndex.length - 1] !== 0  && (
                        <IconButton
                          icon="chevron-up"
                          size={24}
                          iconColor={'#fff'}
                          style={{margin: 3, backgroundColor: '#0A1551'}}
                          onPress={() => {
                            onClick('moveup');
                          }}
                        />
                      )}
                      {!checkIfLastField(selectedFieldIndex) && (
                        <IconButton
                          icon="chevron-down"
                          size={24}
                          iconColor={'#fff'}
                          style={{margin: 3, backgroundColor: '#0A1551'}}
                          onPress={() => {
                            onClick('movedown');
                          }}
                        />
                      )}
                      <IconButton
                        icon="account-outline"
                        size={24}
                        iconColor={'#fff'}
                        style={{margin: 3, backgroundColor: '#0A1551'}}
                        onPress={() => {
                          onClick('role');
                        }}
                      />
                      <IconButton
                        icon="cog-outline"
                        size={24}
                        iconColor={'#fff'}
                        style={{margin: 3, backgroundColor: '#0086DE'}}
                        onPress={() => {
                          // onSelect(index);
                          onClick('setting');
                        }}
                      />
                      <IconButton
                        icon="delete-outline"
                        size={24}
                        iconColor={'#fff'}
                        style={{margin: 3, backgroundColor: '#FF6150'}}
                        onPress={() => {
                          onClick('delete');
                        }}
                      />
                    </View>
                  )}
                </View>
              ))}
            </View>
          </ScrollView>
        </ScrollEnabledContext.Provider>
        
        {(userRole === 'admin' || userRole === 'builder') && !preview && (
          <IconButton
            icon="plus"
            size={size.s30}
            iconColor={colors.card}
            style={styles.addFieldButton(colors)}
            onPress={() => {
              setIndexToAdd([formData.data.length]);
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
  setIcons: {
    flexDirection: 'row',
    alignSelf: 'center',
    // position: 'absolute',
    // bottom: -50,
    // zIndex: 999,
  },
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
