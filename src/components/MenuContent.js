import React, { useEffect, useMemo } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {IconButton} from 'react-native-paper';
import {fieldMenuData, newFieldData} from '../constant';
import Icon from 'react-native-vector-icons/Feather';
import formStore from '../store/formStore';
import { useDrawerStatus } from '@react-navigation/drawer';
import { addField } from '../actions/formdata';
import { ScrollView } from 'react-native-gesture-handler';

const MenuContent = () => {
  const formData = formStore(state => state.formData);
  const setFormData = formStore(state => state.setFormData);
  const setOpenMenu = formStore(state => state.setOpenMenu);
  const indexToAdd = formStore(state => state.indexToAdd);
  const selectMenu = component => {
    setFormData({...formData, data: addField(component, formData, indexToAdd)});
  };

  const status = useDrawerStatus();

  useEffect(() => {
    if (status === 'closed') {
      setOpenMenu(false)
    }
  }, [status]);

  return useMemo(() => (
    <View style={styles.menuContainer}>
      <View style={styles.menuHeader}>
        <Text style={styles.menuTitle}>Form Fields</Text>
        <IconButton
          icon="close"
          size={20}
          iconColor="#FFFFFF"
          onPress={() => setOpenMenu(false)}
        />
      </View>
      <ScrollView style={styles.menuBody} persistentScrollbar>
        {fieldMenuData.items.map((item, index) => {
          if (!('groupIndex' in indexToAdd) || !('groupIndex' in indexToAdd && index == 0)) {
            return (
              <View key={index}>
                <Text style={styles.subHeader}>{item.name}</Text>
                {item.items.map((subItem, subIndex) => {
                  return (
                    <TouchableOpacity
                      key={subIndex}
                      style={styles.fieldListItem}
                      onPress={() => {
                        selectMenu(subItem.key);
                      }}>
                      <View style={styles.fieldIcon}>
                        <Icon name={subItem.icon} size={18} color={'white'} />
                      </View>
                      <View style={styles.fieldText}>
                        <Text style={styles.fieldNameText}>{subItem.name}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          }
        })}
      </ScrollView>
    </View>
  ), [JSON.stringify(indexToAdd), JSON.stringify(formData)]);
};

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
  },
  menuHeader: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#565F6E',
    borderBottomWidth: 1,
    borderBottomColor: '#4C5360',
  },
  menuTitle: {
    fontSize: 18,
    color: '#fff',
    paddingLeft: 10,
  },
  menuBody: {
    flex: 1,
  },
  subHeader: {
    height: 30,
    backgroundColor: '#404651',
    color: '#fff',
    size: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  fieldListItem: {
    height: 60,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#4C5360',
  },
  fieldNameText: {
    color: '#fff',
  },
  fieldText: {
    flex: 1,
    backgroundColor: '#565F6E',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  fieldIcon: {
    backgroundColor: '#394049',
    width: 60,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default MenuContent;
