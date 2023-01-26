import React from 'react';
import {useTheme, IconButton} from 'react-native-paper';
import {View, StyleSheet, Text} from 'react-native';
import formStore from '../../../store/formStore';

const SettingDuplicate = ({index, element}) => {
  const {colors, size} = useTheme();

  return (
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

export default SettingDuplicate;
