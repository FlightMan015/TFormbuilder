import React, {useMemo, useRef, useState} from 'react';
import {useTheme, IconButton} from 'react-native-paper';
import {TextInput, Text, StyleSheet, View, Switch, TouchableOpacity, Image} from 'react-native';
import formStore from '../../store/formStore';
import {useNavigation} from '@react-navigation/native';
import TextButton from '../../common/TextButton';
import {invertColor} from '../../utils';
import {color} from 'react-native-reanimated';
import {updateField} from '../../actions/formdata';
import { emptyImage, newCard } from '../../constant';
import { ScrollView } from 'react-native-gesture-handler';
import ResizedImage from '../../common/ResizedImage';
import DocumentPicker, {
  types,
} from 'react-native-document-picker';
import SettingSwitch from './common/SettingSwitch';
import SettingLabel from './common/SettingLabel';
import ColorPicker from '../../common/ColorPicker';
import FontSetting from '../../common/FontSetting';

const colorStyles = [
  '#0A1551',
  '#DFDFFF',
  '#321860',
  '#0099FF',
  '#78BB07',
  '#FE3945',
  '#FB7041',
  '#321F16',
  '#FFFFFF',
  '#264B67',
  '#3C4C1E',
  '#972D54',
  '#11111B',
  '#02357D',
];

const buttonStyles = [
  {background: '#0A1551', text: '#FFFFFF'},
  {background: '#DFDFFF', text: '#0A1551'},
  {background: '#321860', text: '#FFFFFF'},
  {background: '#0099FF', text: '#FFFFFF'},
  {background: '#78BB07', text: '#FFFFFF'},
  {background: '#FE3945', text: '#FFFFFF'},
  {background: '#FB7041', text: '#FFFFFF'},
  {background: '#321F16', text: '#FFFFFF'},
  {background: '#FFFFFF', text: '#0A1551'},
  {background: '#264B67', text: '#FFFFFF'},
  {background: '#3C4C1E', text: '#FFFFFF'},
  {background: '#972D54', text: '#FFFFFF'},
  {background: '#11111B', text: '#FFFFFF'},
  {background: '#02357D', text: '#FFFFFF'},
];

const CardListSetting = props => {
  const {element, index, onClick} = props;  
  const {colors, size} = useTheme();
  const formData = formStore(state => state.formData);
  const setFormData = formStore(state => state.setFormData);
  const updateFormData = formStore(state => state.updateFormData);
  const setOpenSetting = formStore(state => state.setOpenSetting);
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('general');
  const [visibleColors, setVisibleColors] = useState(false);
  const [visibleTitleColors, setVisibleTitleColors] = useState(false);
  const [visibleButtonStyle, setVisibleButtonStyle] = useState(false);
  const [colorTab, setColorTab] = useState('styles');
  const [titleColorTab, setTitleColorTab] = useState('styles');
  const [buttonStyleTab, setButtonStyleTab] = useState('styles');
  const [selectedCardIndex, setSelectedCardIndex] = useState(-1);
  const [settingType, setSettingType] = useState('slider');
  const cardData = useRef(-1);

  const onChange = (key, value) => {
    const tempMeta = {...element.meta};
    updateFormData(index, {...element, meta: {...tempMeta, [key]: value}});
  };

  const onChangeFont = (key, subkey, value) => {
    const tempMeta = {...element.meta};
    const subdata = {...tempMeta[key], [subkey]: value};
    updateFormData(index, {...element, meta: {...tempMeta, [key]: subdata}});
  };

  return (
    <View>
      {
        settingType==='slider' && (
          <>
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>Card Slider Settings</Text>
              <IconButton
                icon="close"
                size={20}
                iconColor="#FFFFFF"
                onPress={() => {
                  setOpenSetting(false);
                }}
              />
            </View>
            <View style={styles.settingTab}>
              <TextButton
                style={styles.tab(selectedTab === 'general')}
                text="GENERAL"
                textStyle={styles.tabText(selectedTab === 'general')}
                onPress={() => setSelectedTab('general')}
              />
              <TextButton
                style={styles.tab(selectedTab === 'style')}
                text="STYLE"
                textStyle={styles.tabText(selectedTab === 'style')}
                onPress={() => setSelectedTab('style')}
              />
            </View>
            {selectedTab === 'general' && (
              <>
                <SettingLabel
                  title={'Card List Title'}
                  label={element.meta.title}
                  onChange={onChange}
                  keyName={'title'}
                />
                <SettingLabel
                  title={'Button Text'}
                  label={element.meta.buttonText}
                  onChange={onChange}
                  keyName={'buttonText'}
                />
                <SettingSwitch
                  title={'Hide Label'}
                  value={element.meta.hide_title}
                  onChange={onChange}
                  keyName={'hide_title'}
                  description={'Make sure to show label.'}
                />
                <SettingSwitch
                  title={'Auto Play'}
                  value={element.meta.autoplay}
                  onChange={onChange}
                  keyName={'autoplay'}
                  description={'Make sure to slide automatically.'}
                />
                <SettingSwitch
                  title={'Visible Page Dots'}
                  value={element.meta.visibleDots}
                  onChange={onChange}
                  keyName={'visibleDots'}
                  description={'Make sure to show page dots.'}
                />
                <View style={styles.settingView}>
                  <Text style={styles.titleLabel}>Card Template</Text>
                  <View style={styles.cardStyle}>
                    <IconButton
                      icon="image-outline"
                      size={35}
                      iconColor="#FFFFFF"
                      style={styles.cardStyleBtn1(
                        element.meta.cardtemplate === 'card2',
                      )}
                      onPress={() => {
                        onChange('cardtemplate', 'card2');
                      }}
                    />
                    <IconButton
                      icon="card-account-details-outline"
                      size={35}
                      iconColor="#FFFFFF"
                      style={styles.cardStyleBtn1(
                        element.meta.cardtemplate === 'card1',
                      )}
                      onPress={() => {
                        onChange('cardtemplate', 'card1');
                      }}
                    />
                  </View>
                </View>
                <View style={styles.settingView}>
                  <Text style={styles.titleLabel}>Cards</Text>
                  <ScrollView style={{maxHeight: 400}} showsVerticalScrollIndicator>
                    {element.meta.cardDatas.map((card, cardIndex) => {
                      return (
                        <View key={cardIndex}>
                          <TouchableOpacity
                            key={cardIndex}
                            style={styles.cardItemStyle}
                            onPress={() => setSelectedCardIndex(cardIndex)}
                            activeOpacity={0.8}>
                            <Image style={styles.cardImage} source={card.image ? {uri: card.image} : emptyImage} />
                            <View style={{marginLeft: 10}}>
                              <Text style={styles.cardTitle}>{card.title}</Text>
                              <Text style={styles.cardSubTitle}>{card.subTitle}</Text>
                              <Text style={styles.cardDescription}>
                                {card.description}
                              </Text>
                            </View>
                          </TouchableOpacity>
                          {selectedCardIndex === cardIndex && <View style={{flexDirection: 'row', width: '100%', justifyContent: 'flex-end', position: 'absolute'}}>
                            <IconButton
                              icon="pencil-outline"
                              size={20}
                              iconColor="#FFFFFF"
                              style={{backgroundColor: '#78BB07'}}
                              onPress={() => {
                                cardData.current = cardIndex;
                                setSettingType('card');
                              }}
                            />
                            <IconButton
                              icon="delete-outline"
                              size={20}
                              iconColor="#FFFFFF"
                              style={{backgroundColor: '#FF4947'}}
                              onPress={() => {
                                const tempElement = JSON.parse(JSON.stringify(element));
                                tempElement.meta.cardDatas.splice(cardIndex, 1);
                                updateFormData(index, tempElement);
                              }}
                            />
                          </View>}
                        </View>
                      );
                    })}
                  </ScrollView>
                  <TextButton
                    style={styles.addCardBtn}
                    text="New card"
                    textStyle={styles.addCardText}
                    onPress={() => {
                      const tempElement = JSON.parse(JSON.stringify(element));
                      tempElement.meta.cardDatas.push(newCard);
                      updateFormData(index, tempElement);
                    }}
                  />
                </View>
                <View style={styles.settingView}>
                  <Text style={styles.titleLabel}>Duplicate Element</Text>
                  <IconButton
                    icon="content-duplicate"
                    size={35}
                    iconColor="#FFFFFF"
                    style={styles.duplicateButton}
                    onPress={() => {}}
                  />
                  <Text style={styles.description1}>
                    Clone selected elements with all saved properties.
                  </Text>
                </View>
              </>
            )}
            {selectedTab === 'style' && (
              <>
                <ColorPicker
                  color={element.meta.cardBackgroundColor}
                  label={'Card Background Color'}
                  selectColor={e => {
                    onChange('cardBackgroundColor', e);
                  }}
                />
                <View style={styles.settingView}>
                  <Text style={styles.titleLabel}>Card Corner</Text>
                  <View style={styles.settingTab}>
                    <TextButton
                      style={styles.textButton(element.meta.cardCorner === 'default')}
                      text="DEFAULT"
                      textStyle={styles.textButtonText('#FFFFFF')}
                      onPress={() => {
                        onChange('cardCorner', 'default');
                      }}
                    />
                    <TextButton
                      style={styles.textButton(element.meta.cardCorner === 'rounded')}
                      text="ROUNDED"
                      textStyle={styles.textButtonText('#FFFFFF')}
                      onPress={() => {
                        onChange('cardCorner', 'rounded');
                      }}
                    />
                  </View>
                </View>
                <View style={styles.settingView}>
                  <Text style={styles.titleLabel}>Card Width</Text>
                  <View style={styles.settingTab}>
                    <TextButton
                      style={styles.textButton(element.meta.cardWidth === 'auto')}
                      text="AUTO"
                      textStyle={styles.textButtonText('#FFFFFF')}
                      onPress={() => {
                        onChange('cardWidth', 'auto');
                      }}
                    />
                    <TextButton
                      style={styles.textButton(element.meta.cardWidth === 'full')}
                      text="FULL"
                      textStyle={styles.textButtonText('#FFFFFF')}
                      onPress={() => {
                        onChange('cardWidth', 'full');
                      }}
                    />
                  </View>
                </View>
                <FontSetting
                  label={'Title Font'}
                  fontColor={element.meta.titleFont.color}
                  fontSize={element.meta.titleFont.fontSize}
                  fontType={element.meta.titleFont.fontFamily}
                  onChange={(type, e) => {onChangeFont('titleFont', type, e);}}
                />
                <FontSetting
                  label={'Description Font'}
                  fontColor={element.meta.descriptionFont.color}
                  fontSize={element.meta.descriptionFont.fontSize}
                  fontType={element.meta.descriptionFont.fontFamily}
                  onChange={(type, e) => {onChangeFont('descriptionFont', type, e);}}
                />
                <FontSetting
                  label={'Button Text Font'}
                  fontColor={element.meta.buttonTextFont.color}
                  fontSize={element.meta.buttonTextFont.fontSize}
                  fontType={element.meta.buttonTextFont.fontFamily}
                  onChange={(type, e) => {onChangeFont('buttonTextFont', type, e);}}
                />
                <SettingSwitch
                  title={'Gradient Background'}
                  value={element.meta.isGradientBackground}
                  onChange={onChange}
                  keyName={'isGradientBackground'}
                  description={'Make sure to show gradient.'}
                />
                <ColorPicker
                  color={element.meta.buttonBackgroundStartColor}
                  label={element.meta.isGradientBackground ? 'Button Background Start Color' : 'Button Background Color'}
                  selectColor={e => {
                    if (!element.meta.isGradientBackground) {
                      onChange('buttonBackgroundStartColor', e);
                      onChange('buttonBackgroundEndColor', e);
                    } else {
                      onChange('buttonBackgroundStartColor', e);
                    }
                  }}
                />
                {
                  element.meta.isGradientBackground && (
                    <ColorPicker
                      color={element.meta.buttonBackgroundEndColor}
                      label={'Button Background End Color'}
                      selectColor={e => {
                        onChange('buttonBackgroundEndColor', e);
                      }}
                    />
                  )
                }
              </>
            )}
          </>
        )
      }

      {
        settingType==='card' && (
          <>
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>Card Settings</Text>
              <IconButton
                icon="close"
                size={20}
                iconColor="#FFFFFF"
                onPress={() => {
                  setOpenSetting(false);
                }}
              />
            </View>
            {
              cardData.current >= 0 && (
                <>
                  <View style={styles.settingView}>
                    <Text style={styles.titleLabel}>Card Title</Text>
                    <TextInput
                      style={styles.title}
                      value={element.meta.cardDatas[cardData.current].title}
                      onChangeText={newText => {
                        const tempElement = JSON.parse(JSON.stringify(element));
                        tempElement.meta.cardDatas[cardData.current].title = newText;
                        updateFormData(index, tempElement);
                      }}
                    />
                  </View>
                  <View style={styles.settingView}>
                    <Text style={styles.titleLabel}>Card SubTitle</Text>
                    <TextInput
                      style={styles.title}
                      value={element.meta.cardDatas[cardData.current].subTitle}
                      onChangeText={newText => {
                        const tempElement = JSON.parse(JSON.stringify(element));
                        tempElement.meta.cardDatas[cardData.current].subTitle = newText;
                        updateFormData(index, tempElement);
                      }}
                    />
                  </View>
                  <View style={styles.settingView}>
                    <Text style={styles.titleLabel}>Card Description</Text>
                    <TextInput
                      style={styles.title}
                      value={element.meta.cardDatas[cardData.current].description}
                      onChangeText={newText => {
                        const tempElement = JSON.parse(JSON.stringify(element));
                        tempElement.meta.cardDatas[cardData.current].description = newText;
                        updateFormData(index, tempElement);
                      }}
                    />
                  </View>
                  <View style={styles.settingView}>
                    <Text style={styles.titleLabel}>Hyper Link</Text>
                    <TextInput
                      style={styles.title}
                      value={element.meta.cardDatas[cardData.current].hyperlink}
                      onChangeText={newText => {
                        const tempElement = JSON.parse(JSON.stringify(element));
                        tempElement.meta.cardDatas[cardData.current].hyperlink = newText;
                        updateFormData(index, tempElement);
                      }}
                    />
                  </View>
                  <View style={styles.settingView}>
                    <Text style={styles.titleLabel}>Image</Text>
                    <View style={{width: '100%', height: 170, justifyContent: 'center', backgroundColor: '#626E81', borderWidth: 1, borderColor: '#303339'}}>
                      {element.meta.cardDatas[cardData.current].image && (
                        <ResizedImage uri={element.meta.cardDatas[cardData.current].image} maxWidth={250} maxHeight={168} />
                      )}
                      {!element.meta.cardDatas[cardData.current].image && (
                        <Image
                          style={{width: 100, height: 100, alignSelf: 'center'}}
                          source={emptyImage}
                        />
                      )}
                    </View>
                    <TextButton
                      style={styles.addCardBtn}
                      text="Select Image"
                      textStyle={styles.addCardText}
                      onPress={() => {
                        DocumentPicker.pick({
                          type: types.images,
                        }).then(result => {
                          const tempElement = JSON.parse(JSON.stringify(element));
                          if (
                            tempElement.meta.cardDatas[cardData.current].image !== result[0].uri
                          ) {
                            tempElement.meta.cardDatas[cardData.current].image = result[0].uri;
                            updateFormData(index, tempElement);
                          }
                        }).catch({});
                      }}
                    />
                  </View>
                  <TouchableOpacity style={styles.settingView} onPress={() => setSettingType('slider')}>
                    <Text style={{color: '#FFFFFF', textAlign: 'center', alignContent: 'center'}}>Go to card slider setting</Text>
                  </TouchableOpacity>
                </>
              )
            }
          </>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  menuHeader: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: 18,
    color: '#fff',
    paddingLeft: 15,
  },
  settingView: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#4B5260',
  },
  settingTab: {
    flexDirection: 'row',
  },
  tab: selected => ({
    width: '50%',
    height: 50,
    backgroundColor: '#303339',
    borderBottomColor: '#9B61D5',
    borderBottomWidth: selected ? 4 : 0,
  }),
  colortab: selected => ({
    width: '50%',
    height: 45,
    backgroundColor: '#303339',
    borderBottomColor: '#0099FF',
    borderBottomWidth: selected ? 4 : 0,
  }),
  tabText: selected => ({
    fontSize: 15,
    color: selected ? '#FFFFFF' : '#CBCCCD',
  }),
  title: {
    height: 40,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#303339',
    backgroundColor: '#555F6E',
    paddingLeft: 10,
  },
  titleLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#ABB3B2',
  },
  description1: {
    fontSize: 14,
    color: '#ABB3B2',
    marginTop: 5,
  },
  switchView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchTrackColor: {
    false: '#767577',
    true: '#0099FF',
  },
  cardStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardStyleBtn1: selected => ({
    margin: 0,
    width: '49%',
    height: 60,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#303339',
    backgroundColor: selected ? '#0099FF' : '#555F6E',
  }),
  duplicateButton: {
    margin: 0,
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#303339',
    backgroundColor: '#555F6E',
  },
  textButton: selected => ({
    width: 100,
    padding: 10,
    backgroundColor: selected ? '#0099FF' : '#555F6E',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#303339',
  }),
  textButtonText: textColor => ({
    color: textColor,
    fontSize: 16,
  }),
  background: cardBackgroundColor => ({
    width: '100%',
    padding: 7,
    backgroundColor: cardBackgroundColor,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#303339',
  }),
  colorSetting: {
    marginTop: 5,
    marginHorizontal: 2,
  },
  colorContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#555F6E',
    paddingVertical: 10,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
  },
  colorElement: {
    width: '50%',
    height: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  colorElementText: color => ({
    backgroundColor: color,
    height: '100%',
    borderRadius: 5,
    color: invertColor(color),
  }),
  colorElementText1: item => ({
    backgroundColor: item.background,
    height: '100%',
    borderRadius: 5,
    color: item.text,
  }),
  customizeBackground: {
    flex: 1,
    flexDirection: 'row-reverse',
    borderWidth: 1,
    borderColor: '#303339',
    borderRadius: 3,
    marginBottom: 5,
  },
  colorView: color => ({
    height: 26,
    width: 26,
    margin: 7,
    backgroundColor: color,
  }),
  colorValue: {
    flex: 1,
    height: 40,
    borderRightWidth: 1,
    borderRightColor: '#303339',
    color: '#FFFFFF',
    fontSize: 16,
    paddingLeft: 10,
  },
  buttonCustomStyle: {
    flex: 1,
    paddingHorizontal: 15,
  },
  cardImage: {
    width: 100,
    height: 75,
    borderRadius: 5,
  },
  cardItemStyle: {
    flexDirection: 'row',
    borderWidth:  1,
    borderColor: '#303339',
    backgroundColor: '#555F6E',
    alignItems: 'center',
    padding: 10,
    borderRadius: 3,
  },
  addCardBtn: {
    width: '100%',
    padding: 7,
    backgroundColor: '#626E81',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#303339',
    marginTop: 10,
  },
  addCardText: {
    color: '#ffffff',
    fontSize: 16,
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  cardSubTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  cardDescription: {
    color: '#ffffff',
    fontSize: 14,
  },
});

export default CardListSetting;
