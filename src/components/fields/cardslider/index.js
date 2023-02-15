import React, {useState, useMemo, useRef} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Dimensions} from 'react-native';
import {useTheme} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel-v4';
import Card1 from './Card1';
import Card2 from './Card2';
import formStore from '../../../store/formStore';
import FieldLabel from '../../../common/FieldLabel';

const ScreenWidth = Dimensions.get('window').width;

const CardSlider = props => {
  const {element} = props;
  const {colors, fonts} = useTheme();
  const userRole = formStore(state => state.userRole);
  const role = element.role.find(e => e.name === userRole);
  const _carousel = useRef();
  const [activeSlide, setActiveSlide] = useState(0);

  const CarouselPagination = () => {
    return useMemo(() => (
      <View style={{flexDirection: 'row', justifyContent: 'center', paddingVertical: 5}}>
        {
          Array.from({length: element.meta.cardDatas.length}, (_, dotIndex) => {
            return <View key={dotIndex} style={{width: 6, height: 6, borderRadius: 5, marginHorizontal: 1, backgroundColor: activeSlide === dotIndex ? fonts.values.color : 'grey'}} />
          })
        }
      </View>
    ), [activeSlide, element.meta.cardDatas.length]);
  }

  return (
    <View style={styles.container}>
      {
        role.view && (
          <>
            <FieldLabel label={element.meta.title || 'Card List'} visible={!element.meta.hide_title} />
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
                      titleFont={element.meta.titleFont}
                      descriptionFont={element.meta.descriptionFont}
                      buttonBackgroundColor={element.meta.buttonBackgroundColor}
                      buttonTextFont={element.meta.buttonTextFont}
                      buttonText={element.meta.buttonText}
                    />
                  );
                }
                if (element.meta.cardtemplate === 'card2') {
                  return (
                    <Card2 
                      hyperlink={item.item.hyperlink}
                      imageUri={item.item.image}
                      cardCorner={element.meta.cardCorner}
                      cardWidth={element.meta.cardWidth}
                    />
                );
                }
              }}
              sliderWidth={ScreenWidth - 24}
              itemWidth={
                element.meta.cardWidth === 'auto'
                  ? ((ScreenWidth - 15) * 75) / 100 > 300
                    ? 300
                    : ((ScreenWidth - 15) * 75) / 100
                  : ScreenWidth - 30
              }
              itemHeight={
                ((ScreenWidth - 15) * 75) / 100 > 300
                  ? 225
                  : ((((ScreenWidth - 15) * 75) / 100) * 3) / 4
              }
              autoplay={element.meta.autoplay}
              autoplayDelay={300}
              loop={true}
              onSnapToItem={(slideindex) => {setActiveSlide(slideindex)}}
            />
            <CarouselPagination />
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
});

CardSlider.propTypes = {
  element: PropTypes.object.isRequired,
};

export default CardSlider;
