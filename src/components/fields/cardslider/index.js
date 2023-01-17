import React, {useState, useRef} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel-v4';
import Card1 from './Card1';
import Card2 from './Card2';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ScreenWidth = Dimensions.get('window').width;

const CardSlider = props => {
  const {element, index, selected, value, onChangeValue, userRole} = props;
  const {colors} = useTheme();
  const _carousel = useRef();

  return (
    <View style={styles.container}>
      <Text style={styles.carouselTitle(colors)}>{element.meta.title || 'Card List'}</Text>
      <Carousel
        ref={c => {
          _carousel.current = c;
        }}
        data={element.meta.cardDatas}
        renderItem={item => {
          if (element.meta.cardtemplate === 'card1') {
            return (
              <Card1
                title={item.item.title}
                subTitle={item.item.subTitle}
                description={item.item.description}
                hyperlink={item.item.hyperlink}
                imageUri={item.item.image}
                backgroundColor={element.meta.cardBackgroundColor}
                cardCorner={element.meta.cardCorner}
                cardWidth={element.meta.cardWidth}
              />
            );
          }
          if (element.meta.cardtemplate === 'card2') {
            return <Card2 selected={selected} />;
          }
        }}
        sliderWidth={ScreenWidth - 24}
        itemWidth={
          element.meta.cardWidth === 'auto'
            ? ((ScreenWidth - 15) * 60) / 100 > 300
              ? 300
              : ((ScreenWidth - 15) * 60) / 100
            : ScreenWidth - 30
        }
        itemHeight={
          ((ScreenWidth - 15) * 60) / 100 > 300
            ? 225
            : ((((ScreenWidth - 15) * 60) / 100) * 3) / 4
        }
        autoplay={element.meta.autoplay}
        autoplayDelay={300}
        loop={true}
      />
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
});

CardSlider.propTypes = {
  element: PropTypes.object.isRequired,
};

export default CardSlider;
