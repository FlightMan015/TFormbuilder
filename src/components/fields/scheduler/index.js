import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import SchedularHeader from './header';
import SchedularBody from './body';
import formStore from '../../../store/formStore';
import FieldLabel from '../../../common/FieldLabel';
import TextButton from '../../../common/TextButton';
import { sortByYearAndByMonth } from '../../../utils';

const addTypes = {
    newEvent: 'newEvent',
    firstEvent: 'firstEvent',
    editEvent: 'editEvent',
};

const Schedular = ({element, index}) => {
    const {colors, fonts} = useTheme();
    const formValue = formStore(state => state.formValue);
    const visibleDlg = formStore(state => state.visibleDlg);
    const setVisibleDlg = formStore(state => state.setVisibleDlg);
    const [date, setDate] = useState(new Date(Date.now()).toISOString().split('T')[0]);

    const kkkk = new Date('2023-10-25');

    console.log(kkkk.getFullYear(), kkkk.getDay(), kkkk.getDate(), kkkk.getMonth(), kkkk.toDateString(), kkkk.toDateString(), typeof kkkk);

    return (
        <View style={styles.container}>
            <FieldLabel label={element.meta.title || 'Appointment'} visible={!element.meta.hide_title} />
            <SchedularHeader selectedMonth={date} onClick={e => setDate(e)} element={element} />
            <SchedularBody element={element} schedules={formValue[element.field_name] || {}} schedulesOfMonth={sortByYearAndByMonth(formValue[element.field_name] || {})} year={date.substring(0,4)} month={date.substring(5,7)} />
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <TextButton
                    text={'Book an appointment'}
                    style={styles.button(colors)}
                    textStyle={{...fonts.values, color: '#FFFFFF'}}
                    onPress={() => {
                        setVisibleDlg({
                            schedularEvent: true,
                            index: index,
                            element: element,
                        });
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 5,
    },
    button: colors => ({
        marginTop: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 50,
        backgroundColor: colors.colorButton,
    }),
});

export default Schedular;