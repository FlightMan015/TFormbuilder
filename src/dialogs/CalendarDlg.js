import React, {useState, useEffect} from 'react';
import {StyleSheet, TextInput, Text, View, Alert, Button} from 'react-native';
import {Dialog, useTheme} from 'react-native-paper';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import formStore from '../store/formStore';
import TextButton from '../common/TextButton';

const addTypes = {
  newEvent: 'newEvent',
  firstEvent: 'firstEvent',
  editEvent: 'editEvent',
};

const CalendarDlg = () => {
  const {colors, fonts} = useTheme();
  const formValue = formStore(state => state.formValue);
  const setFormValue = formStore(state => state.setFormValue);
  const visibleDlg = formStore(state => state.visibleDlg);
  const setVisibleDlg = formStore(state => state.setVisibleDlg);
  const [newScheduleData, setNewScheduleData] = useState({
    dateString: '',
    name: '',
    title: '',
    description: '',
    startTime: new Date(Date.now()),
    endTime: new Date(Date.now()),
  });
  const [visibleTimePicker, setVisibleTimePicker] = useState(false);
  const [time, setTime] = useState(new Date(Date.now()));
  const [timeType, setTimeType] = useState('');

  useEffect(() => {
    if (visibleDlg.eventType === addTypes.editEvent) {
      setNewScheduleData(visibleDlg.oldScheduleData);
    }
  }, [visibleDlg]);

  const onChangeNewData = (changedData, type) => {
    const tempData = newScheduleData;
    switch (type) {
      case 'startTime':
        setVisibleTimePicker(false);
        setNewScheduleData({
          ...tempData,
          startTime: changedData,
        });
        break;
      case 'endTime':
        setVisibleTimePicker(false);
        setNewScheduleData({
          ...tempData,
          endTime: changedData,
        });
        break;
      case 'description':
        setNewScheduleData({
          ...tempData,
          description: changedData,
        });
        break;
      case 'name':
        setNewScheduleData({
          ...tempData,
          name: changedData,
        });
        break;
      case 'title':
        setNewScheduleData({
          ...tempData,
          title: changedData,
        });
        break;
    }
  };

  const cancel = () => {
    setVisibleDlg({...visibleDlg, calendarEvent: false});
    setNewScheduleData({
      name: '',
      title: '',
      description: '',
      startTime: new Date(Date.now()),
      endTime: new Date(Date.now()),
    });
  };

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var randomColor = '#';
    for (var i = 0; i < 6; i++) {
      randomColor += letters[Math.floor(Math.random() * 16)];
    }
    return randomColor;
  }

  const addSchedule = () => {
    let warning = '';
    if (newScheduleData.name === '') {
      warning = 'Please input the name.';
    } else if (newScheduleData.title === '') {
      warning = 'Please input the title.';
    } else if (newScheduleData.description === '') {
      warning = 'Please input the content.';
    } else if (newScheduleData.startTime && newScheduleData.endTime) {
      if (
        (typeof newScheduleData.startTime === 'string' &&
          typeof newScheduleData.endTime === 'string' &&
          new Date(newScheduleData.startTime).getTime() >=
            new Date(newScheduleData.endTime).getTime()) ||
        (typeof newScheduleData.startTime !== 'string' &&
          typeof newScheduleData.endTime !== 'string' &&
          newScheduleData.startTime.getTime() >=
            newScheduleData.endTime.getTime())
      ) {
        warning = 'Please input the time again.';
      }
    }
    if (warning !== '') {
      Alert.alert('Warning', warning, [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else {
      cancel();
      if (visibleDlg.eventType === addTypes.firstEvent) {
        const tempItems = {...formValue[visibleDlg.element.field_name]};
        setFormValue({...formValue, [visibleDlg.element.field_name]: {
          ...tempItems,
          [visibleDlg.selectedDay.dateString]: {
            marked: true,
            events: [
              {
                ...newScheduleData,
                dateString: visibleDlg.selectedDay.dateString,
                color: getRandomColor(),
              },
            ],
          },
        }})
      }
      if (visibleDlg.eventType === addTypes.newEvent) {
        const tempItems = {...formValue[visibleDlg.element.field_name]};
        tempItems[visibleDlg.selectedDay.dateString].events.push({
          ...newScheduleData,
          dateString: visibleDlg.selectedDay.dateString,
          color: getRandomColor(),
        });
        setFormValue({...formValue, [visibleDlg.element.field_name]: tempItems});
      }
      if (visibleDlg.eventType === addTypes.editEvent) {
        const tempItems = {...formValue[visibleDlg.element.field_name]};
        const oldColor = tempItems[visibleDlg.selectedDay.dateString].events[visibleDlg.eventEditIndex].color;
        tempItems[visibleDlg.selectedDay.dateString].events.splice(
          visibleDlg.eventEditIndex,
          1,
          {
            ...newScheduleData,
            dateString: visibleDlg.selectedDay.dateString,
            color: oldColor,
          },
        );
        setFormValue({...formValue, [visibleDlg.element.field_name]: tempItems});
      }
      setNewScheduleData({
        name: '',
        title: '',
        description: '',
        startTime: new Date(Date.now()),
        endTime: new Date(Date.now()),
      });
    }
  };

  return (
    <Dialog
      visible={visibleDlg.calendarEvent !== undefined && visibleDlg.calendarEvent}
      onDismiss={cancel}
      style={{...styles.dialog, backgroundColor: colors.card}}>
      <Text style={{...fonts.headings, marginBottom: 10}}>
        {visibleDlg.eventType === addTypes.editEvent ? 'Edit entry' : 'New entry'}
      </Text>
      <View>
        <View style={styles.field}>
          <Text style={fonts.labels}>Full Name</Text>
          <TextInput
            style={styles.nameInput(colors, fonts)}
            placeholder="Enter full name"
            placeholderTextColor={colors.placeholder}
            onChangeText={e => onChangeNewData(e, 'name')}
            value={newScheduleData.name}
          />
        </View>
        <View style={fonts.labels}>
          <Text style={fonts.labels}>Title</Text>
          <TextInput
            style={styles.nameInput(colors, fonts)}
            placeholder="Enter title"
            placeholderTextColor={colors.placeholder}
            onChangeText={e => onChangeNewData(e, 'title')}
            value={newScheduleData.title}
          />
        </View>
        <View style={fonts.labels}>
          <Text style={fonts.labels}>Description</Text>
          <TextInput
            style={styles.nameInput(colors, fonts)}
            placeholder="Enter description"
            placeholderTextColor={colors.placeholder}
            multiline={true}
            numberOfLines={2}
            onChangeText={e => onChangeNewData(e, 'description')}
            value={newScheduleData.description}
          />
        </View>
        <View style={styles.timeContainer}>
          <View style={styles.startTime}>
            <Text style={fonts.labels}>Start time</Text>
            <TextInput
              style={styles.nameInput(colors, fonts)}
              onPressIn={() => {
                setTimeType('startTime');
                let tempTime = null;
                if (typeof newScheduleData.startTime === 'string') {
                  tempTime = new Date(newScheduleData.startTime);
                } else {
                  tempTime = newScheduleData.startTime;
                }
                setTime(tempTime);
                setVisibleTimePicker(true);
              }}
              value={
                typeof newScheduleData.startTime === 'string'
                  ? new Date(newScheduleData.startTime).toLocaleTimeString(
                      'en-US',
                    )
                  : newScheduleData.startTime.toLocaleTimeString('en-US')
              }
            />
          </View>
          <View style={styles.startTime}>
            <Text style={fonts.labels}>End time</Text>
            <TextInput
              style={styles.nameInput(colors, fonts)}
              onPressIn={() => {
                setTimeType('endTime');
                let tempTime = null;
                if (typeof newScheduleData.endTime === 'string') {
                  tempTime = new Date(newScheduleData.endTime);
                } else {
                  tempTime = newScheduleData.endTime;
                }
                setTime(tempTime);
                setVisibleTimePicker(true);
              }}
              value={
                typeof newScheduleData.endTime === 'string'
                  ? new Date(newScheduleData.endTime).toLocaleTimeString(
                      'en-US',
                    )
                  : newScheduleData.endTime.toLocaleTimeString('en-US')
              }
            />
          </View>
          {visibleTimePicker && (
            <RNDateTimePicker
              value={time}
              mode={'time'}
              display={'spinner'}
              is24Hour={false}
              onChange={(e, v) => onChangeNewData(v, timeType)}
              style={styles.datePicker}
            />
          )}
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10}}>
        <TextButton
          text={visibleDlg.eventType === addTypes.editEvent ? 'Update' : 'Add'}
          onPress={() => addSchedule()}
          textStyle={styles.actionButtonText}
          style={styles.actionButton(colors)}
        />
        <TextButton
          text='Cancel'
          onPress={cancel}
          textStyle={styles.actionButtonText}
          style={styles.actionButton(colors)}
        />
      </View>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  dialogContent: {
    paddingBottom: 0,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameInput: (colors, fonts) => ({
    width: '100%',
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 10,
    backgroundColor: colors.background,
    ...fonts.values,
  }),
  startTime: {
    width: '49%',
  },
  dialog: {
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  actionButtonText: {
    color: '#FFFFFF',
  },
  actionButton: colors => ({
    backgroundColor: colors.colorButton,
    borderRadius: 10,
    width: 100,
    paddingVertical: 10
  }),
});

export default CalendarDlg;
