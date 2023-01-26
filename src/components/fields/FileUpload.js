import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Alert, TouchableOpacity} from 'react-native';
import {IconButton, useTheme} from 'react-native-paper';
import DocumentPicker, {
  DocumentPickerResponse,
  isInprogress,
  types,
} from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/Ionicons';

const FileUpload = props => {
  const {element, contents} = props;
  const {colors} = useTheme();
  const editRole = true;
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (result && result[0] && result[0].name) {
      // onChangeInputValue(result[0].name);
      if (element.event.onSelectFile) {
        Alert.alert('Rule Action', `Fired onSelectFile action. rule - ${element.event.onSelectFile}. selectedFile - ${result[0].name}`);
      }
    }
  }, [result]);

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
    <View style={styles.container}>
      <Text style={styles.carouselTitle(colors)}>{element.meta.title || 'File Upload'}</Text>
      <TouchableOpacity
        style={styles.browerBtn(colors)}
        onPress={() => {
            DocumentPicker.pick({
              presentationStyle: 'fullScreen',
              type: types.allFiles,
              allowMultiSelection: element.meta.multi_select,
            })
              .then(setResult)
              .catch(handleError);
        }}>
        <Icon name="cloud-upload-outline" size={35} color={colors.text} />
        <Text style={styles.browerBtnText(colors)}>Browse Files</Text>
      </TouchableOpacity>
      {!element.meta.multi_select && (
        <View style={styles.mainView}>
          <Text style={styles.text(editRole, colors)}>
            {result && result[0] !== undefined && result[0].name !== undefined
              ? result[0].name
              : 'Select File'}
          </Text>
          <IconButton
            icon="delete-outline"
            iconColor={colors.colorButton}
            onPress={() => {
              
            }}
            style={{
              ...styles.icon,
              backgroundColor: colors.borderIconButtonBackground,
              borderColor: colors.colorIconButtonBorder,
            }}
          />
        </View>        
      )}
      {element.meta.multi_select && (
        <>
          <View style={styles.multifile}>
            {result &&
              result.map((e, i) => {
                return (
                  <View style={styles.selectedFile}>
                    <Text
                      key={i}
                      style={{...styles.multiText, color: '#000000'}}>
                      {e.name}
                    </Text>
                    <IconButton
                      icon="close"
                      size={15}
                      color={'#000000'}
                      style={styles.closeBtn}
                      onPress={() => {
                        const tempResult = JSON.parse(JSON.stringify(result));
                        tempResult.splice(i, 1);
                        setResult([...tempResult]);
                      }}
                    />
                  </View>
                );
              })}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  carouselTitle: colors => ({
    fontSize: 16,
    padding: 5,
    color: colors.text,
  }),
  browerBtn: colors => ({
    height: 100,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: colors.text,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  }),
  browerBtnText: colors => ({
    color: colors.text,
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
  multifile: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'grey',
    padding: 3,
    minHeight: 40,
    marginBottom: 5,
    width: '100%',
  },
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  icon: {
    margin: 0,
    width: '13%',
    borderWidth: 1,
    borderRadius: 10,
  },
  text: (editRole, colors) => ({
    height: 35,
    textAlign: 'center',
    width: editRole ? '85%' : '100%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.border,
    textAlignVertical: 'center',
    backgroundColor: colors.inputTextBackground,
    color: colors.text,
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
