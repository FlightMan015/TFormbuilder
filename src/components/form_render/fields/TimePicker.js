import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Alert} from 'react-native';
import {IconButton, useTheme} from 'react-native-paper';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import FieldLabel from '../../../common/FieldLabel';
import formStore from '../../../store/formStore';

const TimePicker = ({element, role}) => {
  const {colors, fonts} = useTheme();
  const userRole = formStore(state => state.userRole);
  const formValue = formStore(state => state.formValue);
  const setFormValue = formStore(state => state.setFormValue);
  const i18nValues = formStore(state => state.i18nValues);
  const [visible, setVisible] = useState(false);
  const [time, setTime] = useState((element.field_name in formValue  && formValue[element.field_name]) ? new Date(formValue[element.field_name]) : new Date(Date.now()));

  return (
    <View style={styles.container(element)}>
      {
        role.view && (
          <>
            <FieldLabel label={element.meta.title || i18nValues.t("field_labels.time")} visible={!element.meta.hide_title} />
            <View style={styles.mainView(colors)}>
              <Text style={styles.text(fonts)}>
                {time.toLocaleTimeString()}
              </Text>
              <IconButton
                icon="alarm"
                iconColor={colors.colorButton}
                onPress={() => setVisible(true)}
                disabled={!(userRole.edit || userRole.submit) && !role.edit}
                style={{
                  ...styles.icon,
                }}
              />
            </View>
            {visible && (
              <RNDateTimePicker
                value={time}
                mode={'time'}
                display={'default'}
                is24Hour={true}
                onChange={(e, v) => {
                  setVisible(false);
                  setTime(v);
                  setFormValue({...formValue, [element.field_name]: v.toLocaleString()});
                  if (element.event.onChangeTime) {
                    Alert.alert('Rule Action', `Fired onChangeTime action. rule - ${element.event.onChangeTime}. newTime - ${v}`);
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
  container: element => ({
    ...element.meta.padding
  }),
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

TimePicker.propTypes = {
  element: PropTypes.object.isRequired,
};

export default TimePicker;
