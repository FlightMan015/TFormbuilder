import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {Dialog, useTheme, IconButton, Switch} from 'react-native-paper';
import { globalStyles } from '../theme/styles';
import TextButton from '../common/TextButton';
import formStore from '../store/formStore';

const FormSaveDlg = ({saveForm, renameForm}) => {
  const {colors, fonts} = useTheme();
	const formData = formStore(state => state.formData);
	const setFormData = formStore(state => state.setFormData);
  const visibleDlg = formStore(state => state.visibleDlg);
  const setVisibleDlg = formStore(state => state.setVisibleDlg);
  const i18nValues = formStore(state => state.i18nValues);
  const makerId = formStore(state => state.makerId);
  const users = formStore(state => state.users);
  const [visibleUsers, setVisibleUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [text, setText] = useState('');

  return (
    <Dialog
      visible={visibleDlg.saveForm}
      onDismiss={() => {
        setVisibleDlg({...visibleDlg, saveForm: false});
        setFormData({...formData, name: visibleDlg.oldName});
      }}
      style={{
        ...styles.dialog,
        backgroundColor: colors.card,
      }}>
    	<Text style={{...fonts.headings, marginBottom: 10}}>{i18nValues.t("setting_labels.save_form")}</Text>
      <Text style={fonts.labels}>{i18nValues.t("setting_labels.users")}</Text>
      {
        formData.roles.map((role, roleIndex) => {
          return (
            <View key={`roleview-${roleIndex}`}>
              <Text style={fonts.values}>{role.name}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text>{i18nValues.t("setting_labels.all_users")}</Text>
                <Switch
                  value={role.enableAllUsers}
                  onValueChange={() => {
                    const tempRoles = [...formData.roles];
                    tempRoles[roleIndex].enableAllUsers = !role.enableAllUsers;
                    setFormData({...formData, roles: tempRoles});
                  }}
                  color={colors.colorButton}
                />
              </View>
              {
                !role.enableAllUsers && (
                  <>
                    <View style={{...styles.multifile(colors), borderColor: colors.border, backgroundColor: colors.background}}>
                      {
                        role.users.map((e, i) => {
                          return (
                            <View key={i} style={{...styles.selectedFile, backgroundColor: colors.colorButton}}>
                              <Text
                                key={i}
                                style={{...styles.multiText, color: '#FFFFFF'}}>
                                {e}
                              </Text>
                              <IconButton
                                icon="close"
                                size={15}
                                iconColor={'#FFFFFF'}
                                style={styles.closeBtn}
                                onPress={() => {
                                  const tempRoles = [...formData.roles];
                                  role.users.splice(i, 1);
                                  setFormData({...formData, roles: tempRoles});
                                }}
                              />
                            </View>
                          );
                        })}
                      <TextInput
                        style={{...fonts.values, flex: 1, paddingLeft: 5, paddingVertical: 0}}
                        value={text}
                        onBlur={() => setSelectedRole('')}
                        // onChangeText={e => {
                        //   setText(e);
                        //   const tempVisibleUsers = users.filter(user => !role.users.includes(user) && user.includes(e));
                        //   setVisibleUsers(tempVisibleUsers);
                        //   setSelectedRole(role.name);
                        // }}
                        onFocus={() => {
                          setSelectedRole(role.name);
                          const tempVisibleUsers = users.filter(user => !role.users.includes(user));
                          setVisibleUsers(tempVisibleUsers);
                        }}
                      />
                    </View>
                    {
                      selectedRole === role.name && visibleUsers.length > 0 && (
                        <View style={{borderWidth: 1, borderRadius: 5, padding: 5, borderColor: colors.border}}>
                          {
                            visibleUsers.map((user, userIndex) => {
                              return (
                                <TouchableOpacity
                                  onPress={() => {
                                    if (roleIndex === -1) {
                                      setFormData({...formData, roles: [...formData.roles, {...role, users: [user]}]});
                                    } else {
                                      const tempRoleUsers = role.users;
                                      const tempIndex = tempRoleUsers.findIndex(e => e === user);
                                      const tempRoles = [...formData.roles];
                                      tempRoleUsers.push(user);
                                      tempRoles.splice(roleIndex, 1, {...role, users: tempRoleUsers});
                                      setFormData({...formData, roles: tempRoles});
                                    }
                                    const tempVisibleUsers = users.filter(user => !role.users.includes(user));
                                    setVisibleUsers(tempVisibleUsers);
                                    // setSelectedRole('');
                                  }}
                                  style={{paddingVertical: 3, paddingLeft: 5}}>
                                  <Text key={userIndex} style={fonts.values}>{user}</Text>
                                </TouchableOpacity>
                              );
                            })
                          }
                        </View>
                      )
                    }
                  </>
                ) 
              }
              
            </View>
          )
        })
      }
			<Text style={fonts.labels}>{i18nValues.t("setting_labels.form_name")}</Text>
			<TextInput
				style={{
					...styles.nameInput,
					borderColor: colors.border,
					backgroundColor: colors.inputTextBackground,
				}}
				value={formData.name}
				onChangeText={name => setFormData({...formData, name})}
			/>
      <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10}}>
        <TextButton
          text={i18nValues.t("setting_labels.save")}
          onPress={() => {
            if (visibleDlg.rename) {
              renameForm({id: visibleDlg.id, newName: formData.name});
              setVisibleDlg({...visibleDlg, saveForm: false});
            } else {
              saveForm(formData);
              setVisibleDlg({...visibleDlg, saveForm: false});
            }
          }}
          textStyle={styles.actionButtonText}
          style={styles.actionButton(colors)}
        />
        <TextButton
          text={i18nValues.t("setting_labels.cancel")}
          onPress={() => {
            setVisibleDlg({...visibleDlg, saveForm: false, rename: false});
            setFormData({...formData, name: visibleDlg.oldName});
          }}
          textStyle={styles.actionButtonText}
          style={styles.actionButton(colors)}
        />
      </View>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  dialog: {
		borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 0,
    paddingHorizontal:  20,
  },
  nameInput: {
    borderRadius: 5,
    borderWidth: 1,
    height: 35,
    paddingVertical: 0,
    marginTop: 5,
    marginBottom: 10,
    fontFamily: 'PublicSans-Regular',
    fontSize: 14,
  },
  action: {
    paddingRight: 30,
  },
  title: {
    fontFamily: 'PublicSans-Bold',
    fontSize: 18,
  },
  content: {
    paddingBottom: 0,
  },
	actionButtonText: {
    color: '#FFFFFF',
  },
  actionButton: colors => ({
    backgroundColor: colors.colorButton,
    borderRadius: 10,
    width: 100,
    paddingVertical: 10,
		marginVertical: 10,
		alignSelf: 'center',
  }),
  closeBtn: {
    margin: 0,
  },
  selectedFile: {
    borderRadius: 17,
    height: 35,
    backgroundColor: '#D0D3D8',
    paddingRight: 5,
    paddingLeft: 10,
    margin: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  multiText: {
    fontSize: 15,
    color: 'black',
  },
  multifile: colors => ({
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 1,
    minHeight: 40,
    marginBottom: 5,
    width: '100%',
    borderRadius: 10,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
  }),
});

export default FormSaveDlg;
