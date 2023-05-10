import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import {useTheme} from 'react-native-paper';
import formStore from '../../store/formStore';
import FieldLabel from '../../common/FieldLabel';

const DataCard = props => {
  const {element} = props;
  const {colors, fonts} = useTheme();
  const userRole = formStore(state => state.userRole);
  const formValue = formStore(state => state.formValue);
  const setFormValue = formStore(state => state.setFormValue);
  const preview = formStore(state => state.preview);
  const i18nValues = formStore(state => state.i18nValues);
  const role = element.role.find(e => e.name === userRole);

  return (
    <View style={styles.container(element)}>
      {
        role.view && (
          <View>
            <FieldLabel label={element.meta.title || i18nValues.t("field_labels.data_card")} visible={!element.meta.hide_title} />
            <View style={{backgroundColor: colors.card, paddingVertical: 15, paddingHorizontal: 20, borderRadius: 15}}>
            {
              element.meta.datas.map((d, i) => (
                <View key={i} style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{width: '40%', padding: 5, ...element.meta.nameFont}}>
                    {`${d}`}
                  </Text>
                  <TextInput
                    value={formValue[element.field_name]? formValue[element.field_name][d] : ''}
                    style={{width: '60%', padding: 5, ...element.meta.descriptionFont, textAlign: 'right'}}
                    placeholder={`...${d}`}
                    editable={role.edit || preview}
                    onChangeText={e => {
                      const tempValue = formValue[element.field_name];
                      setFormValue({...formValue, [element.field_name]:{...tempValue, [d]: e}});
                    }}
                  />
                </View>
              ))
            }
            </View>
          </View>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: element => ({
    ...element.meta.padding
  }),
  textBox: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 5,
    paddingLeft: 10,
  },
});

DataCard.propTypes = {
  element: PropTypes.object.isRequired,
};

export default DataCard;
