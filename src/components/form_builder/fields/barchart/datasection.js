import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { globalStyles, color } from '../../../../theme/styles';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Feather';
import { datatypes } from '../../../../constant';
import {IconButton, useTheme} from 'react-native-paper';
import formStore from '../../../../store/formStore';

const BarChartDataSection = ({data, onChangeData}) => {
  const {colors, fonts} = useTheme();
  const i18nValues = formStore(state => state.i18nValues);
  const [openLabel, setOpenLabel] = useState(true);
  const [newLabel, setNewLabel] = useState('');
  const [newLabelValid, setNewLabelValid] = useState(false);
  const [labelStatus, setLabelStatus] = useState({
    labelIndex: 0,
    addLabel: false,
    editLabel: false,
  });

  const onSelectLabel = (item, labelIndex) => {
    setLabelStatus({
      ...labelStatus,
      labelIndex: labelIndex,
      addLabel: false,
      editLabel: false,
    });
  };

  const onClickEditLabel = () => {
    setLabelStatus({
      ...labelStatus,
      addLabel: false,
      editLabel: !labelStatus.editLabel,
    });
  };

  const onClickAddLabel = () => {
    setLabelStatus({
      ...labelStatus,
      addLabel: !labelStatus.addLabel,
      editLabel: false,
    });
  };

  const onClickRemoveLabel = () => {
    onChangeData(datatypes.deleteBarChartLabel, null, labelStatus.labelIndex);
    setLabelStatus({
      ...labelStatus,
      labelIndex: 0,
      addLabel: false,
      editLabel: false,
    });
  };

  const onChangeLabel = changedLabel => {
    onChangeData(
      datatypes.changeBarChartLabel,
      changedLabel,
      labelStatus.labelIndex,
    );
  };

  const onChangeNewLabel = changedLabel => {
    if (!changedLabel) {
      setNewLabelValid(false);
    } else {
      setNewLabelValid(true);
    }
    setNewLabel(changedLabel);
  };

  const onClickAddNewLabel = () => {
    onChangeData(datatypes.addBarChartLabel, newLabel);
    setLabelStatus({
      ...labelStatus,
      addLabel: false,
    });
    setNewLabel('');
  };

  const onChangeY = changedY => {
    if (changedY) {
      onChangeData(
        datatypes.changeBarChartValue,
        parseInt(changedY, 10),
        labelStatus.labelIndex,
      );
    } else {
      onChangeData(datatypes.changeBarChartValue, 0, labelStatus.labelIndex);
    }
  };

  return (
    <View style={{...styles.sectionContainer, borderColor: colors.border}}>
      <View>
        <Text style={{
          ...styles.text,
          color: fonts.labels.color,
        }}>{i18nValues.t("setting_labels.x_value")}</Text>
        <View style={globalStyles.fieldheader}>
          <View style={globalStyles.iconsContainer}>
            <IconButton
              icon={'playlist-plus'}
              iconColor={colors.colorButton}
              size={18}
              onPress={onClickAddLabel}
              style={globalStyles.iconButton}
            />
            <IconButton
              icon={'pencil-outline'}
              iconColor={colors.colorButton}
              size={18}
              onPress={onClickEditLabel}
              style={globalStyles.iconButton}
            />
            <IconButton
              icon="delete-outline"
              iconColor={colors.colorButton}
              size={18}
              onPress={onClickRemoveLabel}
              disabled={data.labels.length > 1 ? false : true}
              style={globalStyles.iconButton}
            />
          </View>
          <SelectDropdown
            data={data.labels}
            onSelect={onSelectLabel}
            rowStyle={styles.dropdownRow}
            dropdownStyle={{...styles.dropdown, backgroundColor: colors.card}}
            rowTextStyle={fonts.values}
            buttonStyle={styles.buttonStyle(colors, fonts)}
            buttonTextStyle={fonts.values}
            selectedRowStyle={{backgroundColor: colors.card}}
            selectedRowTextStyle={{...fonts.values, color: colors.colorButton}}
            renderDropdownIcon={
              openLabel
                ? () => (
                    <Icon name="chevron-down" size={18} color={fonts.values.color} />
                  )
                : () => <Icon name="chevron-up" size={18} color={fonts.values.color} />
            }
            dropdownIconPosition="right"
            onFocus={e => setOpenLabel(false)}
            onBlur={e => setOpenLabel(true)}
            defaultButtonText="Select X value"
            defaultValueByIndex={labelStatus.labelIndex}
            // search={true}
          />
        </View>
        {labelStatus.editLabel && (
          <TextInput
            style={styles.textBox(colors, fonts)}
            underlineColorAndroid="transparent"
            onChangeText={onChangeLabel}
            editable
            placeholder={i18nValues.t("placeholders.input_x_value")}
            placeholderTextColor={'grey'}
            value={data.labels[labelStatus.labelIndex] || ''}
          />
        )}
        {labelStatus.addLabel && (
          <View style={globalStyles.addView}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={globalStyles.opacityStyle(colors)}
              onPress={onClickAddNewLabel}
              disabled={newLabelValid ? false : true}>
              <Text style={styles.textBtnStyle}>{i18nValues.t("setting_labels.add")}</Text>
            </TouchableOpacity>
            <TextInput
              style={globalStyles.textBoxNewLine(colors, fonts)}
              underlineColorAndroid="transparent"
              onChangeText={onChangeNewLabel}
              editable
              placeholder={i18nValues.t("placeholders.new_x_value")}
              placeholderTextColor={'grey'}
              value={newLabel}
            />
          </View>
        )}
      </View>
      {/* <View>
        <Text style={{
          ...styles.text,
          color: fonts.labels.color,
        }}>{i18nValues.t("setting_labels.y_value")}</Text>
        <View>
          <TextInput
            keyboardType="numeric"
            style={styles.textBox(colors, fonts)}
            underlineColorAndroid="transparent"
            onChangeText={onChangeY}
            editable
            placeholder={i18nValues.t("placeholders.input_y_value")}
            placeholderTextColor={'grey'}
            value={
              data.datasets[0].data[labelStatus.labelIndex]
                ? data.datasets[0].data[labelStatus.labelIndex].toString()
                : ''
            }
          />
        </View>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  saveBtn: {
    width: 100,
    borderRadius: 10,
    fontFamily: 'PublicSans-Regular',
    fontSize: 14,
  },
  dropdownBtn: {
    borderRadius: 5,
    width: '60%',
    borderColor: color.GREY,
    borderWidth: 1,
    backgroundColor: 'white',
    height: 40,
  },
  dropdownRow: {
    borderColor: color.GREY,
    borderWidth: 1,
    height: 40,
  },
  sectionContainer: {
    borderRadius: 10,
    borderWidth: 1,
    paddingBottom: 10,
  },
  textBtnStyle: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    color: 'white',
    textAlignVertical: 'center',
  },
  textBox: (colors, fonts) => ({
    height: 40,
    borderRadius: 10,
    marginHorizontal: 10,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor: colors.card,
    ...fonts.values,
  }),
  buttonStyle: (colors, fonts) => ({
    flex: 1,
    borderRadius: 10,
    marginLeft: 10,
    backgroundColor: colors.card,
    height: 40,
    ...fonts.values,
  }),
  text: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'PublicSans-Regular',
  },
  dropdown: {
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
  },
  settingLabel: {
    width: '20%',
    alignSelf: 'center',
  },
  settingLabelText: {
    alignSelf: 'center',
  },
  settingEmail: {width: '80%'},
  flexDirection: {
    flexDirection: 'row',
  },
});

BarChartDataSection.propTypes = {
  data: PropTypes.object.isRequired,
  onChangeData: PropTypes.func.isRequired,
};

export default React.memo(BarChartDataSection);
