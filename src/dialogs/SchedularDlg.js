import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, TextInput, Text, View, Alert, Button} from 'react-native';
import {Dialog, useTheme} from 'react-native-paper';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import formStore from '../store/formStore';
import TextButton from '../common/TextButton';

const addTypes = {
  newEvent: 'add',
  firstEvent: 'first',
  editEvent: 'edit',
};

const SchedularDlg = () => {
  const {colors, fonts} = useTheme();
  const formValue = formStore(state => state.formValue);
  const setFormValue = formStore(state => state.setFormValue);
  const visibleSchedularDlg = formStore(state => state.visibleSchedularDlg);
  const setVisibleSchedularDlg = formStore(state => state.setVisibleSchedularDlg);
  const [newScheduleData, setNewScheduleData] = useState({
    dateString: '',
    name: '',
    title: '',
    description: '',
    startTime: new Date(Date.now()),
    endTime: new Date(Date.now()),
    date: new Date(Date.now()),
  });
  const [visibleTimePicker, setVisibleTimePicker] = useState(false);
  const [visibleDatePicker, setVisibleDatePicker] = useState(false);
  const [time, setTime] = useState(new Date(Date.now()));
  const date = useRef(new Date(Date.now()));
  const timeType = useRef('');

  useEffect(() => {
    if (visibleSchedularDlg.type === addTypes.editEvent) {
      setNewScheduleData(visibleSchedularDlg.sorted[visibleSchedularDlg.eventindex]);
    }
  }, [JSON.stringify(visibleSchedularDlg)]);

  const onChangeNewData = (changedData, type) => {
    switch (type) {
      case 'startTime':
        setVisibleTimePicker(false);
        setNewScheduleData({
          ...newScheduleData,
          startTime: changedData,
        });
        break;
      case 'endTime':
        setVisibleTimePicker(false);
        setNewScheduleData({
          ...newScheduleData,
          endTime: changedData,
        });
        break;
      case 'date':
        setVisibleDatePicker(false);
        setNewScheduleData({
          ...newScheduleData,
          date: changedData,
        });
        break;
      case 'description':
        setNewScheduleData({
          ...newScheduleData,
          description: changedData,
        });
        break;
      case 'name':
        setNewScheduleData({
          ...newScheduleData,
          name: changedData,
        });
        break;
      case 'title':
        setNewScheduleData({
          ...newScheduleData,
          title: changedData,
        });
        break;
    }
  };

  const cancel = () => {
    setVisibleSchedularDlg({});
    setNewScheduleData({
      name: '',
      title: '',
      description: '',
      startTime: new Date(Date.now()),
      endTime: new Date(Date.now()),
      date: new Date(Date.now()),
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
      if (visibleSchedularDlg.type === 'add') {
        const dateStr = new Date(newScheduleData.date).toISOString().substring(0, 10);
        if (!formValue[visibleSchedularDlg.element.field_name]) {
          setFormValue({...formValue, [visibleSchedularDlg.element.field_name]: {
            [dateStr]: {
              events: [
                {
                  ...newScheduleData,
                  dateString: dateStr,
                  color: getRandomColor(),
                },
              ],
            },
          }})
        } else if (formValue[visibleSchedularDlg.element.field_name][dateStr]) {
          const tempItems = {...formValue[visibleSchedularDlg.element.field_name]};
          tempItems[dateStr].events.push({
            ...newScheduleData,
            dateString: dateStr,
            color: getRandomColor(),
          });
          setFormValue({...formValue, [visibleSchedularDlg.element.field_name]: tempItems});
        } else {
          const tempItems = {...formValue[visibleSchedularDlg.element.field_name]};
          setFormValue({...formValue, [visibleSchedularDlg.element.field_name]: {
            ...tempItems,
            [dateStr]: {
              events: [
                {
                  ...newScheduleData,
                  dateString: dateStr,
                  color: getRandomColor(),
                },
              ],
            },
          }})
        }
        setNewScheduleData({
          name: '',
          title: '',
          description: '',
          startTime: new Date(Date.now()),
          endTime: new Date(Date.now()),
          date: new Date(Date.now()),
        });
        if (visibleSchedularDlg.element.event.onCreateNewSchedule) {
          Alert.alert('Rule Action', `Fired onCreateNewSchedule action. rule - ${visibleSchedularDlg.element.event.onCreateNewSchedule}.`);
        }
      }
      if (visibleSchedularDlg.type === 'edit') {
        const dateStr = new Date(newScheduleData.date).toISOString().substring(0, 10);
        const tempEvents = visibleSchedularDlg.sorted;
        tempEvents.splice(visibleSchedularDlg.eventindex, 1, {
          ...newScheduleData,
          dateString: dateStr,
          color: getRandomColor(),
        });
        const tempData = {...formValue[visibleSchedularDlg.element.field_name]};
        setFormValue({...formValue, [visibleSchedularDlg.element.field_name]: {...tempData, [visibleSchedularDlg.date]: {events: tempEvents}}});
        setNewScheduleData({
          name: '',
          title: '',
          description: '',
          startTime: new Date(Date.now()),
          endTime: new Date(Date.now()),
          date: new Date(Date.now()),
        });
        if (visibleSchedularDlg.element.event.onUpdateSchedule) {
          Alert.alert('Rule Action', `Fired onUpdateSchedule action. rule - ${visibleSchedularDlg.element.event.onUpdateSchedule}.`);
        }
      }
    }
  };

  const deleteSchedule = () => {
    console.log(visibleSchedularDlg)
    cancel();
    const tempEvents = visibleSchedularDlg.sorted;
    tempEvents.splice(visibleSchedularDlg.eventindex, 1);
    const tempData = {...formValue[visibleSchedularDlg.element.field_name]};
    setFormValue({...formValue, [visibleSchedularDlg.element.field_name]: {...tempData, [visibleSchedularDlg.date]: {events: tempEvents}}});
    setNewScheduleData({
      name: '',
      title: '',
      description: '',
      startTime: new Date(Date.now()),
      endTime: new Date(Date.now()),
      date: new Date(Date.now()),
    });
    if (visibleSchedularDlg.element.event.onDeleteSchedule) {
      Alert.alert('Rule Action', `Fired onDeleteSchedule action. rule - ${visibleSchedularDlg.element.event.onDeleteSchedule}.`);
    }
  };

  return (
    <Dialog
      visible={visibleSchedularDlg.schedularEvent !== undefined && visibleSchedularDlg.schedularEvent}
      onDismiss={cancel}
      style={{...styles.dialog, backgroundColor: colors.card}}>
      <Text style={{...fonts.headings, marginBottom: 10}}>
        {visibleSchedularDlg.type === addTypes.editEvent ? 'Update entry' : 'New entry'}
      </Text>
      <View>
        <View style={styles.field}>
          <Text style={styles.label(fonts)}>Date</Text>
          <TextInput
            style={styles.nameInput(colors, fonts)}
            value={new Date(newScheduleData.date).toISOString().substring(0, 10)}
            onPressIn={() => {
              let tempDate = new Date(newScheduleData.date);
              date.current = tempDate;
              setVisibleDatePicker(true);
            }}
          />
        </View>
        <View style={styles.timeContainer}>
          <View style={styles.startTime}>
            <Text style={styles.label(fonts)}>Start time</Text>
            <TextInput
              style={styles.nameInput(colors, fonts)}
              onPressIn={() => {
                timeType.current = 'startTime';
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
            <Text style={styles.label(fonts)}>End time</Text>
            <TextInput
              style={styles.nameInput(colors, fonts)}
              onPressIn={() => {
                timeType.current = 'endTime';
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
        </View>
        <View style={styles.field}>
          <Text style={styles.label(fonts)}>Full Name</Text>
          <TextInput
            style={styles.nameInput(colors, fonts)}
            placeholder="Enter full name"
            placeholderTextColor={colors.placeholder}
            onChangeText={e => onChangeNewData(e, 'name')}
            value={newScheduleData.name}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label(fonts)}>Title</Text>
          <TextInput
            style={styles.nameInput(colors, fonts)}
            placeholder="Enter title"
            placeholderTextColor={colors.placeholder}
            onChangeText={e => onChangeNewData(e, 'title')}
            value={newScheduleData.title}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label(fonts)}>Description</Text>
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
        
        {visibleTimePicker && (
          <RNDateTimePicker
            value={time}
            mode={'time'}
            display={'spinner'}
            is24Hour={false}
            onChange={(e, v) => onChangeNewData(v, timeType.current)}
            style={styles.datePicker}
          />
        )}
        {visibleDatePicker && (
          <RNDateTimePicker
            value={date.current}
            mode={'date'}
            display={'spinner'}
            onChange={(e, v) => onChangeNewData(v, 'date')}
            style={styles.datePicker}
          />
        )}
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10}}>
        <TextButton
          text={visibleSchedularDlg.type === addTypes.editEvent ? 'Update' : 'Add'}
          onPress={() => addSchedule()}
          textStyle={styles.actionButtonText}
          style={styles.actionButton(colors)}
        />
        {
          visibleSchedularDlg.type === addTypes.editEvent && (
            <TextButton
              text='Remove'
              onPress={deleteSchedule}
              textStyle={styles.actionButtonText}
              style={styles.actionButton(colors)}
            />
          )
        }
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
    marginBottom: 10,
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
    width: 90,
    paddingVertical: 10
  }),
  field: {
    marginBottom: 10,
  },
  label: fonts => ({
    ...fonts.values,
    color: fonts.labels.color,
    marginBottom: 5,    
  }),
});

export default SchedularDlg;
