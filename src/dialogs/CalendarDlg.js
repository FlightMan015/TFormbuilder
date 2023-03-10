import React, {useState, useEffect} from 'react';
import {StyleSheet, TextInput, Text, View, Alert} from 'react-native';
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
  const visibleCalendarDlg = formStore(state => state.visibleCalendarDlg);
  const setVisibleCalendarDlg = formStore(state => state.setVisibleCalendarDlg);
  const i18nValues = formStore(state => state.i18nValues);

  useEffect(() => {
    if (visibleCalendarDlg.eventType === addTypes.editEvent) {
      setNewScheduleData(visibleCalendarDlg.oldScheduleData);
    }
  }, [visibleCalendarDlg]);

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
    setVisibleCalendarDlg({...visibleCalendarDlg, calendarEvent: false});
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
      warning = i18nValues.t("warnings.input_name");
    } else if (newScheduleData.title === '') {
      warning = i18nValues.t("warnings.input_title");
    } else if (newScheduleData.description === '') {
      warning = i18nValues.t("warnings.input_content");
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
      Alert.alert(i18nValues.t("warnings.warning"), warning, [
        {
          text: i18nValues.t("setting_labels.cancel"),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: i18nValues.t("setting_labels.ok"), onPress: () => console.log('OK Pressed')},
      ]);
    } else {
      cancel();
      if (visibleCalendarDlg.eventType === addTypes.firstEvent) {
        const tempItems = {...formValue[visibleCalendarDlg.element.field_name]};
        setFormValue({...formValue, [visibleCalendarDlg.element.field_name]: {
          ...tempItems,
          [visibleCalendarDlg.selectedDay.dateString]: {
            marked: true,
            events: [
              {
                ...newScheduleData,
                dateString: visibleCalendarDlg.selectedDay.dateString,
                color: getRandomColor(),
              },
            ],
          },
        }})
      }
      if (visibleCalendarDlg.eventType === addTypes.newEvent) {
        const tempItems = {...formValue[visibleCalendarDlg.element.field_name]};
        tempItems[visibleCalendarDlg.selectedDay.dateString].events.push({
          ...newScheduleData,
          dateString: visibleCalendarDlg.selectedDay.dateString,
          color: getRandomColor(),
        });
        setFormValue({...formValue, [visibleCalendarDlg.element.field_name]: tempItems});
        if (visibleCalendarDlg.element.event.onCreateNewSchedule) {
          Alert.alert('Rule Action', `Fired onCreateNewSchedule action. rule - ${visibleCalendarDlg.element.event.onCreateNewSchedule}.`);
        }
      }
      if (visibleCalendarDlg.eventType === addTypes.editEvent) {
        const tempItems = {...formValue[visibleCalendarDlg.element.field_name]};
        const oldColor = tempItems[visibleCalendarDlg.selectedDay.dateString].events[visibleCalendarDlg.eventEditIndex].color;
        tempItems[visibleCalendarDlg.selectedDay.dateString].events.splice(
          visibleCalendarDlg.eventEditIndex,
          1,
          {
            ...newScheduleData,
            dateString: visibleCalendarDlg.selectedDay.dateString,
            color: oldColor,
          },
        );
        setFormValue({...formValue, [visibleCalendarDlg.element.field_name]: tempItems});
        if (visibleCalendarDlg.element.event.onUpdateSchedule) {
          Alert.alert('Rule Action', `Fired onUpdateSchedule action. rule - ${visibleCalendarDlg.element.event.onUpdateSchedule}.`);
        }
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
      visible={visibleCalendarDlg.calendarEvent !== undefined && visibleCalendarDlg.calendarEvent}
      onDismiss={cancel}
      style={{...styles.dialog, backgroundColor: colors.card}}>
      <Text style={{...fonts.headings, marginVertical: 15}}>
        {visibleCalendarDlg.eventType === addTypes.editEvent ? i18nValues.t("setting_labels.edit_entry") : i18nValues.t("setting_labels.new_entry")}
      </Text>
      <View>
        <View style={styles.timeContainer}>
          <View style={styles.startTime}>
            <Text style={styles.label(fonts)}>{i18nValues.t("setting_labels.start_time")}</Text>
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
            <Text style={styles.label(fonts)}>{i18nValues.t("setting_labels.end_time")}</Text>
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
        <View style={styles.field}>
          <Text style={styles.label(fonts)}>{i18nValues.t("setting_labels.full_name")}</Text>
          <TextInput
            style={styles.nameInput(colors, fonts)}
            placeholder={i18nValues.t("placeholders.enter_full_name")}
            placeholderTextColor={colors.placeholder}
            onChangeText={e => onChangeNewData(e, 'name')}
            value={newScheduleData.name}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label(fonts)}>{i18nValues.t("setting_labels.title")}</Text>
          <TextInput
            style={styles.nameInput(colors, fonts)}
            placeholder={i18nValues.t("placeholders.enter_title")}
            placeholderTextColor={colors.placeholder}
            onChangeText={e => onChangeNewData(e, 'title')}
            value={newScheduleData.title}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label(fonts)}>{i18nValues.t("setting_labels.description")}</Text>
          <TextInput
            style={styles.nameInput(colors, fonts)}
            placeholder={i18nValues.t("placeholders.enter_description")}
            placeholderTextColor={colors.placeholder}
            multiline={true}
            numberOfLines={2}
            onChangeText={e => onChangeNewData(e, 'description')}
            value={newScheduleData.description}
          />
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15}}>
        <TextButton
          text={visibleCalendarDlg.eventType === addTypes.editEvent ? i18nValues.t("setting_labels.update") : i18nValues.t("setting_labels.add")}
          onPress={() => addSchedule()}
          textStyle={styles.actionButtonText}
          style={styles.actionButton(colors)}
        />
        <TextButton
          text={i18nValues.t("setting_labels.cancel")}
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
    width: 100,
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

export default CalendarDlg;
