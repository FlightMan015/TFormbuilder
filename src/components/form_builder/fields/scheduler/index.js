import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import SchedularHeader from './header';
import SchedularBody from './body';
import formStore from '../../../../store/formStore';
import FieldLabel from '../../../../common/FieldLabel';
import TextButton from '../../../../common/TextButton';
import { sortByYearAndByMonth } from '../../../../utils';

const Schedular = ({element, index}) => {
    const {colors, fonts} = useTheme();
    const formValue = formStore(state => state.formValue);
    const i18nValues = formStore(state => state.i18nValues);
    const [date, setDate] = useState(new Date(Date.now()).toISOString().split('T')[0]);

    return (
        <View style={styles.container(element)}>
            <FieldLabel label={element.meta.title || i18nValues.t("field_labels.schedular")} visible={!element.meta.hide_title} />
            <SchedularHeader selectedMonth={date} onClick={e => {setDate(e);}} element={element} />
            <SchedularBody element={element} schedules={formValue[element.field_name] || {}} schedulesOfMonth={sortByYearAndByMonth(formValue[element.field_name] || {})} year={date.substring(0,4)} month={date.substring(5,7)} />
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <TextButton
                    text={'Book an appointment'}
                    style={styles.button(colors)}
                    textStyle={{...fonts.values, color: '#FFFFFF'}}
                    disabled={true}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: element => ({
        ...element.meta.padding
    }),
    button: colors => ({
        marginTop: 30,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 50,
        backgroundColor: colors.colorButton,
        width: '70%'
    }),
});

export default Schedular;