import React from 'react';
import {useTheme} from 'react-native-paper';
import SettingHeader from './common/SettingHeader';
import { updateField } from '../../actions/formdata';
import formStore from '../../store/formStore';
import SettingDuplicate from './common/SettingDuplicate';
import SettingLabel from './common/SettingLabel';
import SettingSwitch from './common/SettingSwitch';
import GridCellFieldSetting from './GridCellFieldSetting';

const ListSectionSetting = ({element, index, onClick}) => {
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
      <SettingHeader title={i18nValues.t("setting_labels.list_section_settings")} />
      <SettingSwitch
        title={i18nValues.t("setting_labels.hide_label")}
        value={element.meta.hide_title}
        onChange={onChange}
        keyName={'hide_title'}
        description={i18nValues.t("setting_labels.hide_label_description")}
      />
      <SettingLabel title={i18nValues.t("setting_labels.label")} label={element.meta.title} onChange={onChange} keyName={'title'}/>
      <GridCellFieldSetting fields={element.meta.cellFields} changeData={onChange} />
      <SettingSwitch
        title={i18nValues.t("setting_labels.vertical_alignment")}
        value={element.meta.listVerticalAlign}
        onChange={onChange}
        keyName={'listVerticalAlign'}
        description={i18nValues.t("setting_labels.vertical_alignment_description")}
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

export default ListSectionSetting;
