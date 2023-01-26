import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Alert} from 'react-native';
import {IconButton, useTheme} from 'react-native-paper';
import RNDateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = props => {
  const {element, contents, editRole, value, onChangeValue} = props;
  const {colors} = useTheme();
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(value ? new Date(value) : new Date(Date.now()));

  return (
    <View style={styles.container}>
      <Text style={styles.carouselTitle(colors)}>{element.meta.title || 'Date'}</Text>
      <View style={styles.mainView}>
        <Text style={styles.text(editRole, colors)}>{date.toLocaleDateString()}</Text>
        {/* {editRole && ( */}
          <IconButton
            icon="calendar"
            iconColor={colors.colorButton}
            onPress={() => setVisible(true)}
            style={{
              ...styles.icon,
              backgroundColor: colors.borderIconButtonBackground,
              borderColor: colors.colorIconButtonBorder,
            }}
          />
        {/* )} */}
      </View>
      {visible && (
        <RNDateTimePicker
          value={date}
          mode={'date'}
          display={'default'}
          is24Hour={true}
          onChange={(e, v) => {
            setVisible(false);
            setDate(v);
            if (onChangeValue) {
              onChangeValue({[element.field_name]: v.toLocaleDateString()});
            }
            if (element.event.onChangeDate) {
              Alert.alert('Rule Action', `Fired onChangeText action. rule - ${element.event.onChangeDate}. newDate - ${v}`);
            }
          }}
          style={styles.datePicker}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  carouselTitle: colors => ({
    fontSize: 16,
    padding: 5,
    color: colors.text,
  }),
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    margin: 0,
    width: '13%',
    borderWidth: 1,
    borderRadius: 10,
  },
  text: (editRole, colors) => ({
    height: 35,
    textAlign: 'center',
    width: editRole ? '85%' : '85%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.border,
    textAlignVertical: 'center',
    backgroundColor: colors.inputTextBackground,
    color: colors.text,
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

export default React.memo(DatePicker);
