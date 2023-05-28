import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from 'react-native';
import {useTheme, IconButton} from 'react-native-paper';

const SchedularHeader = ({selectedMonth, onClick, element}) => {
    const {colors, fonts} = useTheme();

    const selectedDate = new Date(selectedMonth);
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;

    return (
        <View style={styles.containter(colors, fonts)}>
            <IconButton
                icon="chevron-left"
                size={fonts.labels.fontSize}
                iconColor={element.meta.monthFont.color}
                disabled
            />
            <Text style={styles.text(element.meta.monthFont)}>{selectedDate.toDateString().split(' ')[1] + '   ' + selectedDate.toDateString().split(' ')[3]}</Text>
            <IconButton
                icon="chevron-right"
                size={fonts.labels.fontSize}
                iconColor={element.meta.monthFont.color}
                disabled
            />
        </View>
    );
};

const styles = StyleSheet.create({
    containter: colors => ({
        width: '70%',
        flexDirection: 'row',
        backgroundColor: colors.card,
        borderRadius: 100,
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 10,
        justifyContent: 'space-between',
    }),
    text: font => ({
        ...font,
        marginHorizontal: 15,
    }),
});

export default SchedularHeader;