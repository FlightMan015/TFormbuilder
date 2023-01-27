import React, {useState, useRef} from 'react';
import {StyleSheet, TextInput, Text, Alert, View} from 'react-native';
import {Button, Dialog, useTheme, Provider, Portal} from 'react-native-paper';
import useDrawingStore from '../store/bitmapStore';
import {color} from '../theme/styles';
import DrawingPanel from '../components/fields/bitmap/DrawingPanel';
import formStore from '../store/formStore';
import utils from '../components/fields/bitmap/utils';
import history from '../components/fields/bitmap/history';

const BitmapDrawingDlg = () => {
  const {colors} = useTheme();
  const updateFormData = formStore(state => state.updateFormData);
  const visible = useDrawingStore(state => state.visibleBitmapDrawingDlg);
  const setVisible = useDrawingStore(state => state.setVisibleBitmapDrawingDlg);
  const [newMarker, setNewMarker] = useState({name: '', link: ''});
  const svgPosition = useRef();

  const getSvgPosition = position => {
    svgPosition.current = position;
  };

  const init = () => {
    useDrawingStore.getState().setCompletedPaths([]);
    setVisible(false);
    setNewMarker({name: '', link: ''});
    history.clear();
  };

  return (
    <Dialog visible={visible} onDismiss={init} style={{...styles.dialog, backgroundColor: colors.card}}>
      <Dialog.Title style={{color: colors.text}}>New Marker</Dialog.Title>
      <Dialog.Content style={styles.content}>
        <Text style={styles.label}>{'Name'}</Text>
        <TextInput
          style={{
            ...styles.textInput,
            backgroundColor: colors.inputTextBackground,
            borderColor: colors.border,
          }}
          underlineColorAndroid="transparent"
          editable
          placeholder={'Marker name'}
          value={newMarker.name}
          onChangeText={e => setNewMarker({...newMarker, name: e})}
        />
        <Text style={styles.label}>{'Link'}</Text>
        <TextInput
          style={{
            ...styles.textInput,
            backgroundColor: colors.inputTextBackground,
            borderColor: colors.border,
          }}
          underlineColorAndroid="transparent"
          editable
          placeholder={'Hyperlink url'}
          placeholderTextColor={colors.placeholder}
          value={newMarker.link}
          onChangeText={e => setNewMarker({...newMarker, link: e})}
        />
        <DrawingPanel svgPosition={getSvgPosition} />
      </Dialog.Content>
      <Dialog.Actions>
        <Button
          color={colors.colorButton}
          onPress={() => {
            const imageData = useDrawingStore.getState().bitmapImageData;
            const completedPaths = useDrawingStore.getState().completedPaths;
            if (completedPaths.length === 0) {
              Alert.alert('Warning', 'Please draw a marker.');
            } else if (!newMarker.name) {
              Alert.alert('Warning', 'Please type name.');
            } else if (!newMarker.link) {
              Alert.alert('Warning', 'Please type link url.');
            } else {
              const element = {...imageData.element};
              const paths = [...completedPaths];
              const metaData = {
                ...element.meta,
                // paths: [...element.meta.paths, ...completedPaths],
                paths: [
                  ...element.meta.paths,
                  utils.makeImageSvgFromPaths(paths, {
                    minPosition: {x: 0, y: 0},
                    maxPosition: {x: imageData.width, y: imageData.height},
                  }),
                ],
                svgs: [
                  ...element.meta.svgs,
                  {
                    ...newMarker,
                    svg: utils.makeSvgFromPaths(paths, svgPosition.current),
                  },
                ],
              };
              const fieldIndex = imageData.index;
              updateFormData(fieldIndex, {
                ...element,
                meta: metaData,
              });
              if (element.event.onCreateNewMarker) {
                Alert.alert('Rule Action', `Fired onCreateNewMarker action. rule - ${element.event.onCreateNewMarker}. newSeries - ${JSON.stringify(metaData)}`);
              }
              init();
            }
          }}>
          Save
        </Button>
        <Button
          color={colors.colorButton}
          onPress={init}>Cancel</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  dialog: {
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 0,
    marginTop: 0,
  },
  content: {
    paddingHorizontal: 0,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: color.GREY,
    height: 35,
    marginBottom: 5,
    marginHorizontal: 25,
    paddingVertical: 0,
  },
  label: {
    color: color.GREY,
    marginLeft: 25,
  },
});

export default BitmapDrawingDlg;
