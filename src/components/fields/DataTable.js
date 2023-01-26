import React, {useState, useEffect, createContext, useRef} from 'react';
import {IconButton, useTheme} from 'react-native-paper';
import PropTypes from 'prop-types';
import {View, StyleSheet, Alert, Text} from 'react-native';
import { color } from '../../theme/styles';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';
import cell from './Cell';
import { ScrollView } from 'react-native-gesture-handler';

export const DataTableContext = createContext();

const numberOfItemsPerPageList = [5, 10, 20, 50];

const DataTableBody = props => {
  const {element, contents, editRole} = props;
  const {colors} = useTheme();
  const cellWidth = useRef(70);
  const [headers, setHeaders] = useState([]);
  const [widthArr, setWidthArr] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0],
  );
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, tableData.length);

  useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  useEffect(() => {
    const tableHeaderTitles = element.meta.headers.map(header => header.name);
    tableHeaderTitles.unshift('');
    setHeaders(tableHeaderTitles);
    if (contents) {
      setTableData(contents);
    }
  }, [props]);

  const onLayout = event => {
    const tableLayoutWidth = event.nativeEvent.layout.width - 20 - 40;
    const columnCount = headers.length - 1;
    const averageWidth = Math.ceil(tableLayoutWidth / columnCount);
    if (averageWidth > 70) {
      cellWidth.current = averageWidth;
    } else {
      cellWidth.current = 70;
    }
    const tempWidthArr = headers.map((e, i) => {
      if (i === 0) {
        return 40;
      }
      return cellWidth.current;
    });
    setWidthArr(tempWidthArr);
  };

  return (
    <View style={styles.container} onLayout={onLayout}>
      <Text style={styles.carouselTitle(colors)}>{element.meta.title || 'Data Table'}</Text>
      <DataTableContext.Provider value={{tableData, setTableData, cellWidth}}>
        <ScrollView horizontal={true} style={styles.scrollView}>
          <Table
            borderStyle={{...styles.tableBorder, borderColor: colors.border}}>
            <Row
              data={headers}
              widthArr={widthArr}
              style={{...styles.head, backgroundColor: colors.inputTextBackground}}
              textStyle={{...styles.celltext, color: colors.text}}
            />
            {tableData.map((rowData, rowIndex) => (
              <TableWrapper key={rowIndex} style={{...styles.row, backgroundColor: colors.inputTextBackground}}>
                <Cell
                  data={
                    <IconButton
                      icon="delete-forever-outline"
                      size={15}
                      color={color.GREY}
                      onPress={() => {
                        Alert.alert(
                          'Delete Row',
                          'Are you sure want to delete row ?',
                          [
                            {
                              text: 'Yes',
                              onPress: () => {
                                const tempData = JSON.parse(
                                  JSON.stringify(tableData),
                                );
                                tempData.splice(rowIndex, 1);
                                setTableData([...tempData]);

                                if (element.event.onDeleteEntry) {
                                  Alert.alert('Rule Action', `Fired onDeleteEntry action. rule - ${element.event.onDeleteEntry}. newTableData - ${JSON.stringify(tempData)}`);
                                }
                              },
                            },
                            {
                              text: 'No',
                              onPress: () => {},
                              style: 'cancel',
                            },
                          ],
                        );
                      }}
                      style={styles.delIcon}
                    />
                  }
                  textStyle={{color: colors.text}}
                />
                {rowData.map((cellData, cellIndex) => {
                  const CellElement =
                    cell[element.meta.headers[cellIndex].type];
                  return (
                    <Cell
                      key={cellIndex}
                      data={
                        <CellElement
                          data={cellData}
                          rowIndex={rowIndex}
                          colIndex={cellIndex}
                          header={element.meta.headers}
                          actionRule={element.event.onUpdateEntry}
                        />
                      }
                      textStyle={{color: colors.text}}
                    />
                  );
                })}
              </TableWrapper>
            ))}
          </Table>
        </ScrollView>
      </DataTableContext.Provider>
      {/* {editRole && ( */}
        <View>
          <IconButton
            icon="playlist-plus"
            size={15}
            style={{...styles.iconBtn, backgroundColor: colors.colorButton}}
            color={color.WHITE}
            onPress={() => {
              let newRow = [];
              headers.map(() => {
                newRow = [...newRow, ''];
              });
              newRow.splice(0, 1);
              setTableData([...tableData, newRow]);

              if (element.event.onCreateNewEntry) {
                Alert.alert('Rule Action', `Fired onCreateNewEntry action. rule - ${element.event.onCreateNewEntry}. newTableData - ${JSON.stringify([...tableData, newRow])}`);
              }
            }}
          />
        </View>
      {/* )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  tableBorder: {
    borderWidth: 1,
  },
  delIcon: {
    width: 38,
    margin: 0,
  },
  container: {
    padding: 5,
  },
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

DataTableBody.propTypes = {
  element: PropTypes.object.isRequired,
};

export default React.memo(DataTableBody);
