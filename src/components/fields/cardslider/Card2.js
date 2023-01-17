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
import {useTheme} from 'react-native-paper';
import {emptyImage} from '../../../constant';
import TextButton from '../../../common/TextButton';

const ScreenWidth = Dimensions.get('window').width;

const Card2 = ({
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
}) => {
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

  return (
    <TouchableOpacity
      style={styles.card2}
      onPress={handlePress}
      disabled={!hyperlink}>
      <Image
        style={styles.image(cardCorner, cardWidth)}
        source={imageUri ? {uri: imageUri} : emptyImage}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card2: {
    alignItems: 'center',
  },
  image: (cardCorner, cardWidth) => ({
    width: '100%',
    height:
      cardWidth === 'auto'
        ? ((ScreenWidth - 15) * 60) / 100 > 300
          ? 225
          : ((((ScreenWidth - 15) * 60) / 100) * 3) / 4
        : ((ScreenWidth - 30) * 70) / 100,
    borderRadius: cardCorner === 'default' ? 3 : 10,
  }),
});

export default Card2;
