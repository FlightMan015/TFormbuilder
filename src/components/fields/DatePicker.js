import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Alert} from 'react-native';
import {IconButton, useTheme} from 'react-native-paper';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import FieldLabel from '../../common/FieldLabel';
import formStore from '../../store/formStore';

const DatePicker = ({element}) => {
  const {colors, fonts} = useTheme();
  const userRole = formStore(state => state.userRole);
  const role = element.role.find(e => e.name === userRole);
  const formValue = formStore(state => state.formValue);
  const setFormValue = formStore(state => state.setFormValue);
  const preview = formStore(state => state.preview);
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      {
        role.view && (
          <>
            <FieldLabel label={element.meta.title || 'Date'} visible={!element.meta.hide_title} />
            <View style={styles.mainView(colors)}>
              <Text style={styles.text(fonts)}>
                {(element.field_name in formValue  && formValue[element.field_name]) ? new Date(formValue[element.field_name]).toLocaleDateString(): new Date(Date.now()).toLocaleDateString()}
              </Text>
              {(role.edit  || preview) && (
                <IconButton
                  icon="calendar"
                  iconColor={fonts.values.color}
                  onPress={() => setVisible(true)}
                  style={{
                    ...styles.icon,
                  }}
                />
              )}
            </View>
            {visible && (
              <RNDateTimePicker
                value={(element.field_name in formValue  && formValue[element.field_name]) ? new Date(formValue[element.field_name]) : new Date(Date.now())}
                mode={'date'}
                display={'default'}
                is24Hour={true}
                onChange={(e, v) => {
                  setVisible(false);
                  setFormValue({...formValue, [element.field_name]: v.toLocaleDateString()});
                  if (element.event.onChangeDate) {
                    Alert.alert('Rule Action', `Fired onChangeText action. rule - ${element.event.onChangeDate}. newDate - ${v}`);
                  }
                }}
                style={styles.datePicker}
              />
            )}
          </>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  mainView: (colors) => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: 10,
    height: 40,
  }),
  icon: {
    margin: 0,
  },
  text: (fonts) => ({
    textAlign: 'center',
    marginLeft: 10,
    ...fonts.values,
  }),
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  },
});

DatePicker.propTypes = {
  element: PropTypes.object.isRequired,
};

export default DatePicker;
