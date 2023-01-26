import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Image, Alert, Text} from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import DocumentPicker, {
  DocumentPickerResponse,
  isInprogress,
  types,
} from 'react-native-document-picker';

const ImageField = ({element, contents, editRole, index, onClickUpdateField, value, onChangeValue}) => {
  const {colors} = useTheme();
  const [imageUri, setImageUri] = useState(value || '');
  useEffect(() => {
    setImageUri(value);
  }, [value]);

  return (
    <View style={styles.container}>
      <Text style={styles.carouselTitle(colors)}>{element.meta.title || 'Image'}</Text>
      <View>
        <Image
          style={{...styles.image, backgroundColor: 'grey'}}
          source={{uri: imageUri ? imageUri : null}}
        />
        {<IconButton
          icon="pencil"
          size={18}
          iconColor={colors.icon}
          style={{...styles.selectIcon, borderColor: colors.icon}}
          onPress={() =>{
            DocumentPicker.pick({
              type: types.images,
            })
              .then(result => {
                const tempElement = JSON.parse(JSON.stringify(element));
                if (
                  tempElement.meta.imageName !== result[0].name ||
                  tempElement.meta.uri !== result[0].uri
                ) {
                  const tempMetaData = {
                    ...tempElement.meta,
                    imageName: result[0].name,
                    uri: result[0].uri,
                  };

                  setImageUri(result[0].uri);

                  if (onChangeValue) {
                    onChangeValue({[element.field_name]: result[0].uri});
                  }

                  // onClickUpdateField(index, {
                  //   ...tempElement,
                  //   meta: tempMetaData,
                  // });
                  if (element.event.onSelectImage) {
                    Alert.alert('Rule Action', `Fired onSelectImage action. rule - ${element.event.onSelectImage}. new image - ${JSON.stringify(tempMetaData)}`);
                  }
                }
              })
              .catch({});
          }}
        />}
      </View>
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
  selectIcon: {
    backgroundColor: 'white',
    margin: 3,
    borderWidth: 1,
    position: 'absolute',
    right: 20,
    top: 10,
  },
});

ImageField.propTypes = {
  element: PropTypes.object.isRequired,
};

export default React.memo(ImageField);
