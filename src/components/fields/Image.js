import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, TouchableOpacity, Alert, Dimensions, Text} from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import DocumentPicker, {
  types,
} from 'react-native-document-picker';
import FieldLabel from '../../common/FieldLabel';
import formStore from '../../store/formStore';
import ResizedImage from '../../common/ResizedImage';
import Icon from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width;

const ImageField = ({element}) => {
  const {colors, fonts} = useTheme();
  const userRole = formStore(state => state.userRole);
  const preview = formStore(state => state.preview);
  const role = element.role.find(e => e.name === userRole);
  const formValue = formStore(state => state.formValue);
  const setFormValue = formStore(state => state.setFormValue);

  return (
    <View style={styles.container}>
      {
        role.view && (
          <>
            <FieldLabel label={element.meta.title || 'Image'} visible={!element.meta.hide_title} />
            <View>
              {
                formValue[element.field_name] && (
                  <>
                    <ResizedImage
                      uri={formValue[element.field_name][0].uri}
                      maxHeight={screenWidth * 9 / 16}
                      maxWidth={screenWidth}
                    />
                    {<IconButton
                      icon="pencil"
                      size={18}
                      iconColor={fonts.values.color}
                      style={styles.selectIcon(colors, fonts)}
                      disabled={!(role.edit || preview)}
                      onPress={() =>{
                        DocumentPicker.pick({
                          type: types.images,
                        })
                          .then(result => {
                            setFormValue({...formValue, [element.field_name]: result});
                            if (element.event.onSelectImage) {
                              Alert.alert('Rule Action', `Fired onSelectImage action. rule - ${element.event.onSelectImage}. new image - ${JSON.stringify(tempMetaData)}`);
                            }
                            
                          })
                          .catch({});
                      }}
                    />}
                  </>
                )
              }
              {
                !formValue[element.field_name] && (
                  <TouchableOpacity
                    style={styles.browerBtn(fonts)}
                    disabled={!(role.edit || preview)}
                    onPress={() => {
                      DocumentPicker.pick({
                        type: types.images,
                      })
                        .then(result => {
                          setFormValue({...formValue, [element.field_name]: result});
                          if (element.event.onSelectImage) {
                            Alert.alert('Rule Action', `Fired onSelectImage action. rule - ${element.event.onSelectImage}. new image - ${JSON.stringify(tempMetaData)}`);
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
  container: {
    padding: 5,
  },
  carouselTitle: colors => ({
    fontSize: 16,
    padding: 5,
    color: colors.text,
  }),
  image: {
    width: '100%',
    height: 250,
  },
  selectIcon: (colors, fonts) => ({
    backgroundColor: colors.card,
    margin: 3,
    borderWidth: 1,
    borderColor: fonts.values.color,
    position: 'absolute',
    right: 20,
    top: 10,
  }),
  browerBtn: fonts => ({
    height: 100,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: fonts.values.color,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  }),
  browerBtnText: fonts => ({
    ...fonts.values
  }),
});

ImageField.propTypes = {
  element: PropTypes.object.isRequired,
};

export default ImageField;
