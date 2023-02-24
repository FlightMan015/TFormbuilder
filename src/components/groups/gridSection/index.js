import React, {useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Alert, Text} from 'react-native';
import RenderItem from './RenderItem';
import MemoField from '../../fields';
import {IconButton, useTheme} from 'react-native-paper';
import { color } from '../../../theme/styles';
import formStore from '../../../store/formStore';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import FieldLabel from '../../../common/FieldLabel';

const Grid = props => {
  const {element, index, onSelect, selected, preview} = props;
  const onClickUpdateField = formStore(state => state.updateFormData);
  const onClickDeleteField = formStore(state => state.deleteFormData);
  const selectedFieldIndex = formStore(state => state.selectedFieldIndex);
  const userRole = formStore(state => state.userRole);
  const role = element.role.find(e => e.name === userRole);
  const {colors, fonts} = useTheme();
  const [cellData, setCellData] = useState({viewGrid: true, data: []});
  const [cells, setCells] = useState([]);
  const [cellDemensions, setCellDemensions] = useState({width: 0, height: 0, numberOfColumns: 3});

  useEffect(() => {
    setCells(element.meta.childs);
    // setCellData({...cellData, data: element.meta.cellFields});
  }, [element]);

  const onCellAction = (cellIndex, action) => {
    if (action === 'select') {
      setCellData({
        ...cellData,
        viewGrid: false,
        cellIndex: cellIndex,
        data: element.meta.childs[cellIndex],
      });
    }
    if (action === 'edit') {
      setCellData({
        ...cellData,
        viewGrid: false,
        cellIndex: cellIndex,
      });
    }
    if (action === 'delete') {
      Alert.alert('Delete Cell', 'Are you sure want to delete this cell ?', [
        {
          text: 'Yes',
          onPress: () => {
            onClickDeleteField({...index, tabIndex: cellIndex});
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
    }
    if (action === 'add') {
      let newCellData = [];
      element.meta.cellFields.map(e => {
        newCellData.push({...e, field_name: element.field_name + '=' + e.field_name + '=' + element.meta.childs.length})
      });
      const tempElement = JSON.parse(JSON.stringify(element));
      tempElement.meta.childs.push(newCellData);
      onClickUpdateField(index, tempElement);
      if (element.event.onCreateCell) {
        Alert.alert('Rule Action', `Fired onCreateCell action. rule - ${element.event.onCreateCell}. new cell - ${newCellData}`);
      }
    }
  };

  const onChangeFieldValue = value => {
    const tempElement = JSON.parse(JSON.stringify(element));
    const tempChild = tempElement.meta.childs[cellData.cellIndex];
    tempElement.meta.childs[cellData.cellIndex] = {...tempChild, ...value};

    onClickUpdateField(index, tempElement);
  };

  const onLayoutFlatList = e => {
    const flatListWidth = e.nativeEvent.layout.width;
    const numOfColumns = Math.round(flatListWidth / 130);
    const cellWidth = Math.floor(flatListWidth / numOfColumns);
    const cellHeight = Math.round(cellWidth * 100 / 130);
    setCellDemensions({...cellDemensions, width: cellWidth, height: cellHeight, numberOfColumns: numOfColumns});
  };

  return (
    <View style={styles.container}>
      <FieldLabel label={element.meta.title || 'Grid Section'} visible={!element.meta.hide_title} />
      {cellData.viewGrid && (
        <View style={styles.gridView}>
          <View style={styles.gridSeries} onLayout={e => onLayoutFlatList(e)}>
            {
              cells.map((cell, cellIndex) => (
                <RenderItem
                  key={cellIndex}
                  uri={null}
                  height={element.meta.cellData.autoColumn ? cellDemensions.height : element.meta.cellData.height}
                  width={cellDemensions.width}
                  autoColumn={element.meta.cellData.autoColumn}
                  onClick={onCellAction}
                  index={cellIndex}
                  editRole={role.edit || preview}
                />
              ))
            }
          </View>
          {(preview || role.edit) && (
            <IconButton
              icon="shape-square-rounded-plus"
              size={15}
              style={{...styles.iconBtn, backgroundColor: colors.colorButton}}
              iconColor={color.WHITE}
              onPress={() => {
                onCellAction(null, 'add');
              }}
            />
          )}
        </View>
      )}
      {!cellData.viewGrid && (
        <View style={styles.gridView}>
          <Text
            style={{...fonts.values, color: colors.colorButton, marginLeft: 5}}
            onPress={() => {
              setCellData({
                ...cellData,
                viewGrid: true,
              });
            }}
          >
            Go to grid screen
          </Text>
          <ScrollView
            horizontal={element.meta.verticalAlign ? false : true}
            style={{...styles.listScrollView}}
            >
            <View style={styles.listContents(element.meta.verticalAlign)}>
              {cellData.data.map((child, childindex) => {
                return (
                  <View key={childindex} style={styles.listCell(element.meta.verticalAlign)}>
                    <MemoField
                      index={{
                        ...index,
                        childIndex: childindex,
                      }}
                      element={child}
                      // onSelect={e => onSelect(e)}
                      // selected={selected && 'childIndex' in selectedFieldIndex && selectedFieldIndex.childIndex === childindex}
                      onSelect={() => {}}
                      elected={false}
                      isLastField={cellData.data.length === (childindex + 1)}
                    />
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  gridView: {
    padding: 5,
  },
  container: {
    padding: 5,
  },
  iconBtn: {
    marginTop: 10,
    alignSelf: 'center',
    margin: 5,
  },
  textBtn: {
    margin: 0,
    marginTop: 10,
    alignSelf: 'center',
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    width: 150,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    alignSelf: 'center',
    height: 200,
    width: '100%',
  },
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    alignSelf: 'center',
    height: 200,
    width: '80%',
  },
  iconBtn1: {
    backgroundColor: 'white',
    margin: 3,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  iconBtnContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  listScrollView: {
    width: '100%',
    minHeight: 50,
    borderRadius: 7,
    paddingBottom: 10,
  },
  listContents: verticalAlign => ({
    flexDirection: verticalAlign ? 'column' : 'row',
  }),
  listCell: verticalAlign => ({
    width: verticalAlign ? '100%' : 340,
  }),
  gridSeries: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

Grid.propTypes = {
  element: PropTypes.object.isRequired,
};

export default Grid;
