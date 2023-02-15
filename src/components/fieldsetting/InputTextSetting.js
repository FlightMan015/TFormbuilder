import React from 'react';
import {useTheme} from 'react-native-paper';
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
      <SettingLabel
        title={'Label'}
        label={element.meta.title}
        onChange={onChange}
        keyName={'title'}
      />
      <SettingSwitch
        title={'Hide label'}
        value={element.meta.hide_title}
        onChange={onChange}
        keyName={'hide_title'}
        description={'Make sure to show label.'}
      />
      <SettingSwitch
        title={'Is Mandatory'}
        value={element.is_mandatory}
        onChange={onChange}
        keyName={'is_mandatory'}
      />
      <SettingLabel
        title={'Placeholder'}
        label={element.meta.placeholder}
        onChange={onChange}
        keyName={'placeholder'}
      />
      <SettingNumber
        title={'Number of lines'}
        value={element.meta.numberOfLines}
        onChange={onChange}
        keyName={'numberOfLines'}
      />
      <SettingSwitch
        title={'Multiline'}
        value={element.multiline}
        onChange={onChange}
        keyName={'multiline'}
        description={'Make sure to show multiline.'}
      />
      <SettingDuplicate index={index} element={element} />
    </>
  );
};

export default InputTextSetting;
