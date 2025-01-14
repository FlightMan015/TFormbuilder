import React, {useState} from 'react';
import {useTheme} from 'react-native-paper';
import {View, StyleSheet, Text, Image, TextInput} from 'react-native';
import { emptyImage } from '../../../constant';
import TextButton from '../../../common/TextButton';
import ResizedImage from '../../../common/ResizedImage';
import DocumentPicker, {
  types,
} from 'react-native-document-picker';
import formStore from '../../../store/formStore';
import { useEffect } from 'react';

const SettingImage = ({title, imageUri, onSelect, keyName}) => {
  const {colors, size} = useTheme();
  const i18nValues = formStore(state => state.i18nValues);
  const [imageSelectTab, setImageSelectTab] = useState('upload');
  const [newImageUri, setNewImageUri] = useState('');

  useEffect(() => {
    if (imageSelectTab === 'url') {
      setNewImageUri(imageUri);
    }
  }, [imageSelectTab]);

  return (
    <View style={styles.settingView}>
      <Text style={styles.titleLabel}>{title}</Text>
      <View style={styles.settingTab}>
        <TextButton
          style={{
            ...styles.colortab(imageSelectTab === 'upload'),
            borderTopLeftRadius: 7,
          }}
          text={i18nValues.t("setting_labels.upload")}
          textStyle={styles.tabText(imageSelectTab === 'upload')}
          onPress={() => setImageSelectTab('upload')}
        />
        <TextButton
          style={{
            ...styles.colortab(imageSelectTab === 'url'),
            borderTopRightRadius: 7,
          }}
          text={i18nValues.t("setting_labels.uri")}
          textStyle={styles.tabText(imageSelectTab === 'url')}
          onPress={() => setImageSelectTab('url')}
        />
      </View>
      {
        imageSelectTab === 'upload' && (
          <View style={styles.settingView1}>
            <View style={styles.uploadImageStyle}>
              {imageUri && (
                <ResizedImage uri={imageUri} maxWidth={250} maxHeight={168} />
              )}
              {!imageUri && (
                <Image
                  style={{width: 100, height: 100, alignSelf: 'center'}}
                  source={emptyImage}
                />
              )}
            </View>
            <TextButton
              style={styles.addCardBtn}
              text={i18nValues.t("setting_labels.select_image")}
              textStyle={styles.addCardText}
              onPress={() => {
                DocumentPicker.pick({
                  type: types.images,
                }).then(result => {
                  onSelect(keyName, result[0].uri)
                }).catch({});
              }}
            />
          </View>
        )
      }
      {
        imageSelectTab === 'url' && (
          <View style={styles.settingView1}>
            <Text style={styles.titleLabel}>{i18nValues.t("setting_labels.image_uri")}</Text>
            <TextInput
              style={{...styles.title, backgroundColor: '#626E81'}}
              value={newImageUri}
              placeholder='url...'
              onChangeText={newText => {
                setNewImageUri(newText);
              }}
            />
            <TextButton
              style={styles.addCardBtn}
              text={i18nValues.t("setting_labels.change")}
              textStyle={styles.addCardText}
              onPress={() => {
                onSelect(keyName, newImageUri);
              }}
            />
          </View>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    width: '100%',
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
  settingView: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#4B5260',
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
  settingView1: {
    padding: 10,
    backgroundColor: '#555F6E',
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
  },
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
  settingTab: {
    flexDirection: 'row',
  },
  uploadImageStyle: {
    width: '100%',
    height: 170,
    justifyContent: 'center',
    backgroundColor: '#626E81',
    borderWidth: 1,
    borderColor: '#303339',
  }
});

export default SettingImage;
