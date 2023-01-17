import React from 'react';
import {useTheme, IconButton} from 'react-native-paper';
import {View, StyleSheet, Text, TextInput, Switch} from 'react-native';
import SettingHeader from './common/SettingHeader';
import { updateField } from '../../actions/formdata';
import formStore from '../../store/formStore';

const InputTextSetting = ({element, index, onClick}) => {
  const {colors, size} = useTheme();
  const formData = formStore(state => state.formData);
  const setFormData = formStore(state => state.setFormData);
  const setElement = formStore(state => state.setSelectedField);

  return (
    <>
      <SettingHeader title={'TextInput Settings'} />
      <View style={styles.settingView}>
        <Text style={styles.titleLabel}>Label</Text>
        <TextInput
          style={styles.title}
          value={element.meta.title}
          onChangeText={newText => {
            const tempMeta = JSON.parse(JSON.stringify(element.meta));
            setElement({...element, meta: {...tempMeta, title: newText}});
            setFormData({
              ...formData,
              data: updateField(
                formData,
                {childIndex: index},
                {...element, meta: {...tempMeta, title: newText}},
              ),
            });
          }}
        />
      </View>
      <View style={styles.settingView}>
        <Text style={styles.titleLabel}>Is Mandatory</Text>
        <View style={styles.switchView}>
          <Text style={styles.description}>
            Make sure to fill this field.
          </Text>
          <Switch
            trackColor={styles.switchTrackColor}
            thumbColor={element.is_mandatory ? '#FFFFFF' : '#FFFFFF'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={e => {
              setElement({...element, is_mandatory: e});
              setFormData({
                ...formData,
                data: updateField(
                  formData,
                  {childIndex: index},
                  {...element, is_mandatory: e},
                ),
              });
            }}
            value={element.is_mandatory}
          />
        </View>
      </View>
      <View style={styles.settingView}>
        <Text style={styles.titleLabel}>Duplicate Element</Text>
        <IconButton
          icon="content-duplicate"
          size={35}
          iconColor="#FFFFFF"
          style={styles.duplicateButton}
          onPress={() => {}}
        />
        <Text style={styles.description1}>
          Clone selected elements with all saved properties.
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  menuHeader: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: 18,
    color: '#fff',
    paddingLeft: 15,
  },
  title: {
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
  description: {
    fontSize: 14,
    color: '#ABB3B2',
  },
  switchView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchTrackColor: {
    false: '#767577',
    true: '#0099FF',
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
});

export default InputTextSetting;
