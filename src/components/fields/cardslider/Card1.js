import React, {useCallback, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Linking,
  Alert,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {IconButton, useTheme} from 'react-native-paper';
import ResizedImage from '../../../common/ResizedImage';
import GradientButton from '../../../common/GradientButton';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native';
import formStore from '../../../store/formStore';
import DocumentPicker, {
  types,
} from 'react-native-document-picker';

const ScreenWidth = Dimensions.get('window').width;

const Card1 = (props) => {
  const {
    hyperlink,
    imageUri,
    title,
    subTitle,
    description,
    backgroundColor,
    cardCorner,
    cardWidth,
    buttonBackgroundStartColor,
    buttonBackgroundEndColor,
    isGradientBackground,
    titleFont,
    descriptionFont,
    buttonTextFont,
    buttonText,
    element,
    cardIndex,
  } = props;
  const {colors, fonts} = useTheme();
  const userRole = formStore(state => state.userRole);
  const role = element.role.find(e => e.name === userRole);
  const formValue = formStore(state => state.formValue);
  const setFormValue = formStore(state => state.setFormValue);
  const preview = formStore(state => state.preview);
  const cardInfoHeight = cardWidth === 'auto' ? ((ScreenWidth - 15) * 75 / 100) > 300 ? 130 : ((ScreenWidth - 15) * 75 / 100 * 9 / 16 - 40) : (ScreenWidth - 30) * 9 / 16 - 60;

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
    <View style={styles.card}>
      <View style={styles.info(backgroundColor, cardCorner, cardInfoHeight)}>
        <TouchableOpacity
          style={styles.emptyImageView(cardCorner, cardInfoHeight, fonts, imageUri)}
          disabled={!(role.edit || preview)}
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
        >
          {!imageUri && (
            <Icon name="image-outline" size={40} color={fonts.values.color} />
          )}
          {imageUri && <ResizedImage
            uri={imageUri}
            maxWidth={cardInfoHeight - 40}
            maxHeight={cardInfoHeight - 40}
            borderRadius={cardCorner === 'default' ? 3 : 10}
          />}
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <View>
            <TextInput
              style={{...titleFont, padding: 0, paddingVertical: 0}}
              value={title}
              placeholder='Title'
              editable={(role.edit || preview)}
              onChange={e => {
                e.persist();
                const newData = [...formValue[element.field_name]];
                const newCardData = {...newData[cardIndex], title: e};
                newData.splice(cardIndex, 1, newCardData);
                setFormValue({...formValue, [element.field_name]: newData});
                if (element.event.onChangeCard) {
                  Alert.alert('Rule Action', `Fired onChangeCard action. rule - ${element.event.onChangeCard}.`);
                }
              }}
            />
            <TextInput
              style={{...titleFont, padding: 0, paddingVertical: 0}}
              value={subTitle}
              placeholder='Subtitle'
              editable={(role.edit || preview)}
              onChange={e => {
                e.persist();
                const newData = [...formValue[element.field_name]];
                const newCardData = {...newData[cardIndex], subTitle: e};
                newData.splice(cardIndex, 1, newCardData);
                setFormValue({...formValue, [element.field_name]: newData});
                if (element.event.onChangeCard) {
                  Alert.alert('Rule Action', `Fired onChangeCard action. rule - ${element.event.onChangeCard}.`);
                }
              }}
            />
          </View>
          <TextInput
            style={{...descriptionFont, padding: 0, paddingVertical: 0}}
            value={description}
            placeholder='Description'
            editable={(role.edit || preview)}
            multiline numberOfLines={2}
            onChange={e => {
              e.persist();
              const newData = [...formValue[element.field_name]];
              const newCardData = {...newData[cardIndex], description: e};
              newData.splice(cardIndex, 1, newCardData);
              setFormValue({...formValue, [element.field_name]: newData});
              if (element.event.onChangeCard) {
                Alert.alert('Rule Action', `Fired onChangeCard action. rule - ${element.event.onChangeCard}.`);
              }
            }}
          />
          {/* <View>
            <Text style={{...titleFont, padding: 0, paddingVertical: 0}}>{title || 'Title'}</Text>
            <Text style={{...titleFont, padding: 0, paddingVertical: 0}}>{subTitle || 'Subtitle'}</Text>
          </View>
          <Text style={{...descriptionFont, padding: 0, paddingVertical: 0}}>{description || 'Description'}</Text> */}
        </View>
        {
          role.edit && (
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
      </View>
      <GradientButton
        text={buttonText || 'Button'}
        textStyle={buttonTextFont}
        style={styles.button(cardCorner)}
        colors={[buttonBackgroundStartColor, isGradientBackground? buttonBackgroundEndColor : buttonBackgroundStartColor]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        onPress={handlePress}
        disabled={(!hyperlink || !(role.edit || preview))}
      />
    </View>);
};

const styles = StyleSheet.create({
  card: (cardCorner) => ({
    alignItems: 'center',
    borderRadius: cardCorner === 'default' ? 3 : 20,
  }),
  info: (backgroundColor, cardCorner, cardInfoHeight) => ({
    height: cardInfoHeight,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: backgroundColor,
    borderTopRightRadius: cardCorner === 'default' ? 3 : 20,
    borderTopLeftRadius: cardCorner === 'default' ? 3 : 20,
  }),
  image: cardCorner => ({
    width: '35%',
    height: (ScreenWidth * 9) / 50 > 100 ? 100 : (ScreenWidth * 9) / 50,
    borderRadius: cardCorner === 'default' ? 3 : 10,
  }),
  emptyImageView: (cardCorner, cardInfoHeight, fonts, imageUri) => ({
    width: cardInfoHeight - 40,
    height: cardInfoHeight - 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: cardCorner === 'default' ? 3 : 10,
    borderWidth: imageUri ? 0 : 1,
    borderColor: fonts.values.color,
    borderStyle: 'dashed',
  }),
  textContainer: {
    height: '100%',
    flex: 1,
    paddingLeft: 10,
    paddingVertical: 3,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  button: (cardCorner) => ({
    width: '100%',
    paddingVertical: 3,
    borderBottomRightRadius: cardCorner === 'default' ? 3 : 20,
    borderBottomLeftRadius: cardCorner === 'default' ? 3 : 20,
  }),
});

export default React.memo(Card1);
