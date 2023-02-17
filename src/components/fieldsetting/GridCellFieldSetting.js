import React, {useState, useContext} from 'react';
import {View, Text, TextInput, StyleSheet, Alert} from 'react-native';
import {IconButton, useTheme} from 'react-native-paper';
import {color} from '../../theme/styles';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Feather';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import DraggableFlatList, {
  ScaleDecorator,
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import {componentName, newFieldData} from '../../constant';
import FieldLabel from '../../common/FieldLabel';

const types = {
  title: 'title',
  is_mandatory: 'is_mandatory',
  placeholder: 'placeholder',
  multiline: 'multiline',
  numberOfLines: 'numberOfLines',
  headers: 'headers',
  cellFields: 'cellFields',
};

const fieldTypes = {
  TextBox : componentName.TEXT_INPUT,
  Date : componentName.DATE_PICKER,
  Time : componentName.TIME_PICKER,
  DropDown : componentName.DROPDOWN,
	Image : componentName.IMAGE,
};

const GridCellFieldSetting = props => {
  const {fields, changeData} = props;
  const {colors} = useTheme();
  const [newCellField, setNewCellField] = useState({name: '', type: 'image'});
  const [open, setOpen] = useState(true);
//   const {visibleDlg, setVisibleDlg} = useContext(FieldSettingContext);

  const tableFieldItem = ({item, drag, isActive, getIndex}) => {
	const index = getIndex();
    return (
      <ScaleDecorator>
        <View style={styles.tableField}>
          <Text style={styles.tableFieldNo}>{index + 1}</Text>
          <TextInput
            style={{...styles.tableFieldName, color: '#FFFFFF'}}
            underlineColorAndroid="transparent"
            onChangeText={e => {
              const tempHeader = JSON.parse(JSON.stringify(fields));
              const changedData = {
                ...tempHeader[index],
                name: e,
              };
              tempHeader.splice(index, 1, changedData);
              changeData({[types.cellFields]: tempHeader});
            }}
            value={item.meta.title}
          />
					{
						item.component === componentName.TEXT_INPUT && (
							<Text
								onPress={() => {}}
								style={{
									...styles.typeText,
									color: '#FFFFFF',
									borderColor: color.GREY,
								}}>
								TextBox
							</Text>
						)
					}
					{
						item.component === componentName.DATE_PICKER && (
							<Text
								onPress={() => {}}
								style={{
									...styles.typeText,
									color: '#FFFFFF',
									borderColor: color.GREY,
								}}>
								Date
							</Text>
						)
					}
					{
						item.component === componentName.TIME_PICKER && (
							<Text
								onPress={() => {}}
								style={{
									...styles.typeText,
									color: '#FFFFFF',
									borderColor: color.GREY,
								}}>
								Time
							</Text>
						)
					}
					{
						item.component === componentName.DROPDOWN && (
							<Text
								onPress={() => {}}
								style={{
									...styles.typeText,
									color: '#FFFFFF',
									borderColor: color.GREY,
								}}>
								DropDown
							</Text>
						)
					}
					{
						item.component === componentName.IMAGE && (
							<Text
								onPress={() => {}}
								style={{
									...styles.typeText,
									color: '#FFFFFF',
									borderColor: color.GREY,
								}}>
								Image
							</Text>
						)
					}
          
          <IconButton
            style={styles.tableFieldDelIcon}
            icon={'delete-outline'}
            iconColor={'#fff'}
            size={15}
            onPress={() => {
              Alert.alert(
                'Delete Form',
                `Are you sure want to delete field "${item.name}" ?`,
                [
                  {
                    text: 'Yes',
                    onPress: () => {
                      const tempdata = JSON.parse(JSON.stringify(fields));
                      tempdata.splice(index, 1);
                      changeData(types.cellFields, tempdata);
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
          />
          <IconButton
            style={styles.tableFieldDelIcon}
            icon={'drag-horizontal-variant'}
            iconColor={'#fff'}
            size={15}
            onPress={() => {}}
            onLongPress={drag}
          />
        </View>
      </ScaleDecorator>
    );
  };

  return (
		<View style={styles.settingView}>
			<Text style={styles.titleLabel}>Cell Fields</Text>
			<View style={styles.tableField}>
				<Text style={styles.tableFieldNo}>No</Text>
				<Text style={styles.tableFieldName}>Name</Text>
				<Text style={styles.tableFieldType}>Type</Text>
				<Text style={styles.tableFieldAction}>Action</Text>
			</View>
			<GestureHandlerRootView style={styles.gestureHandlerView}>
				<DraggableFlatList
					data={fields}
					onDragBegin={() => {}}
					onDragEnd={changedData => {
						changeData(types.cellFields, changedData.data);
					}}
					keyExtractor={(item, i) => i}
					renderItem={tableFieldItem}
				/>
			</GestureHandlerRootView>
			<View style={{...styles.tableField}}>
				<IconButton
					style={{
						...styles.tableFieldDelIcon,
					}}
					icon={'plus'}
					iconColor={'#fff'}
					size={15}
					onPress={() => {
						const tempdata = JSON.parse(JSON.stringify(fields));
						const tempNewCellFieldMeta = JSON.parse(
							JSON.stringify(newFieldData[newCellField.type].meta),
						);
						tempdata.push({
							...newFieldData[newCellField.type],
							meta: {
								...tempNewCellFieldMeta,
								title: newCellField.name,
							},
							field_name:
								newFieldData[newCellField.type].field_name +
								'-' +
								Date.now() +
								'-1',
						});
						changeData(types.cellFields, tempdata);
						setNewCellField({
							name: '',
							type: '',
						});
					}}
				/>
				<TextInput
					style={{...styles.newTableFieldName}}
					underlineColorAndroid="transparent"
					placeholder="...new field name"
					placeholderTextColor={color.GREY}
					onChangeText={e => {
						setNewCellField({
							...newCellField,
							name: e,
						});
					}}
					value={newCellField.name}
				/>
				<SelectDropdown
					data={Object.keys(fieldTypes)}
					onSelect={e => {
						setNewCellField({
							...newCellField,
							type: fieldTypes[e],
						});
					}}
					dropdownStyle={{
						backgroundColor: colors.card,
					}}
					rowTextStyle={{fontSize: 15, color: colors.text}}
					rowStyle={{height: 30}}
					buttonStyle={{
						width: '40%',
						height: 30,
						backgroundColor: '#555F6E',
					}}
					buttonTextStyle={{color: '#FFFFFF', fontSize: 14}}
					selectedRowStyle={{backgroundColor: '#bbf'}}
					selectedRowTextStyle={{color: colors.border}}
					defaultButtonText="Field Type"
					onFocus={() => setOpen(false)}
					onBlur={() => setOpen(true)}
					renderDropdownIcon={
						open
							? () => <Icon name="chevron-down" size={15} color={color.GREY} />
							: () => <Icon name="chevron-up" size={15} color={color.GREY} />
					}
				/>
			</View>
		</View>
  );
};

const styles = StyleSheet.create({
	settingView: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#4B5260',
  },
	titleLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  gestureHandlerView: {
    width: '100%',
    maxHeight: 200,
  },
  tableFieldNo: {
    width: '10%',
    textAlign: 'center',
		color: '#ABB3B2',
  },
  tableFieldAction: {
    width: '20%',
    textAlign: 'center',
		color: '#ABB3B2',
  },
  tableFieldType: {
    width: '20%',
    textAlign: 'center',
    borderRightWidth: 1,
    borderColor: color.GREY,
		color: '#ABB3B2',
  },
  tableFieldName: {
    width: '50%',
    paddingVertical: 0,
    paddingLeft: 10,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: color.GREY,
    color: '#ABB3B2',
  },
  newTableFieldName: {
    width: '50%',
    paddingVertical: 0,
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderColor: color.GREY,
    borderRightWidth: 1,
		color: '#FFFFFF',
  },
  tableFieldDelIcon: {
    width: '10%',
    margin: 0,
  },
  tableField: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#303339',
    borderWidth: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    height: 35,
    borderRadius: 5,
		backgroundColor: '#555F6E'
  },
  typeText: {
    width: '20%',
    height: 30,
    borderRightWidth: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    textDecorationLine: 'underline',
  },
});

export default GridCellFieldSetting;
