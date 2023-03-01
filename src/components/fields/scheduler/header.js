import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from 'react-native';
import {useTheme, IconButton} from 'react-native-paper';

const SchedularHeader = ({selectedMonth, onClick, element}) => {
    const {colors, fonts} = useTheme();

    const selectedDate = new Date(selectedMonth);
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;

    console.log('selectedMonth---------------------------', selectedMonth, selectedDate.toDateString(), selectedDate.toLocaleDateString())

    return (
        <View style={styles.containter(colors, fonts)}>
            <IconButton
                icon="chevron-left"
                size={fonts.labels.fontSize}
                iconColor={element.meta.monthFont.color}
                onPress={() => {
                    if (month > 1 && month <= 10) {
                        onClick(year.toString() + '-0' + (month - 1).toString() + '-01');
                    } else if (month > 10) {
                        onClick(year.toString() + '-' + (month - 1).toString() + '-01');
                    } else {
                        onClick((year - 1).toString() + '-12-01');
                    }
                }}
            />
            <Text style={styles.text(element.meta.monthFont)}>{selectedDate.toDateString().split(' ')[1] + '   ' + selectedDate.toDateString().split(' ')[3]}</Text>
            <IconButton
                icon="chevron-right"
                size={fonts.labels.fontSize}
                iconColor={element.meta.monthFont.color}
                onPress={() => {
                    console.log(year, month)
                    if (month <= 8) {
                        console.log(month+1)
                        onClick(year.toString() + '-0' + (month + 1).toString() + '-01');
                    } else if (month > 8 && month < 12) {
                        onClick(year.toString() + '-' + (month + 1).toString() + '-01');
                    } else {
                        onClick((year + 1).toString() + '-01-01');
                    }
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    containter: colors => ({
        flexDirection: 'row',
        backgroundColor: colors.card,
        borderRadius: 100,
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 10,
    }),
    text: font => ({
        ...font,
        marginHorizontal: 15,
    }),
});

export default SchedularHeader;