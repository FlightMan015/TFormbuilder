import React, { useState } from 'react';
import {TextInput, Text, StyleSheet, View, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { useTheme } from 'react-native-paper';
import ColorPicker from './ColorPicker';
import TextButton from './TextButton';
import { invertColor } from '../utils';
import formStore from '../store/formStore';

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

const borderStrings = [
  'borderTopWidth',
  'borderLeftWidth',
  'borderBottomWidth',
  'borderRightWidth',
];

const BorderSetting = ({label, borderWidth, borderRadius, borderColor, onChange}) => {
  const {colors} = useTheme();
  const i18nValues = formStore(state => state.i18nValues);
  const [open, setOpen] = useState(true);
	const [visibleColors, setVisibleColors] = useState(false);
  const [colorTab, setColorTab] = useState('styles');
  const [visibleColorPicker, setVisibleColorPicker] = useState(false);
  return (
		<View style={styles.settingView}>
			<Text style={styles.titleLabel}>{label}</Text>
			<Text style={styles.titleLabel1}>{i18nValues.t("setting_labels.border_width")}</Text>
			<TextInput
				style={styles.title}
				value={`${borderWidth.borderTopWidth},${borderWidth.borderLeftWidth},${borderWidth.borderBottomWidth},${borderWidth.borderRightWidth}`}
        keyboardType='numeric'
				onChangeText={newText => {
          const borderStrs = newText.split(',');
          var border = {};
          for (let i = 0; i < 4; i++) {
            if (borderStrs[i] && typeof parseInt(borderStrs[i], 10) === 'number') {
              border = {...border, [borderStrings[i]]: parseInt(borderStrs[i], 10)};
            } else {
              border = {...border, [borderStrings[i]]: 0};
            }
          }
          onChange('borderWidth', border);
				}}
			/>
      <Text style={styles.titleLabel1}>{i18nValues.t("setting_labels.border_radius")}</Text>
			<TextInput
				style={styles.title}
				value={borderRadius.toString() || '0'}
        keyboardType='numeric'
				onChangeText={newText => {
          if (newText) {
            onChange('borderRadius', parseInt(newText, 10));
          } else {
            onChange('borderRadius', 0);
          }
				}}
			/>
			<Text style={styles.titleLabel1}>{i18nValues.t("setting_labels.border_color")}</Text>
      <TextButton
        style={styles.background(borderColor)}
        text={i18nValues.t("setting_labels.change_color")}
        textStyle={styles.textButtonText(
          invertColor(borderColor),
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
              text={i18nValues.t("setting_labels.color_styles")}
              textStyle={styles.tabText(colorTab === 'styles')}
              onPress={() => setColorTab('styles')}
            />
            <TextButton
              style={{
                ...styles.colortab(colorTab === 'customize'),
                borderTopRightRadius: 7,
              }}
              text={i18nValues.t("setting_labels.customize")}
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
                      onChange('borderColor', colorstyle);
                    }}
                  />
                ))}
              </>
            )}
            {colorTab === 'customize' && (
              <View style={styles.buttonCustomStyle}>
                <View style={styles.customizeBackground}>
                  <View
                    style={styles.colorView(borderColor)}
                  />
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                    <TextInput
                      style={styles.colorValue}
                      value={borderColor}
                      onFocus={() => setVisibleColorPicker(true)}
                    />
                  </TouchableWithoutFeedback>
                </View>
                {
                  visibleColorPicker && (
                    <ColorPicker
                      onColorSelected={e => {
												onChange('borderColor', e);
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
    color: '#FFFFFF',
  },
  selectedRowStyle: {
    backgroundColor: '#555F6E',
  },
  selectedRowTextStyle: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  dropdown: {
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    maxHeight: 150,
    backgroundColor: '#404651',
  },
  buttonStyle: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    backgroundColor: '#555F6E',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#303339',
  },
  rowStyle: {
    height: 40
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

BorderSetting.propTypes = {
};

export default React.memo(BorderSetting);
