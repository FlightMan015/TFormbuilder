import React, {useEffect} from 'react';
import {StyleSheet, TextInput, Text, View} from 'react-native';
import {Dialog, useTheme} from 'react-native-paper';
import { globalStyles } from '../theme/styles';
import TextButton from '../common/TextButton';
import formStore from '../store/formStore';

const FormSaveDlg = ({saveForm, renameForm}) => {
  const {colors, fonts} = useTheme();
	const formData = formStore(state => state.formData);
	const setFormData = formStore(state => state.setFormData);
  const visibleDlg = formStore(state => state.visibleDlg);
  const setVisibleDlg = formStore(state => state.setVisibleDlg);
  const i18nValues = formStore(state => state.i18nValues);

  return (
    <Dialog
      visible={visibleDlg.saveForm}
      onDismiss={() => {
        setVisibleDlg({...visibleDlg, saveForm: false});
        setFormData({...formData, name: visibleDlg.oldName});
      }}
      style={{
        ...styles.dialog,
        backgroundColor: colors.card,
        }}>
    	<Text style={{...fonts.headings, marginBottom: 10}}>{i18nValues.t("setting_labels.save_form")}</Text>
			<Text style={globalStyles.label}>{i18nValues.t("setting_labels.form_name")}</Text>
			<TextInput
				style={{
					...styles.nameInput,
					borderColor: colors.border,
					backgroundColor: colors.inputTextBackground,
				}}
				value={formData.name}
				onChangeText={name => setFormData({...formData, name})}
			/>
      <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10}}>
        <TextButton
          text={i18nValues.t("setting_labels.save")}
          onPress={() => {
            if (visibleDlg.rename) {
              renameForm({oldName: visibleDlg.oldName, newName: formData.name});
              setVisibleDlg({...visibleDlg, saveForm: false});
            } else {
              saveForm(formData);
              setVisibleDlg({...visibleDlg, saveForm: false});
            }
          }}
          textStyle={styles.actionButtonText}
          style={styles.actionButton(colors)}
        />
        <TextButton
          text={i18nValues.t("setting_labels.cancel")}
          onPress={() => {
            setVisibleDlg({...visibleDlg, saveForm: false, rename: false});
            setFormData({...formData, name: visibleDlg.oldName});
          }}
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
  nameInput: {
    borderRadius: 5,
    borderWidth: 1,
    height: 35,
    paddingVertical: 0,
    marginTop: 5,
    marginBottom: 10,
    fontFamily: 'PublicSans-Regular',
    fontSize: 14,
  },
  action: {
    paddingRight: 30,
  },
  title: {
    fontFamily: 'PublicSans-Bold',
    fontSize: 18,
  },
  content: {
    paddingBottom: 0,
  },
	actionButtonText: {
    color: '#FFFFFF',
  },
  actionButton: colors => ({
    backgroundColor: colors.colorButton,
    borderRadius: 10,
    width: 100,
    paddingVertical: 10,
		marginVertical: 10,
		alignSelf: 'center',
  }),
});

export default FormSaveDlg;
