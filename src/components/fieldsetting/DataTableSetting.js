import React from 'react';
import {useTheme} from 'react-native-paper';
import SettingHeader from './common/SettingHeader';
import { updateField } from '../../actions/formdata';
import formStore from '../../store/formStore';
import SettingDuplicate from './common/SettingDuplicate';
import SettingLabel from './common/SettingLabel';
import SettingSwitch from './common/SettingSwitch';
import DataTableHeaderSetting from './DataTableHeaderSetting';
import ColorPicker from '../../common/ColorPicker';
import SettingSectionWidth from './common/SettingSectionWidth';
import SettingPadding from './common/SettingPadding';

const DataTableSetting = ({element, index, onClick}) => {
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

  return (
    <>
      <SettingHeader title={i18nValues.t("setting_labels.data_table_settings")} />
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
      <ColorPicker
        color={element.meta.backgroundColor || colors.card}
        label={i18nValues.t("setting_labels.background_color")}
        selectColor={e => {
          onChange('backgroundColor', e);
        }}
      />
      <ColorPicker
        color={element.meta.borderColor}
        label={i18nValues.t("setting_labels.border_color")}
        selectColor={e => {
          onChange('borderColor', e);
        }}
      />
      <SettingSwitch
        title={i18nValues.t("setting_labels.vertical_border")}
        value={element.meta.verticalBorder}
        onChange={onChange}
        keyName={'verticalBorder'}
        description={i18nValues.t("setting_labels.vertical_border_description")}
      />
      <SettingSwitch
        title={i18nValues.t("setting_labels.horizontal_border")}
        value={element.meta.horizontalBorder}
        onChange={onChange}
        keyName={'horizontalBorder'}
        description={i18nValues.t("setting_labels.horizontal_border_description")}
      />
      <SettingSwitch
        title={i18nValues.t("setting_labels.small_width")}
        value={element.meta.field_width === '50%'}
        onChange={(key, value) => {
          onChange(key, value ? '50%' : '100%');
        }}
        keyName={'field_width'}
      />
      <SettingSectionWidth
        title={i18nValues.t("setting_labels.width")}
        value={element.meta.field_width}
        onChange={onChange}
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
      <DataTableHeaderSetting fields={element.meta.headers} changeData={onChange} />
      <SettingDuplicate index={index} element={element} />
    </>
  );
};

export default DataTableSetting;
