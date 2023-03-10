import React, {useEffect, useMemo} from 'react';
import {useTheme, IconButton} from 'react-native-paper';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {getComponent} from './componentMap';
import formStore from '../../store/formStore';
import {useNavigation} from '@react-navigation/native';
import { deleteField, moveDown, moveUp } from '../../actions/formdata';

const Field = props => {
  const {element, index, selected, onClick, onSelect, isLastField} = props;
  const {colors, fonts} = useTheme();
  const userRole = formStore(state => state.userRole);
  const preview = formStore(state => state.preview);
  const submit = formStore(state => state.submit);
  const formValue = formStore(state => state.formValue);
  const role = element.role.find(e => e.name === userRole);
  const FieldComponent = getComponent(element.component);
  const opacity = new Animated.Value(1);

  const setValidation = formStore(state => state.setValidation);
  const validation = formStore(state => state.validation);
  const formValidation = formStore(state => state.formValidation);
  const setFormValidation = formStore(state => state.setFormValidation);

  if (formValidation && element.is_mandatory && !formValue[element.field_name]) {
    setFormValidation(false);
  }

  useEffect(() => {
    if (element.is_mandatory && !formValue[element.field_name]) {
      setValidation({...validation, [element.field_name]: false});
    } else if (!validation[element.field_name]) {
      setValidation({...validation, [element.field_name]: true});
    }
  }, [element.is_mandatory, !!formValue[element.field_name]]);
 
  const fadeOut = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const fadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View>
      {
        role.view && (
          <>
            <View
              style={styles.field(colors, (selected && !preview))}
              onStartShouldSetResponder={() => {
                onSelect(index);
              }}>
              <FieldComponent element={element} index={index} selected={selected} />
              {(element.is_mandatory && !validation[element.field_name] && submit) && (
                <Text style={styles.note(colors, fonts)}>{element.meta.title} field is required.</Text>
              )}
            </View>
            {(selected && !preview) && (
              <Animated.View style={{...styles.setIcons, opacity, backgroundColor: colors.background, borderRadius: 20}}>
                {
                  index.childIndex > 0 && (
                    <IconButton
                      icon="chevron-up"
                      size={24}
                      iconColor={'#fff'}
                      style={{margin: 3, backgroundColor: '#0A1551'}}
                      onPress={() => {
                        onClick('moveup');
                      }}
                    />
                  )
                }
                {
                  !isLastField && (
                    <IconButton
                      icon="chevron-down"
                      size={24}
                      iconColor={'#fff'}
                      style={{margin: 3, backgroundColor: '#0A1551'}}
                      onPress={() => {
                        onClick('movedown');
                      }}
                    />
                  )
                }
                <IconButton
                  icon="play-outline"
                  size={24}
                  iconColor={'#fff'}
                  style={{margin: 3, backgroundColor: '#0A1551'}}
                  onPress={() => {
                    onClick('action');
                  }}
                />
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
              </Animated.View>
            )}
          </>
        )
      }
    </View>
  );
};

const MemoField = ({element, index, onSelect, selected, isLastField}) => {
  const formData = formStore(state => state.formData);
  const setFormData = formStore(state => state.setFormData);
  const setSelectedField = formStore(state => state.setSelectedField);
  const setSelectedFieldIndex = formStore(state => state.setSelectedFieldIndex);
  const setSettingType = formStore(state => state.setSettingType);
  const formValue = formStore(state => state.formValue);
  const setFormValue = formStore(state => state.setFormValue);
  const navigation = useNavigation();
  const viewMode = formStore(state => state.viewMode);
  const validation = formStore(state => state.validation);
  const formValidation = formStore(state => state.formValidation);
  const i18nValues = formStore(state => state.i18nValues);

  useEffect(() => {
    if (selected)
      setSelectedField(element);
  }, [JSON.stringify(element), selected]);

  const onClickAction = type => {
    if (type === 'delete') {
      setSelectedFieldIndex({});
      setFormData({...formData, data: deleteField(formData, index)});
      const tempFormValue = {...formValue};
      delete tempFormValue[element.field_name];
      setFormValue(tempFormValue);
    }
    if (type === 'setting') {
      // setSelectedField(element);
      setSettingType('setting');
      navigation.getParent('RightDrawer').openDrawer();
    }
    if (type === 'moveup') {
      setFormData({...formData, data: moveUp(formData, index)});
      setSelectedFieldIndex({...index, childIndex: index.childIndex - 1});
    }
    if (type === 'movedown') {
      setFormData({...formData, data: moveDown(formData, index)});
      setSelectedFieldIndex({...index, childIndex: index.childIndex + 1});
    }
    if (type === 'action') {
      setSettingType('action');
      navigation.getParent('RightDrawer').openDrawer();
    }
    if (type === 'role') {
      setSettingType('role');
      navigation.getParent('RightDrawer').openDrawer();
    }
  };

  return useMemo(() => (
    <Field
      element={element}
      index={index}
      selected={selected}
      onClick={type => onClickAction(type)}
      onSelect={onSelect}
      isLastField={isLastField}
    />), [JSON.stringify(element), JSON.stringify(index), selected, JSON.stringify(formData.lightStyle), JSON.stringify(formData.darkStyle), viewMode, validation[element.field_name], formValidation, i18nValues.locale]);
};

const styles = StyleSheet.create({
  setIcons: {
    marginTop: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    // position: 'absolute',
    // bottom: -50,
    // zIndex: 999,
  },
  field: (colors, visibleBorder) => ({
    borderColor: visibleBorder ? '#0087E0' : colors.background,
    borderRadius: 5,
    borderWidth: visibleBorder ? 2 : 0,
    marginVertical: 3,
    // zIndex: 0,
  }),
  note: (colors, fonts) => ({
    color: colors.warning,
    fontFamily: fonts.values.fontFamily,
    fontSize: fonts.values.fontSize,
    marginHorizontal: 5,
    marginLeft: 10,
  }),
});

export default MemoField;
