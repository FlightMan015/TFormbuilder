import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Alert} from 'react-native';
import {shadow, useTheme} from 'react-native-paper';
import TextButton from '../../../../common/TextButton';
import { tConvert } from '../../../../utils';
import formStore from '../../../../store/formStore';
import { useState } from 'react';

const addTypes = {
    newEvent: 'newEvent',
    firstEvent: 'firstEvent',
    editEvent: 'editEvent',
};

const ColumnCell = ({date, schedulesOfDate, onClick, index, element, role}) => {
    const {colors, fonts} = useTheme();
    const userRole = formStore(state => state.userRole);
    const preview = formStore(state => state.preview);
    const setVisibleSchedularDlg = formStore(state => state.setVisibleSchedularDlg);
    const [selectedTime, setSelectedtime] = useState(null);
    var sorted = schedulesOfDate.sort(function(a, b) {
        return new Date(a.startTime) - new Date(b.startTime);
    });
    return useMemo(() => (
        <View style={styles.containter(element.meta.dateFont.color, index)}>
            <Text style={element.meta.dateFont}>{date.substring(8, 10)}</Text>
            <Text style={{...element.meta.dayFont, marginBottom: 10}}>{new Date(date).toDateString().split(' ')[0]}</Text>
            {
                sorted.map((schedule, eventindex) => {
                    return (
                        <TextButton
                            key={eventindex}
                            disabled={!(role.edit && (userRole.edit || userRole.submit))}
                            text={tConvert(typeof(schedule.startTime) === 'string' ? new Date(schedule.startTime).toLocaleTimeString().substring(0, 5) : schedule?.startTime.toLocaleTimeString().substring(0, 5))}
                            style={styles.button(element.meta.dateFont.color, typeof(schedule.startTime) === 'string' ? new Date(schedule?.startTime).toLocaleTimeString() === selectedTime : schedule?.startTime.toLocaleTimeString() === selectedTime)}
                            textStyle={typeof(schedule.startTime) === 'string' ? new Date(schedule.startTime).toLocaleTimeString() === selectedTime ? element.meta.scheduleFont : {...element.meta.scheduleFont, color: 'grey'} : schedule.startTime.toLocaleTimeString() === selectedTime ? element.meta.scheduleFont : {...element.meta.scheduleFont, color: 'grey'}}
                            onPress={() => {
                                setSelectedtime(schedule?.startTime.toLocaleTimeString());
                                setVisibleSchedularDlg({
                                    schedularEvent: true,
                                    eventindex,
                                    index,
                                    element: element,
                                    sorted,
                                    date,
                                    type: 'edit',
                                });
                            }}
                        />
                    );
                })
            }
        </View>
    ), [date, JSON.stringify(sorted), JSON.stringify(element.meta), selectedTime]);
};

const styles = StyleSheet.create({
    containter: (color, index) => ({
        flexDirection: 'column',
        alignItems: 'center',
        borderLeftColor: color,
        borderLeftWidth: index === 0 ? 0 : 1,
        minWidth: 65,
    }),
    button: (color, selected) => ({
        paddingHorizontal: 5,
        paddingVertical: 3,
        marginHorizontal: 5,
        marginVertical: 2,
        borderRadius: 5,
        backgroundColor: selected ? color : null,
    }),
});

export default ColumnCell;