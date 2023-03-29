import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from 'react-native';
import {Checkbox, useTheme} from 'react-native-paper';
import formStore from '../../store/formStore';
import FieldLabel from '../../common/FieldLabel';

const QuestionAndAnswers = props => {
  const {element} = props;
  const {colors, fonts} = useTheme();
  const preview = formStore(state => state.preview);
  const userRole = formStore(state => state.userRole);
  const role = element.role.find(e => e.name === userRole);
  const formValue = formStore(state => state.formValue);
  const setFormValue = formStore(state => state.setFormValue);
  const i18nValues = formStore(state => state.i18nValues);

  return (
    <View style={styles.container}>
      {
        role.view && (
          <>
            <FieldLabel label={element.meta.title || i18nValues.t("field_labels.question_and_answer")} visible={!element.meta.hide_title} is_mandatory={element.is_mandatory} />
            {/* <Text style={{...fonts.values, marginLeft: 10}}>{element.meta.question}</Text> */}
            <View style={{flexDirection: element.meta.answerAlign, flexWrap: 'wrap'}}>
                { 
                  element.meta.answers.map((answer, index) => (
                      <View key={index} style={{flexDirection: 'row', alignItems: 'center', paddingRight: 15}}>
                          <Checkbox
                              color={element.meta.checkedColor}
                              status={formValue[element.field_name][index] ? 'checked' : 'unchecked'}
                              onPress={() => {
                                const tempValue = [...formValue[element.field_name]];
                                tempValue.splice(index, 1, !formValue[element.field_name][index]);
                                setFormValue({...formValue, [element.field_name]: tempValue});
                              }}
                              disabled={!(preview || role.edit)}
                          />
                          <Text style={fonts.values}>{answer}</Text>
                      </View>
                  ))
                }
            </View>
          </>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
});

QuestionAndAnswers.propTypes = {
  element: PropTypes.object.isRequired,
};

export default QuestionAndAnswers;
