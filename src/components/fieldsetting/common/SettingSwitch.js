import React from 'react';
import {useTheme} from 'react-native-paper';
import {View, StyleSheet, Text, Switch} from 'react-native';
import formStore from '../../../store/formStore';

const SettingSwitch = ({title, value, onChange, keyName, description}) => {
  const {colors, size} = useTheme();
  const i18nValues = formStore(state => state.i18nValues);

  return (
    <View style={styles.settingView}>
      <Text style={styles.titleLabel}>{title}</Text>
      <View style={styles.switchView}>
        <Text style={styles.description}>
          {description || i18nValues.t("setting_labels.is_mandatory_description")}
        </Text>
        <Switch
          trackColor={styles.switchTrackColor}
          thumbColor={value ? '#FFFFFF' : '#FFFFFF'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={e => {
            onChange(keyName, e);
          }}
          value={value}
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
});

export default SettingSwitch;
