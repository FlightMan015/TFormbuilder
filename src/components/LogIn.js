import React, {useState} from 'react';
import {useTheme} from 'react-native-paper';
import {StyleSheet, View, Text, Alert, TextInput} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import TextButton from '../common/TextButton';
import formStore from '../store/formStore';
import Icon from 'react-native-vector-icons/Feather';

const roles = [
    'admin',
    'builder',
    'submitter',
    'reviewer',
    'approver'
];

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const LogIn = ({navigation}) => {
    const {colors, fonts} = useTheme();
    const [open, setOpen] = useState(true);
    const i18nValues = formStore(state => state.i18nValues);
    const setUserRole = formStore(state => state.setUserRole);
    const setPreview = formStore(state => state.setPreview);
    const setUserEmail = formStore(state => state.setUserEmail);
    const userEmail = formStore(state => state.userEmail);
    const [selectedUserRole, setSelectedUserRole] = useState(roles[0]);
    const [userId, setUserId] = useState(userEmail);

    return (
        <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{...fonts.headings, fontSize: 40, position: 'absolute', top: '40%', color: '#4194B3'}}>WELCOME</Text>
            <View style={{position: 'absolute', bottom: '6%'}}>
              <Text style={{...fonts.values, marginBottom: 5, marginLeft: 15}}>Email</Text>
              <TextInput
                style={styles.title(colors, fonts)}
                value={userId}
                onChangeText={newText => {
                  setUserId(newText);
                }}
              />
              <TextButton
                  style={styles.addCardBtn(validateEmail(userId))}
                  text={i18nValues.t(`setting_labels.login`)}
                  textStyle={styles.addCardText}
                  disabled={!validateEmail(userId)}
                  onPress={() => {
                      setUserEmail(userId);
                      setUserRole(selectedUserRole);
                      if (selectedUserRole === 'reviewer' || selectedUserRole === 'approver' || selectedUserRole === 'submitter') {
                          setPreview(false);
                      } else {
                          setPreview(false);
                      }
                      navigation.navigate('Home');
                  }}
              />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      padding: 5,
    },
    title: (colors, fonts) => ({
      height: 40,
      color: '#FFFFFF',
      borderRadius: 50,
      backgroundColor: colors.card,
      paddingLeft: 20,
      ...fonts.values
    }),
    carouselTitle: colors => ({
      fontSize: 16,
      padding: 5,
      color: colors.text,
    }),
    textStyle: fonts => ({
      fontSize: 14,
      color: fonts.values.color,
      textAlign: 'left',
    }),
    rowTextStyle: fonts => ({
      fontSize: 14,
      color: fonts.labels.color,
      textAlign: 'center',
      marginLeft: 20,
    }),
    selectedRowStyle: {
      backgroundColor: 'grey',
    },
    selectedRowTextStyle: fonts => ({
      color: fonts.values.color,
    }),
    dropdown: colors => ({
      borderRadius: 15,
      backgroundColor: colors.card,
      maxHeight: 300,
    }),
    buttonStyle: colors => ({
      width: 280,
      height: 40,
      borderRadius: 50,
      backgroundColor: colors.card,
    }),
    rowStyle: {
      height: 40,
      borderBottomWidth: 0,
    },
    searchInput: {
      height: 40,
      borderBottomColor: 'grey',
      borderBottomWidth: 1,
    },
    addCardBtn: valid => ({
        width: 280,
        padding: 10,
        backgroundColor: valid ? '#4194B3' : '#4194B388',
        borderRadius: 50,
        marginTop: 10,
    }),
    addCardText: {
        color: '#ffffff',
        fontSize: 16,
    },
});

export default LogIn;