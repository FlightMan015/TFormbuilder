import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, TextInput} from 'react-native';
import {useTheme, IconButton} from 'react-native-paper';
import formStore from '../store/formStore';
import TextButton from '../common/TextButton';
import { updateField } from '../actions/formdata';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FieldAction = () => {
  const [events, setEvents] = useState({});
  const {colors} = useTheme();
  const element = formStore(state => state.selectedField);
  const selectedFieldIndex = formStore(state => state.selectedFieldIndex);
	const setOpenSetting = formStore(state => state.setOpenSetting);
  const setFormData = formStore(state => state.setFormData);
  const formData = formStore(state => state.formData);
  const [event, setEvent] = useState({name: '', rule: '', state: false});

  useEffect(() => {
    setEvents({...events, ...element.event});
  }, [element]);

	return (
		<View>
			<View style={styles.menuHeader}>
				<Text style={styles.menuTitle}>{element.meta.title + ' Actions'}</Text>
				<IconButton
					icon="close"
					size={20}
					iconColor="#FFFFFF"
					onPress={() => {
            setOpenSetting(false);
					}}
				/>
			</View>
      <View style={styles.settingView}>
        {
          Object.keys(events).map((e, eventIndex) => {
            return (
              <View key={eventIndex}>
                <View style={styles.item}>
                  <TextButton
                    style={styles.addCardBtn}
                    text={e}
                    textStyle={styles.addCardText}
                    onPress={() => {
                      if (event.name === e) {
                        setEvent({
                          ...event,
                          name: e,
                          state: !event.state,
                        })
                      } else {
                        setEvent({
                          ...event,
                          name: e,
                          state: true,
                        })
                      }
                    }}
                  />
                  {events[e] && <Icon name="check" size={18} color="#FFFFFF" />}
                </View>
                {
                  event.name === e && event.state && (
                    <TextInput
                      style={styles.ruleText}
                      placeholder='Input rule...'
                      placeholderTextColor={colors.placeholder}
                      multiline
                      numberOfLines={3}
                      value={events[e]}
                      onChangeText={newText => {
                        const tempEvent = JSON.parse(JSON.stringify(element.event));
                        const newElement = {...element, event: {...tempEvent, [e]: newText}};
                        setFormData({
                          ...formData,
                          data: updateField(
                            formData,
                            selectedFieldIndex,
                            newElement,
                          ),
                        });
                      }}
                    />
                  )
                }
              </View>
            );
          })
        }
      </View>
		</View>
	);
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
	menuHeader: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: 18,
    color: '#fff',
    paddingLeft: 15,
  },
  eventName: {
    height: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
    textDecorationLine: 'underline',
    fontFamily: 'PublicSans-Regular',
    fontSize: 14,
    marginRight: 10,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 3,
    width: '100%',
    justifyContent: 'space-around',
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: (disabled, colors) => ({
    width: 100,
    height: 40,
    borderRadius: 10,
    borderColor: disabled ? colors.border : colors.colorButton,
    borderWidth: 1,
  }),
  checkboxContainer: {
    padding: 0,
  },
  saveBtn: {
    width: 100,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
  },
  settingView: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#4B5260',
  },
  addCardBtn: {
    width: 220,
    padding: 7,
    backgroundColor: '#626E81',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#303339',
    marginRight: 5,
  },
  addCardText: {
    color: '#ffffff',
    fontSize: 16,
  },
  ruleText: {
    height: 120,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#303339',
    backgroundColor: '#555F6E',
    paddingLeft: 10,
  },
});

FieldAction.propTypes = {};

export default FieldAction;
