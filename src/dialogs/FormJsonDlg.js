import React from 'react';
import {StyleSheet, ScrollView, Text} from 'react-native';
import {Dialog, useTheme} from 'react-native-paper';
import JSONTree from 'react-native-json-tree';
import TextButton from '../common/TextButton';
import formStore from '../store/formStore';

const FormJsonDlg = () => {
  const {colors, fonts} = useTheme();
	const visibleJsonDlg = formStore(state => state.visibleJsonDlg);
	const setVisibleJsonDlg = formStore(state => state.setVisibleJsonDlg);
	const formData = formStore(state => state.formData);

  const hideDialog = () => {
    setVisibleJsonDlg(false);
  };

  return (
    <Dialog
      visible={visibleJsonDlg}
      onDismiss={hideDialog}
      style={{...styles.dialog, backgroundColor: colors.card}}>
    	<Text style={{...fonts.headings, marginBottom: 10}}>Form JSON</Text>
			<ScrollView style={styles.dlgContent}>
				<JSONTree data={formData} />
			</ScrollView>
			<TextButton
				text='Close'
				onPress={hideDialog}
				textStyle={styles.actionButtonText}
				style={styles.actionButton(colors)}
			/>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  dlgContent: {
    paddingBottom: 0,
    maxHeight: 350,
  },
  dlgTitle: {
    fontFamily: 'PublicSans-Bold',
    fontSize: 18,
  },
  dlgAction: {
    paddingRight: 30,
  },
  dragItem: {
    width: '100%',
    maxHeight: 300,
  },
	dialog: {
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 0,
    paddingHorizontal:  20,
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

export default React.memo(FormJsonDlg);