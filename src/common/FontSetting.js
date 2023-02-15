import React, { useState } from 'react';
import {TextInput, Text, StyleSheet, View, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { useTheme } from 'react-native-paper';
import ColorPicker from './ColorPicker';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Feather';
import TextButton from './TextButton';
import { invertColor } from '../utils';

const fontTypes = [
	'PublicSans-Black',
	'PublicSans-BlackItalic',
	'PublicSans-Bold',
	'PublicSans-BoldItalic',
	'PublicSans-ExtraBold',
	'PublicSans-ExtraLight',
	'PublicSans-ExtraBoldItalic',
	'PublicSans-ExtraLight',
	'PublicSans-ExtraLightItalic',
	'PublicSans-Italic-VariableFont_wght',
	'PublicSans-Italic',
	'PublicSans-Light',
	'PublicSans-LightItalic',
	'PublicSans-Medium',
	'PublicSans-MediumItalic',
	'PublicSans-SemiBold',
	'PublicSans-SemiBoldItalic',
	'PublicSans-Thin',
	'PublicSans-ThinItalic',
	'PublicSans-VariableFont_wght',
];

const colorStyles = [
  '#0A1551',
  '#DFDFFF',
  '#321860',
  '#0099FF',
  '#78BB07',
  '#FE3945',
  '#FB7041',
  '#321F16',
  '#FFFFFF',
  '#264B67',
  '#3C4C1E',
  '#972D54',
  '#11111B',
  '#02357D',
];

const FontSetting = ({label, fontType, fontSize, fontColor, onChange}) => {
  const {colors} = useTheme();
  const [open, setOpen] = useState(true);
	const [visibleColors, setVisibleColors] = useState(false);
  const [colorTab, setColorTab] = useState('styles');
  const [visibleColorPicker, setVisibleColorPicker] = useState(false);
  return (
		<View style={styles.settingView}>
			<Text style={styles.titleLabel}>{label}</Text>
			<Text style={styles.titleLabel1}>Font Type</Text>
      <SelectDropdown
        data={fontTypes}
        onSelect={e => {
					onChange('fontFamily', e);
        }}
        dropdownStyle={{...styles.dropdown, backgroundColor: colors.inputTextBackground}}
        rowStyle={styles.rowStyle}
        rowTextStyle={styles.textStyle}
        buttonStyle={{...styles.buttonStyle, backgroundColor: colors.inputTextBackground, borderColor: colors.border}}
        buttonTextStyle={{...styles.textStyle, color: colors.text}}
        selectedRowStyle={styles.selectedRowStyle}
        selectedRowTextStyle={styles.selectedRowTextStyle}
        renderDropdownIcon={
          open
            ? () => <Icon name="chevron-down" size={18} color={colors.text} />
            : () => <Icon name="chevron-up" size={18} color={colors.text} />
        }
        dropdownIconPosition="right"
        onFocus={() => setOpen(false)}
        onBlur={() => setOpen(true)}
        defaultButtonText="Select Option"
        defaultValue={fontType}
      />
			<Text style={styles.titleLabel1}>Font Size</Text>
			<TextInput
				style={styles.title}
				value={fontSize.toString() || '14'}
        keyboardType='numeric'
				onChangeText={newText => {
          if (newText) {
            onChange('fontSize', parseInt(newText, 10));
          }
				}}
			/>
			<Text style={styles.titleLabel1}>Font Color</Text>
      <TextButton
        style={styles.background(fontColor)}
        text="CHANGE COLOR"
        textStyle={styles.textButtonText(
          invertColor(fontColor),
        )}
        onPress={() => {
          setVisibleColors(!visibleColors);
        }}
      />
      {visibleColors && (
        <View style={styles.colorSetting}>
          <View style={styles.settingTab}>
            <TextButton
              style={{
                ...styles.colortab(colorTab === 'styles'),
                borderTopLeftRadius: 7,
              }}
              text="COLOR STYLES"
              textStyle={styles.tabText(colorTab === 'styles')}
              onPress={() => setColorTab('styles')}
            />
            <TextButton
              style={{
                ...styles.colortab(colorTab === 'customize'),
                borderTopRightRadius: 7,
              }}
              text="CUSTOMIZE"
              textStyle={styles.tabText(colorTab === 'customize')}
              onPress={() => setColorTab('customize')}
            />
          </View>
          <View style={styles.colorContainer}>
            {colorTab === 'styles' && (
              <>
                {colorStyles.map((colorstyle, colorindex) => (
                  <TextButton
                    key={colorindex}
                    style={styles.colorElement}
                    text={colorstyle}
                    textStyle={styles.colorElementText(colorstyle)}
                    onPress={() => {
                      onChange('color', colorstyle);
                    }}
                  />
                ))}
              </>
            )}
            {colorTab === 'customize' && (
              <View style={styles.buttonCustomStyle}>
                <View style={styles.customizeBackground}>
                  <View
                    style={styles.colorView(fontColor)}
                  />
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                    <TextInput
                      style={styles.colorValue}
                      value={fontColor}
                      onFocus={() => setVisibleColorPicker(true)}
                    />
                  </TouchableWithoutFeedback>
                </View>
                {
                  visibleColorPicker && (
                    <ColorPicker
                      onColorSelected={e => {
												onChange('color', e);
                        setVisibleColorPicker(false);
                      }}
                      style={{width: '100%', height: 200}}
                    />
                  )
                }
              </View>
            )}
          </View>
        </View>
      )}
		</View>
  );
};

const styles = StyleSheet.create({
	settingTab: {
    flexDirection: 'row',
  },
	settingView: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#4B5260',
  },
	title: {
    height: 40,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#303339',
    backgroundColor: '#555F6E',
    paddingLeft: 10,
  },
  titleLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
	titleLabel1: {
    fontSize: 14,
    color: '#fff',
    marginVertical: 5,
  },
  textStyle: {
    fontSize: 14,
    color: 'grey',
  },
  selectedRowStyle: {
    backgroundColor: 'grey',
  },
  selectedRowTextStyle: {
    color: '#000000',
  },
  dropdown: {
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    maxHeight: 150,
  },
  buttonStyle: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 1,
  },
  rowStyle: {
    height: 40,
  },
  colorElementText: color => ({
    backgroundColor: color,
    height: '100%',
    borderRadius: 5,
    color: invertColor(color),
  }),
  buttonCustomStyle: {
    flex: 1,
    paddingHorizontal: 15,
  },
  customizeBackground: {
    flex: 1,
    flexDirection: 'row-reverse',
    borderWidth: 1,
    borderColor: '#303339',
    borderRadius: 3,
    marginBottom: 5,
  },
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
  textButtonText: textColor => ({
    color: textColor,
    fontSize: 16,
  }),
  background: formBackgroundColor => ({
    width: '100%',
    padding: 7,
    backgroundColor: formBackgroundColor,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#303339',
  }),
  colorSetting: {
    marginTop: 5,
    marginHorizontal: 2,
  },
  colorContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#555F6E',
    paddingVertical: 10,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
  },
  colorElement: {
    width: '50%',
    height: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  colorValue: {
    flex: 1,
    height: 40,
    borderRightWidth: 1,
    borderRightColor: '#303339',
    color: '#FFFFFF',
    fontSize: 16,
    paddingLeft: 10,
  },
  colortab: selected => ({
    width: '50%',
    height: 45,
    backgroundColor: '#303339',
    borderBottomColor: '#0099FF',
    borderBottomWidth: selected ? 4 : 0,
  }),
  colorView: color => ({
    height: 26,
    width: 26,
    margin: 7,
    backgroundColor: color,
  }),
  tabText: selected => ({
    fontSize: 15,
    color: selected ? '#FFFFFF' : '#CBCCCD',
  }),
});

FontSetting.propTypes = {
};

export default React.memo(FontSetting);
