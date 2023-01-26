import React from 'react';
import {useTheme, IconButton} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import SettingHeader from './common/SettingHeader';
import { updateField } from '../../actions/formdata';
import formStore from '../../store/formStore';
import SettingNumber from './common/SettingNumber';
import SettingDuplicate from './common/SettingDuplicate';
import SettingLabel from './common/SettingLabel';
import SettingSwitch from './common/SettingSwitch';

const InputTextSetting = ({element, index, onClick}) => {
  const {colors, size} = useTheme();
  const formData = formStore(state => state.formData);
  const setFormData = formStore(state => state.setFormData);

  const onChange = (key, value) => {
    if (key === 'is_mandatory') {
      setFormData({
        ...formData,
        data: updateField(
          formData,
          index,
          {...element, [key]: value},
        ),
      });
    } else {
      const tempMeta = JSON.parse(JSON.stringify(element.meta));
      setFormData({
        ...formData,
        data: updateField(
          formData,
          index,
          {...element, meta: {...tempMeta, [key]: value}},
        ),
      });
    }
  };

  return (
    <>
      <SettingHeader title={'TextInput Settings'} />
      <SettingLabel title={'Label'} label={element.meta.title} onChange={onChange} keyName={'title'}/>
      <SettingSwitch title={'Is Mandatory'} value={element.is_mandatory} onChange={onChange} keyName={'is_mandatory'} />
      <SettingNumber title={'Number of lines'} value={element.meta.numberOfLines} onChange={onChange} keyName={'numberOfLines'} />
      <SettingDuplicate index={index} element={element} />
    </>
  );
};

export default InputTextSetting;
