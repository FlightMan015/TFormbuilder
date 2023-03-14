import React from 'react';
import {useTheme, IconButton, Checkbox} from 'react-native-paper';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import formStore from '../../../store/formStore';
import Icon from 'react-native-vector-icons/FontAwesome';

const contacts = [
  {name: 'Twitter', icon: 'twitter', uri: ''},
  {name: 'Facebook', icon: 'facebook', uri: ''},
  {name: 'Instagram', icon: 'instagram', uri: ''},
  {name: 'Snapchat', icon: 'snapchat-ghost', uri: ''},
]

const SettingContacts = ({title, checkedContacts, onChange, keyName}) => {

  return (
    <View style={styles.settingView}>
      <Text style={styles.menuTitle}>{title}</Text>
      {
        contacts.map((contact, index) => (
          <View key={index}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Checkbox
                color={'#FFFFFF'}
                status={checkedContacts.findIndex(e => e.name === contact.name) !== -1 ? 'checked' : 'unchecked'}
                onPress={() => {
                  const tempContacts = [...checkedContacts];
                  const tempIndex = checkedContacts.findIndex(e => e.name === contact.name);
                  if (tempIndex < 0) {
                    tempContacts.push(contact);
                  } else {
                    tempContacts.splice(tempIndex, 1);
                  }
                  onChange(keyName, tempContacts);
                }}
              />
              <Icon name={contact.icon} color={'#FFFFFF'} size={20} />
              <Text style={{flex: 1, color: '#FFFFFF', marginLeft: 10}}>{contact.name}</Text>
            </View>
            {
              checkedContacts.findIndex(e => e.name === contact.name) !== -1 && (
                <TextInput
                  style={styles.title}
                  value={contact.uri}
                  placeholder={`${contact.name} uri...`}
                  onChangeText={newText => {
                    const tempContacts = [...checkedContacts];
                    const tempIndex = checkedContacts.findIndex(e => e.name === contact.name);
                    const oldContact = {...tempContacts[tempIndex]};
                    tempContacts.splice(tempIndex, 1, {...oldContact, uri: newText});
                    onChange(keyName, tempContacts);
                  }}
                />
              )
            }
          </View>
        ))
      }
    </View>
  );
};

const styles = StyleSheet.create({
  settingView: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#4B5260',
  },
  menuHeader: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: 18,
    color: '#fff',
  },
  title: {
    // height: 40,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#303339',
    backgroundColor: '#555F6E',
    paddingLeft: 10,
    paddingVertical: 5,
    marginLeft: 10
  },
});

export default SettingContacts;
