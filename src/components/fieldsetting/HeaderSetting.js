import React from 'react';
import {useTheme} from 'react-native-paper';
import SettingHeader from './common/SettingHeader';
import {updateField} from '../../actions/formdata';
import formStore from '../../store/formStore';
import SettingDuplicate from './common/SettingDuplicate';
import SettingLabel from './common/SettingLabel';
import SettingTextAlign from './common/SettingTextAlign';
import FontSetting from '../../common/FontSetting';
import SettingSwitch from './common/SettingSwitch';

const HeaderSetting = ({element, index, onClick}) => {
  const {colors, size} = useTheme();
  const formData = formStore(state => state.formData);
  const setFormData = formStore(state => state.setFormData);
  const i18nValues = formStore(state => state.i18nValues);

  const onChange = (key, value) => {
    const tempMeta = JSON.parse(JSON.stringify(element.meta));
    setFormData({
      ...formData,
      data: updateField(formData, index, {
        ...element,
        meta: {...tempMeta, [key]: value},
      }),
    });
  };

  const onChangeFont = (key, type, value) => {
    const tempMeta = {...element.meta};
    const fontData = {...element.meta[key]};
    setFormData({
      ...formData,
      data: updateField(formData, index, {
        ...element,
        meta: {...tempMeta, [key]: {...fontData, [type]: value}},
      }),
    });
  };

  return (
    <>
      <SettingHeader title={i18nValues.t('setting_labels.header_settings')} />
      <SettingLabel
        title={i18nValues.t('setting_labels.header_text')}
        label={element.meta.header}
        onChange={onChange}
        keyName={'header'}
        multiline={true}
      />
      <SettingTextAlign
        title={i18nValues.t('setting_labels.text_align')}
        textAlign={element.meta.textAlign}
        onChange={onChange}
        keyName={'textAlign'}
      />
      <FontSetting
        label={i18nValues.t('setting_labels.font')}
        fontColor={element.meta.font.color}
        fontSize={element.meta.font.fontSize}
        fontType={element.meta.font.fortFamily}
        onChange={(type, e) => {
          onChangeFont('font', type, e);
        }}
      />
      <SettingSwitch
        title={i18nValues.t('setting_labels.small_width')}
        value={element.meta.field_width === '50%'}
        onChange={(key, value) => {
          onChange(key, value ? '50%' : '100%');
        }}
        keyName={'field_width'}
      />
      <SettingDuplicate index={index} element={element} />
    </>
  );
};

export default HeaderSetting;
