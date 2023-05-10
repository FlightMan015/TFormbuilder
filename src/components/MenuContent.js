import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {IconButton} from 'react-native-paper';
import {componentName, fieldMenuData, newFieldData} from '../constant';
import Icon from 'react-native-vector-icons/Feather';
import formStore from '../store/formStore';
import {useDrawerStatus} from '@react-navigation/drawer';
import {addField} from '../actions/formdata';
import {ScrollView} from 'react-native-gesture-handler';

const MenuContent = () => {
  const formData = formStore(state => state.formData);
  const setFormData = formStore(state => state.setFormData);
  const setOpenMenu = formStore(state => state.setOpenMenu);
  const formValue = formStore(state => state.formValue);
  const setFormValue = formStore(state => state.setFormValue);
  const i18nValues = formStore(state => state.i18nValues);
  const selectedField = formStore(state => state.selectedField);
  const selectedFieldIndex = formStore(state => state.selectedFieldIndex);
  const indexToAdd = formStore(state => state.indexToAdd);

  const selectMenu = component => {
    const field_name = newFieldData[component].field_name + '-' + Date.now();
    if (component === componentName.DATE_PICKER) {
      setFormValue({
        ...formValue,
        [field_name]: new Date(Date.now()).toISOString().split('T')[0],
      });
    }
    if (component === componentName.TIME_PICKER) {
      setFormValue({
        ...formValue,
        [field_name]: new Date(Date.now()).toLocaleString(),
      });
    }
    if (component === componentName.LINECHART) {
      setFormValue({
        ...formValue,
        [field_name]: newFieldData[component].meta.data,
      });
    }
    if (component === componentName.BARCHART) {
      setFormValue({
        ...formValue,
        [field_name]: newFieldData[component].meta.data,
      });
    }
    if (component === componentName.PIECHART) {
      setFormValue({
        ...formValue,
        [field_name]: newFieldData[component].meta.data,
      });
    }
    if (component === componentName.RADARCHART) {
      setFormValue({
        ...formValue,
        [field_name]: newFieldData[component].meta.data,
      });
    }
    if (component === componentName.QUESTIONANDANSWER) {
      const newQAValues = [];
      newFieldData[component].meta.answers.map(() => newQAValues.push(false));
      setFormValue({...formValue, [field_name]: newQAValues});
    }

    let tempIndexToAdd = [...indexToAdd];

    if (indexToAdd.length === 0) {
      if (selectedField) {
        if (selectedField?.component === componentName.GROUP) {
          tempIndexToAdd = [
            ...selectedFieldIndex,
            selectedField.meta.childs.length,
          ];
        } else {
          let tempIndex = [...selectedFieldIndex];
          tempIndex[tempIndex.length - 1] = tempIndex[tempIndex.length - 1] + 1;
          tempIndexToAdd = tempIndex;
        }
      }
    } else {
      tempIndexToAdd = [formData.data.length];
    }

    setFormData({
      ...formData,
      data: addField(component, field_name, formData, tempIndexToAdd),
    });
  };

  const status = useDrawerStatus();

  useEffect(() => {
    if (status === 'closed') {
      setOpenMenu(false);
    }
  }, [status]);

  return useMemo(
    () => (
      <View style={styles.menuContainer}>
        <View style={styles.menuHeader}>
          <Text style={styles.menuTitle}>
            {i18nValues.t('setting_labels.form_fields')}
          </Text>
          <IconButton
            icon="close"
            size={20}
            iconColor="#FFFFFF"
            onPress={() => setOpenMenu(false)}
          />
        </View>
        <ScrollView style={styles.menuBody} persistentScrollbar>
          {fieldMenuData.items.map((item, index) => (
            <View key={index}>
              <Text style={styles.subHeader}>
                {i18nValues.t(`field_labels.${item.name}`)}
              </Text>
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
                      <Text style={styles.fieldNameText}>
                        {i18nValues.t(`field_labels.${subItem.name}`)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </ScrollView>
      </View>
    ),
    [JSON.stringify(formData), i18nValues.locale, JSON.stringify(indexToAdd), JSON.stringify(selectedFieldIndex)],
  );
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
    paddingVertical: 10,
    backgroundColor: '#404651',
    color: '#fff',
    size: 16,
    textAlign: 'center',
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
