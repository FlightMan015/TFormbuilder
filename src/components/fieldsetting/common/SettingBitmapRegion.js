import React from 'react';
import {useTheme} from 'react-native-paper';
import {View, StyleSheet, Text, Switch} from 'react-native';
import formStore from '../../../store/formStore';

const SettingBitmapRegion = ({title, userSelectableValue, selectedShowValue, defaultStateValue, onChange}) => {
  const {colors, size} = useTheme();
  const i18nValues = formStore(state => state.i18nValues);

  return (
    <View style={styles.settingView}>
      <Text style={styles.titleLabel}>{'Region Setting'}</Text>
      <Text style={styles.titleLabel1}>{'User Selectable'}</Text>
      <View style={styles.switchView}>
        <Text style={styles.description}>
          {'User can select the region'}
        </Text>
        <Switch
          trackColor={styles.switchTrackColor}
          thumbColor={userSelectableValue ? '#FFFFFF' : '#FFFFFF'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={e => {
            onChange('userSelectable', e);
          }}
          value={userSelectableValue}
        />
      </View>
      <Text style={styles.titleLabel1}>{'When selected'}</Text>
      <View style={styles.switchView}>
        <Text style={styles.description}>
          {'Show selected region'}
        </Text>
        <Switch
          trackColor={styles.switchTrackColor}
          thumbColor={selectedShowValue ? '#FFFFFF' : '#FFFFFF'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={e => {
            onChange('selectedShow', e);
          }}
          value={selectedShowValue}
        />
      </View>
      <Text style={styles.titleLabel1}>{'Default State'}</Text>
      <View style={styles.switchView}>
        <Text style={styles.description}>
          {'Selected state of region'}
        </Text>
        <Switch
          trackColor={styles.switchTrackColor}
          thumbColor={defaultStateValue ? '#FFFFFF' : '#FFFFFF'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={e => {
            onChange('defaultState', e);
          }}
          value={defaultStateValue}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  titleLabel1: {
    fontSize: 15,
    color: '#fff',
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
    marginBottom: 10,
  },
  switchTrackColor: {
    false: '#767577',
    true: '#0099FF',
  },
});

export default SettingBitmapRegion;
