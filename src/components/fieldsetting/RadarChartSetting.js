import React from 'react';
import SettingHeader from './common/SettingHeader';
import { updateField } from '../../actions/formdata';
import formStore from '../../store/formStore';
import SettingDuplicate from './common/SettingDuplicate';
import SettingLabel from './common/SettingLabel';
import SettingSwitch from './common/SettingSwitch';

const RadarChartSetting = ({element, index}) => {
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
      <SettingHeader title={'Radar Chart Settings'} />
      <SettingLabel title={'Label'} label={element.meta.title} onChange={onChange} keyName={'title'}/>
      <SettingSwitch
        title={'Hide label'}
        value={element.meta.hide_title}
        onChange={onChange}
        keyName={'hide_title'}
        description={'Make sure to show label.'}
      />
      <SettingDuplicate index={index} element={element} />
    </>
  );
};

export default RadarChartSetting;
