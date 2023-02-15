import React, {useCallback, useMemo} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Linking,
  Alert,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {emptyImage} from '../../../constant';
import ResizedImage from '../../../common/ResizedImage';
import GradientButton from '../../../common/GradientButton';
import Icon from 'react-native-vector-icons/Ionicons';
import formStore from '../../../store/formStore';

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
    titleFont,
    descriptionFont,
    buttonTextFont,
    buttonText,
  } = props;
  const {colors, fonts} = useTheme();

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

  return useMemo(() => (
    <View style={styles.card}>
      <View style={styles.info(backgroundColor, cardCorner, cardInfoHeight)}>
        {!imageUri && (
          <TouchableOpacity style={styles.emptyImageView(cardCorner, cardInfoHeight, fonts)} disabled>
            <Icon name="image-outline" size={40} color={fonts.values.color} />
          </TouchableOpacity>
        )}
        {imageUri && <ResizedImage
          uri={imageUri}
          maxWidth={cardInfoHeight - 40}
          maxHeight={cardInfoHeight - 40}
          borderRadius={cardCorner === 'default' ? 3 : 10}
        />}
        <View style={styles.textContainer}>
          {/* <View>
            <TextInput
              style={{...titleFont, padding: 0, paddingVertical: 0}}
              value={title}
              placeholder='Title'
              editable={role.edit}
              onChange={e => {
                
              }}
            />
            <TextInput
              style={{...titleFont, padding: 0, paddingVertical: 0}}
              value={subTitle}
              placeholder='Subtitle'
              editable={role.edit}
              onChange={e => {
                
              }}
            />
          </View>
          <TextInput
            style={{...descriptionFont, padding: 0, paddingVertical: 0}}
            value={description}
            placeholder='Description'
            editable={role.edit}
            multiline numberOfLines={2}
            onChange={e => {
              
            }}
          /> */}
          <View>
            <Text style={{...titleFont, padding: 0, paddingVertical: 0}}>{title || 'Title'}</Text>
            <Text style={{...titleFont, padding: 0, paddingVertical: 0}}>{subTitle || 'Subtitle'}</Text>
          </View>
          <Text style={{...descriptionFont, padding: 0, paddingVertical: 0}}>{description || 'Description'}</Text>
        </View>
      </View>
      <GradientButton
        text={buttonText || 'Button'}
        textStyle={buttonTextFont}
        style={styles.button(cardCorner)}
        colors={['#3A88B2', '#84DCD2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        onPress={handlePress}
        disabled={!hyperlink}
      />
    </View>
  ), [props]);
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
  emptyImageView: (cardCorner, cardInfoHeight, fonts) => ({
    width: cardInfoHeight - 40,
    height: cardInfoHeight - 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: cardCorner === 'default' ? 3 : 10,
    borderWidth: 1,
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
