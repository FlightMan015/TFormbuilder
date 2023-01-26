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
  textBoxNewLine: {
    height: 40,
    width: '75%',
    borderColor: color.GREY,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    fontFamily: 'PublicSans-Regular',
    fontSize: 14,
  },
  addView: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  opacityStyle: {
    borderRadius: 10,
    backgroundColor: 'green',
    width: '23%',
    height: 40,
  },
  buttonStyle: {
    borderRadius: 5,
    width: '60%',
    borderColor: color.GREY,
    borderWidth: 1,
    backgroundColor: 'white',
    height: 40,
  },
  fieldheader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  iconsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '40%',
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
