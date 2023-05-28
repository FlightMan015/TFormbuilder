import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { color } from '../../../theme/styles';
import {
  useTheme,
} from 'react-native-paper';
import {Calendar} from 'react-native-calendars';
import formStore from '../../../store/formStore';
import FieldLabel from '../../../common/FieldLabel';

const SchedularSubField = ({element}) => {
  const {colors, fonts} = useTheme();
  const newDayString = new Date(Date.now()).toLocaleDateString().split('/');

  return (
    <SafeAreaView style={styles.container}>
      <FieldLabel label={element.meta.title || 'Calendar'} visible={!element.meta.hide_title} />
      <Calendar
        initialDate= {
          '20' + newDayString[2] + '-' + newDayString[0] + '-' + newDayString[1]
        }
        minDate={'2012-05-01'}
        maxDate={'2100-05-30'}
        // onDayPress={selectDay}
        monthFormat={'yyyy MM'}
        disableArrowLeft
        disableArrowRight
        theme={{...styles.theme(colors, fonts)}}
        dayComponent={({date, state}) => {
          return (
            <TouchableOpacity disabled>
              <Text style={{textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black'}}>{date.day}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

const Scheduler = props => {
  const {element, index, editRole} = props;
  const updateFormData = formStore(state => state.updateFormData);
  return useMemo(() => <SchedularSubField element={element} index={index} editRole={editRole} onClickUpdateField={updateFormData} />, [element, index, editRole]);
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  theme: (colors, fonts) => ({
    backgroundColor: colors.card,
    calendarBackground: colors.card,
    textSectionTitleColor: '#b6c1cd',
    textSectionTitleDisabledColor: '#d9e1e8',
    selectedDayBackgroundColor: colors.colorButton,
    selectedDayTextColor: '#ffffff',
    todayTextColor: colors.colorButton,
    dayTextColor: '#FF0000',
    textDisabledColor: colors.border,
    dotColor: colors.colorButton,
    selectedDotColor: '#ffffff',
    arrowColor: colors.colorButton,
    disabledArrowColor: 'grey',
    monthTextColor: colors.colorButton,
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
});

Scheduler.propTypes = {
  index: PropTypes.array,
  element: PropTypes.object,
};

export default React.memo(Scheduler);


