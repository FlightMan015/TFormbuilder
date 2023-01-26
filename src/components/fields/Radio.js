import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Image, TouchableOpacity, Alert} from 'react-native';
import {useTheme} from 'react-native-paper';
import {radioButton} from '../../constant';

const Radio = props => {
  const {element, contents, editRole} = props;
  const {colors} = useTheme();
  const [value, setValue] = useState('');

  // const onPress = value => () => onChangeInputValue(value);

  return (
    <View key={element.field_name} style={styles.container}>
      <Text style={styles.carouselTitle(colors)}>{element.meta.title || 'Radio Group'}</Text>
      {element.meta.options.map((item, index) => (
        <View key={index} style={styles.radioContainer}>
          <TouchableOpacity
            onPressIn={() => {
              setValue(item);
              if (element.event.onSelect) {
                Alert.alert('Rule Action', `Fired onSelect action. rule - ${element.event.onSelect}. selectedValue - ${item}`);
              }
            }}
            hitSlop={styles.slop}
            style={styles.buttonContainer}
            disabled={!editRole}
            key={index}>
            <Image
              accessibilityLabel={`choose-option-${item}`}
              style={styles.radioButtonImage}
              source={
                value === (item)
                  ? radioButton.selected
                  : radioButton.unselected
              }
            />
            <Text style={styles.text}>{item}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  carouselTitle: colors => ({
    fontSize: 16,
    padding: 5,
    color: colors.text,
  }),
  buttonContainer: {
    flexDirection: 'row',
  },
  radioButtonImage: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  text: {
    paddingLeft: 10,
  },
  heading: {
    margin: 10,
  },
  slop: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
  radioContainer: {
    paddingVertical: 10,
    width: '100%',
    height: 40,
    paddingLeft: 10,
  },
});

Radio.propTypes = {
  element: PropTypes.object.isRequired,
};

export default React.memo(Radio);
