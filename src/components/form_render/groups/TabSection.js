import React from 'react';
import {View, StyleSheet} from 'react-native';
import MemoField from '../fields';
import DynamicTabView from '../../../common/dynamic_tab_view/DynamicTabView';
import {IconButton, useTheme} from 'react-native-paper';
import formStore from '../../../store/formStore';
import FieldLabel from '../../../common/FieldLabel';

const TabSection = ({
  element,
  index,
  role
}) => {
  const {colors, fonts} = useTheme();
  const setIndexToAdd = formStore(state => state.setIndexToAdd);
  const setOpenMenu = formStore(state => state.setOpenMenu);
  const selectedFieldIndex = formStore(state => state.selectedFieldIndex);
  const userRole = formStore(state => state.userRole);
  const i18nValues = formStore(state => state.i18nValues);
  return (
    <View style={styles.container}>
      <FieldLabel label={element.meta.title || i18nValues.t("field_labels.tab_section")} visible={!element.meta.hide_title} />
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
                    role={role}
                  />
                );
              })}
            </View>
          );
        }}
        onChangeTab={(item, index) => {}}
        defaultIndex={0}
        headerBackgroundColor={colors.card}
        headerUnderlayColor={fonts.values.color}
        headerTextStyle={{
          ...styles.dynamicHeaderTextStyle,
          ...fonts.values,
          fontSize: fonts.labels.fontSize,
        }}
        preview={true}
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
    paddingVertical: 5,
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
