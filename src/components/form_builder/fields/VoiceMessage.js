import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';
import FieldLabel from '../../../common/FieldLabel';
import formStore from '../../../store/formStore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const VoiceMessage = ({element}) => {
  const {colors, fonts} = useTheme();
  const i18nValues = formStore(state => state.i18nValues);

  return (
    <View style={styles.container(element)}>
      <FieldLabel label={element.meta.title || i18nValues.t("field_labels.voice_message")} visible={!element.meta.hide_title} />
      <View style={styles.mainView(colors)}>
        <Text style={styles.text(fonts)}>
          {'00:00'}
        </Text>
        <TouchableOpacity
          style={styles.recordIcon}
          disabled
        >
          <Icon
            name={'microphone-outline'}
            size={25}
            color={colors.colorButton}
          />
        </TouchableOpacity>
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
    paddingVertical: 3,
    marginBottom: 5,
  }),
  recordIcon: {
    margin: 5,
  },
  text: (fonts) => ({
    textAlign: 'center',
    marginLeft: 10,
    ...fonts.values,
  }),
});

VoiceMessage.propTypes = {
  element: PropTypes.object.isRequired,
};

export default VoiceMessage;
