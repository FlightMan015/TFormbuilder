import React, {useState, useEffect} from 'react';
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

const PieChartDataSection = ({data, onChangeData}) => {
  const {colors, fonts} = useTheme();

  const [openLabel, setOpenLabel] = useState(true);
  const [labelStatus, setLabelStatus] = useState({
    labelIndex: 0,
    addLabel: false,
    editLabel: false,
    newLabel: '',
    newLabelValid: false,
  });
  const [labels, setLabels] = useState([]);
  const [customColor, setCustomColor] = useState({red: 0, green: 0, blue: 0});
  const [changeLabel, setChangeLabel] = useState('');
  const [isRGBcolor, setRGBcolor] = useState(false);
  const [paletteColor, setPaletteColor] = useState('#000000');

  useEffect(() => {
    const labelArray = data.map(e => e.name);
    setLabels(labelArray);
  }, [data]);

  const onSelectLabel = (item, index) => {
    setLabelStatus({
      ...labelStatus,
      labelIndex: index,
      addLabel: false,
    });
    getLineColor(index);
    setChangeLabel(labels[index]);
  };

  const getLineColor = index => {
    const colorString = data[index]?.color;
    const redString = colorString?.substring(1, 3);
    const greenString = colorString?.substring(3, 5);
    const blueString = colorString?.substring(5, 7);
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

  const onClickEditLabel = () => {
    const tempEditStatus = labelStatus.editLabel;
    setLabelStatus({
      ...labelStatus,
      editLabel: !labelStatus.editLabel,
      addLabel: false,
    });
    setChangeLabel(labels[labelStatus.labelIndex]);
    if (!tempEditStatus) {
      getLineColor(labelStatus.labelIndex);
    }
  };

  const onClickAddLabel = () => {
    setLabelStatus({
      ...labelStatus,
      editLabel: false,
      addLabel: !labelStatus.addLabel,
    });
    setCustomColor({
      ...customColor,
      red: 0,
      green: 0,
      blue: 0,
    });
  };

  const onClickRemoveLabel = () => {
    onChangeData(datatypes.deletePieChartLabel, null, labelStatus.labelIndex);
    setLabelStatus({
      ...labelStatus,
      editLabel: false,
      addLabel: false,
      labelIndex: 0,
    });
  };

  const onChangeLabel = changedLabel => {
    setChangeLabel(changedLabel);
  };

  const onClickChangeLabel = () => {
    onChangeData(
      datatypes.changePieChartLabel,
      {newLabel: changeLabel, ...customColor},
      labelStatus.labelIndex,
    );
  };

  const onChangeNewLabel = changedLabel => {
    if (!changedLabel) {
      setLabelStatus({
        ...labelStatus,
        newLabelValid: false,
        newLabel: changedLabel,
      });
    } else {
      setLabelStatus({
        ...labelStatus,
        newLabelValid: true,
        newLabel: changedLabel,
      });
    }
  };

  const onClickAddNewLabel = () => {
    onChangeData(datatypes.addPieChartLabel, {
      newLabel: labelStatus.newLabel,
      ...customColor,
    });
    setLabelStatus({
      ...labelStatus,
      addLabel: false,
      newLabel: '',
    });
  };

  const onChangeY = changedY => {
    if (changedY) {
      onChangeData(
        datatypes.changePieChartValue,
        parseInt(changedY, 10),
        labelStatus.labelIndex,
      );
    } else {
      onChangeData(datatypes.changePieChartValue, 0, labelStatus.labelIndex);
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
      red: parseInt(selectedColor.substring(1, 3), 16),
      green: parseInt(selectedColor.substring(3, 5), 16),
      blue: parseInt(selectedColor.substring(5, 7), 16),
    });
  };

  return (
    <View style={{...styles.sectionContainer, borderColor: colors.border}}>
      <View>
        <Text style={{...styles.text, color: fonts.labels.color}}>Label</Text>
        {/* {labels.length > 0 && ( */}
          <View style={globalStyles.fieldheader}>
            <SelectDropdown
              data={labels}
              onSelect={onSelectLabel}
              dropdownStyle={{...styles.dropdown, backgroundColor: colors.inputTextBackground}}
              rowTextStyle={{fontSize: 14, color: colors.text, fontFamily: 'PublicSans-Regular'}}
              buttonStyle={styles.buttonStyle(colors, fonts)}
              buttonTextStyle={fonts.values}
              selectedRowStyle={{backgroundColor: colors.inputTextBackground}}
              selectedRowTextStyle={{color: colors.text, fontFamily: 'PublicSans-Regular'}}
              renderDropdownIcon={
                openLabel
                  ? () => (
                      <Icon name="chevron-down" size={18} color={fonts.values.color} />
                    )
                  : () => (
                      <Icon name="chevron-up" size={18} color={fonts.values.color} />
                    )
              }
              dropdownIconPosition="right"
              onFocus={e => setOpenLabel(false)}
              onBlur={e => setOpenLabel(true)}
              defaultButtonText="Select part"
              defaultValueByIndex={labelStatus.labelIndex}
              // search={true}
            />
            <View style={globalStyles.iconsContainer}>
              <IconButton
                icon={'playlist-plus'}
                iconColor={fonts.values.color}
                size={18}
                onPress={onClickAddLabel}
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
                disabled={data.length > 1 ? false : true}
                style={globalStyles.iconButton}
              />
            </View>
          </View>
        {/* )} */}
        {labelStatus.editLabel && (
          <View>
            <View style={globalStyles.addView}>
              <TextInput
                style={globalStyles.textBoxNewLine(colors, fonts)}
                underlineColorAndroid="transparent"
                onChangeText={onChangeLabel}
                editable
                placeholder="Please input axis name"
                value={changeLabel}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                style={globalStyles.opacityStyle}
                onPress={onClickChangeLabel}
                // disabled={newLabelValid ? false : true}
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
                <Text style={styles.RGBtext}>R</Text>
                <TextInput
                  keyboardType="numeric"
                  style={{
                    ...styles.RGBvalue,
                    backgroundColor: colors.inputTextBackground,
                    borderColor: colors.inputTextBorder,
                  }}
                  value={customColor.red.toString()}
                  onChangeText={onChangeRed}
                />
                <Text style={styles.RGBtext}>G</Text>
                <TextInput
                  keyboardType="numeric"
                  style={{
                    ...styles.RGBvalue,
                    backgroundColor: colors.inputTextBackground,
                    borderColor: colors.inputTextBorder,
                  }}
                  value={customColor.green.toString()}
                  onChangeText={onChangeGreen}
                />
                <Text style={styles.RGBtext}>B</Text>
                <TextInput
                  keyboardType="numeric"
                  style={{
                    ...styles.RGBvalue,
                    backgroundColor: colors.inputTextBackground,
                    borderColor: colors.inputTextBorder,
                  }}
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
        {labelStatus.addLabel && (
          <View>
            <View style={globalStyles.addView}>
              <TextInput
                style={globalStyles.textBoxNewLine(colors, fonts)}
                underlineColorAndroid="transparent"
                onChangeText={onChangeNewLabel}
                editable
                placeholder="new Axis name"
                value={labelStatus.newLabel}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                style={globalStyles.opacityStyle}
                onPress={onClickAddNewLabel}
                disabled={labelStatus.newLabelValid ? false : true}>
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
                <Text style={styles.RGBtext}>R</Text>
                <TextInput
                  keyboardType="numeric"
                  style={{
                    ...styles.RGBvalue,
                    backgroundColor: colors.inputTextBackground,
                    borderColor: colors.inputTextBorder,
                  }}
                  value={customColor.red.toString()}
                  onChangeText={onChangeRed}
                />
                <Text style={styles.RGBtext}>G</Text>
                <TextInput
                  keyboardType="numeric"
                  style={{
                    ...styles.RGBvalue,
                    backgroundColor: colors.inputTextBackground,
                    borderColor: colors.inputTextBorder,
                  }}
                  value={customColor.green.toString()}
                  onChangeText={onChangeGreen}
                />
                <Text style={styles.RGBtext}>B</Text>
                <TextInput
                  keyboardType="numeric"
                  style={{
                    ...styles.RGBvalue,
                    backgroundColor: colors.inputTextBackground,
                    borderColor: colors.inputTextBorder,
                  }}
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
        <Text style={{...styles.text, color: fonts.labels.color}}>Value</Text>
        <View>
          <TextInput
            keyboardType="numeric"
            style={styles.textBox(colors, fonts)}
            underlineColorAndroid="transparent"
            onChangeText={onChangeY}
            editable
            placeholder="Please input value"
            value={
              data[labelStatus.labelIndex]?.population
                ? data[labelStatus.labelIndex].population.toString()
                : ''
            }
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  sectionContainer: {
    borderRadius: 10,
    borderWidth: 1,
    paddingBottom: 10,
  },
  colorContainer: {
    flexDirection: 'row',
    marginRight: 10,
    marginBottom: 10,
    justifyContent: 'space-around',
  },
  RGBtext: {
    width: '11%',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  RGBvalue: {
    width: '20%',
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: color.GREY,
    fontFamily: 'PublicSans-Regular',
  },
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
  text: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  dropdown: {
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
  },
  container: {
    paddingLeft: 10,
    borderRadius: 5,
    borderColor: color.GREY,
    borderWidth: 1,
    marginHorizontal: 10,
    marginVertical: 3,
    paddingVertical: 5,
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

export default React.memo(PieChartDataSection);
