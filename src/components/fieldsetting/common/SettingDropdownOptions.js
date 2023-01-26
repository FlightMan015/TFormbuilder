import React from 'react';
import {useTheme, IconButton} from 'react-native-paper';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import TextButton from '../../../common/TextButton';

const SettingDropdownOptions = ({title, options, onChange, keyName}) => {
  const {colors, size} = useTheme();

  return (
    <View style={styles.settingView}>
      <Text style={styles.titleLabel}>{title}</Text>
      {
        options.map((child, childIndex) => {
          return (
            <View key={childIndex} style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput
                style={styles.title}
                value={child}
                onChangeText={newText => {
                  const tempChilds = JSON.parse(JSON.stringify(options));
                  tempChilds.splice(childIndex, 1, newText);
                  onChange(keyName, tempChilds);
                }}
              />
              <IconButton
                icon="delete-outline"
                size={18}
                iconColor="#FFFFFF"
                style={styles.actBtn}
                onPress={() => {
                  const tempChilds = JSON.parse(JSON.stringify(options));
                  tempChilds.splice(childIndex, 1);
                  onChange(keyName, tempChilds);
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
          const tempChilds = JSON.parse(JSON.stringify(options));
          tempChilds.push('New option');
          onChange(keyName, tempChilds);
        }}
      />
    </View>
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
  actBtn: {
    margin: 0,
    backgroundColor: '#FF4947',
    marginHorizontal: 10,
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

export default SettingDropdownOptions;
