import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { globalStyles, color } from '../../../theme/styles';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Feather';
import { datatypes } from '../../../constant';
import {Button, IconButton, useTheme} from 'react-native-paper';

const BarChartDataSection = ({data, onChangeData}) => {
  const {colors} = useTheme();
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
          color: colors.label,
        }}>X Value</Text>
        <View style={globalStyles.fieldheader}>
          <SelectDropdown
            data={data.labels}
            onSelect={onSelectLabel}
            dropdownStyle={{...styles.dropdown, backgroundColor: colors.card}}
            rowTextStyle={{fontSize: 15, color: colors.text}}
            rowStyle={styles.dropdownRow}
            buttonStyle={{
              ...styles.dropdownBtn,
              backgroundColor: colors.inputTextBackground,
              borderColor: colors.inputTextBorder,
            }}
            buttonTextStyle={{color: colors.text, fontSize: 14, fontFamily: 'PublicSans-Regular'}}
            selectedRowStyle={{backgroundColor: '#bbf'}}
            selectedRowTextStyle={{color: 'white'}}
            renderDropdownIcon={
              openLabel
                ? () => (
                    <Icon name="chevron-down" size={18} color={colors.text} />
                  )
                : () => <Icon name="chevron-up" size={18} color={colors.text} />
            }
            dropdownIconPosition="right"
            onFocus={e => setOpenLabel(false)}
            onBlur={e => setOpenLabel(true)}
            defaultButtonText="Select X value"
            defaultValueByIndex={labelStatus.labelIndex}
            // search={true}
          />
          <View style={globalStyles.iconsContainer}>
            <IconButton
              icon={'playlist-plus'}
              iconColor={colors.icon}
              size={18}
              onPress={onClickAddLabel}
              style={globalStyles.iconButton}
            />
            <IconButton
              icon={'pencil'}
              iconColor={colors.icon}
              size={18}
              onPress={onClickEditLabel}
              style={globalStyles.iconButton}
            />
            <IconButton
              icon="delete-forever"
              iconColor={colors.icon}
              size={18}
              onPress={onClickRemoveLabel}
              disabled={data.labels.length > 1 ? false : true}
              style={globalStyles.iconButton}
            />
          </View>
        </View>
        {labelStatus.editLabel && (
          <TextInput
            style={{
              ...styles.textBox,
              backgroundColor: colors.inputTextBackground,
              borderColor: colors.inputTextBorder,
            }}
            underlineColorAndroid="transparent"
            onChangeText={onChangeLabel}
            editable
            placeholder="Please input X value"
            value={data.labels[labelStatus.labelIndex] || ''}
          />
        )}
        {labelStatus.addLabel && (
          <View style={globalStyles.addView}>
            <TextInput
              style={{
                ...globalStyles.textBoxNewLine,
                backgroundColor: colors.inputTextBackground,
                borderColor: colors.inputTextBorder,
              }}
              underlineColorAndroid="transparent"
              onChangeText={onChangeNewLabel}
              editable
              placeholder="new X value"
              value={newLabel}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={globalStyles.opacityStyle}
              onPress={onClickAddNewLabel}
              disabled={newLabelValid ? false : true}>
              <Text style={styles.textBtnStyle}>Add</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View>
        <Text style={{
          ...styles.text,
          color: colors.label,
        }}>Y Value</Text>
        <View>
          <TextInput
            keyboardType="numeric"
            style={{
              ...styles.textBox,
              backgroundColor: colors.inputTextBackground,
              borderColor: colors.inputTextBorder,
            }}
            underlineColorAndroid="transparent"
            onChangeText={onChangeY}
            editable
            placeholder="Please input Y value"
            value={
              data.datasets[0].data[labelStatus.labelIndex] !== null
                ? data.datasets[0].data[labelStatus.labelIndex].toString()
                : ''
            }
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => onChangeData('changeField')}
          color={color.WHITE}
          style={{
            ...styles.saveBtn,
            backgroundColor: colors.colorButton,
            }}>
          Save
        </Button>
        <Button
          onPress={() => onChangeData('cancel')}
          color={color.WHITE}
          style={{
            ...styles.saveBtn,
            backgroundColor: colors.colorButton,
            }}>
          Cancel
        </Button>
      </View>
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
  textBox: {
    height: 40,
    borderColor: color.GREY,
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
    paddingLeft: 10,
    marginBottom: 10,
    fontFamily: 'PublicSans-Regular',
  },
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
