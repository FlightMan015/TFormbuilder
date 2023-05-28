import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { useTheme } from 'react-native-paper';
import FieldLabel from '../../../common/FieldLabel';
import formStore from '../../../store/formStore';
import Icon from 'react-native-vector-icons/Ionicons';

const ImageField = ({element}) => {
  const {colors, fonts} = useTheme();
  const i18nValues = formStore(state => state.i18nValues);

  return (
    <View style={styles.container(element)}>
      <FieldLabel label={element.meta.title || i18nValues.t("field_labels.image")} visible={!element.meta.hide_title} />
      <View>
        <TouchableOpacity
          style={styles.browerBtn(fonts, colors)}
          disabled>
          <Icon name="image" size={35} color={fonts.values.color} />
          <Text style={styles.browerBtnText(fonts)}>{i18nValues.t("setting_labels.browse_image")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: element => ({
    ...element.meta.padding
  }),
  browerBtn: (fonts, colors) => ({
    height: 100,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: fonts.values.color,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    backgroundColor: colors.card,
  }),
  browerBtnText: fonts => ({
    ...fonts.values
  }),
});

ImageField.propTypes = {
  element: PropTypes.object.isRequired,
};

export default ImageField;
