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
import ResizedImage from '../../../common/ResizedImage';
import Icon from 'react-native-vector-icons/Ionicons';

const ScreenWidth = Dimensions.get('window').width;

const Card2 = ({
  hyperlink,
  imageUri,
  cardCorner,
  cardWidth,
}) => {
  const {colors, fonts} = useTheme();

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
      onPress={handlePress}
      disabled={!hyperlink}>
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
