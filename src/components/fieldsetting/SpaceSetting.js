import React from 'react';
import {useTheme} from 'react-native-paper';
import SettingHeader from './common/SettingHeader';
import {updateField} from '../../actions/formdata';
import formStore from '../../store/formStore';
import SettingDuplicate from './common/SettingDuplicate';
import SettingNumber from './common/SettingNumber';
import ColorPicker from '../../common/ColorPicker';

const SpaceSetting = ({element, index, onClick}) => {
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

  return (
    <>
      <SettingHeader title={i18nValues.t('setting_labels.space_settings')} />
      <SettingNumber
        title={i18nValues.t('setting_labels.width')}
        value={element.meta.width.toString()}
        onChange={(keyName, value) => onChange(keyName, parseInt(value, 10))}
        keyName={'width'}
      />
      <SettingNumber
        title={i18nValues.t('setting_labels.height')}
        value={element.meta.height.toString()}
        onChange={(keyName, value) => onChange(keyName, parseInt(value, 10))}
        keyName={'height'}
      />
      <ColorPicker
        color={element.meta.backgroundColor}
        label={i18nValues.t("setting_labels.background_color")}
        selectColor={e => {
          onChange('backgroundColor', e);
        }}
      />
      <SettingDuplicate index={index} element={element} />
    </>
  );
};

export default SpaceSetting;
