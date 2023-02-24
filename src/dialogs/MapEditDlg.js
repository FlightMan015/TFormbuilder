import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TextInput, Text, Alert} from 'react-native';
import {Dialog, useTheme} from 'react-native-paper';
import { color } from '../theme/styles';
import formStore from '../store/formStore';
import TextButton from '../common/TextButton';

const MapEditDlg = () => {
  const {colors, fonts} = useTheme();
	const visibleMapDlg = formStore(state => state.visibleMapDlg);
  const setVisibleMapDlg = formStore(state => state.setVisibleMapDlg);
	const formValue = formStore(state => state.formValue);
	const setFormValue = formStore(state => state.setFormValue);
  const initialMapData = {
    pointIndex: 0,
    fenceIndex: 0,
    title: '',
    description: '',
  };
  const [mapData, setMapData] = useState(initialMapData);

  useEffect(() => {
    setMapData({...mapData, ...visibleMapDlg.mapEditData});
  }, [JSON.stringify(visibleMapDlg)]);

  const hideMapDlg = () => {
    const tempVisibledlg = {...visibleMapDlg};
    delete tempVisibledlg.mapEditData;
    setVisibleMapDlg({
      ...tempVisibledlg,
      mapEditDlg: false,
    });
  };

  const onChangeMapData = (changedData, type) => {
    setMapData({...mapData, [type]: changedData});
  };

  const changeMapData = () => {
    if (visibleMapDlg.mapEditData.type === 'point') {
      if (!mapData.title) {
        Alert.alert('Warning', 'Please input the title.');
      } else {
				const tempData = {...formValue[mapData.element.field_name]};
				const pointIndex = mapData.pointIndex;
				const oldPointData = tempData.points[pointIndex];
        const newPointData = {
          ...oldPointData,
          title: mapData.title,
          description: mapData.description,
        };
				tempData.points.splice(pointIndex, 1, newPointData);
        // setFormValue({...formValue, [mapData.element.field_name]: tempData});
        if (mapData.element.event.onUpdatePoint) {
          Alert.alert('Rule Action', `Fired onUpdatePoint action. rule - ${mapData.element.event.onUpdatePoint}. newData - ${JSON.stringify(tempElement.meta.data)}`);
        }
        hideMapDlg();
      }
    }

    if (visibleMapDlg.mapEditData.type === 'fence') {
      if (!mapData.title) {
        Alert.alert('Warning', 'Please input the title.');
      } else {
				const tempData = {...formValue[mapData.element.field_name]};
				const pointIndex = mapData.pointIndex;
				const oldPointData = tempData.geofences[pointIndex];
        const newPointData = {
          ...oldPointData,
          title: mapData.title,
          description: mapData.description,
        };
				tempData.geofences.splice(pointIndex, 1, newPointData);
        setFormValue({...formValue, [mapData.element.field_name]: tempData});
        if (mapData.element.event.onUpdateGeofence) {
          Alert.alert('Rule Action', `Fired onUpdateGeofence action. rule - ${mapData.element.event.onUpdateGeofence}. newData - ${JSON.stringify(tempElement.meta.data)}`);
        }
        hideMapDlg();
      }
    }
  };

  return (
    <Dialog
      visible={visibleMapDlg.mapEditDlg !== undefined && visibleMapDlg.mapEditDlg}
      onDismiss={hideMapDlg}
      style={{...styles.dialog, backgroundColor: colors.card}}>
      {visibleMapDlg.mapEditData && visibleMapDlg.mapEditData.type === 'point' && (
				<Text style={{...fonts.headings, marginBottom: 10}}>
					Edit Point
				</Text>
      )}
      {visibleMapDlg.mapEditData && visibleMapDlg.mapEditData.type === 'fence' && (
				<Text style={{...fonts.headings, marginBottom: 10}}>
					Edit Fence
				</Text>
      )}
			<Text style={{...fonts.values, color: fonts.labels.color}}>{'Title'}</Text>
			<TextInput
				style={styles.nameInput(colors, fonts)}
				underlineColorAndroid="transparent"
				onChangeText={e => onChangeMapData(e, 'title')}
				editable
				placeholder={'title'}
				placeholderTextColor={colors.placeholder}
				value={mapData.title}
			/>
			{visibleMapDlg.mapEditData && visibleMapDlg.mapEditData.type === 'point' && (
				<View>
					<Text style={{...fonts.values, color: fonts.labels.color}}>{'Description'}</Text>
					<TextInput
						style={styles.nameInput(colors, fonts)}
						underlineColorAndroid="transparent"
						onChangeText={e => onChangeMapData(e, 'description')}
						editable
						placeholder={'description'}
						placeholderTextColor={colors.placeholder}
						value={mapData.description}
					/>
				</View>
			)}
			<View style={{flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10}}>
        <TextButton
          text={'Ok'}
          onPress={() => changeMapData()}
          textStyle={styles.actionButtonText}
          style={styles.actionButton(colors)}
        />
        <TextButton
          text='Cancel'
          onPress={hideMapDlg}
          textStyle={styles.actionButtonText}
          style={styles.actionButton(colors)}
        />
      </View>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 35,
    borderColor: color.GREY,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 5,
    paddingLeft: 10,
    paddingVertical: 0,
    fontFamily: 'PublicSans-Regular',
    fontSize: 14,
  },
  dlgContent: {
    paddingBottom: 0,
  },
  dlgTitle: {
    fontFamily: 'PublicSans-Bold',
    fontSize: 18,
  },
	  actionButtonText: {
    color: '#FFFFFF',
  },
  actionButton: colors => ({
    backgroundColor: colors.colorButton,
    borderRadius: 10,
    width: 100,
    paddingVertical: 10
  }),
	dialog: {
    borderRadius: 10,
    paddingHorizontal: 15,
  },
	nameInput: (colors, fonts) => ({
    width: '100%',
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 10,
		marginBottom: 10,
		marginTop: 5,
    backgroundColor: colors.background,
    ...fonts.values,
  }),
});

export default MapEditDlg;
