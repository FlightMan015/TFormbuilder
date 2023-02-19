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
import { datatypes, string16 } from '../../../constant';
import {Button, IconButton, Switch, useTheme} from 'react-native-paper';
import ColorPalette from '../../../common/color_palette';
import formStore from '../../../store/formStore';

const LineChartDataSection = ({data, onChangeData, role}) => {

  const {colors, fonts} = useTheme();
  const preview = formStore(state => state.preview);
  const [openLine, setOpenLine] = useState(true);
  const [openLabel, setOpenLabel] = useState(true);
  const [lineStatus, setLineStatus] = useState({
    lineIndex: 0,
    addLine: false,
    editLine: false,
  });
  const [labelStatus, setLabelStatus] = useState({
    labelIndex: 0,
    addLabel: false,
    editLabel: false,
  });
  const [customColor, setColor] = useState({red: 0, green: 0, blue: 0});
  const [newLine, setNewLine] = useState('');
  const [newLineValid, setNewLineValid] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newLabelValid, setNewLabelValid] = useState(false);
  const [changeLine, setChangeLine] = useState('');
  const [isRGBcolor, setRGBcolor] = useState(false);
  const [paletteColor, setPaletteColor] = useState('#000000');

  const onClickEditLine = () => {
    const tempEditStatus = lineStatus.editLine;
    setLineStatus({
      ...lineStatus,
      addLine: false,
      editLine: !lineStatus.editLine,
    });
    if (!tempEditStatus) {
      setColor({
        ...customColor,
        red: data.datasets[lineStatus.lineIndex]?.red,
        green: data.datasets[lineStatus.lineIndex]?.green,
        blue: data.datasets[lineStatus.lineIndex]?.blue,
      });
      setChangeLine(data.legend[lineStatus.lineIndex]);
    }
  };

  const onClickAddLine = () => {
    setLineStatus({
      ...lineStatus,
      addLine: !lineStatus.addLine,
      editLine: false,
    });
    setNewLine('');
    setColor({
      ...customColor,
      red: 0,
      green: 0,
      blue: 0,
    });
  };

  const onClickRemoveLine = () => {
    onChangeData(datatypes.deleteLine, null, lineStatus.lineIndex);
    setLineStatus({
      ...lineStatus,
      addLine: false,
      editLine: false,
      lineIndex: 0,
    });
  };

  const onChangeLine = changedLine => {
    setChangeLine(changedLine);
  };

  const onClickChangeLine = () => {
    onChangeData(
      datatypes.changeLine,
      {newLine: changeLine, ...customColor},
      lineStatus.lineIndex,
    );
  };

  const onChangeNewLine = changedLine => {
    if (!changedLine) {
      setNewLineValid(false);
    } else {
      setNewLineValid(true);
    }
    setNewLine(changedLine);
  };

  const onClickAddNewLine = () => {
    onChangeData(datatypes.addLine, {
      newLine: newLine,
      ...customColor,
    });
    setLineStatus({
      ...lineStatus,
      addLine: false,
    });
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
    onChangeData(datatypes.addLabel, newLabel);
    setLabelStatus({
      ...labelStatus,
      addLabel: false,
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
    onChangeData(datatypes.deleteLabel, null, labelStatus.labelIndex);
    setLabelStatus({
      ...labelStatus,
      addLabel: false,
      editLabel: false,
      labelIndex: 0,
    });
  };

  const onChangeLabel = changedLabel => {
    onChangeData(datatypes.changeLabel, changedLabel, labelStatus.labelIndex);
  };

  const onSelectLine = (item, lineIndex) => {
    setLineStatus({
      ...lineStatus,
      lineIndex: lineIndex,
    });
    setColor({
      ...customColor,
      red: data.datasets[lineIndex].red,
      green: data.datasets[lineIndex].green,
      blue: data.datasets[lineIndex].blue,
    });
    setChangeLine(data.legend[lineIndex]);
  };

  const onSelectLabel = (item, labelIndex) => {
    setLabelStatus({
      ...labelStatus,
      labelIndex: labelIndex,
    });
  };

  const onChangeY = changedY => {
    if (changedY) {
      onChangeData(
        datatypes.changeY,
        parseInt(changedY, 10),
        lineStatus.lineIndex,
        labelStatus.labelIndex,
      );
    } else {
      onChangeData(
        datatypes.changeY,
        0,
        lineStatus.lineIndex,
        labelStatus.labelIndex,
      );
    }
  };

  const onChangeRed = e => {
    if (e) {
      if (parseInt(e, 10) > 255) {
        e = '255';
      }
      if (parseInt(e, 10) < 0) {
        e = '0';
      }
      setColor({...customColor, red: parseInt(e, 10)});
    } else {
      setColor({...customColor, red: 0});
    }
  };

  const onChangeGreen = e => {
    if (e) {
      if (parseInt(e, 10) > 255) {
        e = '255';
      }
      if (parseInt(e, 10) < 0) {
        e = '0';
      }
      setColor({...customColor, green: parseInt(e, 10)});
    } else {
      setColor({...customColor, green: 0});
    }
  };

  const onChangeBlue = e => {
    if (e) {
      if (parseInt(e, 10) > 255) {
        e = '255';
      }
      if (parseInt(e, 10) < 0) {
        e = '0';
      }
      setColor({...customColor, blue: parseInt(e, 10)});
    } else {
      setColor({...customColor, blue: 0});
    }
  };

  const selectPalette = selectedColor => {
    setPaletteColor(selectedColor);
    setColor({
      ...customColor,
      red: parseInt(selectedColor.substring(1, 3), 16),
      green: parseInt(selectedColor.substring(3, 5), 16),
      blue: parseInt(selectedColor.substring(5, 7), 16),
    });
  };

  return (
    <View style={{...styles.sectionContainer, borderColor: colors.border}}>
      <View>
        <Text style={{...styles.text, color: fonts.labels.color}}>Series</Text>
        <View style={globalStyles.fieldheader}>
          <SelectDropdown
            data={data.legend}
            onSelect={onSelectLine}
            dropdownStyle={{...styles.dropdown, backgroundColor: colors.card}}
            rowTextStyle={{fontSize: 15, color: colors.text}}
            buttonStyle={styles.buttonStyle(colors, fonts)}
            buttonTextStyle={fonts.values}
            selectedRowStyle={{backgroundColor: '#bbf'}}
            selectedRowTextStyle={{color: 'white'}}
            renderDropdownIcon={
              openLine
                ? () => (
                    <Icon name="chevron-down" size={18} color={fonts.values.color} />
                  )
                : () => <Icon name="chevron-up" size={18} color={fonts.values.color} />
            }
            dropdownIconPosition="right"
            onFocus={e => setOpenLine(false)}
            onBlur={e => setOpenLine(true)}
            defaultButtonText="Select series"
            defaultValueByIndex={lineStatus.lineIndex}
            // search={true}
          />
          <View style={globalStyles.iconsContainer}>
            <IconButton
              icon={'playlist-plus'}
              iconColor={fonts.values.color}
              size={18}
              onPress={onClickAddLine}
              disabled={!(('editSeries' in role && role.editSeries) || preview)}
              style={globalStyles.iconButton}
            />
            <IconButton
              icon={'pencil'}
              iconColor={fonts.values.color}
              size={18}
              onPress={onClickEditLine}
              style={globalStyles.iconButton}
            />
            <IconButton
              icon="delete-forever"
              iconColor={fonts.values.color}
              size={18}
              onPress={onClickRemoveLine}
              disabled={
                (('editSeries' in role && role.editSeries) || preview) ? (data.legend.length > 1 ? false : true) : true
              }
              style={globalStyles.iconButton}
            />
          </View>
        </View>
        {lineStatus.editLine && (
          <View>
            <View style={globalStyles.addView}>
              <TextInput
                style={globalStyles.textBoxNewLine(colors, fonts)}
                underlineColorAndroid="transparent"
                onChangeText={onChangeLine}
                editable
                placeholder="Series name"
                value={changeLine || ''}
                // showSoftInputOnFocus={false}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                style={globalStyles.opacityStyle}
                onPress={onClickChangeLine}
                // disabled={newLineValid ? false : true}
              >
                <Text style={styles.textBtnStyle}>Change</Text>
              </TouchableOpacity>
            </View>
            {!isRGBcolor && (
              <View>
                <ColorPalette
                  onChange={color => selectPalette(color)}
                  value={paletteColor}
                  title={''}
                  titleStyles={{height: 0}}
                  paletteStyles={{marginBottom: 10, marginHorizontal: 10}}
                />
              </View>
            )}
            {isRGBcolor && (
              <View style={styles.colorContainer}>
                <Text style={styles.RGBtext(fonts)}>R</Text>
                <TextInput
                  keyboardType="numeric"
                  style={styles.RGBvalue(colors, fonts)}
                  value={customColor.red?.toString()}
                  onChangeText={onChangeRed}
                />
                <Text style={styles.RGBtext(fonts)}>G</Text>
                <TextInput
                  keyboardType="numeric"
                  style={styles.RGBvalue(colors, fonts)}
                  value={customColor.green?.toString()}
                  onChangeText={onChangeGreen}
                />
                <Text style={styles.RGBtext(fonts)}>B</Text>
                <TextInput
                  keyboardType="numeric"
                  style={styles.RGBvalue(colors, fonts)}
                  value={customColor.blue?.toString()}
                  onChangeText={onChangeBlue}
                />
                <View style={styles.lineColorContainer}>
                  <View
                    style={styles.lineColor(
                      customColor.red || 0,
                      customColor.green || 0,
                      customColor.blue || 0,
                    )}
                  />
                </View>
              </View>
            )}
            <View
              flexDirection="row"
              style={{marginHorizontal: 10, justifyContent: 'flex-end'}}>
              <Text style={globalStyles.label}>{'RGB color'}</Text>
              <Switch
                color={colors.colorButton}
                value={isRGBcolor}
                onValueChange={() => setRGBcolor(!isRGBcolor)}
              />
            </View>
          </View>
        )}
        {lineStatus.addLine && (
          <View>
            <View style={globalStyles.addView}>
              <TextInput
                style={globalStyles.textBoxNewLine(colors, fonts)}
                underlineColorAndroid="transparent"
                onChangeText={onChangeNewLine}
                editable
                placeholder="new series name"
                value={newLine}
                // showSoftInputOnFocus={false}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                style={globalStyles.opacityStyle}
                onPress={onClickAddNewLine}
                disabled={newLineValid ? false : true}>
                <Text style={styles.textBtnStyle}>Add</Text>
              </TouchableOpacity>
            </View>
            {!isRGBcolor && (
              <View>
                <ColorPalette
                  onChange={color => selectPalette(color)}
                  value={paletteColor}
                  title={''}
                  titleStyles={{height: 0}}
                  paletteStyles={{marginBottom: 10, marginHorizontal: 10}}
                />
              </View>
            )}
            {isRGBcolor && (
              <View style={styles.colorContainer}>
                <Text style={styles.RGBtext(fonts)}>R</Text>
                <TextInput
                  keyboardType="numeric"
                  style={styles.RGBvalue(colors, fonts)}
                  value={customColor.red.toString()}
                  onChangeText={onChangeRed}
                />
                <Text style={styles.RGBtext(fonts)}>G</Text>
                <TextInput
                  keyboardType="numeric"
                  style={styles.RGBvalue(colors, fonts)}
                  value={customColor.green.toString()}
                  onChangeText={onChangeGreen}
                />
                <Text style={styles.RGBtext(fonts)}>B</Text>
                <TextInput
                  keyboardType="numeric"
                  style={styles.RGBvalue(colors, fonts)}
                  value={customColor.blue.toString()}
                  onChangeText={onChangeBlue}
                />
                <View style={styles.lineColorContainer}>
                  <View
                    style={styles.lineColor(
                      customColor.red,
                      customColor.green,
                      customColor.blue,
                    )}
                  />
                </View>
              </View>
            )}
            <View
              flexDirection="row"
              style={{marginHorizontal: 10, justifyContent: 'flex-end'}}>
              <Text style={globalStyles.label}>{'RGB color'}</Text>
              <Switch
                color={colors.colorButton}
                value={isRGBcolor}
                onValueChange={() => setRGBcolor(!isRGBcolor)}
              />
            </View>
          </View>
        )}
      </View>
      <View>
        <Text style={{...styles.text, color: fonts.labels.color}}>X Value</Text>
        <View style={globalStyles.fieldheader}>
          <SelectDropdown
            data={data.labels}
            onSelect={onSelectLabel}
            dropdownStyle={{...styles.dropdown, backgroundColor: colors.card}}
            rowTextStyle={{fontSize: 14, color: colors.text}}
            buttonStyle={styles.buttonStyle(colors, fonts)}
            buttonTextStyle={fonts.values}
            selectedRowStyle={{backgroundColor: colors.card}}
            selectedRowTextStyle={{color: colors.text}}
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
            defaultButtonText="Select X value - Label"
            defaultValueByIndex={labelStatus.labelIndex}
            // search={true}
          />
          <View style={globalStyles.iconsContainer}>
            <IconButton
              icon={'playlist-plus'}
              iconColor={fonts.values.color}
              size={18}
              onPress={onClickAddLabel}
              disabled={!(('editAxes' in role && role.editAxes) || preview)}
              style={globalStyles.iconButton}
            />
            <IconButton
              icon={'pencil'}
              iconColor={fonts.values.color}
              size={18}
              onPress={onClickEditLabel}
              style={globalStyles.iconButton}
            />
            <IconButton
              icon="delete-forever"
              iconColor={fonts.values.color}
              size={18}
              onPress={onClickRemoveLabel}
              disabled={
                (('editAxes' in role && role.editAxes) || preview) ? (data.labels.length > 1 ? false : true) : true
              }
              style={globalStyles.iconButton}
            />
          </View>
        </View>
        {labelStatus.editLabel && (
          <TextInput
            style={{
              ...styles.textBox(colors, fonts)
            }}
            underlineColorAndroid="transparent"
            onChangeText={onChangeLabel}
            editable
            placeholder="Please input X value"
            value={data.labels[labelStatus.labelIndex] || ''}
            // showSoftInputOnFocus={false}
          />
        )}
        {labelStatus.addLabel && (
          <View style={globalStyles.addView}>
            <TextInput
              style={globalStyles.textBoxNewLine(colors, fonts)}
              underlineColorAndroid="transparent"
              onChangeText={onChangeNewLabel}
              editable
              placeholder="new X value"
              value={newLabel}
              // showSoftInputOnFocus={false}
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
        <Text style={{...styles.text, color: fonts.labels.color}}>Y Value</Text>
        <View>
          <TextInput
            keyboardType="numeric"
            style={{
              ...styles.textBox(colors, fonts),
            }}
            underlineColorAndroid="transparent"
            onChangeText={onChangeY}
            editable
            placeholder="Please input Y value"
            value={
              data.datasets[lineStatus.lineIndex]?.data[
                labelStatus.labelIndex
              ]
                ? data.datasets[lineStatus.lineIndex].data[
                    labelStatus.labelIndex
                  ].toString()
                : ''
            }
            // showSoftInputOnFocus={false}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  saveBtn: {
    width: 100,
    borderRadius: 10,
  },
  sectionContainer: {
    borderRadius: 10,
    borderWidth: 1,
    paddingBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  colorContainer: {
    flexDirection: 'row',
    marginRight: 10,
    marginBottom: 10,
    justifyContent: 'space-around',
  },
  RGBtext: fonts => ({
    width: '11%',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: fonts.labels.color,
    fontFamily: fonts.labels.fontFamily,
  }),
  RGBvalue: (colors, fonts) => ({
    width: '20%',
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.card,
    ...fonts.values,
  }),
  lineColorContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginLeft: 10,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
  },
  lineColor: (red, green, blue) => ({
    width: 30,
    height: 30,
    backgroundColor: '#' + string16(red) + string16(green) + string16(blue),
    alignSelf: 'center',
    borderColor: 'grey',
    borderWidth: 1,
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
    borderRadius: 10,
    width: '60%',
    backgroundColor: colors.card,
    height: 40,
    ...fonts.values,
  }),
});

LineChartDataSection.propTypes = {
  data: PropTypes.object.isRequired,
  onChangeData: PropTypes.func.isRequired,
};

export default React.memo(LineChartDataSection);
