import React from 'react';
import {useTheme} from 'react-native-paper';
import SettingHeader from './common/SettingHeader';
import { updateField } from '../../actions/formdata';
import formStore from '../../store/formStore';
import SettingDuplicate from './common/SettingDuplicate';
import SettingLabel from './common/SettingLabel';
import SettingSwitch from './common/SettingSwitch';

const FileUploadSetting = ({element, index, onClick}) => {
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
      <SettingHeader title={'File Upload Settings'} />
      <SettingLabel title={'Label'} label={element.meta.title} onChange={onChange} keyName={'title'}/>
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
      <SettingSwitch title={'Multiple selection'} value={element.meta.multi_select} onChange={onChange} keyName={'multi_select'} />
      <SettingDuplicate index={index} element={element} />
    </>
  );
};

export default FileUploadSetting;
