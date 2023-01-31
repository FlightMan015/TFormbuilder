import React from 'react';
import {useTheme, IconButton} from 'react-native-paper';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import SettingHeader from './common/SettingHeader';
import { updateField, addField, deleteField } from '../../actions/formdata';
import formStore from '../../store/formStore';
import SettingLabel from './common/SettingLabel';
import TextButton from '../../common/TextButton';
import { componentName } from '../../constant';
import SettingDuplicate from './common/SettingDuplicate';
import SettingSwitch from './common/SettingSwitch';

const TabSectionSetting = ({element, index, onClick}) => {
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
      <SettingHeader title={'Tab Section Settings'} />
      <SettingLabel title={'Label'} label={element.meta.title} onChange={onChange} keyName={'title'}/>
      <SettingSwitch
        title={'Hide label'}
        value={element.meta.hide_title}
        onChange={onChange}
        keyName={'hide_title'}
        description={'Make sure to show label.'}
      />
      <View style={styles.settingView}>
        <Text style={styles.titleLabel}>Tabs</Text>
        {
          element.meta.childs.map((child, childIndex) => {
            return (
              <View key={childIndex} style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextInput
                  style={styles.title}
                  value={child.meta.title}
                  onChangeText={newText => {
                    const tempChilds = JSON.parse(JSON.stringify(element.meta.childs));
                    const tempChild = JSON.parse(JSON.stringify(child));
                    const newChild = {...child, meta: {...tempChild.meta, title: newText}};
                    tempChilds.splice(childIndex, 1, newChild);
                    onChange('childs', tempChilds);
                  }}
                />
                <IconButton
                  icon="delete-outline"
                  size={18}
                  iconColor="#FFFFFF"
                  style={styles.actBtn}
                  onPress={() => {
                    setFormData({
                      ...formData,
                      data: deleteField(formData, {...index, tabIndex: childIndex}),
                    });
                  }}
                />
              </View>
            );
          })
        }
        <TextButton
          style={styles.addCardBtn}
          text="New tab"
          textStyle={styles.addCardText}
          onPress={() => {
            setFormData({
              ...formData,
              data: addField(componentName.TAB, formData, index),
            });
          }}
        />
      </View>
      <SettingDuplicate index={index} element={element} />
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    width: 200,
    height: 40,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#303339',
    backgroundColor: '#555F6E',
    paddingLeft: 10,
  },
  titleLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  settingView: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#4B5260',
  },
  description1: {
    fontSize: 14,
    color: '#ABB3B2',
    marginTop: 5,
  },
  duplicateButton: {
    margin: 0,
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#303339',
    backgroundColor: '#555F6E',
  },
  actBtn: {
    margin: 0,
    backgroundColor: '#FF4947',
    marginHorizontal: 10,
  },
  addCardBtn: {
    width: '100%',
    padding: 7,
    backgroundColor: '#626E81',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#303339',
    marginTop: 10,
  },
  addCardText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default TabSectionSetting;
