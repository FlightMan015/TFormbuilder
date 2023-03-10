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

  return (
    <>
      <SettingHeader title={i18nValues.t("setting_labels.textinput_settings")} />
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
      <SettingSwitch
        title={i18nValues.t("setting_labels.is_mandatory")}
        value={element.is_mandatory}
        onChange={onChange}
        keyName={'is_mandatory'}
      />
      <SettingLabel
        title={i18nValues.t("setting_labels.placeholder")}
        label={element.meta.placeholder}
        onChange={onChange}
        keyName={'placeholder'}
      />
      <SettingSwitch
        title={i18nValues.t("setting_labels.multiline")}
        value={element.meta.multiline}
        onChange={onChange}
        keyName={'multiline'}
        description={i18nValues.t("setting_labels.multiline_description")}
      />
      <SettingDuplicate index={index} element={element} />
    </>
  );
};

export default InputTextSetting;
