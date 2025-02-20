import React, {useEffect, useMemo} from 'react';
import {useTheme} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {getComponent} from './componentMap';
import formStore from '../../../store/formStore';
import {useNavigation} from '@react-navigation/native';

const Group = props => {
  const {element, index, selected, onClick, onSelect, isLastGroup, isFirstGroup} = props;
  const {colors, size} = useTheme();
  const GroupComponent = getComponent(element.component);

  const selectedFieldIndex = formStore(state => state.selectedFieldIndex);

  return (
    <View
      style={styles.field(colors, selected, element)}
      onStartShouldSetResponder={() => {
        if (selectedFieldIndex.length === 0) {
          onSelect(index.slice(0, 1));
        } else {
          let samePos = -1;

          for (let i = 0; i < Math.min(index.length, selectedFieldIndex.length); i++) {
            if (index[i] !== selectedFieldIndex[i]) {
              break;
            }
            samePos = i;
          }

          if (Math.min(index.length, selectedFieldIndex.length) - 1 === samePos) {
            if (index.length > selectedFieldIndex.length) {
              onSelect(index.slice(0, samePos + 2));
            } else if (index.length < selectedFieldIndex.length) {
              onSelect(index.slice(0, samePos + 1));
            }
          } else {
            onSelect(index.slice(0, samePos + 2));
          }
        }

        return true;
      }}>
      <GroupComponent
        element={element}
        index={index}
        selected={selected}
        onSelect={e => onSelect(e)}
      />
    </View>
  );  
};

const MemoGroup = ({element, index, onSelect, selected, isLastGroup, isFirstGroup}) => {
  const formData = formStore(state => state.formData);
  const setFormData = formStore(state => state.setFormData);
  const setSelectedField = formStore(state => state.setSelectedField);
  const selectedField = formStore(state => state.selectedField);
  const setSettingType = formStore(state => state.setSettingType);
  // const selectedFieldIndex = formStore(state => state.selectedFieldIndex);
  const setSelectedFieldIndex = formStore(state => state.setSelectedFieldIndex);
  const navigation = useNavigation();

  useEffect(() => {
    if (selected) setSelectedField(element);
  }, [JSON.stringify(element)]);

  return useMemo(
    () => (
      <Group
        element={element}
        index={index}
        selected={selected}
        onClick={type => onClickAction(type)}
        onSelect={onSelect}
        isLastGroup={isLastGroup}
        isFirstGroup={isFirstGroup}
      />
    ),
    [JSON.stringify(element), JSON.stringify(index), selected],
  );
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
  field: (colors, visibleBorder, element) => ({
    borderColor: visibleBorder ? '#0087E0' : colors.background,
    borderRadius: 5,
    borderWidth: visibleBorder ? 2 : 0,
    marginVertical: 3,
    width: element.meta.field_width.indexOf('%') === -1 ? parseInt(element.meta.field_width, 10) : element.meta.field_width,
  }),
});

export default React.memo(MemoGroup);
