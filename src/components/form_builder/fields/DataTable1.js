import React, {useState, useEffect, createContext, useRef} from 'react';
import {IconButton, useTheme} from 'react-native-paper';
import PropTypes from 'prop-types';
import {View, StyleSheet, Alert, Text} from 'react-native';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';
import cell from './Cell';
import { ScrollView } from 'react-native-gesture-handler';
import FieldLabel from '../../common/FieldLabel';
import formStore from '../../store/formStore';

export const DataTableContext = createContext();

const DataTableBody = props => {
  const {element} = props;
  const {colors, fonts} = useTheme();
  const formValue = formStore(state => state.formValue);
  const setFormValue = formStore(state => state.setFormValue);
  const preview = formStore(state => state.preview);
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
      <FieldLabel label={element.meta.title || i18nValues.t("field_labels.data_table")} visible={!element.meta.hide_title} />
      <DataTableContext.Provider value={{tableData, setTableData: setTableValue, cellWidth}}>
        <ScrollView horizontal={true} style={styles.scrollView}>
          <Table
            borderStyle={{...styles.tableBorder, borderColor: colors.border}}>
            <Row
              data={headers}
              widthArr={widthArr}
              style={{...styles.head, backgroundColor: colors.card}}
              textStyle={{...styles.celltext, ...fonts.labels}}
            />
            {tableData.map((rowData, rowIndex) => (
              <TableWrapper key={rowIndex} style={{...styles.row, backgroundColor: colors.card}}>
                <Cell
                  data={
                    <IconButton
                      icon="delete-outline"
                      size={15}
                      disabled={!role.edit && !preview}
                      iconColor={colors.colorButton}
                      style={styles.delIcon}
                    />
                  }
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
                          element={element}
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

DataTableBody.propTypes = {
  element: PropTypes.object.isRequired,
};

export default React.memo(DataTableBody);
