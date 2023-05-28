import React from 'react';
import {useTheme} from 'react-native-paper';
import SettingHeader from './common/SettingHeader';
import { updateField } from '../../actions/formdata';
import formStore from '../../store/formStore';
import SettingDuplicate from './common/SettingDuplicate';
import SettingLabel from './common/SettingLabel';
import SettingSwitch from './common/SettingSwitch';
import SettingNumber from './common/SettingNumber';
import ColorPicker from '../../common/ColorPicker';
import FontSetting from '../../common/FontSetting';
import SettingIcon from './common/SettingIconPicker';
import SettingRadioGroup from './common/SettingRadioGroup';
import SettingDropdown from './common/SettingDropdown';
import SettingWidth from './common/SettingWidth';
import SettingPadding from './common/SettingPadding';
import SettingSectionWidth from './common/SettingSectionWidth';
import { Text } from 'react-native';

const buttonFunctions = [
  'None',
  'Dialog',
];

const ButtonSetting = ({element, index, onClick}) => {
  const {colors, size} = useTheme();
  const formData = formStore(state => state.formData);
  const setFormData = formStore(state => state.setFormData);
  const tempFormData = formStore(state => state.tempFormData);
  const setTempFormData = formStore(state => state.setTempFormData);
  const i18nValues = formStore(state => state.i18nValues);
  const setOpenSetting = formStore(state => state.setOpenSetting);

  const iconPositions = [
    {name: i18nValues.t("setting_labels.left"), value: 'left'},
    {name: i18nValues.t("setting_labels.right"), value: 'right'},
    {name: i18nValues.t("setting_labels.above"), value: 'above'},
    {name: i18nValues.t("setting_labels.below"), value: 'below'},
  ];

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
      <SettingHeader title={i18nValues.t("setting_labels.button_settings")} />
      <SettingDropdown
        title={i18nValues.t("setting_labels.functions")}
        options={buttonFunctions}
        onChange={onChange}
        keyName={'function'}
        defaultValue={'None'}
      />
      {
        element.meta.function === 'Dialog' && (
          <Text
            style={{textDecorationLine: 'underline', color: colors.colorButton, marginLeft: 15, marginBottom: 10}}
            onPress={() => {
              setTempFormData({...tempFormData, data: formData, type: 'dialog', index: index, element: element});
              setFormData({...formData, data: element.meta.dialogData || []});
              setOpenSetting(false);
            }}>
            {i18nValues.t("setting_labels.go_to_dialog_editing")}
          </Text>
        )
      }
      <SettingSwitch
        title={i18nValues.t("setting_labels.round")}
        value={element.meta.isRound}
        onChange={onChange}
        keyName={'isRound'}
        description={i18nValues.t("setting_labels.round_description")}
      />
      <SettingWidth
        title={i18nValues.t("setting_labels.width")}
        width={element.meta.width}
        onChange={onChange}
        keyName={'width'}
      />
      <ColorPicker
        color={element.meta.backgroundColor || colors.colorButton}
        label={i18nValues.t("setting_labels.background_color")}
        selectColor={e => {
          onChange('backgroundColor', e);
        }}
      />
      <SettingSwitch
        title={i18nValues.t("setting_labels.visible_text")}
        value={element.meta.isText}
        onChange={onChange}
        keyName={'isText'}
        description={i18nValues.t("setting_labels.visible_text_description")}
      />
      {
        element.meta.isText && (
          <>
            <SettingLabel
              title={i18nValues.t("setting_labels.text")}
              label={element.meta.title}
              onChange={onChange}
              keyName={'title'}
            />
            <FontSetting
              label={i18nValues.t("setting_labels.font")}
              fontColor={element.meta.color || '#FFFFFF'}
              fontSize={element.meta.fontSize}
              fontType={element.meta.fontFamily}
              onChange={(type, e) => {onChange(type, e);}}
            />
          </>
        )
      }
      <SettingSwitch
        title={i18nValues.t("setting_labels.visible_icon")}
        value={element.meta.isIcon}
        onChange={onChange}
        keyName={'isIcon'}
        description={i18nValues.t("setting_labels.visible_icon_description")}
      />
      {
        element.meta.isIcon && (
          <>
            <SettingIcon
              title={i18nValues.t("setting_labels.icon")}
              onChange={onChange}
              icon={element.meta.icon || 'account'}
              keyName={'icon'}
            />
            <SettingNumber
              title={i18nValues.t("setting_labels.icon_size")}
              value={element.meta.iconSize.toString()}
              onChange={(keyName, value) => onChange(keyName, parseInt(value, 10))}
              keyName={'iconSize'}
            />
            <SettingRadioGroup
              title={i18nValues.t("setting_labels.icon_position")}
              options={iconPositions}
              value={element.meta.iconPosition}
              onChange={onChange}
              keyName={'iconPosition'}
            />
          </>
        )
      }
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

export default ButtonSetting;
