import React, {useState, useMemo, useRef} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Dimensions, Alert} from 'react-native';
import {useTheme, IconButton} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel-v4';
import Card1 from './Card1';
import Card2 from './Card2';
import formStore from '../../../store/formStore';
import FieldLabel from '../../../common/FieldLabel';
import { newCard } from '../../../constant';

const ScreenWidth = Dimensions.get('window').width;

const CardSlider = props => {
  const {element} = props;
  const {colors, fonts} = useTheme();
  const preview = formStore(state => state.preview);
  const userRole = formStore(state => state.userRole);
  const role = element.role.find(e => e.name === userRole);
  const formValue = formStore(state => state.formValue);
  const setFormValue = formStore(state => state.setFormValue);
  const i18nValues = formStore(state => state.i18nValues);
  const _carousel = useRef();
  const [activeSlide, setActiveSlide] = useState(0);

  const CarouselPagination = () => {
    if (formValue[element.field_name]?.length > 0) {
      return (
        <View style={{flexDirection: 'row', justifyContent: 'center', paddingVertical: 15}}>
          {
            Array.from({length: formValue[element.field_name].length}, (_, dotIndex) => {
              return <View key={dotIndex} style={{width: activeSlide === dotIndex ? 18 : 6, height: 6, borderRadius: 5, marginHorizontal: 3, backgroundColor: activeSlide === dotIndex ? fonts.values.color : 'grey'}} />
            })
          }
        </View>
      );
    }
  }

  return (
    <View style={styles.container(element)}>
      {
        role.view && (
          <>
            <FieldLabel label={element.meta.title || i18nValues.t("field_labels.card_slider")} visible={!element.meta.hide_title} />
            {
              !element.meta.verticalAlign && formValue[element.field_name]?.length > 0 && (
              <Carousel
                ref={c => {
                  _carousel.current = c;
                }}
                data={formValue[element.field_name] || []}
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
                        subTitleFont={element.meta.subTitleFont}
                        descriptionFont={element.meta.descriptionFont}
                        buttonBackgroundStartColor={element.meta.buttonBackgroundStartColor}
                        buttonBackgroundEndColor={element.meta.buttonBackgroundEndColor}
                        buttonTextFont={element.meta.buttonTextFont}
                        buttonText={element.meta.buttonText}
                        isGradientBackground={element.meta.isGradientBackground}
                        element={element}
                        cardIndex={item.dataIndex}                        
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
                        element={element}
                        cardIndex={item.dataIndex}
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
            )}

            {
              !element.meta.verticalAlign && element.meta.visibleDots && (
                <CarouselPagination />
              )
            }

            {
              element.meta.verticalAlign && formValue[element.field_name]?.length > 0 &&
              formValue[element.field_name].map((item, itemIndex) => {
                if (element.meta.cardtemplate === 'card1') {
                  return (
                    <View key={itemIndex} style={{width: '90%', alignSelf: 'center', marginVertical: 10}}>
                      <Card1
                        title={item.title}
                        subTitle={item.subTitle}
                        description={item.description}
                        hyperlink={item.hyperlink}
                        imageUri={item.image}
                        backgroundColor={element.meta.cardBackgroundColor}
                        cardCorner={element.meta.cardCorner}
                        cardWidth={element.meta.cardWidth}
                        titleFont={element.meta.titleFont}
                        descriptionFont={element.meta.descriptionFont}
                        buttonBackgroundStartColor={element.meta.buttonBackgroundStartColor}
                        buttonBackgroundEndColor={element.meta.buttonBackgroundEndColor}
                        buttonTextFont={element.meta.buttonTextFont}
                        buttonText={element.meta.buttonText}
                        isGradientBackground={element.meta.isGradientBackground}
                        element={element}
                        cardIndex={itemIndex}                        
                      />
                    </View>
                  );
                }
                if (element.meta.cardtemplate === 'card2') {
                  return (
                    <View key={itemIndex} style={{width: '90%', alignSelf: 'center', marginVertical: 10, alignItems: 'center'}}>
                      <Card2
                        key={itemIndex}
                        hyperlink={item.hyperlink}
                        imageUri={item.image}
                        cardCorner={element.meta.cardCorner}
                        cardWidth={element.meta.cardWidth}
                        element={element}
                        cardIndex={itemIndex}
                      />
                    </View> 
                  );
                }
              })
            }

            {(preview || role.edit) && (
              <View style={styles.renderContainer}>
                <IconButton
                  icon="plus"
                  size={20}
                  iconColor={colors.card}
                  style={{
                    ...styles.iconBtn,
                    backgroundColor: colors.colorButton,
                  }}
                  onPress={() => {
                    if (formValue[element.field_name]) {
                      const newCards = [...formValue[element.field_name]];
                      newCards.push(newCard);
                      setFormValue({...formValue, [element.field_name]: newCards});
                    } else {
                      const newCards = [];
                      newCards.push(newCard);
                      setFormValue({...formValue, [element.field_name]: newCards});
                    }
                    if (element.event.onCreateCard) {
                      Alert.alert('Rule Action', `Fired onCreateCard action. rule - ${element.event.onCreateCard}.`);
                    }
                  }}
                />
              </View>
            )}
          </>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: element => ({
    ...element.meta.padding
  }),
  carouselTitle: colors => ({
    fontSize: 16,
    padding: 5,
    color: colors.text,
  }),
  iconBtn: {
    margin: 0,
    marginTop: 10,
    alignSelf: 'center',
    marginVertical: 5,
  },
});

CardSlider.propTypes = {
  element: PropTypes.object.isRequired,
};

export default CardSlider;
