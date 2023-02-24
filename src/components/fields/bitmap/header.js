

import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import useDrawingStore from '../../../store/bitmapStore';
import history from './history';
import utils from './utils';
import CustomButton from '../../../common/CustomButton';
import {color} from '../../../theme/styles';
import { useTheme } from 'react-native-paper';

const BitmapHeader = ({onSave}) => {
  /**
   * Reset the canvas & draw state
   */
  const {colors} = useTheme();

  const reset = () => {
    useDrawingStore.getState().setCompletedPaths([]);
    useDrawingStore.getState().setStroke(utils.getPaint(3, 'red'));
    useDrawingStore.getState().setColor('red');
    useDrawingStore.getState().setStrokeWidth(2);
    history.clear();
  };

  const undo = () => {
    history.undo();
  };

  const redo = () => {
    history.redo();
  };

  return (
    <View style={styles.controlView}>
      <CustomButton
        onPress={undo}
        style={styles.button1(colors)}
        textStyle={{color: color.WHITE}}
        text="Undo"
      />

      <CustomButton
        onPress={redo}
        style={styles.button2(colors)}
        textStyle={{color: color.WHITE}}
        text="Redo"
      />
      <CustomButton
        onPress={reset}
        style={styles.button1(colors)}
        textStyle={{color: color.WHITE}}
        text="Reset"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button1: colors => ({
    width: 65,
    height: 30,
    borderRadius: 7,
    marginRight: 10,
    backgroundColor: colors.colorButton,
  }),
  button2: colors => ({
    width: 65,
    height: 30,
    borderRadius: 7,
    backgroundColor: colors.colorButton,
  }),
  controlView: {
    height: 30,
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default BitmapHeader;
