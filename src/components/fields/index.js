import React, {useEffect, useMemo} from 'react';
import {useTheme, IconButton} from 'react-native-paper';
import {
  ScrollView,
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
  const {element, index, selected, preview, onClick, onSelect, isLastField} = props;
  const {colors, size} = useTheme();
  const FieldComponent = getComponent(element.component);
  const opacity = new Animated.Value(1);

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
      <View
        style={styles.field(colors, selected)}
        onStartShouldSetResponder={() => {
          onSelect(index);
        }}>
        <FieldComponent element={element} index={index} selected={selected} />
      </View>
      {selected && (
        <Animated.View style={{...styles.setIcons, opacity}}>
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
    </View>
  );
};

const MemoField = ({element, index, editRole, onSelect, selected, isLastField}) => {
  const formData = formStore(state => state.formData);
  const setFormData = formStore(state => state.setFormData);
  const setSelectedField = formStore(state => state.setSelectedField);
  const setSelectedFieldIndex = formStore(state => state.setSelectedFieldIndex);
  const setSettingType = formStore(state => state.setSettingType);
  const navigation = useNavigation();

  useEffect(() => {
    if (selected) setSelectedField(element);
  }, [element, selected]);

  const onClickAction = type => {
    if (type === 'delete') {
      setSelectedFieldIndex({});
      setFormData({...formData, data: deleteField(formData, index)});
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

  return useMemo(
    () => (
      <Field
        element={element}
        index={index}
        selected={selected}
        onClick={type => onClickAction(type)}
        onSelect={onSelect}
        isLastField={isLastField}
      />
    ),
    [element, index, editRole, selected],
  );
};

const styles = StyleSheet.create({
  setIcons: {
    marginTop: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    position: 'absolute',
    bottom: -50,
    zIndex: 999,
  },
  field: (colors, visibleBorder) => ({
    borderColor: visibleBorder ? '#0087E0' : colors.background,
    borderRadius: 5,
    borderWidth: visibleBorder ? 2 : 0,
    marginVertical: 3,
  }),
});

export default React.memo(MemoField);
