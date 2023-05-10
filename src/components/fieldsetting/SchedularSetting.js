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
  const i18nValues = formStore(state => state.i18nValues);

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

  const onChangeFont = (key, subkey, value) => {
    const tempMeta = {...element.meta};
    const subdata = {...tempMeta[key], [subkey]: value};
    updateFormData(index, {...element, meta: {...tempMeta, [key]: subdata}});
  };

  return (
    <>
      <SettingHeader title={i18nValues.t("setting_labels.schedular_settings")} />
      <SettingLabel title={i18nValues.t("setting_labels.label")} label={element.meta.title} onChange={onChange} keyName={'title'}/>
      <SettingSwitch
        title={i18nValues.t("setting_labels.hide_label")}
        value={element.meta.hide_title}
        onChange={onChange}
        keyName={'hide_title'}
        description={i18nValues.t("setting_labels.hide_label_description")}
      />
      <SettingSwitch
        title={i18nValues.t("setting_labels.is_mandatory")}
        value={element.is_mandatory}
        onChange={onChange}
        keyName={'is_mandatory'}
      />
      <FontSetting
        label={i18nValues.t("setting_labels.month_text_font")}
        fontColor={element.meta.monthFont.color}
        fontSize={element.meta.monthFont.fontSize}
        fontType={element.meta.monthFont.fontFamily}
        onChange={(type, e) => {onChangeFont('monthFont', type, e);}}
      />
      <FontSetting
        label={i18nValues.t("setting_labels.date_text_font")}
        fontColor={element.meta.dateFont.color}
        fontSize={element.meta.dateFont.fontSize}
        fontType={element.meta.dateFont.fontFamily}
        onChange={(type, e) => {onChangeFont('dateFont', type, e);}}
      />
      <FontSetting
        label={i18nValues.t("setting_labels.day_text_font")}
        fontColor={element.meta.dayFont.color}
        fontSize={element.meta.dayFont.fontSize}
        fontType={element.meta.dayFont.fontFamily}
        onChange={(type, e) => {onChangeFont('dayFont', type, e);}}
      />
      <FontSetting
        label={i18nValues.t("setting_labels.schedule_text_font")}
        fontColor={element.meta.scheduleFont.color}
        fontSize={element.meta.scheduleFont.fontSize}
        fontType={element.meta.scheduleFont.fontFamily}
        onChange={(type, e) => {onChangeFont('scheduleFont', type, e);}}
      />
      <SettingSwitch
        title={i18nValues.t("setting_labels.small_width")}
        value={element.meta.field_width === '50%'}
        onChange={(key, value) => {
          onChange(key, value ? '50%' : '100%');
        }}
        keyName={'field_width'}
      />
      <SettingPadding
        title={i18nValues.t("setting_labels.padding")}
        top={element.meta.padding.paddingTop}
        left={element.meta.padding.paddingLeft}
        bottom={element.meta.padding.paddingBottom}
        right={element.meta.padding.paddingRight}
        onChange={onChange}
      />
      <SettingDuplicate index={index} element={element} />
    </>
  );
};

export default SchedularSetting;
