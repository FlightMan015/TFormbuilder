

import React, {useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import useDrawingStore from '../../../store/bitmapStore';
import history from './history';
import utils from './utils';
import CustomButton from '../../../common/CustomButton';
import {Skia, ImageSVG, Canvas} from '@shopify/react-native-skia';
import {color} from '../../../theme/styles';

const BitmapHeader = ({onSave}) => {
  /**
   * Reset the canvas & draw state
   */

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
        style={styles.button1}
        textStyle={{color: color.WHITE}}
        text="Undo"
      />

      <CustomButton
        onPress={redo}
        style={styles.button2}
        textStyle={{color: color.WHITE}}
        text="Redo"
      />
      <CustomButton
        onPress={reset}
        style={styles.button1}
        textStyle={{color: color.WHITE}}
        text="Reset"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button1: {
    width: 65,
    height: 30,
    borderRadius: 7,
    marginRight: 10,
    backgroundColor: color.PRIMARY,
  },
  button2: {
    width: 65,
    height: 30,
    borderRadius: 7,
    backgroundColor: color.PRIMARY,
  },
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
