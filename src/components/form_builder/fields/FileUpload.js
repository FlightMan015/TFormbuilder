import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FieldLabel from '../../../common/FieldLabel';
import formStore from '../../../store/formStore';
import { useTheme } from 'react-native-paper';

const FileUpload = props => {
  const {element} = props;
  const {colors, fonts} = useTheme();
  const i18nValues = formStore(state => state.i18nValues);

  return (
    <View style={styles.container(element)}>
      <FieldLabel label={element.meta.title || i18nValues.t("field_labels.file_upload")} visible={!element.meta.hide_title} />
      <TouchableOpacity
        style={styles.browerBtn(fonts, colors)}
        disabled>
        <Icon name="cloud-upload-outline" size={35} color={fonts.values.color} />
        <Text style={styles.browerBtnText(fonts)}>{i18nValues.t("setting_labels.browse_files")}</Text>
      </TouchableOpacity>
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
    marginBottom: 10,
    backgroundColor: colors.card,
  }),
  browerBtnText: fonts => ({
    ...fonts.values
  }),
});

FileUpload.propTypes = {
  element: PropTypes.object.isRequired,
};

export default React.memo(FileUpload);
