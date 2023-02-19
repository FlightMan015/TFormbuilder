import React, {useEffect, useState, useRef, useMemo} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from 'react-native';
import { color } from '../../theme/styles';
import {
  IconButton,
  Avatar,
  List,
  useTheme,
} from 'react-native-paper';
import {Calendar} from 'react-native-calendars';
import formStore from '../../store/formStore';
import FieldLabel from '../../common/FieldLabel';

const SchedularSubField = ({element, index}) => {
  const {colors, fonts} = useTheme();
  const userRole = formStore(state => state.userRole);
  const role = element.role.find(e => e.name === userRole);
  const formValue = formStore(state => state.formValue);
  const setFormValue = formStore(state => state.setFormValue);
  const visibleDlg = formStore(state => state.visibleDlg);
  const setVisibleDlg = formStore(state => state.setVisibleDlg);
  const preview = formStore(state => state.preview);
  const [markedDates, setMarkedDates] = useState({});
  const [visibleCalendar, setVisibleCalendar] = useState(true);
  const addType = useRef('');
  const addTypes = {
    newEvent: 'newEvent',
    firstEvent: 'firstEvent',
    editEvent: 'editEvent',
  };
  const selectedDay = useRef(null);
  let opacity = new Animated.Value(1);
  const newDayString = new Date(Date.now()).toLocaleDateString().split('/');

  const animate1 = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const animate2 = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (formValue[element.field_name]) {
      setMarkedDates(formValue[element.field_name]);
    }
  }, [JSON.stringify(formValue[element.field_name])]);

  const RenderItem = ({item}) => {
    return (
      <View>
        {item && item.events && item.events.map((e, i) => {
          const names = e.name.split(' ');
          return (
            <TouchableOpacity
              key={i}
              onPress={() => {
                setVisibleDlg({
                  ...visibleDlg,
                  calendarEvent: true,
                  eventType: addTypes.editEvent,
                  index: index,
                  selectedDay: selectedDay.current,
                  element: element,
                  eventEditIndex: i,
                  oldScheduleData: e,
                });
              }}
              onLongPress={() => {
                // setDeleteDateString(e.dateString);
                Alert.alert(
                  'Delete entry',
                  'Are you sure you want to delete this entry?',
                  [
                    {
                      text: 'OK',
                      onPress: () => {
                        const tempElement = {...formValue[element.field_name]};
                        tempElement[e.dateString].events.splice(i, 1);
                        setFormValue({...formValue, [element.field_name]: tempElement});
                      },
                    },
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                  ],
                );
              }}>
              <View style={styles.eventItemContainter}>
                <List.Item
                  title={`${
                    typeof e.startTime === 'string'
                      ? new Date(e.startTime).toLocaleTimeString('en-US')
                      : e.startTime.toLocaleTimeString('en-US')
                  } - ${
                    typeof e.endTime === 'string'
                      ? new Date(e.endTime).toLocaleTimeString('en-US')
                      : e.endTime.toLocaleTimeString('en-US')
                  }`}
                  titleStyle={styles.eventItemTime}
                  description={e.title}
                  descriptionStyle={styles.eventItemTitle}
                  right={props => {
                    if (e.name) {
                      return (
                        <View flexDirection="row">
                          <Avatar.Text
                            size={40}
                            label={
                              names[1]
                                ? names[0].substring(0, 1) +
                                  names[1].substring(0, 1)
                                : e.name.substring(0, 2)
                            }
                            style={styles.eventItemAvatar(e.color)}
                          />
                        </View>
                      );
                    }
                  }}
                  style={styles.eventItemHeader}
                />
                <Text style={styles.eventItemContent}>{e.description}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
        {(role.edit  || preview) && (
          <IconButton
            icon="plus"
            size={18}
            iconColor={color.WHITE}
            style={{
              ...styles.newScheduleBtn,
              backgroundColor: colors.colorButton,
            }}
            onPress={() => {
              // setAddType(addTypes.newEvent);
              addType.current = addTypes.firstEvent;
              if (markedDates[selectedDay.current.dateString] && markedDates[selectedDay.current.dateString].events) {
                setVisibleDlg({
                  ...visibleDlg,
                  calendarEvent: true,
                  eventType: addTypes.newEvent,
                  index: index,
                  selectedDay: selectedDay.current,
                  element: element,
                });
              } else {
                setVisibleDlg({
                  ...visibleDlg,
                  calendarEvent: true,
                  eventType: addTypes.firstEvent,
                  index: index,
                  selectedDay: selectedDay.current,
                  element: element,
                });
              }
            }}
          />
        )}
      </View>
    );
  };

  const selectDay = day => {
    let selectedDayData = {};
    let tempMarkedDates = JSON.parse(JSON.stringify(markedDates));
    if (selectedDay.current) {
      const markedDateData = JSON.parse(JSON.stringify(markedDates[selectedDay.current.dateString]));
      delete markedDateData.selected;
      delete markedDateData.selectedColor;
      if (Object.keys(markedDateData).length === 0) {
        delete tempMarkedDates[selectedDay.current.dateString];
      } else {
        tempMarkedDates = {...tempMarkedDates, [selectedDay.current.dateString]: markedDateData};
      }
    }
    if (
      tempMarkedDates[day.dateString] !== undefined &&
      tempMarkedDates[day.dateString]
    ) {
      selectedDayData = {
        ...tempMarkedDates[day.dateString],
        selected: true,
        selectedColor: color.BtnDefault,
      };
    } else {
      selectedDayData = {
        selected: true,
        selectedColor: color.BtnDefault,
      };
    }
    selectedDay.current = day;
    setMarkedDates({...tempMarkedDates, [day.dateString]: selectedDayData});
    setTimeout(() => {
      animate1();
    }, 1000);
    setVisibleCalendar(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FieldLabel label={element.meta.title || 'Calendar'} visible={!element.meta.hide_title} />
      {visibleCalendar && <Calendar
        initialDate= {
          '20' + newDayString[2] + '-' + newDayString[0] + '-' + newDayString[1]
        }
        minDate={'2012-05-01'}
        maxDate={'2100-05-30'}
        onDayPress={selectDay}
        monthFormat={'yyyy MM'}
        onPressArrowLeft={subtractMonth => subtractMonth()}
        onPressArrowRight={addMonth => addMonth()}
        markedDates={markedDates}
        theme={{...styles.theme(colors, fonts)}}
      />}
      {!visibleCalendar && (
        <View style={styles.schedule(colors)}>
          <View style={styles.dayHeader}>
            <Text style={fonts.labels}>{selectedDay.current ? selectedDay.current.dateString : ''}</Text>
            <IconButton icon="calendar" size={25} iconColor={colors.colorButton} onPress={() => setVisibleCalendar(true)} />
          </View>
          <View>
            <RenderItem item={markedDates[selectedDay.current.dateString]} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const Scheduler = props => {
  const {element, index, editRole} = props;
  const updateFormData = formStore(state => state.updateFormData);
  return useMemo(() => <SchedularSubField element={element} index={index} editRole={editRole} onClickUpdateField={updateFormData} />, [element, index, editRole]);
};

const styles = StyleSheet.create({
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dialog: {
    marginTop: 0,
  },
  container: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  dialogTitle: {
    marginTop: 10,
    marginBottom: 10,
  },
  dialogContent: {
    paddingBottom: 0,
  },
  field: {
    marginBottom: 5,
  },
  renderIconContainer: {
    alignSelf: 'center',
  },
  label: {
    width: '14%',
    textAlign: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameInput: {
    width: '100%',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'grey',
    paddingVertical: 0,
    color: 'grey',
  },
  startTime: {
    width: '49%',
  },
  eventItemContainter: {
    marginTop: 2,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: color.GREY,
  },
  eventItemTime: {
    color: '#333',
    fontSize: 14,
  },
  eventItemTitle: {
    color: '#222',
    fontSize: 17,
    fontWeight: '600',
  },
  eventItemAvatar: backgroundColor => ({
    alignSelf: 'center',
    backgroundColor: backgroundColor,
    marginRight: 5,
  }),
  eventItemHeader: {
    paddingBottom: 0,
  },
  eventItemContent: {
    paddingBottom: 10,
    paddingHorizontal: 15,
    fontSize: 15,
  },
  newScheduleBtn: {
    alignSelf: 'center',
    marginTop: 10,
    padding: 0,
  },
  theme: (colors, fonts) => ({
    backgroundColor: colors.card,
    calendarBackground: colors.card,
    textSectionTitleColor: '#b6c1cd',
    textSectionTitleDisabledColor: '#d9e1e8',
    selectedDayBackgroundColor: colors.colorButton,
    selectedDayTextColor: '#ffffff',
    todayTextColor: colors.colorButton,
    dayTextColor: colors.icon,
    textDisabledColor: colors.border,
    dotColor: '#00adf5',
    selectedDotColor: '#ffffff',
    arrowColor: fonts.labels.color,
    disabledArrowColor: '#d9e1e8',
    monthTextColor: fonts.labels.color,
    indicatorColor: colors.colorButton,
    textDayFontFamily: fonts.values.fontFamily,
    textMonthFontFamily: fonts.labels.fontFamily,
    textDayHeaderFontFamily: fonts.labels.fontFamily,
    textDayFontWeight: '300',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '300',
    textDayFontSize: fonts.values.fontSize,
    textMonthFontSize: fonts.labels.fontSize,
    textDayHeaderFontSize: fonts.values.fontSize,
  }),

  header: headerStyle => ({
    margin: 15,
    marginTop: 20,
    textAlign: 'center',
    fontSize: 25,
    color: 'black',
    ...headerStyle,
  }),
  text: {
    margin: 10,
  },
  editForm: {
    borderColor: color.GREY,
    borderRadius: 5,
    borderWidth: 1,
    margin: 3,
    paddingBottom: 10,
  },
  fieldheader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  switchContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  textBox: (multiline, numberOfLines) => ({
    height: !multiline ? 40 : 40 * numberOfLines,
    borderColor: color.GREY,
    borderWidth: 1,
    borderRadius: 3,
    margin: 10,
    paddingLeft: 10,
  }),
  text2: {
    marginTop: 10,
    marginLeft: 10,
  },
  schedule: colors => ({
    backgroundColor: colors.card,
    padding: 10,
    borderRadius: 10,
  }),
});

Scheduler.propTypes = {
  index: PropTypes.object,
  element: PropTypes.object,
};

export default React.memo(Scheduler);


