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

const iconPositions = [
  'left',
  'right',
  'above',
  'below',
];

const ButtonSetting = ({element, index, onClick}) => {
  const {colors, size} = useTheme();
  const formData = formStore(state => state.formData);
  const setFormData = formStore(state => state.setFormData);

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
      <SettingHeader title={'Button Settings'} />
      <SettingSwitch
        title={'Round'}
        value={element.meta.isRound}
        onChange={onChange}
        keyName={'isRound'}
        description={'Make sure to make round button.'}
      />
      <ColorPicker
        color={element.meta.backgroundColor || colors.colorButton}
        label={'Background Color'}
        selectColor={e => {
          onChange('backgroundColor', e);
        }}
      />
      <SettingSwitch
        title={'Visible Text'}
        value={element.meta.isText}
        onChange={onChange}
        keyName={'isText'}
        description={'Make sure to show text.'}
      />
      <SettingLabel
        title={'Text'}
        label={element.meta.title}
        onChange={onChange}
        keyName={'title'}
      />
      <FontSetting
        label={'Font'}
        fontColor={element.meta.color || '#FFFFFF'}
        fontSize={element.meta.fontSize}
        fontType={element.meta.fontFamily}
        onChange={(type, e) => {onChange(type, e);}}
      />
      <SettingSwitch
        title={'Visible Icon'}
        value={element.meta.isIcon}
        onChange={onChange}
        keyName={'isIcon'}
        description={'Make sure to show icon.'}
      />
      <SettingIcon
        title={'Icon'}
        onChange={onChange}
        icon={element.meta.icon || 'account'}
        keyName={'icon'}
      />
      <SettingNumber
        title={'Icon Size'}
        value={element.meta.iconSize.toString()}
        onChange={(keyName, value) => onChange(keyName, parseInt(value, 10))}
        keyName={'iconSize'}
      />
      <SettingRadioGroup
        title={'Icon Position'}
        options={iconPositions}
        value={element.meta.iconPosition}
        onChange={onChange}
        keyName={'iconPosition'}
      />
      <SettingDuplicate index={index} element={element} />
    </>
  );
};

export default ButtonSetting;
