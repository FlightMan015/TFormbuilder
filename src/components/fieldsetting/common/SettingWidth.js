import React from 'react';
import {useTheme} from 'react-native-paper';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

const SettingWidth = ({title, width, onChange, keyName}) => {
  const {colors, size} = useTheme();

  return (
    <View style={styles.settingView}>
      <Text style={styles.titleLabel}>{title}</Text>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: width === 'fit_content' ? colors.colorButton : '#555F6E',
            borderWidth: 1,
            borderRadius: 3,
            borderColor: '#303339'
          }}
          onPress={() => {onChange(keyName, 'fit_content')}}
        >
          <Text style={{fontSize: 16, color: '#FFFFFF', paddingVertical: 10, textAlign: 'center'}}>Fit content</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: width === 'auto' ? colors.colorButton : '#555F6E',
            borderWidth: 1,
            borderRadius: 3,
            borderColor: '#303339'
          }}
          onPress={() => {onChange(keyName, 'auto')}}
        >
          <Text style={{fontSize: 16, color: '#FFFFFF', paddingVertical: 10, textAlign: 'center'}}>Auto</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  settingView: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#4B5260',
  },
  titleLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
});

export default SettingWidth;
