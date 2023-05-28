import React from 'react';
import {useTheme} from 'react-native-paper';
import {View, Text, TouchableOpacity} from 'react-native';
import formStore from '../store/formStore';
import {IconButton} from 'react-native-paper';
import { useEffect, useState } from 'react';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const SubmissionScreen = ({navigation, route}) => {
    const {colors, fonts, size} = useTheme();
    const i18nValues = formStore(state => state.i18nValues);
    const formValues = formStore(state => state.formValues);
    const userEmail = formStore(state => state.userEmail);
    const setUserRole = formStore(state => state.setUserRole);
    const formData = formStore(state => state.formData);
    const setFormValue = formStore(state => state.setFormValue);
    const setSelectedFormValueId = formStore(state => state.setSelectedFormValueId);
    const [valuesToView, setValuesToView] = useState([]);

    useEffect(() => {
      if (route.params.from === 'inbox') {
        const roles = [];
        formData.roles.map(r => {
          if (r.users.includes(userEmail) || r.enableAllUsers) {
            roles.push(r.name);
          }
        });
        const submittedValues = formValues.filter(value => value.formId === formData.id && roles.includes(value.roleToPass));
        setValuesToView(submittedValues);
      }
      if (route.params.from === 'home') {
        const submittedValues = formValues.filter(value => value.formId === formData.id && value.submitterId === userEmail);
        setValuesToView(submittedValues);
      }
    }, [JSON.stringify(formValues)]);

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
          <Text style={{...fonts.headings, flex: 1, marginLeft: 20}}>{`${formData.name} ${i18nValues.t("setting_labels.submissions")}`}</Text>
        </View>
        {
          valuesToView.map((data, dataIndex) => {
            return (
              <TouchableOpacity
                key={dataIndex}
                style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingVertical: 5, marginVertical: 2, marginHorizontal: 10}}
                onPress={() => {
                  if (route.params.from === 'home' && (data.submitterId === userEmail)) {
                    setUserRole({name: formData.roles[0].name, view: false, edit: false, submit: true});
                  } else {
                    const tempRole = formData.roles.find(role => role.name === data.roleToPass);
                    setUserRole({name: data.roleToPass, view: tempRole.view, edit: tempRole.edit, submit: false});
                  }
                  setSelectedFormValueId(data.id);
                  setFormValue(data.value);
                  navigation.navigate('Render');
                }}
                >
                <MatIcon name="form-select" size={25} color={fonts.values.color} />
                <View style={{marginLeft: 10, flex: 1}}>
                  <Text style={{...fonts.values, fontSize: 16}}>{`Submission of '${data.submitterId}'`}</Text>
                  <Text style={{...fonts.values, fontSize: 12}}>{`${data.submittedDate}`}</Text>
                </View>
              </TouchableOpacity>
            );
          })
        }
        <IconButton
          icon="plus"
          size={size.s30}
          iconColor={colors.background}
          style={{position: 'absolute', bottom: 10, right: 10, backgroundColor: colors.colorButton}}
          onPress={() => {
            setUserRole({name: formData.roles[0].name, view: false, edit: false, submit: true});
            setFormValue({});
            setSelectedFormValueId('');
            navigation.navigate('Render');
          }}
        />
      </View>
    );
}

export default SubmissionScreen;