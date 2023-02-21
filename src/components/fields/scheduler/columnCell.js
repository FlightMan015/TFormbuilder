import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Alert} from 'react-native';
import {useTheme} from 'react-native-paper';
import TextButton from '../../../common/TextButton';
import { tConvert } from '../../../utils';

const addTypes = {
    newEvent: 'newEvent',
    firstEvent: 'firstEvent',
    editEvent: 'editEvent',
};

const ColumnCell = ({date, schedulesOfDate, onClick, index, element}) => {
    const {colors, fonts} = useTheme();
    var sorted = schedulesOfDate.sort(function(a, b) {
        return new Date(a.startTime) - new Date(b.startTime);
    });
    return useMemo(() => (
        <View style={styles.containter(element.meta.dateFont.color, index)}>
            <Text style={element.meta.dateFont}>{new Date(date).toDateString().split(' ')[2]}</Text>
            <Text style={{...element.meta.dayFont, marginBottom: 10}}>{new Date(date).toDateString().split(' ')[0]}</Text>
            {
                sorted.map((schedule, index) => {
                    return (
                        <TextButton
                            key={index}
                            text={tConvert(schedule?.startTime.toISOString().split('T')[1].substring(0, 5))}
                            style={styles.button(element.meta.dateFont.color)}
                            textStyle={element.meta.scheduleFont}
                            onPress={() => {
                                Alert.alert('Appointment', `${schedule.startTime} ~ ${schedule.endTime}`);
                            }}
                        />
                    );
                })
            }
        </View>
    ), [date, JSON.stringify(sorted), JSON.stringify(element.meta)]);
};

const styles = StyleSheet.create({
    containter: (color, index) => ({
        flexDirection: 'column',
        alignItems: 'center',
        borderLeftColor: color,
        borderLeftWidth: index === 0 ? 0 : 1,
        minWidth: 65,
    }),
    button: color => ({
        paddingHorizontal: 5,
        paddingVertical: 3,
        marginHorizontal: 5,
        marginVertical: 2,
        borderRadius: 5,
        backgroundColor: color,
    }),
});

export default ColumnCell;