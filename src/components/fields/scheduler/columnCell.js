import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Alert} from 'react-native';
import {useTheme} from 'react-native-paper';
import TextButton from '../../../common/TextButton';
import { tConvert } from '../../../utils';
import formStore from '../../../store/formStore';

const addTypes = {
    newEvent: 'newEvent',
    firstEvent: 'firstEvent',
    editEvent: 'editEvent',
};

const ColumnCell = ({date, schedulesOfDate, onClick, index, element}) => {
    const {colors, fonts} = useTheme();
    const userRole = formStore(state => state.userRole);
    const preview = formStore(state => state.preview);
    const setVisibleSchedularDlg = formStore(state => state.setVisibleSchedularDlg);
    const role = element.role.find(e => e.name === userRole);
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
                            disabled={!role.edit && !preview}
                            text={tConvert(schedule?.startTime.toLocaleTimeString().substring(0, 5))}
                            style={styles.button(element.meta.dateFont.color)}
                            textStyle={element.meta.scheduleFont}
                            onPress={() => {
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