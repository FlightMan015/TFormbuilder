import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, TouchableOpacity, Alert, Dimensions, Text} from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import DocumentPicker, {
  types,
} from 'react-native-document-picker';
import FieldLabel from '../../../common/FieldLabel';
import formStore from '../../../store/formStore';
import ResizedImage from '../../../common/ResizedImage';
import Icon from 'react-native-vector-icons/Ionicons';

const ImageField = ({element, role}) => {
  const {colors, fonts} = useTheme();
  const userRole = formStore(state => state.userRole);
  const formValue = formStore(state => state.formValue);
  const i18nValues = formStore(state => state.i18nValues);
  const setFormValue = formStore(state => state.setFormValue);

  return (
    <View style={styles.container(element)}>
      {
        role.view && (
          <>
            <FieldLabel label={element.meta.title || i18nValues.t("field_labels.image")} visible={!element.meta.hide_title} />
            <View>
              {
                formValue[element.field_name] && (
                  <>
                    <ResizedImage
                      uri={formValue[element.field_name][0].uri}
                      maxHeight={parseInt(element.meta.maxWidth, 10)}
                      maxWidth={parseInt(element.meta.maxHeight, 10) === 0 ? null : parseInt(element.meta.maxHeight, 10)}
                    />
                    <IconButton
                      icon="image-edit"
                      size={18}
                      iconColor={colors.background}
                      style={styles.selectIcon(colors, fonts)}
                      disabled={!role.edit || !(userRole.edit || userRole.submit)}
                      onPress={() =>{
                        DocumentPicker.pick({
                          type: types.images,
                        })
                          .then(result => {
                            setFormValue({...formValue, [element.field_name]: result});
                            if (element.event.onSelectImage) {
                              Alert.alert('Rule Action', `Fired onSelectImage action. rule - ${element.event.onSelectImage}. new image - ${result}`);
                            }
                          })
                          .catch({});
                      }}
                    />
                  </>
                )
              }
              {
                (!formValue[element.field_name]) && (
                  <TouchableOpacity
                    style={styles.browerBtn(fonts, colors)}
                    disabled={!role.edit || !(userRole.edit || userRole.submit)}
                    onPress={() => {
                      DocumentPicker.pick({
                        type: types.images,
                      })
                        .then(result => {
                          setFormValue({...formValue, [element.field_name]: result});
                          if (element.event.onSelectImage) {
                            Alert.alert('Rule Action', `Fired onSelectImage action. rule - ${element.event.onSelectImage}. new image - ${result}`);
                          }
                        })
                        .catch({});
                    }}>
                    <Icon name="image" size={35} color={fonts.values.color} />
                    <Text style={styles.browerBtnText(fonts)}>Browse image</Text>
                  </TouchableOpacity>
                )
              }
            </View>
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
  image: {
    width: '100%',
    height: 250,
  },
  selectIcon: (colors) => ({
    backgroundColor: colors.colorButton,
    alignSelf: 'center',
  }),
  browerBtn: (fonts, colors) => ({
    height: 100,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: fonts.values.color,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    backgroundColor: colors.card,
  }),
  browerBtnText: fonts => ({
    ...fonts.values
  }),
});

ImageField.propTypes = {
  element: PropTypes.object.isRequired,
};

export default ImageField;
