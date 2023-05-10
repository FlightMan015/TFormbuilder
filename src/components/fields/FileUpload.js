import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Alert, TouchableOpacity} from 'react-native';
import {IconButton, useTheme} from 'react-native-paper';
import DocumentPicker, {
  isInprogress,
  types,
} from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import FieldLabel from '../../common/FieldLabel';
import formStore from '../../store/formStore';

const FileUpload = props => {
  const {element} = props;
  const {colors, fonts} = useTheme();
  const userRole = formStore(state => state.userRole);
  const formValue = formStore(state => state.formValue);
  const setFormValue = formStore(state => state.setFormValue);
  const preview = formStore(state => state.preview);
  const i18nValues = formStore(state => state.i18nValues);
  const role = element.role.find(e => e.name === userRole);
  const [result, setResult] = useState((element.field_name in formValue  && formValue[element.field_name]) ? formValue[element.field_name] : null);

  useEffect(() => {
    setResult(formValue[element.field_name])
    if (result && result[0] && result[0].name && element.event.onSelectFile) {
      Alert.alert('Rule Action', `Fired onSelectFile action. rule - ${element.event.onSelectFile}. selectedFile - ${result[0].name}`);
    }
  }, [JSON.stringify(formValue[element.field_name])]);

  const handleError = err => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled');
    } else if (isInprogress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };

  return (
    <View style={styles.container(element)}>
      {
        role.view && (
          <>
            <FieldLabel label={element.meta.title || i18nValues.t("field_labels.file_upload")} visible={!element.meta.hide_title} />
            <TouchableOpacity
              style={styles.browerBtn(fonts, colors)}
              disabled={!preview && !role.edit}
              onPress={() => {
                  DocumentPicker.pick({
                    presentationStyle: 'fullScreen',
                    type: types.allFiles,
                    allowMultiSelection: element.meta.multi_select,
                  })
                    .then(e => {
                      setFormValue({...formValue, [element.field_name]: e})
                    })
                    .catch(handleError);
              }}>
              <Icon name="cloud-upload-outline" size={35} color={fonts.values.color} />
              <Text style={styles.browerBtnText(fonts)}>Browse Files</Text>
            </TouchableOpacity>
            {!element.meta.multi_select && result && (
              <View style={styles.mainView(colors)}>
                <Text style={styles.text(fonts)}>
                  {result && result[0] !== undefined && result[0].name !== undefined
                    ? result[0].name
                    : 'Selected File'}
                </Text>
                <IconButton
                  icon="close"
                  iconColor={colors.colorButton}
                  disabled={!role.edit && !preview}
                  onPress={() => {
                    const tempFormValue = {...formValue};
                    delete tempFormValue[element.field_name];
                    setFormValue(tempFormValue);
                  }}
                  style={{
                    ...styles.icon,
                  }}
                />
              </View>        
            )}
            {element.meta.multi_select && result && (
              <>
                <View style={styles.multifile(colors)}>
                  {result &&
                    result.map((e, i) => {
                      return (
                        <View key={i} style={{...styles.selectedFile, backgroundColor: colors.colorButton}}>
                          <Text
                            key={i}
                            style={{...styles.multiText, color: '#FFFFFF'}}>
                            {e.name}
                          </Text>
                          <IconButton
                            icon="close"
                            size={15}
                            iconColor={'#FFFFFF'}
                            style={styles.closeBtn}
                            disabled={!(role.edit || preview)}
                            onPress={() => {
                              const tempValue = [...formValue[element.field_name]];
                              if (tempValue.length > 1) {
                                tempValue.splice(i, 1);
                                setFormValue({...formValue, [element.field_name]: tempValue});
                              } else {
                                const tempFormValue = {...formValue};
                                delete tempFormValue[element.field_name];
                                setFormValue(tempFormValue);
                              }
                              
                            }}
                          />
                        </View>
                      );
                    })}
                </View>
              </>
            )}
          </>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: element => ({
    ...element.meta.padding
  }),
  carouselTitle: colors => ({
    fontSize: 16,
    padding: 5,
    color: colors.text,
  }),
  browerBtn: (fonts, colors) => ({
    height: 100,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: fonts.values.color,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: colors.card,
  }),
  browerBtnText: fonts => ({
    ...fonts.values
  }),
  closeBtn: {
    margin: 0,
  },
  selectedFile: {
    borderRadius: 17,
    height: 35,
    backgroundColor: '#D0D3D8',
    paddingRight: 5,
    paddingLeft: 10,
    margin: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  multiText: {
    fontSize: 15,
    color: 'black',
  },
  multifile: colors => ({
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    padding: 3,
    minHeight: 40,
    marginBottom: 5,
    width: '100%',
    borderRadius: 10,
    backgroundColor: colors.card,
  }),
  mainView: colors => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: colors.card,
    borderRadius: 10,
  }),
  icon: {
    margin: 0,
  },
  text: (fonts) => ({
    textAlign: 'center',
    marginLeft: 10,
    ...fonts.values,
  }),
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  },
});

FileUpload.propTypes = {
  element: PropTypes.object.isRequired,
};

export default React.memo(FileUpload);
