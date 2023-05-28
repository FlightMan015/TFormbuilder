import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MemoField from '../fields';
import MemoGroup from '../groups';
import {IconButton, useTheme} from 'react-native-paper';
import formStore from '../../../store/formStore';
import {componentName} from '../../../constant';
import FieldLabel from '../../../common/FieldLabel';

const Section = ({element, index, role}) => {
  const {colors, fonts} = useTheme();
  const selectedFieldIndex = formStore(state => state.selectedFieldIndex);
  const i18nValues = formStore(state => state.i18nValues);

  return (
    <TouchableOpacity style={styles.container(element)} disabled={!element.meta.isButton}>
      <FieldLabel
        label={element.meta.title || i18nValues.t('field_labels.section')}
        visible={!element.meta.hide_title}
      />
      <View style={styles.content(colors, element)}>
        {element.meta.childs.map((child, childindex) => {
          if (
            child.component !== componentName.TABSECTION &&
            child.component !== componentName.GROUP &&
            child.component !== componentName.GRID &&
            child.component !== componentName.LISTSECTION
          ) {
            return (
              <MemoField
                key={childindex}
                index={[...index, childindex]}
                element={child}
                role={role}
              />
            );
          } else {
            return (
              <MemoGroup
                key={childindex}
                element={child}
                index={[...index, childindex]}
                role={role}
              />
            );
          }
        })}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: element => ({
    // padding: 5,
    flexDirection: 'column',
  }),
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
  content: (colors, element) => ({
    alignItems: element.meta.alignItems,
    flexDirection: element.meta.verticalAlign ? 'column' : 'row',
    ...element.meta.borderWidth,
    borderRadius: element.meta.borderRadius,
    borderColor: element.meta.borderColor,
    ...element.meta.padding,
    justifyContent: element.meta.allocation,
    backgroundColor: element.meta.backgroundColor
  }),
});

export default Section;
