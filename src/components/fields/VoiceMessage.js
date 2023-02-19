import React, {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Alert} from 'react-native';
import {IconButton, useTheme} from 'react-native-paper';
import FieldLabel from '../../common/FieldLabel';
import formStore from '../../store/formStore';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const VoiceMessage = ({element}) => {
  const {colors, fonts} = useTheme();
  const preview = formStore(state => state.preview);
  const audioRecorderPlayer = useRef(new AudioRecorderPlayer()).current;
  const userRole = formStore(state => state.userRole);
  const role = element.role.find(e => e.name === userRole);
  const formValue = formStore(state => state.formValue);
  const setFormValue = formStore(state => state.setFormValue);
	const [recordTime, setRecordTime] = useState(0);
	const [recordSecs, setRecordSecs] = useState(0);
	const [recordingActive, setRecordingActive] = useState(false);
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [paused, setPaused] = useState(false);
  const [currentDurationSec, setCurrentDurationSec] = useState(formValue[element.field_name]?.audio_length || 0);
  const [playTime, setPlayTime] = useState(0);
  const [duration, setDuration] = useState(formValue[element.field_name]?.audio_length || 0);

  useEffect(() => {
    if (formValue[element.field_name]?.audio_length) {
      setDuration(formValue[element.field_name]?.audio_length)
    }
  }, [JSON.stringify(formValue[element.field_name])]);

	const onStartRecord = async () => {
    setRecordingActive(true);

    await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener(e => {
      setRecordSecs(e.currentPosition);
      setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      return;
    });
  };

  const onStopRecord = async () => {
    setRecordingActive(false);

    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setFormValue({...formValue, [element.field_name]: {uri: result, audio_length: recordTime}});
    setRecordSecs(0);

    if (element.event.onCreateMessage) {
      Alert.alert('Rule Action', `Fired onCreateMessage action. rule - ${element.event.onCreateMessage}.`);
    }
  };

  const onStartPlay = async () => {
    setPaused(false);
    setLoadingAudio(true);
    await audioRecorderPlayer.startPlayer(element.meta.asset_url || null);

    setLoadingAudio(false);
    audioRecorderPlayer.addPlayBackListener(e => {
      if (e.currentPosition < 0) {
        return;
      }

      setCurrentPositionSec(e.currentPosition);
      setCurrentDurationSec(e.duration);
      setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));

      if (e.currentPosition === e.duration) {
        onStopPlay();
      }
      return;
    });

    if (element.event.onStartPlay) {
      Alert.alert('Rule Action', `Fired onStartPlay action. rule - ${element.event.onStartPlay}.`);
    }
  };

  const onPausePlay = async () => {
    setPaused(true);
    await audioRecorderPlayer.pausePlayer();
    if (element.event.onPausePlay) {
      Alert.alert('Rule Action', `Fired onPausePlay action. rule - ${element.event.onPausePlay}.`);
    }
  };

  const onResumePlay = async () => {
    setPaused(false);
    await audioRecorderPlayer.resumePlayer();
    if (element.event.onResumePlay) {
      Alert.alert('Rule Action', `Fired onResumePlay action. rule - ${element.event.onResumePlay}.`);
    }
  };

  const onStopPlay = async () => {
    setPaused(false);
    setCurrentPositionSec(0);
    setPlayTime(0);
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
    if (element.event.onStopPlay) {
      Alert.alert('Rule Action', `Fired onStopPlay action. rule - ${element.event.onStopPlay}.`);
    }
  };

  return (
    <View style={styles.container}>
      {
        role.view && (
          <>
            <FieldLabel label={element.meta.title || 'Voice Message'} visible={!element.meta.hide_title} />
            {
              (role.edit || preview) && (
                <View style={styles.mainView(colors)}>
                  <Text style={styles.text(fonts)}>
                    {/* {(element.field_name in formValue  && formValue[element.field_name]) ? new Date(formValue[element.field_name]).toLocaleDateString(): new Date(Date.now()).toLocaleDateString()} */}
                    {recordingActive ? `Recording Voice ${recordTime}` : ''}
                  </Text>
                  <IconButton
                    icon="microphone-outline"
                    iconColor={fonts.values.color}
                    onPress={() => {}}
                    onLongPress={onStartRecord}
                    onPressOut={onStopRecord}
                    disabled={!(role.edit || preview)}
                    style={{
                      ...styles.icon,
                    }}
                  />
                </View>
              )
            }
            {
              formValue[element.field_name]?.uri && (
                <View style={styles.mainView(colors)}>
                <IconButton
                  icon={(!paused  && playTime !== 0) ? 'pause' : 'play'}
                  iconColor={fonts.values.color}
                  onPress={() => {
                    if (!paused && playTime === 0) {
                      onStartPlay();
                    } else if (paused) {
                      onResumePlay();
                    } else {
                      onPausePlay();
                    }
                  }}
                  onLongPress={onStartRecord}
                  onPressOut={onStopRecord}
                  style={{
                  ...styles.icon,
                  }}
                />
                <View style={{flex: 1, marginRight: 10}}>
                  <View style={styles.progressIndicatorContainer}>
                    <View 
                      style={[
                        styles.progressLine,
                        {
                          width: `${(currentPositionSec / currentDurationSec) * 100}%`,
                          backgroundColor: colors.text,
                        },
                      ]}
                    />
                  </View>
                  <View style={styles.progressDetailsContainer}>
                    <Text style={fonts.values}>{playTime === 0 ? '00:00' : playTime.toString().substring(0, 5)}</Text>
                    <Text style={fonts.values}>{duration === 0 ? '00:00' : duration.toString().substring(0, 5)}</Text>
                  </View>
                </View>
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
  container: {
    padding: 5,
  },
  mainView: (colors) => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: 10,
    paddingVertical: 3,
    marginBottom: 5,
  }),
  icon: {
    margin: 0,
  },
  text: (fonts) => ({
    textAlign: 'center',
    marginLeft: 10,
    ...fonts.values,
  }),
  progressIndicatorContainer: {
    height: 5,
    backgroundColor: '#C1C3C3',
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  progressDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLine: {
    height: '100%',
    borderRadius: 5,
  },
});

VoiceMessage.propTypes = {
  element: PropTypes.object.isRequired,
};

export default VoiceMessage;
