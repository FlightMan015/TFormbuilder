import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Dialog, useTheme, Switch} from 'react-native-paper';
import formStore from '../store/formStore';
import { useState } from 'react';
import ColorPalette from '../common/color_palette';

const ColorDlg = ({visibleDlg, setVisibleDlg, color, selectColor, title}) => {
  const {colors, fonts} = useTheme();
  const i18nValues = formStore(state => state.i18nValues);
  const [isHexColor, setIsHexColor] = useState(false);
  const [colorText, setColorText] = useState(color);

  const hideDialog = () => {
    setVisibleDlg(false);
  };

  return (
    <Dialog
      visible={visibleDlg}
      onDismiss={hideDialog}
      style={{...styles.dialog, backgroundColor: colors.card}}>
    	<View style={styles.colorLabel}>
        <Text style={{...fonts.labels}}>{title}</Text>
        <View style={styles.colorLabel}>
          <Text
            style={{...fonts.values, color: fonts.labels.color}}>
            {i18nValues.t("setting_labels.hex_color")}
          </Text>
          <Switch
            value={isHexColor}
            onValueChange={() => {
              setIsHexColor(!isHexColor)
            }}
            color={colors.colorButton}
          />
        </View>
      </View>
      {!isHexColor && (
        <ColorPalette
          onChange={color => {
            selectColor(color);
            hideDialog();
          }}
          defaultColor={colorText}
          // colors={['#C0392B', '#E74C3C', '#9B59B6', '#8E44AD', '#2980B9']}
          title={''}
          titleStyles={{height: 0}}
          paletteStyles={{marginTop: 5}}
        />
      )}
      {isHexColor && (
        <TextInput
          value={colorText}
          onChangeText={newText => {setColorText(newText);}}
          onBlur={() => {
            selectColor(colorText);
            hideDialog();
          }}
          style={styles.textInput(colors, fonts)}
        />
      )}
    </Dialog>
  );
};

const styles = StyleSheet.create({
	dialog: {
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 0,
    paddingHorizontal:  20,
    paddingBottom: 20
  },
  textInput: (colors, fonts) => ({
    borderRadius: 20,
    height: 35,
    marginBottom: 5,
    paddingVertical: 0,
    paddingLeft: 10,
    backgroundColor: colors.background,
    ...fonts.values,
  }),
  colorLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default ColorDlg;