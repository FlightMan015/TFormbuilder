import React from 'react';
import {useTheme} from 'react-native-paper';
import SettingHeader from './common/SettingHeader';
import { updateField } from '../../actions/formdata';
import formStore from '../../store/formStore';
import SettingDuplicate from './common/SettingDuplicate';
import SettingLabel from './common/SettingLabel';
import FontSetting from '../../common/FontSetting';
import SettingSwitch from './common/SettingSwitch';
import SettingDropdownOptions from './common/SettingDropdownOptions';

const DataCardSetting = ({element, index, onClick}) => {
  const {colors, size} = useTheme();
  const formData = formStore(state => state.formData);
  const setFormData = formStore(state => state.setFormData);
  const i18nValues = formStore(state => state.i18nValues);

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

  const onChangeFont = (key, type, value) => {
    const tempMeta = {...element.meta};
    const fontData = {...element.meta[key]};
    setFormData({
      ...formData,
      data: updateField(
        formData,
        index,
        {...element, meta: {...tempMeta, [key]: {...fontData, [type]: value}}},
      ),
    });
  }

  return (
    <>
      <SettingHeader title={i18nValues.t("setting_labels.data_card_setting")} />
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
      <SettingDropdownOptions
        title={i18nValues.t("setting_labels.additional_datanames")}
        options={element.meta.datas}
        onChange={onChange}
        keyName={'datas'}
        buttonText={i18nValues.t("setting_labels.new_data")}
      />
      <FontSetting
        label={i18nValues.t("setting_labels.name_font")}
        fontColor={element.meta.nameFont.color}
        fontSize={element.meta.nameFont.fontSize}
        fontType={element.meta.nameFont.fortFamily}
        onChange={(type, e) => {onChangeFont('nameFont', type, e);}}
      />
      <FontSetting
        label={i18nValues.t("setting_labels.description_font")}
        fontColor={element.meta.descriptionFont.color}
        fontSize={element.meta.descriptionFont.fontSize}
        fontType={element.meta.descriptionFont.fortFamily}
        onChange={(type, e) => {onChangeFont('descriptionFont', type, e);}}
      />
      <SettingSwitch
        title={i18nValues.t("setting_labels.small_width")}
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

export default DataCardSetting;
