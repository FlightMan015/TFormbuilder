import React, {useState, useEffect} from 'react';
import {StyleSheet, TextInput, Text, Alert} from 'react-native';
import {Button, Dialog, useTheme} from 'react-native-paper';
import {color, globalStyles} from '../theme/styles';
import formStore from '../store/formStore';
import useDrawingStore from '../store/bitmapStore';

const BitmapEditLinkDlg = () => {
  const updateFormData = formStore(state => state.updateFormData);
  const visibleDlg = useDrawingStore(state => state.visibleDlg);
  const setVisibleDlg = useDrawingStore(state => state.setVisibleDlg);

  const {colors} = useTheme();
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
      style={{borderRadius: 10, backgroundColor: colors.card}}>
      <Dialog.Title
        style={{
          color: colors.text,
          fontFamily: 'PublicSans-Bold',
          fontSize: 18
          }}>Update Marker</Dialog.Title>
      <Dialog.Content style={{paddingBottom: 0}}>
        <Text style={globalStyles.label}>{'Name'}</Text>
        <TextInput
          style={{
            ...styles.textInput,
            color: colors.text,
            borderColor: colors.border,
            backgroundColor: colors.inputTextBackground,
          }}
          underlineColorAndroid="transparent"
          onChangeText={e =>
            setLinkData({
              ...linkData,
              name: e,
            })
          }
          editable
          placeholder={'Marker name'}
          placeholderTextColor={colors.placeholder}
          value={linkData.name}
        />
        <Text style={globalStyles.label}>{'Link'}</Text>
        <TextInput
          style={{
            ...styles.textInput,
            color: colors.text,
            borderColor: colors.border,
            backgroundColor: colors.inputTextBackground,
          }}
          underlineColorAndroid="transparent"
          onChangeText={e => setLinkData({...linkData, link: e})}
          editable
          placeholder={'Hyperlink url'}
          placeholderTextColor={colors.placeholder}
          value={linkData.link}
        />
      </Dialog.Content>
      <Dialog.Actions>
        <Button
          color={colors.colorButton}
          onPress={() => {
            if (!linkData.name) {
              Alert.alert('Warning', 'Please type the name.');
            } else if (!linkData.link) {
              Alert.alert('Warning', 'Please type the link.');
            } else {
              const tempElement = JSON.parse(
                JSON.stringify(visibleDlg.bitmapElement),
              );
              const tempSVG = JSON.parse(
                JSON.stringify(
                  tempElement.meta.svgs[visibleDlg.bitmapLinkIndex],
                ),
              );
              tempElement.meta.svgs.splice(visibleDlg.bitmapLinkIndex, 1, {
                ...tempSVG,
                ...linkData,
              });
              updateFormData(visibleDlg.bitmapIndex, tempElement);
              if (visibleDlg.bitmapElement.event.onUpdateMarker) {
                Alert.alert('Rule Action', `Fired onUpdateMarker action. rule - ${visibleDlg.bitmapElement.event.onUpdateMarker}. newSeries - ${JSON.stringify(tempElement.meta)}`);
              }
              cancel();
            }
          }}>
          Update
        </Button>
        <Button
          color={colors.colorButton}
          onPress={cancel}>Cancel</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  label: {
    color: color.GREY,
  },
  textInput: {
    height: 35,
    borderColor: color.GREY,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 5,
    paddingLeft: 10,
    fontSize: 14,
    fontFamily: 'PublicSans-Regular',
    paddingVertical: 0,
  },
});

export default BitmapEditLinkDlg;
