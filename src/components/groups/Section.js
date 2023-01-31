import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MemoField from '../fields';
import {IconButton, useTheme} from 'react-native-paper';
import formStore from '../../store/formStore';

const Section = ({
  element,
  index,
  selected,
  preview,
  onSelect,
}) => {
  const {colors} = useTheme();
  const setIndexToAdd = formStore(state => state.setIndexToAdd);
  const setOpenMenu = formStore(state => state.setOpenMenu);
  const selectedFieldIndex = formStore(state => state.selectedFieldIndex);
  return (
    <View style={styles.container}>
      <Text style={styles.carouselTitle(colors)}>{element.meta.title || 'Section'}</Text>
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
        {!preview && (
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
  carouselTitle: colors => ({
    fontSize: 16,
    padding: 5,
    color: colors.text,
  }),
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
    backgroundColor: colors.card,
    padding: 5,
  }),
});

export default Section;
