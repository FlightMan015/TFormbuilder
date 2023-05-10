import React, {useState, useContext} from 'react';
import {View, StyleSheet, TextInput, Text, Alert} from 'react-native';
import {DataTableContext} from './index';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {TouchableOpacity} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {useTheme, Checkbox} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { color } from '../../../theme/styles';
import formStore from '../../../store/formStore';

const TextCell = ({data, rowIndex, colIndex, actionRule, element, lastRow}) => {
  const {colors, fonts} = useTheme();
  const {tableData, setTableData, cellWidth} = useContext(DataTableContext);
  const userRole = formStore(state => state.userRole);
  const role = element.role.find(e => e.name === userRole);
  const preview = formStore(state => state.preview);

  return (
    <TextInput
      key={rowIndex}
      style={{...styles.textInput(element.meta.borderColor, (element.meta.horizontalBorder && !lastRow)), ...fonts.values}}
      value={data}
      editable={role.edit || preview}
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

const NumberCell = ({data, rowIndex, colIndex, actionRule, element, lastRow}) => {
  const {colors, fonts} = useTheme();
  const {tableData, setTableData, cellWidth} = useContext(DataTableContext);
  const userRole = formStore(state => state.userRole);
  const role = element.role.find(e => e.name === userRole);
  const preview = formStore(state => state.preview);

  return (
    <TextInput
      key={rowIndex}
      style={{...styles.textInput(element.meta.borderColor, (element.meta.horizontalBorder && !lastRow)), ...fonts.values}}
      value={data}
      editable={role.edit || preview}
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

const DateCell = ({data, rowIndex, colIndex, actionRule, element, lastRow}) => {
  const {colors, fonts} = useTheme();
  const {tableData, setTableData, cellWidth} = useContext(DataTableContext);
  const userRole = formStore(state => state.userRole);
  const role = element.role.find(e => e.name === userRole);
  const preview = formStore(state => state.preview);
  const [visible, setVisible] = useState(false);

  return (
    <View key={rowIndex}>
      <TouchableOpacity onPress={() => setVisible(true)} disabled={!role.edit && !preview}>
        <Text style={{...styles.text(element.meta.borderColor, (element.meta.horizontalBorder && !lastRow)), ...fonts.values}}>
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
            tempTableData[rowIndex].splice(colIndex, 1, v.toISOString().split('T')[0]);
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

const TimeCell = ({data, rowIndex, colIndex, actionRule, element, lastRow}) => {
  const {colors, fonts} = useTheme();
  const {tableData, setTableData, cellWidth} = useContext(DataTableContext);
  const userRole = formStore(state => state.userRole);
  const role = element.role.find(e => e.name === userRole);
  const preview = formStore(state => state.preview);
  const [visible, setVisible] = useState(false);
  return (
    <View key={rowIndex}>
      <TouchableOpacity onPress={() => setVisible(true)} disabled={!role.edit && !preview}>
        <Text style={{...styles.text(element.meta.borderColor, (element.meta.horizontalBorder && !lastRow)), ...fonts.values}}>
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

const CheckBoxCell = ({data, rowIndex, colIndex, actionRule, element, lastRow}) => {
  const {colors, fonts} = useTheme();
  const {tableData, setTableData, cellWidth} = useContext(DataTableContext);
  const userRole = formStore(state => state.userRole);
  const role = element.role.find(e => e.name === userRole);
  const preview = formStore(state => state.preview);
  const [visible, setVisible] = useState(false);
  return (
    <View key={rowIndex} style={{
      width: '100%',
      height: 40,
      justifyContent: 'center',
      borderBottomColor: element.meta.borderColor,
      borderBottomWidth: (element.meta.horizontalBorder && !lastRow) ? 1 : 0,
      alignItems: 'center'
    }}>
      <Checkbox
        status={data === 'true' ? 'checked' : 'unchecked'}
        onPress={() => {
          const tempTableData = JSON.parse(JSON.stringify(tableData));
          tempTableData[rowIndex].splice(colIndex, 1, data === 'true' ? 'false' : 'true');
          setTableData(tempTableData);
        }}
        color={'#4195B4'}
        uncheckedColor='grey'
      />
    </View>
  );
};

const MenuCell = ({data, rowIndex, colIndex, header, actionRule, element, lastRow}) => {
  const options = header[colIndex].data.options;
  const {tableData, setTableData, cellWidth} = useContext(DataTableContext);
  const userRole = formStore(state => state.userRole);
  const role = element.role.find(e => e.name === userRole);
  const preview = formStore(state => state.preview);
  const {colors, fonts} = useTheme();
  const [open, setOpen] = useState(true);
  return (
    <View key={rowIndex}>
      <SelectDropdown
        data={header[colIndex].data.options}
        disabled={!role.edit && !preview}
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
        rowTextStyle={fonts.values}
        rowStyle={{height: 30}}
        buttonStyle={{
          // width: cellWidth ? cellWidth.current - 2 : 68,
          // minWidth: 100,
          width: 100,
          backgroundColor: colors.card,
          height: 40,
          borderBottomColor: element.meta.borderColor,
          borderBottomWidth: (element.meta.horizontalBorder && !lastRow) ? 1 : 0,
        }}
        buttonTextStyle={fonts.values}
        selectedRowTextStyle={fonts.values}
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
  text: (borderColor, horizontalBorder) => ({
    minWidth: 100,
    width: '100%',
    height: 40,
    paddingVertical: 0,
    paddingLeft: 5,
    textAlignVertical: 'center',
    color: color.BLACK,
    borderBottomColor: borderColor,
    borderBottomWidth: horizontalBorder ? 1 : 0,
  }),
  textInput: (borderColor, horizontalBorder) => ({
    // width: cellWidth ? cellWidth - 2 : 68,
    minWidth: 100,
    width: '100%',
    height: 40,
    paddingVertical: 0,
    color: color.BLACK,
    borderBottomColor: borderColor,
    borderBottomWidth: horizontalBorder ? 1 : 0,
  }),
  // Style for iOS ONLY...
  datePicker: (borderColor, horizontalBorder) => ({
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  }),
});

export default {
  text: TextCell,
  num: NumberCell,
  date: DateCell,
  time: TimeCell,
  menu: MenuCell,
  checkbox: CheckBoxCell,
};
