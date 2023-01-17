import React, {useCallback, useMemo} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Linking,
  Alert,
  Dimensions,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {emptyImage} from '../../../constant';
import TextButton from '../../../common/TextButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import formStore from '../../../store/formStore';
import { updateField } from '../../../actions/formdata';
import ResizedImage from '../../../common/ResizedImage';

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
    buttonBackgroundColor,
    buttonText,
    buttonBorderColor,
    buttonTextColor,
  } = props;
  const {colors} = useTheme();

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

  return useMemo(() => (
    <View style={styles.card}>
      <View style={styles.info(backgroundColor, cardCorner)}>
        {console.log('0000000000000')}
        {!imageUri && <Image
          style={styles.image(cardCorner)}
          source={emptyImage}
        />}
        {imageUri && <ResizedImage
          uri={imageUri}
          maxWidth={100}
          maxHeight={70}
        />}
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle(colors)}>{title || 'Title'}</Text>
          <Text style={styles.cardSubTitle(colors)}>
            {subTitle || 'SubTitle'}
          </Text>
          <Text style={styles.cardDescription(colors)} numberOfLines={1}>
            {description || 'Description'}
          </Text>
        </View>
      </View>
      <TextButton
        style={styles.button(buttonBackgroundColor, cardCorner)}
        text={buttonText || 'Button'}
        textStyle={styles.textStyle(buttonTextColor, colors)}
        onPress={handlePress}
      />
    </View>
  ), [props]);
};

const styles = StyleSheet.create({
  card: (cardCorner) => ({
    alignItems: 'center',
    borderRadius: cardCorner === 'default' ? 3 : 20,
  }),
  info: (backgroundColor, cardCorner) => ({
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: backgroundColor,
    borderTopEndRadius: cardCorner === 'default' ? 3 : 20,
    borderTopStartRadius: cardCorner === 'default' ? 3 : 20,
  }),
  image: cardCorner => ({
    width: '35%',
    height: (ScreenWidth * 9) / 50 > 100 ? 100 : (ScreenWidth * 9) / 50,
    borderRadius: cardCorner === 'default' ? 3 : 10,
  }),
  textContainer: {
    width: '65%',
    paddingLeft: 10,
  },
  cardTitle: colors => ({
    fontSize: 14,
    padding: 0,
    paddingLeft: 5,
    color: '#3E97B5',
  }),
  cardSubTitle: colors => ({
    fontSize: 13,
    padding: 0,
    paddingLeft: 5,
    color: '#3E97B5',
  }),
  cardDescription: colors => ({
    fontSize: 12,
    padding: 0,
    paddingLeft: 5,
    color: colors.text,
  }),
  button: (backgroundColor, cardCorner) => ({
    width: '100%',
    backgroundColor: backgroundColor || '#5AB7C4',
    height: 35,
    borderBottomEndRadius: cardCorner === 'default' ? 3 : 20,
    borderBottomStartRadius: cardCorner === 'default' ? 3 : 20,
  }),
  textStyle: (buttonTextColor, colors) => ({
    color: buttonTextColor || colors.buttonTextColor,
  }),
});

export default React.memo(Card1);
