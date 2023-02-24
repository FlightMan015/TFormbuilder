import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import {useTheme} from 'react-native-paper';
import SettingHeader from './common/SettingHeader';
import { updateField } from '../../actions/formdata';
import formStore from '../../store/formStore';
import SettingDuplicate from './common/SettingDuplicate';
import SettingLabel from './common/SettingLabel';
import SettingSwitch from './common/SettingSwitch';

const TwitterSetting = ({element, index, onClick}) => {
  const {colors, size} = useTheme();
  const formData = formStore(state => state.formData);
  const setFormData = formStore(state => state.setFormData);

  const onChange = (key, value) => {
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

  return (
    <>
      <SettingHeader title={'Twitter Settings'} />
      <SettingLabel title={'Label'} label={element.meta.title} onChange={onChange} keyName={'title'}/>
      <SettingSwitch
        title={'Hide label'}
        value={element.meta.hide_title}
        onChange={onChange}
        keyName={'hide_title'}
        description={'Make sure to show label.'}
      />
      <View style={styles.settingView}>
        <Text style={styles.titleLabel}>Image Url</Text>
        <TextInput
          style={{...styles.title, backgroundColor: '#555F6E'}}
          value={element.meta.tweetUrl}
          placeholder='url...'
          onChangeText={newText => {
            onChange('tweetUrl', newText)
          }}
        />
      </View>
      <SettingDuplicate index={index} element={element} />
    </>
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
});

export default TwitterSetting;
