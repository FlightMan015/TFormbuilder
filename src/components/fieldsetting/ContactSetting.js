import React from 'react';
import {useTheme} from 'react-native-paper';
import SettingHeader from './common/SettingHeader';
import { updateField } from '../../actions/formdata';
import formStore from '../../store/formStore';
import SettingDuplicate from './common/SettingDuplicate';
import SettingLabel from './common/SettingLabel';
import FontSetting from '../../common/FontSetting';
import SettingSwitch from './common/SettingSwitch';
import SettingContacts from './common/SettingContacts';
import SettingSectionWidth from './common/SettingSectionWidth';
import SettingPadding from './common/SettingPadding';

const ContactSetting = ({element, index, onClick}) => {
  const {colors, size} = useTheme();
  const formData = formStore(state => state.formData);
  const setFormData = formStore(state => state.setFormData);
  const i18nValues = formStore(state => state.i18nValues);
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
      <SettingHeader title={i18nValues.t("setting_labels.contact_setting")} />
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
      <SettingLabel title={i18nValues.t("setting_labels.name1")} label={element.meta.name1} onChange={onChange} keyName={'name1'}/>
      <SettingLabel title={i18nValues.t("setting_labels.content1")} label={element.meta.content1} onChange={onChange} keyName={'content1'}/>
      <SettingLabel title={i18nValues.t("setting_labels.name2")} label={element.meta.name2} onChange={onChange} keyName={'name2'}/>
      <SettingLabel title={i18nValues.t("setting_labels.content2")} label={element.meta.content2} onChange={onChange} keyName={'content2'}/>
      <FontSetting
        label={i18nValues.t("setting_labels.label_font")}
        fontColor={element.meta.nameFont.color}
        fontSize={element.meta.nameFont.fontSize}
        fontType={element.meta.nameFont.fontFamily}
        onChange={(type, e) => {onChangeFont('nameFont', type, e);}}
      />
      <FontSetting
        label={i18nValues.t("setting_labels.content_font")}
        fontColor={element.meta.contentFont.color}
        fontSize={element.meta.contentFont.fontSize}
        fontType={element.meta.contentFont.fontFamily}
        onChange={(type, e) => {onChangeFont('contentFont', type, e);}}
      />
      <SettingContacts
        title={i18nValues.t("setting_labels.other_contacts")}
        checkedContacts={element.meta.otherContacts}
        onChange={onChange}
        keyName={'otherContacts'}
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
      <SettingDuplicate index={index} element={element} />
    </>
  );
};

export default ContactSetting;
