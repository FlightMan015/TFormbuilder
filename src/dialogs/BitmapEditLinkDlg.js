import React, {useState, useEffect} from 'react';
import {StyleSheet, TextInput, Text, Alert, Button, View} from 'react-native';
import {Dialog, useTheme} from 'react-native-paper';
import {color, globalStyles} from '../theme/styles';
import formStore from '../store/formStore';
import useDrawingStore from '../store/bitmapStore';
import TextButton from '../common/TextButton';

const BitmapEditLinkDlg = () => {
  const visibleDlg = useDrawingStore(state => state.visibleDlg);
  const setVisibleDlg = useDrawingStore(state => state.setVisibleDlg);
  const formValue = formStore(state => state.formValue);
  const setFormValue = formStore(state => state.setFormValue);
  const i18nValues = formStore(state => state.i18nValues);

  const {colors, fonts} = useTheme();
  const [linkData, setLinkData] = useState({name: '', link: ''});

  useEffect(() => {
    if (visibleDlg.bitmapLinkData !== undefined && visibleDlg.bitmapLinkData) {
      setLinkData({...linkData, ...visibleDlg.bitmapLinkData});
    }
  }, [visibleDlg]);

  const cancel = () => {
    setVisibleDlg({
      ...visibleDlg,
      editBitmapLink: false,
    });
  };

  return (
    <Dialog
      visible={
        'editBitmapLink' in visibleDlg && visibleDlg.editBitmapLink
      }
      onDismiss={cancel}
      style={{borderRadius: 10, backgroundColor: colors.card, paddingHorizontal: 15}}>
      <Text style={{...fonts.headings, marginBottom: 10}}>{i18nValues.t("setting_labels.update_marker")}</Text>
      <Text style={fonts.labels}>{i18nValues.t("setting_labels.name")}</Text>
      <TextInput
        style={styles.textInput(colors, fonts)}
        onChangeText={e =>
          setLinkData({
            ...linkData,
            name: e,
          })
        }
        editable
        placeholder={i18nValues.t("placeholders.marker_name")}
        placeholderTextColor={colors.placeholder}
        value={linkData.name}
      />
      <Text style={fonts.labels}>{i18nValues.t("setting_labels.link")}</Text>
      <TextInput
        style={styles.textInput(colors, fonts)}
        onChangeText={e => setLinkData({...linkData, link: e})}
        editable
        placeholder={i18nValues.t("placeholders.hyper_link_url")}
        placeholderTextColor={colors.placeholder}
        value={linkData.link}
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10}}>
        <TextButton
          text={i18nValues.t("setting_labels.save")}
          onPress={() => {
            if (!linkData.name) {
              Alert.alert(i18nValues.t("warnings.warning"), i18nValues.t("warnings.type_name"));
            } else if (!linkData.link) {
              Alert.alert(i18nValues.t("warnings.warning"), i18nValues.t("warnings.type_link_uri"));
            } else {
              const tempElement = {...visibleDlg.bitmapElement};
              const tempSVG = JSON.parse(
                JSON.stringify(
                  formValue[tempElement.field_name].svgs[visibleDlg.bitmapLinkIndex],
                ),
              );
              const tempValue = {...formValue[tempElement.field_name]};
              tempValue.svgs.splice(visibleDlg.bitmapLinkIndex, 1, {
                ...tempSVG,
                ...linkData,
              });
              setFormValue({...formValue, [tempElement.field_name]: tempValue});
              if (visibleDlg.bitmapElement.event.onUpdateMarker) {
                Alert.alert('Rule Action', `Fired onUpdateMarker action. rule - ${visibleDlg.bitmapElement.event.onUpdateMarker}. newSeries - ${JSON.stringify(tempValue)}`);
              }
              cancel();
          }}}
          textStyle={styles.actionButtonText}
          style={styles.actionButton(colors)}
        />
        <TextButton
          text={i18nValues.t("setting_labels.cancel")}
          onPress={cancel}
          textStyle={styles.actionButtonText}
          style={styles.actionButton(colors)}
        />
      </View>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  label: {
    color: color.GREY,
  },
  textInput: (colors, fonts) => ({
    height: 40,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 5,
    paddingLeft: 10,
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

export default BitmapEditLinkDlg;
