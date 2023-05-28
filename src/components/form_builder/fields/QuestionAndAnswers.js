import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from 'react-native';
import {Checkbox, useTheme} from 'react-native-paper';
import formStore from '../../../store/formStore';
import FieldLabel from '../../../common/FieldLabel';

const QuestionAndAnswers = props => {
  const {element} = props;
  const {colors, fonts} = useTheme();
  const i18nValues = formStore(state => state.i18nValues);

  return (
    <View style={styles.container(element)}>
      <FieldLabel label={element.meta.title || i18nValues.t("field_labels.question_and_answer")} visible={!element.meta.hide_title} is_mandatory={element.is_mandatory} />
      <View style={{flexDirection: element.meta.answerAlign, flexWrap: 'wrap'}}>
          { 
            element.meta.answers.map((answer, index) => (
                <View key={index} style={{flexDirection: 'row', alignItems: 'center', paddingRight: 15}}>
                    <Checkbox
                        color={element.meta.checkedColor}
                        status={index%2===0 ? 'checked' : 'unchecked'}
                        disabled
                    />
                    <Text style={fonts.values}>{answer}</Text>
                </View>
            ))
          }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: element => ({
    ...element.meta.padding
  }),
});

QuestionAndAnswers.propTypes = {
  element: PropTypes.object.isRequired,
};

export default QuestionAndAnswers;
