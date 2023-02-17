import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MemoField from '../fields';
import {IconButton, useTheme} from 'react-native-paper';
import formStore from '../../store/formStore';
import FieldLabel from '../../common/FieldLabel';

const Section = ({
  element,
  index,
  selected,
  preview,
  onSelect,
}) => {
  const {colors, fonts} = useTheme();
  const setIndexToAdd = formStore(state => state.setIndexToAdd);
  const setOpenMenu = formStore(state => state.setOpenMenu);
  const selectedFieldIndex = formStore(state => state.selectedFieldIndex);
  return (
    <View style={styles.container}>
      <FieldLabel label={element.meta.title || 'Section'} visible={!element.meta.hide_title} />
      <View style={styles.tabContent(colors)}>
        {element.meta.childs.map((child, childindex) => {
          return (
            <MemoField
              key={childindex}
              index={{
                ...index,
                childIndex: childindex,
              }}
              element={child}
              onSelect={e => onSelect(e)}
              selected={selected && 'childIndex' in selectedFieldIndex && selectedFieldIndex.childIndex === childindex}
              isLastField={element.meta.childs.length === (childindex + 1)}
            />
          );
        })}
        {(!preview || !role.edit) && (
          <View style={styles.renderContainer}>
            <IconButton
              icon="plus"
              size={20}
              iconColor={colors.card}
              style={{
                ...styles.iconBtn,
                backgroundColor: colors.colorButton,
              }}
              onPress={() => {
                setIndexToAdd(index);
                setOpenMenu(true);
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  iconBtn: {
    margin: 0,
    marginTop: 10,
    alignSelf: 'center',
    marginVertical: 5,
  },
  dynamicHeaderTextStyle: {
    fontSize: 15,
    paddingVertical: 5,
    fontFamily: 'PublicSans-Regular',
  },
  renderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabContent: colors => ({
    padding: 5,
  }),
});

export default Section;
