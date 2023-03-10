import React, {useState, useRef} from 'react';
import {StyleSheet, TextInput, Text, Alert, Button, View} from 'react-native';
import {Dialog, useTheme, Provider, Portal} from 'react-native-paper';
import useDrawingStore from '../store/bitmapStore';
import {color} from '../theme/styles';
import DrawingPanel from '../components/fields/bitmap/DrawingPanel';
import formStore from '../store/formStore';
import utils from '../components/fields/bitmap/utils';
import history from '../components/fields/bitmap/history';
import TextButton from '../common/TextButton';

const BitmapDrawingDlg = () => {
  const {colors, fonts} = useTheme();
  const formValue = formStore(state => state.formValue);
  const setFormValue = formStore(state => state.setFormValue);
  const i18nValues = formStore(state => state.i18nValues);
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
      <Text style={{...fonts.headings, marginBottom: 10}}>{i18nValues.t("setting_labels.new_marker")}</Text>
      <Text style={{...fonts.values, color: fonts.labels.color, marginTop: 10, marginBottom: 5}}>{'Name'}</Text>
      <TextInput
        style={styles.textInput(colors, fonts)}
        underlineColorAndroid="transparent"
        editable
        placeholder={i18nValues.t("placeholders.marker_name")}
        placeholderTextColor={colors.placeholder}
        value={newMarker.name}
        onChangeText={e => setNewMarker({...newMarker, name: e})}
      />
      <Text style={{...fonts.values, color: fonts.labels.color}}>{'Link'}</Text>
      <TextInput
        style={styles.textInput(colors, fonts)}
        underlineColorAndroid="transparent"
        editable
        placeholder={i18nValues.t("placeholders.hyper_link_url")}
        placeholderTextColor={colors.placeholder}
        value={newMarker.link}
        onChangeText={e => setNewMarker({...newMarker, link: e})}
      />
      <DrawingPanel svgPosition={getSvgPosition} />
      <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10}}>
        <TextButton
          text={i18nValues.t("setting_labels.save")}
          onPress={() => {
            const imageData = useDrawingStore.getState().bitmapImageData;
            const completedPaths = useDrawingStore.getState().completedPaths;
            if (completedPaths.length === 0) {
              Alert.alert(i18nValues.t("warnings.warning"), i18nValues.t("warnings.draw_marker"));
            } else if (!newMarker.name) {
              Alert.alert(i18nValues.t("warnings.warning"), i18nValues.t("warnings.type_name"));
            } else if (!newMarker.link) {
              Alert.alert(i18nValues.t("warnings.warning"), i18nValues.t("warnings.type_link_uri"));
            } else {
              const paths = [...completedPaths];
              const element = {...imageData.element};
              const newValue = {
                ...formValue[element.field_name],
                paths: [
                  ...formValue[element.field_name].paths,
                  utils.makeImageSvgFromPaths(paths, {
                    minPosition: {x: 0, y: 0},
                    maxPosition: {x: imageData.width, y: imageData.height},
                  }),
                ],
                svgs: [
                  ...formValue[element.field_name].svgs,
                  {
                    ...newMarker,
                    svg: utils.makeSvgFromPaths(paths, svgPosition.current),
                  },
                ],
              };
              setFormValue({...formValue, [element.field_name]: newValue});
              if (element.event.onCreateNewMarker) {
                Alert.alert('Rule Action', `Fired onCreateNewMarker action. rule - ${element.event.onCreateNewMarker}. newSeries - ${JSON.stringify(newValue)}`);
              }
              init();
            }}}
          textStyle={styles.actionButtonText}
          style={styles.actionButton(colors)}
        />
        <TextButton
          text={i18nValues.t("setting_labels.cancel")}
          onPress={init}
          textStyle={styles.actionButtonText}
          style={styles.actionButton(colors)}
        />
      </View>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  dialog: {
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 0,
    paddingHorizontal:  20,
  },
  content: {
    paddingHorizontal: 0,
  },
  textInput: (colors, fonts) => ({
    borderRadius: 10,
    height: 40,
    marginBottom: 5,
    paddingVertical: 0,
    backgroundColor: colors.background,
    ...fonts.values,
  }),
  actionButtonText: {
    color: '#FFFFFF',
  },
  actionButton: colors => ({
    backgroundColor: colors.colorButton,
    borderRadius: 10,
    width: 100,
    paddingVertical: 10
  }),
});

export default BitmapDrawingDlg;
