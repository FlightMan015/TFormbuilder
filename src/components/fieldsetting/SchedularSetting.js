import React from 'react';
import {useTheme} from 'react-native-paper';
import SettingHeader from './common/SettingHeader';
import { updateField } from '../../actions/formdata';
import formStore from '../../store/formStore';
import SettingDuplicate from './common/SettingDuplicate';
import SettingLabel from './common/SettingLabel';
import SettingSwitch from './common/SettingSwitch';
import FontSetting from '../../common/FontSetting';

const SchedularSetting = ({element, index, onClick}) => {
  const {colors, size} = useTheme();
  const formData = formStore(state => state.formData);
  const setFormData = formStore(state => state.setFormData);
  const updateFormData = formStore(state => state.updateFormData);

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

  const onChangeFont = (key, subkey, value) => {
    const tempMeta = {...element.meta};
    const subdata = {...tempMeta[key], [subkey]: value};
    updateFormData(index, {...element, meta: {...tempMeta, [key]: subdata}});
  };

  return (
    <>
      <SettingHeader title={'Schedular Settings'} />
      <SettingLabel title={'Label'} label={element.meta.title} onChange={onChange} keyName={'title'}/>
      <SettingSwitch
        title={'Hide label'}
        value={element.meta.hide_title}
        onChange={onChange}
        keyName={'hide_title'}
        description={'Make sure to show label.'}
      />
      <FontSetting
        label={'Month Font'}
        fontColor={element.meta.monthFont.color}
        fontSize={element.meta.monthFont.fontSize}
        fontType={element.meta.monthFont.fontFamily}
        onChange={(type, e) => {onChangeFont('monthFont', type, e);}}
      />
      <FontSetting
        label={'Date Font'}
        fontColor={element.meta.dateFont.color}
        fontSize={element.meta.dateFont.fontSize}
        fontType={element.meta.dateFont.fontFamily}
        onChange={(type, e) => {onChangeFont('dateFont', type, e);}}
      />
      <FontSetting
        label={'Day Font'}
        fontColor={element.meta.dayFont.color}
        fontSize={element.meta.dayFont.fontSize}
        fontType={element.meta.dayFont.fontFamily}
        onChange={(type, e) => {onChangeFont('dayFont', type, e);}}
      />
      <FontSetting
        label={'Schedule Text Font'}
        fontColor={element.meta.scheduleFont.color}
        fontSize={element.meta.scheduleFont.fontSize}
        fontType={element.meta.scheduleFont.fontFamily}
        onChange={(type, e) => {onChangeFont('scheduleFont', type, e);}}
      />
      <SettingDuplicate index={index} element={element} />
    </>
  );
};

export default SchedularSetting;
