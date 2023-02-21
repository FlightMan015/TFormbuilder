import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useTheme} from 'react-native-paper';
import ColumnCell from './columnCell';

const monthDates1 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const monthDates2 = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const SchedularBody = ({year, month, schedules, schedulesOfMonth, element}) => {
    console.log(schedulesOfMonth)
    const {colors, fonts} = useTheme();
    return (
        <ScrollView style={styles.scrollView} horizontal>
            <View style={styles.containter(colors)}>
                {
                    Array.from({length: parseInt(year, 10) % 4 === 0 ? monthDates2[parseInt(month, 10) - 1] : monthDates1[parseInt(month, 10) - 1]}, (_, index) => {
                        const date = index + 1;
                        const dateString = `${year}-${month}-${date < 10 ? '0' + date : date}`;
                        return (
                            <ColumnCell
                                key={index}
                                index={index}
                                date={dateString}
                                schedulesOfDate={schedules[dateString]?.events || []}
                                onClick={() => {}}
                                element={element}
                            />
                        );
                    })

                    // Object.keys(schedulesOfMonth).length > 0 && schedulesOfMonth[year][month].map((date, index) => {
                    //     return (
                    //         <ColumnCell
                    //             index={index}
                    //             date={date}
                    //             schedulesOfDate={schedules[date]?.events || []}
                    //             onClick={() => {}}
                    //         />
                    //     );
                    // })
                }
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    containter: colors => ({
        flexDirection: 'row',
        backgroundColor: colors.card,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 15,
    }),
    scrollView: {
        width: '100%',
    },
});

export default SchedularBody;