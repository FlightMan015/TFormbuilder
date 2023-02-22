import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Alert} from 'react-native';
import {IconButton, useTheme} from 'react-native-paper';
import { color } from '../../theme/styles';
import { FlatList } from 'react-native-gesture-handler';
import formStore from '../../store/formStore';
import MemoField from '../fields';

const ListSection = ({
	element,
  index,
  selected,
  onSelect,
}) => {
  const {colors, size} = useTheme();
  const userRole = formStore(state => state.userRole);
  const role = element.role.find(e => e.name === userRole);
	const preview = formStore(state => state.preview);
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
      <FlatList
        data={element.meta.childs}
        horizontal={!element.meta.listVerticalAlign}
        renderItem={cellItem => {
          return <View
            key={cellItem.index}
            style={{...styles.listView(element.meta.listVerticalAlign), backgroundColor: colors.background}}>
            {role.edit && <View style={styles.iconContainer}>
              <IconButton
                icon="delete-forever"
                size={size.s16}
                iconColor={colors.icon}
                style={{...styles.iconBtn1, borderColor: colors.icon}}
                onPress={() => {
                  Alert.alert('Delete Cell', 'Are you sure want to delete this cell ?', [
                    {
                      text: 'Yes',
                      onPress: () => {
                        const tempElement = {...element};
                        tempElement.meta.childs.splice(cellItem.index, 1);
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
              />
            </View>}
            <FlatList
							data={element.meta.cellFields}
							horizontal={!element.meta.cellVerticalAlign}
							nestedScrollEnabled
							// directionalLockEnabled
							renderItem={({item, childIndex}) => {
							return  <View style={styles.listCell(element.meta.cellVerticalAlign)}>
									<MemoField
											key={childIndex}
											index={{
													...index,
													tabIndex: cellItem.index,
													childIndex: childIndex,
											}}
											element={item}
											onSelect={e => onSelect(e)}
											selected={selected && 'tabIndex' in selectedFieldIndex && selectedFieldIndex.tabIndex === cellItem.index && 'childIndex' in selectedFieldIndex && selectedFieldIndex.childIndex === childIndex}
											isLastField={element.meta.childs.length === (childIndex + 1)}
									/>
							</View>;
							}}
            />
          </View>;
        }}
      />
      {!preview && role.edit && (
        <IconButton
          icon="shape-square-rounded-plus"
          size={15}
          style={{...styles.iconBtn, backgroundColor: colors.colorButton}}
          iconColor={color.WHITE}
          onPress={() => {
            let newCellData = {};
            element.meta.cellFields.map(e => {
              const tempNewCellData = {...newCellData};
              newCellData = {...tempNewCellData, [e.field_name]: ''};
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
    paddingBottom: 10,
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
    width: verticalAlign ? '100%' : 340,
  }),
  iconBtn1: {
    backgroundColor: 'white',
    margin: 3,
    borderWidth: 1,
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
