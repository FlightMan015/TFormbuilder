import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useTheme } from 'react-native-paper';
import TextButton from './TextButton';
import { ColorPicker } from 'react-native-color-picker';
import { invertColor } from '../utils';

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

const CustomColorPicker = ({color, label, selectColor}) => {
  const {colors} = useTheme();
  const [visibleColors, setVisibleColors] = useState(false);
  const [colorTab, setColorTab] = useState('styles');
  const [visibleColorPicker, setVisibleColorPicker] = useState(false);
  return (
    <View style={styles.settingView}>
      <Text style={styles.titleLabel}>{label}</Text>
      <TextButton
        style={styles.background(color)}
        text="CHANGE COLOR"
        textStyle={styles.textButtonText(
          invertColor(color),
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
                      selectColor(colorstyle);
                    }}
                  />
                ))}
              </>
            )}
            {colorTab === 'customize' && (
              <View style={styles.buttonCustomStyle}>
                <View style={styles.customizeBackground}>
                  <View
                    style={styles.colorView(color)}
                  />
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                    <TextInput
                      style={styles.colorValue}
                      value={color}
                      onFocus={() => setVisibleColorPicker(true)}
                    />
                  </TouchableWithoutFeedback>
                </View>
                {
                  visibleColorPicker && (
                    <ColorPicker
                      onColorSelected={e => {
                        selectColor(e);
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

CustomColorPicker.propTypes = {
};

export default React.memo(CustomColorPicker);
