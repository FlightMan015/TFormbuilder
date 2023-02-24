import {StyleSheet} from 'react-native';

export const color = {
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GREY: '#8E8E8E',
  YELLOW: '#FFDE2F',
  BLUE: '#0000FF',
  PRIMARY: '#1A73E8',
  BtnColor: '#FFE694',
  TABCOLOR: '#2096F3',
  BtnDefault: '#36A1F4',
  GREY1: '#D8D8D8',
};

export const globalStyles = StyleSheet.create({
  textBoxNewLine: (colors, fonts) => ({
    flex: 1,
    height: 40,
    borderRadius: 10,
    paddingLeft: 10,
    marginRight: 10,
    backgroundColor: colors.card,
    ...fonts.values,
  }),
  addView: {
    flexDirection: 'row-reverse',
    marginHorizontal: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  opacityStyle: colors => ({
    borderRadius: 10,
    backgroundColor: colors.colorButton,
    width: 80,
    height: 40,
  }),
  buttonStyle: (colors, fonts) => ({
    flex: 1,
    borderRadius: 10,
    marginLeft: 10,
    backgroundColor: colors.card,
    height: 40,
    ...fonts.values,
  }),
  fieldheader: {
    flexDirection: 'row-reverse',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    margin: 0,
  },
  label: {
    color: color.GREY,
    fontFamily: 'PublicSans-Regular',
    fontSize: 14,
  },
  textInput: {
    height: 40,
    borderColor: color.GREY,
    borderWidth: 1,
    borderRadius: 3,
    marginVertical: 10,
    paddingLeft: 10,
  },
});
