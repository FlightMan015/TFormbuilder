import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Alert} from 'react-native';
import {IconButton, useTheme} from 'react-native-paper';
import {color} from '../../theme/styles';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Feather';
import {componentName, newFieldData} from '../../constant';
import formStore from '../../store/formStore';

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
  const i18nValues = formStore(state => state.i18nValues);

  const tableFieldItem = ({item, index, isFirst, isLast}) => {
    return (
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
								{i18nValues.t("setting_labels.textbox")}
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
								{i18nValues.t("setting_labels.date")}
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
								{i18nValues.t("setting_labels.time")}
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
								{i18nValues.t("setting_labels.dropdown")}
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
								{i18nValues.t("setting_labels.image")}
							</Text>
						)
					}
			{
				!isFirst && (
					<Icon
						name="chevron-up"
						size={15}
						color={'#FFFFFF'}
						style={styles.tableFieldDelIcon}
						onPress={() => {
							const tempdata = JSON.parse(JSON.stringify(fields));
							const selectedHeader = JSON.parse(JSON.stringify(tempdata[index]));
							tempdata.splice(index, 1);
							tempdata.splice(index - 1, 0, selectedHeader);
							changeData(types.cellFields, tempdata);
						}}
						/>
				)
			}
			{
				!isLast && (
					<Icon
						name="chevron-down"
						size={15}
						color={'#FFFFFF'}
						style={styles.tableFieldDelIcon}
						onPress={() => {
							const tempdata = JSON.parse(JSON.stringify(fields));
							const selectedHeader = JSON.parse(JSON.stringify(tempdata[index]));
							tempdata.splice(index, 1);
							tempdata.splice(index + 1, 0, selectedHeader);
							changeData(types.cellFields, tempdata);
						}}
						/>
				)
			}
			<Icon
				name="x"
				size={15}
				color={'#FFFFFF'}
				style={styles.tableFieldDelIcon}
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
		</View>
    );
  };

  return (
		<View style={styles.settingView}>
			<Text style={styles.titleLabel}>{i18nValues.t("setting_labels.cell_fields")}</Text>
			<View style={styles.tableField}>
				<Text style={styles.tableFieldNo}>{i18nValues.t("setting_labels.no")}</Text>
				<Text style={styles.tableFieldName}>{i18nValues.t("setting_labels.name")}</Text>
				<Text style={styles.tableFieldType}>{i18nValues.t("setting_labels.type")}</Text>
				<Text style={styles.tableFieldAction}>{i18nValues.t("setting_labels.action")}</Text>
			</View>
			{
				fields.map((field, i) =>{
					return tableFieldItem({item: field, index: i, isFirst: (i === 0), isLast: (i + 1 === fields.length)});
				})
			}
			<View style={{...styles.tableField}}>
				<Icon
					name="plus"
					size={15}
					color={'#FFFFFF'}
					style={{
						...styles.tableFieldDelIcon,
					}}
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
							is_mandatory: false,
						});
						changeData(types.cellFields, tempdata);
						setNewCellField({
							name: '',
							type: '',
						});
					}}/>
				<TextInput
					style={{...styles.newTableFieldName}}
					underlineColorAndroid="transparent"
					placeholder={i18nValues.t("setting_labels.new_field_name")}
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
					defaultButtonText={i18nValues.t("setting_labels.field_type")}
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
    width: '30%',
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
	textAlign: 'center',
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
    paddingVertical: 5,
    borderRightWidth: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    textDecorationLine: 'underline',
  },
});

export default GridCellFieldSetting;
