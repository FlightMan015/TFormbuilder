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
      <SettingHeader title={'List Section Settings'} />
      <SettingSwitch
        title={'Hide label'}
        value={element.meta.hide_title}
        onChange={onChange}
        keyName={'hide_title'}
        description={'Make sure to show label.'}
      />
      <SettingLabel title={'Label'} label={element.meta.title} onChange={onChange} keyName={'title'}/>
      <GridCellFieldSetting fields={element.meta.cellFields} changeData={onChange} />
      <SettingSwitch
        title={'Vertical alignment'}
        value={element.meta.listVerticalAlign}
        onChange={onChange}
        keyName={'listVerticalAlign'}
        description={'Make sure to align vertically.'}
      />
      <SettingDuplicate index={index} element={element} />
    </>
  );
};

export default ListSectionSetting;
