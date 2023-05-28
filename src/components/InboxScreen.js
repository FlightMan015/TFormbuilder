import React from 'react';
import {useTheme} from 'react-native-paper';
import {View, Text, TouchableOpacity} from 'react-native';
import formStore from '../store/formStore';
import Icon from 'react-native-vector-icons/Feather';
import {IconButton} from 'react-native-paper';
import { useEffect, useState } from 'react';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const InboxScreen = ({navigation}) => {
    const {colors, fonts, size} = useTheme();
    const formValues = formStore(state => state.formValues);
    const formsIsView = formStore(state => state.formsIsView);
    const userEmail = formStore(state => state.userEmail);
    const setFormData = formStore(state => state.setFormData);
    const i18nValues = formStore(state => state.i18nValues);
    const [formsToView, setFormsToView] = useState([]);

    useEffect(() => {
      const tempFormToView = [];
      formsIsView.map(viewForm => {
        const roles = [];
        viewForm.roles.map(r => {
          if (r.users.includes(userEmail) || r.enableAllUsers) {
            roles.push(r.name);
          }
        });
        const valuesToView = formValues.filter(value => value.formId === viewForm.id && roles.includes(value.roleToPass));
        tempFormToView.push({...viewForm, numberOfValues: valuesToView.length || 0});
      });
      setFormsToView(tempFormToView);
    }, [JSON.stringify(formValues), JSON.stringify(formsIsView)]);

    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <IconButton
            icon="arrow-left"
            size={size.s20}
            iconColor={fonts.headings.color}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text style={{...fonts.headings, flex: 1, marginLeft: 20}}>{i18nValues.t("setting_labels.inbox")}</Text>
        </View>
        {
          formsToView.map((data, dataIndex) => {
            const temproles = data.roles.map(e => {
              if (e.users.includes(userEmail) || e.enableAllUsers) {
                if (e.view) {
                  return 'view';
                }
                if (e.edit) {
                  return 'edit';
                }
              }
            });
            return (
              <TouchableOpacity
                key={dataIndex}
                style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingVertical: 5, marginVertical: 2, marginHorizontal: 10}}
                onPress={() => {
                  setFormData(data);
                  navigation.navigate('Submission', {from: 'inbox', roles: temproles});
                }}>
                <Icon name="file-text" size={25} color={fonts.values.color} />
                <View style={{marginLeft: 10, flex: 1}}>
                  <Text style={{...fonts.values, fontSize: 18}}>{data.name}</Text>
                  <Text style={{...fonts.values, fontSize: 12}}>{`${data.numberOfValues} ${i18nValues.t("setting_labels.submissions")}`}</Text>
                </View>
                {
                  temproles.includes('view') && (
                    <MatIcon
                      name="file-check-outline"
                      color={'grey'}
                      size={20}
                      style={{marginHorizontal: 2}}
                    />
                  )
                }
                {
                  temproles.includes('edit') && (
                    <MatIcon
                      name="file-search-outline"
                      color={'grey'}
                      size={20}
                      style={{marginHorizontal: 2}}
                    />
                  )
                }               
                
              </TouchableOpacity>
            );
          })
        }
      </View>
    );
}

export default InboxScreen;