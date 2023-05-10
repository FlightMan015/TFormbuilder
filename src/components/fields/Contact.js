import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';
import formStore from '../../store/formStore';
import FieldLabel from '../../common/FieldLabel';
import Icon from 'react-native-vector-icons/FontAwesome';

const Contact = props => {
  const {element} = props;
  const {colors, fonts} = useTheme();
  const userRole = formStore(state => state.userRole);
  const role = element.role.find(e => e.name === userRole);
  const i18nValues = formStore(state => state.i18nValues);

  const handlePress = async (url) => {
    // await Linking.openSettings();
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    // if (supported) {
    // Opening the link with some app, if the URL scheme is "http" the web link should be opened
    // by some browser in the mobile
    await Linking.openURL(url);
    // } else {
    //   Alert.alert(`Don't know how to open this URL: ${url}`);
    // }
  }

  return (
    <View style={styles.container(element)}>
      {role.view && (
        <>
          <FieldLabel label={element.meta.title || i18nValues.t("field_labels.contact")} visible={!element.meta.hide_title} />
          <View style={styles.contactsContainer(colors.card)}>
            <View style={styles.contact}>
              <Text style={element.meta.nameFont}>{element.meta.name1}</Text>
              <Text style={element.meta.contentFont}>{element.meta.content1}</Text>
            </View>
            <View style={{width: 1, backgroundColor: element.meta.nameFont.color}} />
            <View style={styles.contact}>
              <Text style={element.meta.nameFont}>{element.meta.name2}</Text>
              <Text style={element.meta.contentFont}>{element.meta.content2}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingVertical: element.meta.otherContacts.length > 0 ? 20 : 0, alignItems: 'center'}}>
            {
              element.meta.otherContacts.map((contact, contactIndex) => {
                  return (
                    <TouchableOpacity
                      key={contactIndex}
                      style={styles.otherContact(colors)}
                      onPress={() => {
                        handlePress(contact.uri)
                      }}
                      disabled={!contact.uri}
                    >
                      <Icon
                        name={contact.icon}
                        color={element.meta.nameFont.color}
                        size={20}
                      />
                    </TouchableOpacity>
                  );
              })
            }
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: element => ({
    ...element.meta.padding,
  }),
  contact: {
    flex: 1,
    alignItems: 'center'
  },
  contactsContainer: background => ({
    flexDirection: 'row',
    backgroundColor: background,
    borderRadius: 10,
    paddingVertical: 10
  }),
  otherContact: colors => ({
    borderRadius: 10,
    backgroundColor: colors.card,
    marginHorizontal: 10,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  })
});

Contact.propTypes = {
  element: PropTypes.object.isRequired,
};

export default Contact;
