import React, { useEffect, useMemo } from 'react';
import { useTheme, IconButton } from 'react-native-paper';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { getComponent } from './componentMap';
import formStore from '../../store/formStore';
import { useNavigation } from '@react-navigation/native';
import { deleteField, moveDown, moveUp } from '../../actions/formdata';

const Group = props => {
  const {element, index, selected, onClick, onSelect, isLastGroup} = props;
  const {colors, size} = useTheme();
  const userRole = formStore(state => state.userRole);
  const preview = formStore(state => state.preview);
  const role = element.role.find(e => e.name === userRole);
  const GroupComponent = getComponent(element.component);
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
      {
        role.view && (
          <>
            <View
              style={styles.field(colors, (selected && !preview))}
              onStartShouldSetResponder={() => {
                if(!selected) onSelect(index);
              }}>
              <GroupComponent element={element} index={index} selected={selected} onSelect={e => onSelect(e)} preview={preview} />
            </View>
            {(selected && !preview) && (
              <Animated.View style={{...styles.setIcons, opacity}}>
                {
                  index.groupIndex > 0 && (
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
                  !isLastGroup && (
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
                  icon="cog-outline"
                  size={24}
                  iconColor={'#fff'}
                  style={{margin: 3, backgroundColor: '#0086DE'}}
                  onPress={() => {
                    onSelect(index);
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

const MemoGroup = ({element, index, editRole, onSelect, selected, isLastGroup}) => {
  const formData = formStore(state => state.formData);
  const setFormData = formStore(state => state.setFormData);
  const setSelectedField = formStore(state => state.setSelectedField);
  // const selectedFieldIndex = formStore(state => state.selectedFieldIndex);
  const setSelectedFieldIndex = formStore(state => state.setSelectedFieldIndex);
  const navigation = useNavigation();

  useEffect(() => {
    // if (selected && !('childIndex' in selectedFieldIndex))
      setSelectedField(element);
  }, [element, selected]);

  const onClickAction = type => {
    if (type === 'delete') {
      setSelectedFieldIndex({});
      setFormData({...formData, data: deleteField(formData, index)});
    }
    if (type === 'setting') {
      setSelectedField(element);
      navigation.getParent('RightDrawer').openDrawer();
    }
    if (type === 'moveup') {
      setFormData({...formData, data: moveUp(formData, index)});
      setSelectedFieldIndex({...index, groupIndex: index.groupIndex - 1});
    }
    if (type === 'movedown') {
      setFormData({...formData, data: moveDown(formData, index)});
      setSelectedFieldIndex({...index, groupIndex: index.groupIndex + 1});
    }
  };

  return useMemo(
    () => (
      <Group
        element={element}
        index={index}
        selected={selected}
        onClick={type => onClickAction(type)}
        onSelect={onSelect}
        isLastGroup={isLastGroup}
      />
    ),
    [JSON.stringify(element), JSON.stringify(index), editRole, selected],
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
    borderWidth: 2,
    marginVertical: 3,
  }),
});

export default React.memo(MemoGroup);
