import React from 'react';
import {useTheme} from 'react-native-paper';
import SettingHeader from './common/SettingHeader';
import { updateField } from '../../actions/formdata';
import formStore from '../../store/formStore';
import SettingDuplicate from './common/SettingDuplicate';
import SettingLabel from './common/SettingLabel';
import SettingSwitch from './common/SettingSwitch';
import BorderSetting from '../../common/BorderSetting';
import SettingPadding from './common/SettingPadding';
import SettingSectionWidth from './common/SettingSectionWidth';
import { allocations, alignItems } from '../../constant';
import SettingDropdown from './common/SettingDropdown';
import ColorPicker from '../../common/ColorPicker';

const SectionSetting = ({element, index, onClick}) => {
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
      <SettingHeader title={i18nValues.t("setting_labels.section_settings")} />
      <SettingLabel title={i18nValues.t("setting_labels.label")} label={element.meta.title} onChange={onChange} keyName={'title'}/>
      <SettingSwitch
        title={i18nValues.t("setting_labels.hide_label")}
        value={element.meta.hide_title}
        onChange={onChange}
        keyName={'hide_title'}
        description={i18nValues.t("setting_labels.hide_label_description")}
      />
      {/* <SettingSwitch
        title={i18nValues.t("setting_labels.small_width")}
        value={element.meta.field_width === '50%'}
        onChange={(key, value) => {
          onChange(key, value ? '50%' : '100%');
        }}
        keyName={'field_width'}
      /> */}
      <SettingSectionWidth
        title={i18nValues.t("setting_labels.width")}
        value={element.meta.field_width}
        onChange={onChange}
        keyName={'field_width'}
      />
      <SettingSwitch
        title={i18nValues.t("setting_labels.align_vertical")}
        value={element.meta.verticalAlign}
        onChange={onChange}
        keyName={'verticalAlign'}
        description={i18nValues.t("setting_labels.vertical_alignment_description")}
      />
      <SettingSwitch
        title={i18nValues.t("setting_labels.is_button")}
        value={element.meta.isButton}
        onChange={onChange}
        keyName={'isButton'}
        description={i18nValues.t("setting_labels.is_button_description")}
      />
      <BorderSetting
        label={i18nValues.t("setting_labels.border")}
        borderWidth={element.meta.borderWidth}
        borderRadius={element.meta.borderRadius}
        borderColor={element.meta.borderColor}
        onChange={onChange}
      />
      <SettingPadding
        title={i18nValues.t("setting_labels.padding")}
        top={element.meta.padding.paddingTop}
        left={element.meta.padding.paddingLeft}
        bottom={element.meta.padding.paddingBottom}
        right={element.meta.padding.paddingRight}
        onChange={onChange}
      />
      <SettingDropdown
        title={i18nValues.t("setting_labels.align_items")}
        options={alignItems}
        onChange={onChange}
        keyName={'alignItems'}
        defaultValue={element.meta.alignItems}
      />
      <SettingDropdown
        title={i18nValues.t("setting_labels.contents_allocation")}
        options={allocations}
        onChange={onChange}
        keyName={'allocation'}
        defaultValue={element.meta.allocation}
      />
      <ColorPicker
        color={element.meta.backgroundColor}
        label={i18nValues.t("setting_labels.button_background_color")}
        selectColor={e => {
          onChange('backgroundColor', e);
        }}
      />
      <SettingDuplicate index={index} element={element} />
    </>
  );
};

export default SectionSetting;
