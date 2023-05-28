import React from 'react';
import {StyleSheet, ScrollView, Text} from 'react-native';
import {Dialog, useTheme} from 'react-native-paper';
import JSONTree from 'react-native-json-tree';
import TextButton from '../common/TextButton';
import formStore from '../store/formStore';
import MemoField from '../components/form_render/fields';
import MemoGroup from '../components/form_render/groups';
import {componentName} from '../constant';

const DialogFieldDlg = () => {
  const {colors, fonts} = useTheme();
	const visibleDialogFieldDlg = formStore(state => state.visibleDialogFieldDlg);
	const setVisibleDialogFieldDlg = formStore(state => state.setVisibleDialogFieldDlg);
	const formData = formStore(state => state.formData);
  const i18nValues = formStore(state => state.i18nValues);

  const hideDialog = () => {
    setVisibleDialogFieldDlg({...visibleDialogFieldDlg, visible: false, data: []});
  };

  return (
    <Dialog
      visible={visibleDialogFieldDlg.visible}
      onDismiss={hideDialog}
      style={{...styles.dialog, backgroundColor: colors.card}}>
			<ScrollView style={styles.dlgContent}>
      {visibleDialogFieldDlg.data.map((child, childindex) => {
        if (
          child.component !== componentName.TABSECTION &&
          child.component !== componentName.GROUP &&
          child.component !== componentName.GRID &&
          child.component !== componentName.LISTSECTION
        ) {
          return (
            <MemoField
              key={childindex}
              index={[childindex]}
              element={child}
              role={visibleDialogFieldDlg.role}
            />
          );
        } else {
          return (
            <MemoGroup
              key={childindex}
              element={child}
              index={[childindex]}
              role={visibleDialogFieldDlg.role}
            />
          );
        }
      })}
			</ScrollView>
			<TextButton
				text={i18nValues.t("setting_labels.close")}
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

export default React.memo(DialogFieldDlg);