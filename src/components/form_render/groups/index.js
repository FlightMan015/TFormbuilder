import React, {useEffect, useMemo} from 'react';
import {useTheme} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {getComponent} from './componentMap';
import formStore from '../../../store/formStore';

const Group = props => {
  const {element, index, role} = props;
  const {colors, size} = useTheme();
  const userRole = formStore(state => state.userRole);
  const preview = formStore(state => state.preview);
  const GroupComponent = getComponent(element.component);

  console.log(role)
  
  if (role.view) {
    return (
      <View
        style={styles.field(element)}>
        <GroupComponent
          element={element}
          index={index}
          role={role}
        />
      </View>
    );
  }
  
};

const MemoGroup = ({element, index, onSelect, selected, isLastGroup, isFirstGroup, role}) => {
  const setSelectedField = formStore(state => state.setSelectedField);

  useEffect(() => {
    if (selected) setSelectedField(element);
  }, [JSON.stringify(element)]);

  return useMemo(
    () => (
      <Group
        element={element}
        index={index}
        role={role}
      />
    ),
    [JSON.stringify(element), JSON.stringify(index)],
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
  field: (element) => ({
    borderRadius: 5,
    marginVertical: 3,
    width: element.meta.field_width.indexOf('%') === -1 ? parseInt(element.meta.field_width, 10) : element.meta.field_width,
  }),
});

export default React.memo(MemoGroup);
