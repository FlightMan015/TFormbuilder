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
  num : 'num',
  time : 'time',
  date : 'date',
  menu : 'menu',
	text : 'text',
};

const DataTableHeaderSetting = props => {
  const {fields, changeData} = props;
  const {colors} = useTheme();
  const [newCellField, setNewCellField] = useState({name: '', type: 'image'});
  const [open, setOpen] = useState(true);
  const [newMenuColumnOptions, setNewMenuColumnOptions] = useState(['option1', 'option2', 'option3']);
  const [newOption, setNewOption] = useState('');

  const tableFieldItem = ({item, drag, isActive, getIndex, index, isFirst, isLast}) => {
	// const index = getIndex();
    return (
    //   <ScaleDecorator>
        <View key={index} style={styles.tableField}>
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
              changeData(types.headers, tempHeader);
            }}
            value={item.name}
          />
					{
						item.type === 'num' && (
							<Text
								onPress={() => {}}
								style={{
									...styles.typeText,
									color: '#FFFFFF',
									borderColor: color.GREY,
								}}>
								Number
							</Text>
						)
					}
					{
						item.type === 'text' && (
							<Text
								onPress={() => {}}
								style={{
									...styles.typeText,
									color: '#FFFFFF',
									borderColor: color.GREY,
								}}>
								Textbox
							</Text>
						)
					}
					{
						item.type === 'time' && (
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
						item.type === 'date' && (
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
						item.type === 'menu' && (
							<Text
								onPress={() => {}}
								style={{
									...styles.typeText,
									color: '#FFFFFF',
									borderColor: color.GREY,
								}}>
								Dropdown
							</Text>
						)
					}
			{/* <IconButton
				style={styles.tableFieldDelIcon}
				icon={'drag-horizontal-variant'}
				iconColor={'#fff'}
				size={15}
				onPress={() => {}}
				// onLongPress={drag}
			/> */}
			{
				!isFirst && (
					<IconButton
						style={styles.tableFieldDelIcon}
						icon={'chevron-up'}
						iconColor={'#fff'}
						size={15}
						onPress={() => {
							const tempdata = JSON.parse(JSON.stringify(fields));
							const selectedHeader = JSON.parse(JSON.stringify(tempdata[index]));
							tempdata.splice(index, 1);
							tempdata.splice(index - 1, 0, selectedHeader);
							changeData(types.headers, tempdata);
						}}
						// onLongPress={drag}
					/>
				)
			}
			{
				!isLast && (
					<IconButton
						style={styles.tableFieldDelIcon}
						icon={'chevron-down'}
						iconColor={'#fff'}
						size={15}
						onPress={() => {
							const tempdata = JSON.parse(JSON.stringify(fields));
							const selectedHeader = JSON.parse(JSON.stringify(tempdata[index]));
							tempdata.splice(index, 1);
							tempdata.splice(index + 1, 0, selectedHeader);
							changeData(types.headers, tempdata);
						}}
						// onLongPress={drag}
					/>
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
						changeData(types.headers, tempdata);
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
        </View>
    //   </ScaleDecorator>
    );
  };

  return (
		<View style={styles.settingView}>
			<Text style={styles.titleLabel}>Table Headers</Text>
			<View style={styles.tableField}>
				<Text style={styles.tableFieldNo}>No</Text>
				<Text style={styles.tableFieldName}>Name</Text>
				<Text style={styles.tableFieldType}>Type</Text>
				<Text style={styles.tableFieldAction}>Action</Text>
			</View>
			{/* <GestureHandlerRootView style={styles.gestureHandlerView}>
				<DraggableFlatList
					nestedScrollEnabled
					data={fields}
					onDragBegin={() => {}}
					onDragEnd={changedData => {
						changeData(types.headers, changedData.data);
					}}
					keyExtractor={(item, i) => i}
					renderItem={tableFieldItem}
				/>
			</GestureHandlerRootView> */}
			{
				fields.map((field, i) => {
					return tableFieldItem({item: field, index: i, isFirst: (i === 0), isLast: (i + 1 === fields.length)});
				})
			}
			<View style={{...styles.tableField}}>
				<IconButton
					style={{
						...styles.tableFieldDelIcon,
					}}
					icon={'plus'}
					iconColor={'#FFFFFF'}
					size={15}
					onPress={() => {
						const tempdata = JSON.parse(JSON.stringify(fields));
						if (newCellField.type === 'menu') {
							tempdata.push({...newCellField, data: {is_mandatory: false, options: newMenuColumnOptions}});
						} else {
							tempdata.push(newCellField);
						}
						changeData(types.headers, tempdata);
						setNewCellField({
							name: '',
							type: '',
						});
						setNewMenuColumnOptions(['option1', 'option2', 'option3']);
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
						backgroundColor: '#555F6E',
						borderRadius: 3,
					}}
					rowTextStyle={{fontSize: 15, color: '#FFFFFF'}}
					rowStyle={{height: 30}}
					buttonStyle={{
						width: '40%',
						height: 30,
						backgroundColor: '#555F6E',
					}}
					buttonTextStyle={{color: '#FFFFFF', fontSize: 14}}
					selectedRowStyle={{backgroundColor: '#bbf'}}
					selectedRowTextStyle={{color: '#FFFFFF'}}
					defaultButtonText="Field Type"
					onFocus={() => setOpen(false)}
					onBlur={() => setOpen(true)}
					renderDropdownIcon={
						open
							? () => <Icon name="chevron-down" size={15} color={'#FFFFFF'} />
							: () => <Icon name="chevron-up" size={15} color={'#FFFFFF'} />
					}
				/>
			</View>
			{
				newCellField.type === 'menu' && (
					<View>
						<Text style={{color: '#FFFFFF'}}>New Menu Column Options</Text>
						{
							newMenuColumnOptions.map((option, optionIndex) => {
								return (
									<View
										key={optionIndex}
										style={{
											flexDirection: 'row-reverse',
											alignItems: 'center',
											borderWidth: 1,
											borderRadius: 3,
											borderColor: '#303339',
											backgroundColor: '#555F6E',
										}}
									>
										<IconButton
											style={styles.tableFieldDelIcon}
											icon={'close'}
											iconColor={'#fff'}
											size={15}
											onPress={() => {
												const tempOptions = [...newMenuColumnOptions];
												tempOptions.splice(optionIndex, 1);
												setNewMenuColumnOptions(tempOptions);
											}}
										/>
										<TextInput
											style={{flex: 1, color: '#FFFFFF', padding: 0, paddingLeft: 10}}
											value={option}
											onChangeText={e => {
												const tempOptions = [...newMenuColumnOptions];
												tempOptions.splice(optionIndex, 1, e);
												setNewMenuColumnOptions(tempOptions);
											}}
										/>
									</View>
								);
							})
						}
						<View
							style={{
								flexDirection: 'row-reverse',
								alignItems: 'center',
								borderWidth: 1,
								borderRadius: 3,
								borderColor: '#303339',
								backgroundColor: '#555F6E',
							}}
						>
							<IconButton
								style={styles.tableFieldDelIcon}
								icon={'plus'}
								iconColor={'#FFFFFF'}
								size={15}
								onPress={() => {
									setNewMenuColumnOptions([...newMenuColumnOptions, newOption]);
									setNewOption('');
								}}
							/>
							<TextInput
								style={{flex: 1, color: '#FFFFFF', padding: 0, paddingLeft: 10}}
								value={newOption}
								placeholder='new option'
								placeholderTextColor={'grey'}
								onChangeText={setNewOption}
							/>
						</View>
					</View>
				)
			}
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
    width: '40%',
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

export default DataTableHeaderSetting;
