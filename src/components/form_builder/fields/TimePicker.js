import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from 'react-native';
import {IconButton, useTheme} from 'react-native-paper';
import FieldLabel from '../../../common/FieldLabel';
import formStore from '../../../store/formStore';

const TimePicker = ({element}) => {
  const {colors, fonts} = useTheme();
  const i18nValues = formStore(state => state.i18nValues);
  const [time, setTime] = useState(new Date(Date.now()));

  return (
    <View style={styles.container(element)}>
      <FieldLabel label={element.meta.title || i18nValues.t("field_labels.time")} visible={!element.meta.hide_title} />
      <View style={styles.mainView(colors)}>
        <Text style={styles.text(fonts)}>
          {time.toLocaleTimeString()}
        </Text>
        <IconButton
          icon="alarm"
          iconColor={colors.colorButton}
          disabled
          style={{
            ...styles.icon,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: element => ({
    ...element.meta.padding
  }),
  mainView: (colors) => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: 10,
    height: 40,
  }),
  icon: {
    margin: 0,
  },
  text: (fonts) => ({
    textAlign: 'center',
    marginLeft: 10,
    ...fonts.values,
  }),
});

TimePicker.propTypes = {
  element: PropTypes.object.isRequired,
};

export default TimePicker;
