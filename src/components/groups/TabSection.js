import React from 'react';
import {View, StyleSheet} from 'react-native';
import MemoField from '../fields';
import DynamicTabView from '../../common/dynamic_tab_view/DynamicTabView';
import {IconButton, useTheme} from 'react-native-paper';
import formStore from '../../store/formStore';
import FieldLabel from '../../common/FieldLabel';

const TabSection = ({
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
      <FieldLabel label={element.meta.title || 'Tab Section'} visible={!element.meta.hide_title} />
      <DynamicTabView
        data={element.meta.childs}
        renderTab={(item, tabIndex) => {
          return (
            <View style={styles.tabContent(colors)}>
              {item.meta.childs.map((child, childindex) => {
                return (
                  <MemoField
                    key={childindex}
                    index={{
                      ...index,
                      tabIndex: tabIndex,
                      childIndex: childindex,
                    }}
                    element={child}
                    onSelect={e => onSelect(e)}
                    selected={selected && 'tabIndex' in selectedFieldIndex && selectedFieldIndex.tabIndex === tabIndex && 'childIndex' in selectedFieldIndex && selectedFieldIndex.childIndex === childindex}
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
                      setIndexToAdd({...index, tabIndex: tabIndex});
                      setOpenMenu(true);
                    }}
                  />
                </View>
              )}
            </View>
          );
        }}
        onChangeTab={(item, index) => {}}
        defaultIndex={0}
        headerBackgroundColor={colors.border}
        headerUnderlayColor={colors.text}
        headerTextStyle={{
          ...styles.dynamicHeaderTextStyle,
          color: colors.text,
        }}
        preview={preview}
      />
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

export default TabSection;
