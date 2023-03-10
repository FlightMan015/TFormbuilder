import React, {useState, useEffect} from 'react';
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
import {datatypes, string16} from '../../../constant';
import {IconButton, Switch, useTheme} from 'react-native-paper';
import ColorPalette from '../../../common/color_palette';
import formStore from '../../../store/formStore';

const RadarChartDataSection = ({meta, onChangeData, userRole}) => {
  const {colors, fonts} = useTheme();
  const preview = formStore(state => state.preview);
  const i18nValues = formStore(state => state.i18nValues);
  const [openLine, setOpenLine] = useState(true);
  const [openAxis, setOpenAxis] = useState(true);
  const [customColor, setCustomColor] = useState({red: 0, green: 0, blue: 0});
  const [lineStatus, setLineStatus] = useState({
    lineIndex: 0,
    addLine: false,
    editLine: false,
    newLine: '',
    newLineValid: false,
  });
  const [axisStatus, setAxisStatus] = useState({
    axisIndex: 0,
    addAxis: false,
    editAxis: false,
    newAxis: '',
    newAxisValid: false,
  });
  const [changeLine, setChangeLine] = useState(
    meta.data.lines[lineStatus.lineIndex],
  );
  const [changeAxis, setChangeAxis] = useState('');
  const [axes, setAxes] = useState([]);
  const [axisValue, setAxisValue] = useState(0);
  const [isRGBcolor, setRGBcolor] = useState(false);
  const [paletteColor, setPaletteColor] = useState('#000000');

  useEffect(() => {
    const tempData = JSON.parse(JSON.stringify(meta.data));
    const axisArray = Object.keys(tempData.datasets[0] || []);
    setAxes(axisArray);
    setChangeLine(meta.data.lines[lineStatus.lineIndex]);
    setChangeAxis(axisArray[axisStatus.axisIndex]);
    let tempAxisValue = 0
    if (meta.data.datasets.length > 0 && axisArray.length > 0) {
      tempAxisValue = meta.data.datasets[lineStatus.lineIndex][axisArray[axisStatus.axisIndex]];
    }
    setAxisValue(tempAxisValue.toString());
  }, [meta]);

  useEffect(() => {
    const tempData = JSON.parse(JSON.stringify(meta.data));
    const axisArray = Object.keys(tempData.datasets[0] || []);
    let tempAxisValue = 0
    if (meta.data.datasets.length > 0 && axisArray.length > 0) {
      tempAxisValue = meta.data.datasets[lineStatus.lineIndex][axisArray[axisStatus.axisIndex]];
    }
    setAxisValue(tempAxisValue.toString());
    setChangeAxis(axisArray[axisStatus.axisIndex]);
  }, [lineStatus.lineIndex, axisStatus.axisIndex]);

  const getLineColor = () => {
    const colorString = meta.data.colors[lineStatus.lineIndex];
    const redString = colorString.substring(1, 3);
    const greenString = colorString.substring(3, 5);
    const blueString = colorString.substring(5, 7);
    const redInt =
      parseInt(redString, 16) > 255 ? 255 : parseInt(redString, 16);
    const greenInt =
      parseInt(greenString, 16) > 255 ? 255 : parseInt(greenString, 16);
    const blueInt =
      parseInt(blueString, 16) > 255 ? 255 : parseInt(blueString, 16);
    setCustomColor({
      ...customColor,
      red: redInt,
      green: greenInt,
      blue: blueInt,
    });
  };

  const onClickEditLine = () => {
    const tempEditStatus = lineStatus.editLine;
    setLineStatus({
      ...lineStatus,
      editLine: !lineStatus.editLine,
      addLine: false,
    });
    if (!tempEditStatus) {
      getLineColor();
    }
  };

  const onClickAddLine = () => {
    setLineStatus({
      ...lineStatus,
      editLine: false,
      addLine: !lineStatus.addLine,
      newLine: '',
    });
    setCustomColor({
      ...customColor,
      red: 0,
      green: 0,
      blue: 0,
    });
  };

  const onClickRemoveLine = () => {
    onChangeData(datatypes.deleteRadarLine, null, lineStatus.lineIndex);
    setLineStatus({
      ...lineStatus,
      editLine: false,
      addLine: false,
      lineIndex: 0,
    });
  };

  const onChangeLine = changedLine => {
    setChangeLine(changedLine);
  };

  const onClickChangeNewLine = () => {
    onChangeData(
      datatypes.changeRadarLine,
      {
        newLine: changeLine,
        red: customColor.red,
        green: customColor.green,
        blue: customColor.blue,
      },
      lineStatus.lineIndex,
    );
  };

  const onChangeNewLine = changedLine => {
    if (!changedLine) {
      setLineStatus({
        ...lineStatus,
        newLineValid: false,
        newLine: changedLine,
      });
    } else {
      setLineStatus({
        ...lineStatus,
        newLineValid: true,
        newLine: changedLine,
      });
    }
  };

  const onClickAddNewLine = () => {
    onChangeData(datatypes.addRadarLine, {
      newLine: lineStatus.newLine,
      red: customColor.red,
      green: customColor.green,
      blue: customColor.blue,
    });
    setLineStatus({
      ...lineStatus,
      addLine: false,
    });
  };

  const onChangeNewAxis = changedAxis => {
    if (!changedAxis) {
      setAxisStatus({
        ...axisStatus,
        newAxisValid: false,
        newAxis: changedAxis,
      });
    } else {
      setAxisStatus({
        ...axisStatus,
        newAxisValid: true,
        newAxis: changedAxis,
      });
    }
  };

  const onClickAddNewAxis = () => {
    onChangeData(datatypes.addRadarAxis, axisStatus.newAxis);
    setAxisStatus({
      ...axisStatus,
      addAxis: false,
    });
  };

  const onClickEditAxis = () => {
    setAxisStatus({
      ...axisStatus,
      addAxis: false,
      editAxis: !axisStatus.editAxis,
    });
  };

  const onClickAddAxis = () => {
    setAxisStatus({
      ...axisStatus,
      addAxis: !axisStatus.addAxis,
      editAxis: false,
    });
  };

  const onClickRemoveAxis = () => {
    onChangeData(datatypes.deleteRadarAxis, null, axes[axisStatus.axisIndex]);
    setAxisStatus({
      ...axisStatus,
      addAxis: false,
      editAxis: false,
      axisIndex: 0,
    });
  };

  const onChangeAxis = changedAxis => {
    setChangeAxis(changedAxis);
  };

  const onClickChangeAxis = () => {
    onChangeData(
      datatypes.changeRadarAxis,
      changeAxis,
      axes[axisStatus.axisIndex],
    );
  };

  const onSelectLine = (item, index) => {
    setLineStatus({
      ...lineStatus,
      lineIndex: index,
    });
    setChangeLine(meta.data.lines[index]);
    getLineColor();
  };

  const onSelectAxis = (item, index) => {
    setAxisStatus({
      ...axisStatus,
      axisIndex: index,
    });
  };

  const onChangeY = changedValue => {
    if (changedValue) {
      onChangeData(
        datatypes.changeRadarValue,
        parseInt(changedValue, 10),
        lineStatus.lineIndex,
        axes[axisStatus.axisIndex],
      );
    } else {
      onChangeData(
        datatypes.changeRadarValue,
        1,
        lineStatus.lineIndex,
        axes[axisStatus.axisIndex],
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
      setCustomColor({
        ...customColor,
        red: parseInt(e, 10),
      });
    } else {
      setCustomColor({
        ...customColor,
        red: 0,
      });
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
      setCustomColor({
        ...customColor,
        green: parseInt(e, 10),
      });
    } else {
      setCustomColor({
        ...customColor,
        green: 0,
      });
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
      setCustomColor({
        ...customColor,
        blue: parseInt(e, 10),
      });
    } else {
      setCustomColor({
        ...customColor,
        blue: 0,
      });
    }
  };

  const selectPalette = selectedColor => {
    setPaletteColor(selectedColor);
    setCustomColor({
      ...customColor,
      red: parseInt(selectedColor.substring(1, 3), 16),
      green: parseInt(selectedColor.substring(3, 5), 16),
      blue: parseInt(selectedColor.substring(5, 7), 16),
    });
  };

  return (
    <View
      style={{
        borderColor: colors.border,
        borderRadius: 5,
        borderWidth: 1,
        paddingBottom: 10,
        marginTop: 10,
      }}>
      <View>
        <Text style={{
          ...styles.text(fonts),
        }}>{i18nValues.t("setting_labels.series")}</Text>
        <View style={globalStyles.fieldheader}>
          <View style={globalStyles.iconsContainer}>
            <IconButton
              icon={'playlist-plus'}
              iconColor={colors.colorButton}
              size={18}
              onPress={onClickAddLine}
              disabled={!('editSeries' in userRole && userRole.editSeries) && !preview}
              style={globalStyles.iconButton}
            />
            <IconButton
              icon={'pencil-outline'}
              iconColor={colors.colorButton}
              size={18}
              disabled={!('editSeries' in userRole && userRole.editSeries) && !preview}
              onPress={onClickEditLine}
              style={globalStyles.iconButton}
            />
            <IconButton
              icon="delete-outline"
              iconColor={colors.colorButton}
              disabled={
                (('editSeries' in userRole && userRole.editSeries) || preview)
                  ? meta.data.lines.length > 1
                    ? false
                    : true
                  : true
              }
              size={18}
              onPress={onClickRemoveLine}
              style={globalStyles.iconButton}
            />
          </View>
          <SelectDropdown
            data={meta.data.lines}
            onSelect={onSelectLine}
            dropdownStyle={{...styles.dropdown, backgroundColor: colors.card}}
            rowTextStyle={fonts.values}
            buttonStyle={globalStyles.buttonStyle(colors, fonts)}
            buttonTextStyle={fonts.values}
            selectedRowStyle={{backgroundColor: colors.card}}
            selectedRowTextStyle={{...fonts.values, color: colors.colorButton}}
            renderDropdownIcon={
              openLine
                ? () => (
                    <Icon name="chevron-down" size={18} color={colors.colorButton} />
                  )
                : () => <Icon name="chevron-up" size={18} color={colors.colorButton} />
            }
            dropdownIconPosition="right"
            onFocus={e => setOpenLine(false)}
            onBlur={e => setOpenLine(true)}
            defaultButtonText="Select Series"
            defaultValueByIndex={lineStatus.lineIndex}
            // search={true}
          />
        </View>
        {lineStatus.editLine && (
          <View>
            <View style={globalStyles.addView}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={globalStyles.opacityStyle(colors)}
                onPress={onClickChangeNewLine}
                // disabled={newLineValid ? false : true}
              >
                <Text style={styles.textBtnStyle}>{i18nValues.t("setting_labels.change")}</Text>
              </TouchableOpacity>
              <TextInput
                style={globalStyles.textBoxNewLine(colors, fonts)}
                underlineColorAndroid="transparent"
                onChangeText={onChangeLine}
                editable
                placeholder={i18nValues.t("placeholders.series_name")}
                placeholderTextColor={'grey'}
                value={changeLine}
                // showSoftInputOnFocus={false}
              />
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
              <Text style={globalStyles.label}>{i18nValues.t("setting_labels.rgb_color")}</Text>
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
              <TouchableOpacity
                activeOpacity={0.7}
                style={globalStyles.opacityStyle(colors)}
                onPress={onClickAddNewLine}
                disabled={lineStatus.newLineValid ? false : true}>
                <Text style={styles.textBtnStyle}>{i18nValues.t("setting_labels.add")}</Text>
              </TouchableOpacity>
              <TextInput
                style={globalStyles.textBoxNewLine(colors, fonts)}
                underlineColorAndroid="transparent"
                onChangeText={onChangeNewLine}
                editable
                placeholder={i18nValues.t("placeholders.new_series_name")}
                placeholderTextColor={'grey'}
                value={lineStatus.newLine}
                // showSoftInputOnFocus={false}
              />
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
              <Text style={globalStyles.label}>{i18nValues.t("setting_labels.rgb_color")}</Text>
              <Switch
                color={colors.colorButton}
                value={isRGBcolor}
                onValueChange={() => setRGBcolor(!isRGBcolor)}
              />
            </View>
          </View>
        )}
      </View>
      {axes.length !== 0 && (
        <View>
          <View>
            <Text style={{
              ...styles.text(fonts),
            }}>{i18nValues.t("setting_labels.axis")}</Text>
            <View style={globalStyles.fieldheader}>
              <View style={globalStyles.iconsContainer}>
                <IconButton
                  icon={'playlist-plus'}
                  iconColor={colors.colorButton}
                  size={18}
                  onPress={onClickAddAxis}
                  disabled={!('editAxes' in userRole && userRole.editAxes) && !preview}
                  style={globalStyles.iconButton}
                />
                <IconButton
                  icon={'pencil-outline'}
                  iconColor={colors.colorButton}
                  size={18}
                  onPress={onClickEditAxis}
                  disabled={!('editAxes' in userRole && userRole.editAxes) && !preview}
                  style={globalStyles.iconButton}
                />
                <IconButton
                  icon="delete-outline"
                  iconColor={colors.colorButton}
                  size={18}
                  onPress={onClickRemoveAxis}
                  disabled={
                    (('editAxes' in userRole && userRole.editAxes) || preview) ? (axes.length > 3 ? false : true) : true
                  }
                  style={globalStyles.iconButton}
                />
              </View>
              <SelectDropdown
                data={axes}
                onSelect={onSelectAxis}
                dropdownStyle={{...styles.dropdown, backgroundColor: colors.card}}
                rowTextStyle={fonts.values}
                buttonStyle={globalStyles.buttonStyle(colors, fonts)}
                buttonTextStyle={fonts.values}
                selectedRowStyle={{backgroundColor: colors.card}}
                selectedRowTextStyle={{...fonts.values, color: colors.colorButton}}
                renderDropdownIcon={
                  openAxis
                    ? () => (
                        <Icon name="chevron-down" size={18} color={colors.colorButton} />
                      )
                    : () => <Icon name="chevron-up" size={18} color={colors.colorButton} />
                }
                dropdownIconPosition="right"
                onFocus={e => setOpenAxis(false)}
                onBlur={e => setOpenAxis(true)}
                defaultButtonText="Select axis"
                defaultValueByIndex={axisStatus.axisIndex}
                // search={true}
              />
            </View>
            {axisStatus.editAxis && (
              <View style={globalStyles.addView}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={globalStyles.opacityStyle(colors)}
                  onPress={onClickChangeAxis}
                  // disabled={newAxisValid ? false : true}
                >
                  <Text style={styles.textBtnStyle}>{i18nValues.t("setting_labels.change")}</Text>
                </TouchableOpacity>
                <TextInput
                  style={globalStyles.textBoxNewLine(colors, fonts)}
                  underlineColorAndroid="transparent"
                  onChangeText={onChangeAxis}
                  editable
                  placeholder={i18nValues.t("placeholders.input_x_value")}
                  placeholderTextColor={'grey'}
                  value={changeAxis}
                  // showSoftInputOnFocus={false}
                />
              </View>
            )}
            {axisStatus.addAxis && (
              <View style={globalStyles.addView}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={globalStyles.opacityStyle(colors)}
                  onPress={onClickAddNewAxis}
                  disabled={axisStatus.newAxisValid ? false : true}>
                  <Text style={styles.textBtnStyle}>{i18nValues.t("setting_labels.add")}</Text>
                </TouchableOpacity>
                <TextInput
                  style={globalStyles.textBoxNewLine(colors, fonts)}
                  underlineColorAndroid="transparent"
                  onChangeText={onChangeNewAxis}
                  editable
                  placeholder={i18nValues.t("placeholders.new_x_value")}
                  placeholderTextColor={'grey'}
                  value={axisStatus.newAxis}
                  // showSoftInputOnFocus={false}
                />
              </View>
            )}
          </View>
          <View>
            <Text style={{
              ...styles.text(fonts),
            }}>{i18nValues.t("setting_labels.value")}</Text>
            <View>
              <TextInput
                keyboardType="numeric"
                style={styles.textBox(colors, fonts)}
                underlineColorAndroid="transparent"
                onChangeText={onChangeY}
                editable
                placeholder={i18nValues.t("placeholders.input_y_value")}
                value={axisValue.toString()}
                // showSoftInputOnFocus={false}
              />
            </View>
          </View>
        </View>
      )}
      {/* <View style={styles.buttonContainer}>
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
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  saveBtn: {
    width: 100,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  colorContainer: {
    flexDirection: 'row',
    marginRight: 10,
    marginBottom: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  RGBtext: fonts => ({
    width: '11%',
    textAlign: 'center',
    color: fonts.labels.color,
    fontFamily: fonts.labels.fontFamily,
    fontSize: fonts.values.fontSize,
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
    borderColor: color.GREY,
    borderWidth: 1,
    borderRadius: 5,
  },
  lineColor: (red, green, blue) => ({
    width: 30,
    height: 30,
    backgroundColor: '#' + string16(red) + string16(green) + string16(blue),
    alignSelf: 'center',
    borderColor: color.GREY,
    borderWidth: 1,
  }),
  text: fonts => ({
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    color: fonts.labels.color,
    fontFamily: fonts.labels.fontFamily,
    fontSize: fonts.values.fontSize,
  }),
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
});

RadarChartDataSection.propTypes = {
  meta: PropTypes.object.isRequired,
  onChangeData: PropTypes.func,
};

export default React.memo(RadarChartDataSection);
