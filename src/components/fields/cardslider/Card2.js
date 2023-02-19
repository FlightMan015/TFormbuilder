import React, {useCallback} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Linking,
  Alert,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useTheme, IconButton} from 'react-native-paper';
import ResizedImage from '../../../common/ResizedImage';
import Icon from 'react-native-vector-icons/Ionicons';
import formStore from '../../../store/formStore';
import DocumentPicker, {
  types,
} from 'react-native-document-picker';

const ScreenWidth = Dimensions.get('window').width;

const Card2 = ({
  hyperlink,
  imageUri,
  cardCorner,
  cardWidth,
  element,
  cardIndex,
}) => {
  const {colors, fonts} = useTheme();
  const userRole = formStore(state => state.userRole);
  const role = element.role.find(e => e.name === userRole);
  const formValue = formStore(state => state.formValue);
  const setFormValue = formStore(state => state.setFormValue);
  const preview = formStore(state => state.preview);
  const cardWidthValue = cardWidth === 'auto' ? ((ScreenWidth - 15) * 75 / 100) > 300 ? 300 : ((ScreenWidth - 15) * 75 / 100) : (ScreenWidth - 30);
  const cardHeight = cardWidth === 'auto' ? ((ScreenWidth - 15) * 75 / 100) > 300 ? 170 : ((ScreenWidth - 15) * 75 / 100 * 9 / 16) : (ScreenWidth - 30) * 9 / 16;

  const handlePress = useCallback(async () => {
    // await Linking.openSettings();
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(hyperlink);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(hyperlink);
    } else {
      Alert.alert(`Don't know how to open this URL: ${hyperlink}`);
    }
  }, [hyperlink]);

  return (
    <TouchableOpacity
      style={styles.card2(cardCorner, cardWidthValue, cardHeight)}
      onPress={() => {
        DocumentPicker.pick({
          type: types.images,
        }).then(result => {
          const newData = [...formValue[element.field_name]];
          const newCardData = {...newData[cardIndex], image: result[0].uri};
          newData.splice(cardIndex, 1, newCardData);
          setFormValue({...formValue, [element.field_name]: newData});
          if (element.event.onChangeCard) {
            Alert.alert('Rule Action', `Fired onChangeCard action. rule - ${element.event.onChangeCard}.`);
          }
        }).catch({});
      }}
      disabled={!(role.edit || preview)}>
      {
        !imageUri && (
          <View style={styles.emptyImageView(cardCorner, cardWidthValue, cardHeight, fonts, colors)}>
            <Icon name="image-outline" size={40} color={fonts.values.color} />
          </View>
        )
      }
      {
        imageUri && (
          <ResizedImage
            uri={imageUri}
            maxHeight={cardHeight}
            maxWidth={cardWidthValue}
            borderRadius={cardCorner === 'default' ? 3 : 20}
          />
        )
      }
      {
        (role.edit || preview) && (
          <IconButton
            icon="close"
            size={20}
            iconColor={fonts.values.color}
            style={{position: 'absolute', right: 0, top: 0}}
            onPress={() => {
              if (formValue[element.field_name]?.length > 0) {
                const newCards = [...formValue[element.field_name]];
                newCards.splice(cardIndex, 1);
                setFormValue({...formValue, [element.field_name]: newCards});
              } else {
                const tempValue = {...formValue};
                delete tempValue[element.field_name];
                setFormValue(tempValue);
              }
              if (element.event.onDeleteCard) {
                Alert.alert('Rule Action', `Fired onDeleteCard action. rule - ${element.event.onDeleteCard}.`);
              }
            }}
          />
        )
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card2: (cardCorner, cardWidthValue, cardHeight) => ({
    alignItems: 'center',
    width: cardWidthValue,
    height: cardHeight,
    borderRadius: cardCorner === 'default' ? 3 : 10,
  }),
  image: (cardCorner, cardWidth) => ({
    width: '100%',
    height:
      cardWidth === 'auto'
        ? (((ScreenWidth - 15) * 60) / 100) > 300
          ? 225
          : ((((ScreenWidth - 15) * 60) / 100) * 3) / 4
        : ((ScreenWidth - 30) * 70) / 100,
    borderRadius: cardCorner === 'default' ? 3 : 10,
  }),
  emptyImageView: (cardCorner, cardWidth, cardHeight, fonts, colors) => ({
    width: cardWidth,
    height: cardHeight,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: cardCorner === 'default' ? 3 : 10,
    borderWidth: 1,
    borderColor: fonts.values.color,
    borderStyle: 'dashed',
    backgroundColor: colors.card,
  }),
});

export default Card2;
