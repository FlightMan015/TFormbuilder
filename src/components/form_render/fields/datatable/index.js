import React, {useState, useEffect, createContext, useRef} from 'react';
import {IconButton, useTheme} from 'react-native-paper';
import PropTypes from 'prop-types';
import {View, StyleSheet, Alert, Text} from 'react-native';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';
import cell from './Cell';
import { ScrollView } from 'react-native-gesture-handler';
import formStore from '../../../../store/formStore';
import FieldLabel from '../../../../common/FieldLabel';

export const DataTableContext = createContext();

const DataTable = props => {
  const {element, role} = props;
  const {colors, fonts} = useTheme();
  const userRole = formStore(state => state.userRole);
  const formValue = formStore(state => state.formValue);
  const setFormValue = formStore(state => state.setFormValue);
  const i18nValues = formStore(state => state.i18nValues);
  const cellWidth = useRef(100);
  const [headers, setHeaders] = useState([]);
  const [widthArr, setWidthArr] = useState([]);
  const [tableData, setTableData] = useState([]);
  const tableWidth = useRef(0);

  useEffect(() => {
    const tableHeaderTitles = element.meta.headers.map(header => header.name);
    tableHeaderTitles.unshift('');
    setHeaders(tableHeaderTitles);
    if (widthArr.length !== tableHeaderTitles.length) {
      const columnCount = tableHeaderTitles.length - 1;
      const averageWidth = Math.ceil(tableWidth.current / columnCount);
      if (averageWidth > 100) {
        cellWidth.current = averageWidth;
      } else {
        cellWidth.current = 100;
      }
      const tempWidthArr = tableHeaderTitles.map((e, i) => {
        if (i === 0) {
          return 40;
        }
        return cellWidth.current;
      });
      setWidthArr(tempWidthArr);
    }
  }, [JSON.stringify(element.meta.headers)]);

  useEffect(() => {
    setTableData(formValue[element.field_name] || []);
  }, [JSON.stringify(formValue[element.field_name])])

  const onLayout = event => {
    const tableLayoutWidth = event.nativeEvent.layout.width - 20 - 40;
    tableWidth.current = tableLayoutWidth;
    const columnCount = headers.length - 1;
    const averageWidth = Math.ceil(tableLayoutWidth / columnCount);
    if (averageWidth > 100) {
      cellWidth.current = averageWidth;
    } else {
      cellWidth.current = 100;
    }
    const tempWidthArr = headers.map((e, i) => {
      if (i === 0) {
        return 40;
      }
      return cellWidth.current;
    });
    setWidthArr(tempWidthArr);
  };

  const setTableValue = (tableValue) => {
    setFormValue({...formValue, [element.field_name]: tableValue});
  };

  const CellHeaderElement = ({cellData, index}) => {
    return <Text style={{width: widthArr[index + 1]}}>{cellData}</Text>;
  };

  return (
    <View style={styles.container(element)} onLayout={onLayout}>
      {
        role.view && (
            <>
              <FieldLabel label={element.meta.title || i18nValues.t("field_labels.data_table")} visible={!element.meta.hide_title} />
              <DataTableContext.Provider value={{tableData, setTableData: setTableValue, cellWidth}}>
              <ScrollView horizontal>
                  <View style={{flexDirection: 'row', borderRadius: 20, backgroundColor: colors.card}}>
                  {
                      element.meta.headers.map((header, headerIndex) => {
                          const CellElement = cell[header.type];
                          return (
                              <View key={headerIndex} style={{alignItems: 'center', borderRightColor: element.meta.borderColor, borderRightWidth: element.meta.verticalBorder ? element.meta.headers.length - 1 === headerIndex ? 0 : 1 : 0}}>
                                  <View style={styles.headerCell(element.meta.borderColor, element.meta.horizontalBorder)}>
                                      <Text>{header.name}</Text>
                                  </View>
                                  {
                                      tableData.map((cell, cellIndex) => (
                                          <CellElement
                                              key={cellIndex}
                                              data={cell[headerIndex]}
                                              rowIndex={cellIndex}
                                              colIndex={headerIndex}
                                              header={element.meta.headers}
                                              actionRule={element.event.onUpdateEntry}
                                              element={element}
                                              lastRow={cellIndex + 1 === tableData.length}
                                              role={role}
                                          />
                                      ))
                                  }
                              </View>
                          );
                      })
                  }
                  </View>
              </ScrollView>
              </DataTableContext.Provider>
            </>
        )
      }
      {(userRole.edit || userRole.submit) && role.edit && (
            <View>
                <IconButton
                    icon="playlist-plus"
                    size={15}
                    style={{...styles.iconBtn, backgroundColor: colors.colorButton}}
                    iconColor={fonts.buttonTexts.color}
                    onPress={() => {
                    let newRow = [];
                    headers.map(() => {
                        newRow = [...newRow, ''];
                    });
                    newRow.splice(0, 1);
                    setFormValue({...formValue, [element.field_name]: [...tableData, newRow]});

                    if (element.event.onCreateNewEntry) {
                        Alert.alert('Rule Action', `Fired onCreateNewEntry action. rule - ${element.event.onCreateNewEntry}. newTableData - ${JSON.stringify([...tableData, newRow])}`);
                    }
                    }}
                />
            </View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
    headerCell: (borderColor, horizontalBorder) => ({
        width: '100%',
        minWidth: 100,
        minHeight: 40,
        borderBottomColor: borderColor,
        borderBottomWidth: horizontalBorder ? 1 : 0,
        alignItems: 'center',
        justifyContent: 'center'
    }),
  tableBorder: {
    borderWidth: 1,
  },
  delIcon: {
    width: 38,
    margin: 0,
  },
  container: element => ({
    ...element.meta.padding
  }),
  carouselTitle: colors => ({
    fontSize: 16,
    padding: 5,
    color: colors.text,
  }),
  head: {
    height: 40,
    backgroundColor: '#FBF3D5',
  },
  celltext: {
    padding: 6,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#FDF7E2',
  },
  editCell: {
    width: 40,
  },
  iconBtn: {
    margin: 0,
    marginTop: 10,
    alignSelf: 'center',
    marginVertical: 5,
    backgroundColor: '#aaaaaa',
  },
  scrollView: {
    width: '100%',
  },
});

DataTable.propTypes = {
  element: PropTypes.object.isRequired,
};

export default React.memo(DataTable);
