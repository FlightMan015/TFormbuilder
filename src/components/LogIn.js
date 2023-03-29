import React, {useState} from 'react';
import {useTheme} from 'react-native-paper';
import {StyleSheet, View, Text, Alert} from 'react-native';
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

const LogIn = ({navigation}) => {
    const {colors, fonts} = useTheme();
    const [open, setOpen] = useState(true);
    const i18nValues = formStore(state => state.i18nValues);
    const setUserRole = formStore(state => state.setUserRole);
    const setPreview = formStore(state => state.setPreview);
    const [selectedUserRole, setSelectedUserRole] = useState(roles[0]);

    return (
        <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{...fonts.headings, fontSize: 40, position: 'absolute', top: '40%', color: '#4194B3'}}>WELCOME</Text>
            <View style={{position: 'absolute', bottom: '6%'}}>
                <Text style={{...fonts.values, marginBottom: 5, marginLeft: 15}}>Please select your role.</Text>
                <SelectDropdown
                    data={roles}
                    onSelect={e => {
                        setSelectedUserRole(e);
                    }}
                    dropdownStyle={styles.dropdown(colors)}
                    rowStyle={styles.rowStyle}
                    rowTextStyle={styles.rowTextStyle(fonts)}
                    buttonStyle={styles.buttonStyle(colors)}
                    buttonTextStyle={{...styles.textStyle(fonts)}}
                    selectedRowTextStyle={styles.selectedRowTextStyle(fonts)}
                    renderDropdownIcon={
                        open
                        ? () => <Icon name="chevron-down" size={18} color={colors.colorButton} />
                        : () => <Icon name="chevron-up" size={18} color={colors.colorButton} />
                    }
                    dropdownIconPosition="right"
                    onFocus={() => setOpen(false)}
                    onBlur={() => setOpen(true)}
                    defaultButtonText="Select Option"
                    defaultValue={selectedUserRole}
                />
                <TextButton
                    style={styles.addCardBtn}
                    text={i18nValues.t(`setting_labels.login`)}
                    textStyle={styles.addCardText}
                    onPress={() => {
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
    addCardBtn: {
        width: 280,
        padding: 10,
        backgroundColor: '#4194B3',
        borderRadius: 50,
        marginTop: 10,
    },
    addCardText: {
        color: '#ffffff',
        fontSize: 16,
    },
});

export default LogIn;