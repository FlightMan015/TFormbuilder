import React, {useState, useContext} from 'react';
import {View, StyleSheet, TextInput, Text, Alert} from 'react-native';
import {DataTableContext} from './DataTable';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {TouchableOpacity} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { color } from '../../theme/styles';

const TextCell = ({data, rowIndex, colIndex, actionRule}) => {
  const {colors, fonts} = useTheme();
  const {tableData, setTableData, cellWidth} = useContext(DataTableContext);

  return (
    <TextInput
      style={{...styles.textInput(cellWidth.current), ...fonts.values}}
      value={data}
      onChangeText={e => {
        const tempTableData = JSON.parse(JSON.stringify(tableData));
        tempTableData[rowIndex].splice(colIndex, 1, e);
        setTableData(tempTableData);

        if (actionRule) {
          Alert.alert('Rule Action', `Fired onUpdateEntry action. Rule - ${actionRule}. NewTableData - ${JSON.stringify(tempTableData)}`);
        }
      }}
    />
  );
};

const NumberCell = ({data, rowIndex, colIndex, actionRule}) => {
  const {colors, fonts} = useTheme();
  const {tableData, setTableData, cellWidth} = useContext(DataTableContext);
  return (
    <TextInput
      style={{...styles.textInput(cellWidth.current), ...fonts.values}}
      value={data}
      onChangeText={e => {
        const tempTableData = JSON.parse(JSON.stringify(tableData));
        tempTableData[rowIndex].splice(colIndex, 1, e);
        setTableData(tempTableData);

        if (actionRule) {
          Alert.alert('Rule Action', `Fired onUpdateEntry action. Rule - ${actionRule}. NewTableData - ${JSON.stringify(tempTableData)}`);
        }
      }}
      keyboardType="numeric"
    />
  );
};

const DateCell = ({data, rowIndex, colIndex, actionRule}) => {
  const {colors, fonts} = useTheme();
  const {tableData, setTableData, cellWidth} = useContext(DataTableContext);
  const [visible, setVisible] = useState(false);
  return (
    <View>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Text style={{...styles.text(cellWidth.current), ...fonts.values}}>
          {data}
        </Text>
      </TouchableOpacity>
      {visible && (
        <RNDateTimePicker
          value={data ? new Date(data) : new Date(Date.now())}
          mode={'date'}
          display={'default'}
          is24Hour={true}
          onChange={(e, v) => {
            setVisible(false);
            const tempTableData = JSON.parse(JSON.stringify(tableData));
            tempTableData[rowIndex].splice(colIndex, 1, v.toLocaleDateString());
            setTableData(tempTableData);

            if (actionRule) {
              Alert.alert('Rule Action', `Fired onUpdateEntry action. Rule - ${actionRule}. NewTableData - ${JSON.stringify(tempTableData)}`);
            }
          }}
          style={styles.datePicker}
        />
      )}
    </View>
  );
};

const TimeCell = ({data, rowIndex, colIndex, actionRule}) => {
  const {colors, fonts} = useTheme();
  const {tableData, setTableData, cellWidth} = useContext(DataTableContext);
  const [visible, setVisible] = useState(false);
  return (
    <View>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Text style={{...styles.text(cellWidth.current), ...fonts.values}}>
          {data ? new Date(data).toLocaleTimeString() : ''}
        </Text>
      </TouchableOpacity>
      {visible && (
        <RNDateTimePicker
          value={data ? new Date(data) : new Date(Date.now())}
          mode={'time'}
          display={'default'}
          is24Hour={true}
          onChange={(e, v) => {
            setVisible(false);
            const tempTableData = JSON.parse(JSON.stringify(tableData));
            tempTableData[rowIndex].splice(colIndex, 1, v.toISOString());
            setTableData(tempTableData);

            if (actionRule) {
              Alert.alert('Rule Action', `Fired onUpdateEntry action. Rule - ${actionRule}. NewTableData - ${JSON.stringify(tempTableData)}`);
            }
          }}
          style={styles.datePicker}
        />
      )}
    </View>
  );
};

const MenuCell = ({data, rowIndex, colIndex, header, actionRule}) => {
  const options = header[colIndex].data.options;
  const {tableData, setTableData, cellWidth} = useContext(DataTableContext);
  const {colors, fonts} = useTheme();
  const [open, setOpen] = useState(true);
  return (
    <View>
      <SelectDropdown
        data={header[colIndex].data.options}
        onSelect={e => {
          const tempTableData = JSON.parse(JSON.stringify(tableData));
          tempTableData[rowIndex].splice(colIndex, 1, e);
          setTableData(tempTableData);

          if (actionRule) {
            Alert.alert('Rule Action', `Fired onUpdateEntry action. Rule - ${actionRule}. NewTableData - ${JSON.stringify(tempTableData)}`);
          }
        }}
        dropdownStyle={{
          backgroundColor: colors.card,
          maxHeight: 200,
        }}
        rowTextStyle={{fontSize: 15, color: colors.text}}
        rowStyle={{height: 30}}
        buttonStyle={{
          width: cellWidth ? cellWidth.current - 2 : 68,
          backgroundColor: colors.card,
          height: 40,
        }}
        buttonTextStyle={{...fonts.values}}
        selectedRowTextStyle={{...fonts.values}}
        defaultButtonText=" "
        onFocus={() => setOpen(false)}
        onBlur={() => setOpen(true)}
        renderDropdownIcon={
          open
            ? () => (
                <Icon
                  name="chevron-down"
                  size={15}
                  color={fonts.values.color}
                  style={{margin: 0}}
                />
              )
            : () => (
                <Icon
                  name="chevron-up"
                  size={15}
                  color={fonts.values.color}
                  style={{margin: 0}}
                />
              )
        }
        defaultValue={data ? data : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: cellWidth => ({
    width: cellWidth ? cellWidth - 2 : 68,
    height: 40,
    paddingVertical: 0,
    paddingLeft: 5,
    textAlignVertical: 'center',
    color: color.BLACK,
  }),
  textInput: cellWidth => ({
    width: cellWidth ? cellWidth - 2 : 68,
    height: 40,
    paddingVertical: 0,
    color: color.BLACK,
  }),
  // Style for iOS ONLY...
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  },
});

export default {
  text: TextCell,
  num: NumberCell,
  date: DateCell,
  time: TimeCell,
  menu: MenuCell,
};
