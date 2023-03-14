import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from 'react-native';
import {useTheme} from 'react-native-paper';
import formStore from '../../store/formStore';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ResizedImage from '../../common/ResizedImage';
import { navigationButtonImages } from '../../constant';
import FieldLabel from '../../common/FieldLabel';

const NavigationButton = props => {
  const {element} = props;
  const {colors, fonts} = useTheme();
  const userRole = formStore(state => state.userRole);
  const role = element.role.find(e => e.name === userRole);
  const [btnWidth, setBtnWidth] = useState(0);

  const onLayout = useCallback(event => {
    setBtnWidth(event.nativeEvent.layout.width - 10);
  }, []);

  return (
    <View style={styles.container}>
      {
        role.view && (
          <>
            <FieldLabel label={element.meta.title || i18nValues.t("field_labels.textbox")} visible={!element.meta.hide_title} />
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {
                element.meta.buttons.map((button, index) => (
                  <View key={index} style={{padding: 15, width: '50%'}}>
                    <TouchableOpacity style={{borderRadius: 20, alignItems: 'center', backgroundColor: colors.card, paddingVertical: 15}} onLayout={onLayout}>
                      {
                        button.iconImage && (
                          <ResizedImage
                            uri={button.iconImage}
                            // maxHeight={Math.ceil((btnWidth - 40)/3)}
                            // maxWidth={Math.ceil((btnWidth - 40)/3)}
                            maxHeight={70}
                            maxWidth={70}
                          />
                        )
                      }
                      <Text style={{...element.meta.firstTextFont}}>{button.text1}</Text>
                      <Text style={element.meta.secondTextFont}>{button.text2}</Text>
                    </TouchableOpacity>
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
  textBox: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 5,
    paddingLeft: 10,
  },
});

NavigationButton.propTypes = {
  element: PropTypes.object.isRequired,
};

export default NavigationButton;
