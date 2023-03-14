import React, {useState, useRef} from 'react';
import { View, TouchableOpacity, StyleSheet, Image, TextInput, Text } from 'react-native';
import {useTheme, IconButton} from 'react-native-paper';
import SettingHeader from './common/SettingHeader';
import { updateField } from '../../actions/formdata';
import formStore from '../../store/formStore';
import SettingDuplicate from './common/SettingDuplicate';
import SettingLabel from './common/SettingLabel';
import FontSetting from '../../common/FontSetting';
import SettingSwitch from './common/SettingSwitch';
import { emptyImage, newNavButton } from '../../constant';
import TextButton from '../../common/TextButton';
import DocumentPicker, {
  types,
} from 'react-native-document-picker';

const NavigationButtonSetting = ({element, index, onClick}) => {
  const {colors, size} = useTheme();
  const formData = formStore(state => state.formData);
  const setFormData = formStore(state => state.setFormData);
  const i18nValues = formStore(state => state.i18nValues);
  const updateFormData = formStore(state => state.updateFormData);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(-1);

  const onChange = (key, value) => {
    console.log(key, value);
    const tempMeta = JSON.parse(JSON.stringify(element.meta));
    setFormData({
      ...formData,
      data: updateField(
        formData,
        index,
        {...element, meta: {...tempMeta, [key]: value}},
      ),
    });
  };

  const onChangeFont = (key, subkey, value) => {
    const tempMeta = {...element.meta};
    const subdata = {...tempMeta[key], [subkey]: value};
    updateFormData(index, {...element, meta: {...tempMeta, [key]: subdata}});
  };

  return (
    <>
      <SettingHeader title={i18nValues.t("setting_labels.navigation_setting")} />
      <SettingLabel
        title={i18nValues.t("setting_labels.label")}
        label={element.meta.title}
        onChange={onChange}
        keyName={'title'}
      />
      <SettingSwitch
        title={i18nValues.t("setting_labels.hide_label")}
        value={element.meta.hide_title}
        onChange={onChange}
        keyName={'hide_title'}
        description={i18nValues.t("setting_labels.hide_label_description")}
      />
      <FontSetting
        label={i18nValues.t("setting_labels.first_text_font")}
        fontColor={element.meta.firstTextFont.color}
        fontSize={element.meta.firstTextFont.fontSize}
        fontType={element.meta.firstTextFont.fontFamily}
        onChange={(type, e) => {onChangeFont('firstTextFont', type, e);}}
      />
      <FontSetting
        label={i18nValues.t("setting_labels.second_text_font")}
        fontColor={element.meta.secondTextFont.color}
        fontSize={element.meta.secondTextFont.fontSize}
        fontType={element.meta.secondTextFont.fontFamily}
        onChange={(type, e) => {onChangeFont('secondTextFont', type, e);}}
      />
      <View style={styles.settingView}>
        <Text style={styles.titleLabel}>{i18nValues.t("setting_labels.buttons")}</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {element.meta.buttons.map((button, buttonIndex) => {
            return (
              <View key={buttonIndex}>
                <TouchableOpacity
                  key={buttonIndex}
                  style={styles.cardItemStyle}
                  onPress={() => {
                    setSelectedButtonIndex(buttonIndex);
                    DocumentPicker.pick({
                      type: types.images,
                    })
                      .then(result => {
                        const tempElement = {...element};
                        tempElement.meta.buttons.splice(buttonIndex, 1, {...button, iconImage: result[0].uri});
                        updateFormData(index, tempElement);
                      })
                      .catch({});
                  }}
                  activeOpacity={0.8}>
                  <Image style={styles.cardImage} source={button.iconImage ? {uri: button.iconImage} : emptyImage} />
                  <TextInput value={button.text1} style={{...styles.cardTitle, ...element.meta.firstTextFont, padding: 0}} />
                  <TextInput value={button.text2} style={{...styles.cardSubTitle, ...element.meta.secondTextFont, padding: 0}} />
                </TouchableOpacity>
                {selectedButtonIndex === buttonIndex && <View style={{flexDirection: 'row', width: '100%', justifyContent: 'flex-end', position: 'absolute'}}>
                  <IconButton
                    icon="delete-outline"
                    size={20}
                    iconColor="#FFFFFF"
                    style={{backgroundColor: '#FF4947'}}
                    onPress={() => {
                      const tempElement = {...element};
                      tempElement.meta.buttons.splice(buttonIndex, 1);
                      updateFormData(index, tempElement);
                    }}
                  />
                </View>}
              </View>
            );
          })}
        </View>
        <TextButton
          style={styles.addCardBtn}
          text={i18nValues.t("setting_labels.new_button")}
          textStyle={styles.addCardText}
          onPress={() => {
            const tempElement = {...element};
            tempElement.meta.cardDatas.push(newNavButton);
            updateFormData(index, tempElement);
          }}
        />
      </View>
      <SettingDuplicate index={index} element={element} />
    </>
  );
};

const styles = StyleSheet.create({
  cardImage: {
    width: 100,
    height: 75,
    borderRadius: 5,
  },
  cardItemStyle: {
    borderWidth:  1,
    borderColor: '#303339',
    backgroundColor: '#555F6E',
    alignItems: 'center',
    padding: 10,
    borderRadius: 3,
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
  settingView: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#4B5260',
  },
  titleLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
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
});

export default NavigationButtonSetting;
