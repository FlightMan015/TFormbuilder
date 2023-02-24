import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Alert} from 'react-native';
import {IconButton, useTheme} from 'react-native-paper';
import { color } from '../../theme/styles';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import formStore from '../../store/formStore';
import MemoField from '../fields';
import FieldLabel from '../../common/FieldLabel';

const ListSection = ({
	element,
  index,
  selected,
  onSelect,
  preview,
}) => {
  const {colors, size} = useTheme();
  const userRole = formStore(state => state.userRole);
  const role = element.role.find(e => e.name === userRole);
  const updateFormData = formStore(state => state.updateFormData);
  const selectedFieldIndex = formStore(state => state.selectedFieldIndex);

  const onChangeFieldValue = (value, selectedCellIndex) => {
    // const tempElement = JSON.parse(JSON.stringify(element));
    // const tempChild = tempElement.meta.childs[selectedCellIndex];
    // tempElement.meta.childs[selectedCellIndex] = {...tempChild, ...value};

    // onClickUpdateField(index, tempElement);
  };

  return (
    <View style={styles.container}>
      <FieldLabel label={element.meta.title || 'List Section'} visible={!element.meta.hide_title} />
      <ScrollView style={{width: '100%'}} horizontal>
        <View style={{flexDirection: element.meta.listVerticalAlign ? 'column' : 'row', alignItems: 'center'}}>
          {
            element.meta.childs.map((child, childindex) => (
              <View
                key={childindex}
                style={{...styles.listView(element.meta.listVerticalAlign), backgroundColor: colors.background}}>
                <View style={{flexDirection: !element.meta.listVerticalAlign ? 'column' : 'row', alignItems: 'center'}}>
                  {
                    <>
                      {(role.edit || preview) && 
                      <IconButton
                        icon="delete-forever"
                        size={size.s16}
                        iconColor={'#FFFFFF'}
                        style={{...styles.iconBtn1, backgroundColor: colors.colorButton}}
                        onPress={() => {
                          Alert.alert('Delete Cell', 'Are you sure want to delete this cell ?', [
                            {
                              text: 'Yes',
                              onPress: () => {
                                const tempElement = {...element};
                                tempElement.meta.childs.splice(childindex, 1);
                                updateFormData(index, tempElement);
                                if (element.event.onDeleteCell) {
                                  Alert.alert('Rule Action', `Fired onDeleteCell action. rule - ${element.event.onDeleteCell}.`);
                                }
                              },
                            },
                            {
                              text: 'No',
                              onPress: () => {},
                              style: 'cancel',
                            },
                          ]);
                        }}
                      />}
                      {
                        child.map((field, fieldIndex) => (
                          <View key={fieldIndex} style={styles.listCell(element.meta.listVerticalAlign)}>
                            <MemoField
                                key={fieldIndex}
                                index={{
                                    ...index,
                                    tabIndex: childindex,
                                    childIndex: fieldIndex,
                                }}
                                element={field}
                                onSelect={() => {}}
                                selected={false}
                                isLastField={false}
                            />
                          </View>
                        ))
                      }
                    </>
                  }
                </View>
              </View>
            ))
          }
        </View>
      
      </ScrollView>
      
      {(preview || role.edit) && (
        <IconButton
          icon="shape-square-rounded-plus"
          size={15}
          style={{...styles.iconBtn, backgroundColor: colors.colorButton}}
          iconColor={color.WHITE}
          onPress={() => {
            let newCellData = [];
            element.meta.cellFields.map(e => {
              newCellData.push({...e, field_name: element.field_name + '=' + e.field_name + '=' + element.meta.childs.length})
            });
            const tempElement = {...element};
            tempElement.meta.childs.push(newCellData);
            updateFormData(index, tempElement);
            if (element.event.onCreateCell) {
              Alert.alert('Rule Action', `Fired onCreateCell action. rule - ${element.event.onCreateCell}.`);
            }
          }}
        />
      )}
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
  textBtn: {
    margin: 0,
    alignSelf: 'center',
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    width: 150,
  },
  listView: verticalAlign => ({
    width: verticalAlign ? '100%' : 340,
    minHeight: 50,
    marginVertical: 5,
    borderRadius: 7,
    marginHorizontal:  verticalAlign ? 0 : 5,
  }),
  listScrollView: {
    width: '100%',
    minHeight: 50,
    borderRadius: 7,
    paddingBottom: 10,
  },
  listContents: verticalAlign => ({
    flexDirection: verticalAlign ? 'row' : 'column',
  }),
  listCell: verticalAlign => ({
    width: verticalAlign ? 340 : '100%',
  }),
  iconBtn1: {
    backgroundColor: 'white',
    margin: 3,
  },
  iconContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    top: 5,
    right: 5,
  },
});

ListSection.propTypes = {
  element: PropTypes.object.isRequired,
};

export default ListSection;
