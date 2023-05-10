import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';
import formStore from '../../store/formStore';
import ResizedImage from '../../common/ResizedImage';
import {radioButton} from '../../constant';
import Icon from 'react-native-vector-icons/AntDesign';
import FieldLabel from '../../common/FieldLabel';

const Notification = props => {
  const {element} = props;
  const {colors, fonts} = useTheme();
  const userRole = formStore(state => state.userRole);
  const i18nValues = formStore(state => state.i18nValues);
  const role = element.role.find(e => e.name === userRole);
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container(element)}>
      {
        role.view && (
          <>
            <FieldLabel label={element.meta.title || i18nValues.t("field_labels.notification")} visible={!element.meta.hide_title} />
            <TouchableOpacity
              style={{flexDirection: 'row', backgroundColor: colors.card, borderRadius: 20, alignItems: 'center', paddingVertical: 15, paddingLeft: 10, borderBottomLeftRadius: visible ? 0 : 20, borderBottomRightRadius: visible ? 0 : 20}}
              onPress={() => setVisible(!visible)}
              disabled={element.meta.additionalDatas.length === 0}
            >
              {
                element.meta.imageUri && (
                  <Image style={{width: 50, height: 50, borderRadius: 10}} source={{uri: element.meta.imageUri}} />
                )
              }
              {
                !element.meta.imageUri && (
                  <Icon name='message1' size={25} color={element.meta.nameFont.color} style={{marginLeft: 10}} />
                )
              }
              <View
                style={{flex: 1, paddingLeft: 15}}
              >
                <Text style={element.meta.nameFont}>{element.meta.name}</Text>
                <Text style={element.meta.descriptionFont}>{element.meta.description}</Text>
              </View>
            </TouchableOpacity>
            {
              visible && (
                <View style={{backgroundColor: colors.card, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, paddingBottom: 10}}>
                  {
                    element.meta.additionalDatas.length > 0 &&
                    element.meta.additionalDatas.map((data, nameIndex) => (
                      <View key={nameIndex}>
                        <View
                          style={{
                            marginLeft: 60,
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 5,
                          }}>
                          <Text style={{
                            width: '30%'
                          }}>{data.name + ':'}</Text>
                          <Text style={{flex: 1, padding: 0, paddingLeft: 10}}>{data.content}</Text>
                        </View>
                      </View>
                    ))
                  }
                </View>
              )
            }
          </>
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

Notification.propTypes = {
  element: PropTypes.object.isRequired,
};

export default Notification;
