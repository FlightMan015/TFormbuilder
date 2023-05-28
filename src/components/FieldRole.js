import React, {useMemo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {DataTable, useTheme, Checkbox, IconButton} from 'react-native-paper';
import { updateField } from '../actions/formdata';
import formStore from '../store/formStore';

const roleTypes = {
  view: 'view',
  edit: 'edit',
  define: 'define',
  editAxes: 'editAxes',
  editSeries: 'editSeries',
  read: 'read',
  pay: 'pay',
  setting: 'setting'
};

const FieldRole = () => {
  const {colors} = useTheme();
  const formData = formStore(state => state.formData);
  const setFormData = formStore(state => state.setFormData);
  const element = formStore(state => state.selectedField);
  const setOpenSetting = formStore(state => state.setOpenSetting);
  const selectedFieldIndex = formStore(state => state.selectedFieldIndex);
  const i18nValues = formStore(state => state.i18nValues);

  const onChangeRole = (i, type) => {
    // const tempRoles = JSON.parse(JSON.stringify(element.role));
    // const changedItem = tempRoles[i];
    // tempRoles[i] = {
    //   ...changedItem,
    //   [type]: !changedItem[type],
    // };
    // const updatedElement = {...element, role: tempRoles};
    // setFormData({...formData, data: updateField(formData, selectedFieldIndex, updatedElement)})
  };

  return useMemo(() => (
    <View>
      <View style={styles.menuHeader}>
        <Text style={styles.menuTitle}>{element.meta.title + ' Roles'}</Text>
        <IconButton
          icon="close"
          size={20}
          iconColor="#FFFFFF"
          onPress={() => {
            setOpenSetting(false);
          }}
        />
      </View>
      <DataTable>
        <DataTable.Header style={{borderBottomColor: '#FFFFFF'}}>
          <DataTable.Title>{''}</DataTable.Title>
            <DataTable.Title>
              <Text style={styles.headerTitle(colors.description)}>
                {/* {'   View'} */}
                {'   ' + i18nValues.t("setting_labels.view")}
              </Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.headerTitle(colors.description)}>
                {/* {'   Edit'} */}
                {'   ' + i18nValues.t("setting_labels.edit")}
              </Text>
            </DataTable.Title>
        </DataTable.Header>

        {element?.role?.map((e, i) => {
          const roleIndex = formData.checkedRoles.findIndex((checkedRole) => checkedRole.name === e.name);
          if (roleIndex !== -1) {
            return (
              <DataTable.Row key={i}  style={{borderBottomColor: '#FFFFFF'}}>
                <DataTable.Cell>
                  <Text style={styles.roleName(colors.text)}>{e.name}</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Checkbox
                    status={e.view ? 'checked' : 'unchecked'}
                    onPress={() => onChangeRole(i, roleTypes.view)}
                    color={'#FFFFFF'}
                    uncheckedColor='#FFFFFF'
                  />
                </DataTable.Cell>
                <DataTable.Cell>
                  <Checkbox
                    status={e.edit ? 'checked' : 'unchecked'}
                    onPress={() => onChangeRole(i, roleTypes.edit)}
                    color={'#FFFFFF'}
                    uncheckedColor='#FFFFFF'
                  />
                </DataTable.Cell>
              </DataTable.Row>
            );
          }
        })}
      </DataTable>
    </View>
  ), [JSON.stringify(element)]);
}

const styles = StyleSheet.create({
  saveBtn: {
    width: 100,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  container: {
    padding: 10,
    alignContent: 'center',
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
    paddingLeft: 15,
  },
  headerTitle: textColor => ({
    color: '#FFFFFF',
    fontSize: 12,
  }),
  roleName: textColor => ({
    color: '#FFFFFF',
    fontSize: 14,
  }),
});

FieldRole.propTypes = {
  // role: PropTypes.array.isRequired,
  // axisRole: PropTypes.bool,
  // seriesRole: PropTypes.bool,
  // visible: PropTypes.bool.isRequired,
  // index: PropTypes.object.isRequired,
  // element: PropTypes.object.isRequired,
};

export default FieldRole;
