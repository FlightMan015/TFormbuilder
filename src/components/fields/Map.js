import React, {useState, useEffect, useMemo} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  Alert,
  Dimensions,
  Button,
} from 'react-native';
import { globalStyles, color } from '../../theme/styles';
import {
  IconButton,
  Switch,
  List,
  Dialog,
  useTheme,
} from 'react-native-paper';
import {string16} from '../../constant';
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Circle,
  Polygon,
} from 'react-native-maps';
import GeoLocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/Feather';
import ColorPalette from '../../common/color_palette';
import Title from '../../common/Title';
import formStore from '../../store/formStore';
import FieldLabel from '../../common/FieldLabel';
import TextButton from '../../common/TextButton';

const ScreenWidth = Dimensions.get('window').width;

async function requestPermissions() {
  if (Platform.OS === 'ios') {
    GeoLocation.requestAuthorization();
    GeoLocation.setRNConfiguration({
      skipPermissionRequests: false,
      authorizationLevel: 'whenInUse',
    });
  }

  if (Platform.OS === 'android') {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
  }
}

const MapChildComponent = ({element, index, onClickUpdateField}) => {
  const {colors, fonts} = useTheme();
  const userRole = formStore(state => state.userRole);
  const role = element.role.find(e => e.name === userRole);
  const formValue = formStore(state => state.formValue);
  const setFormValue = formStore(state => state.setFormValue);
  const preview = formStore(state => state.preview);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleSetPoint, setVisibleSetPoint] = useState(false);
  const [newPointData, setNewPointData] = useState({
    title: '',
    description: '',
  });
  const [points, setPoints] = useState(formValue[element.field_name]?.points || []);
  const [geofences, setGeoFences] = useState(formValue[element.field_name]?.geofences || []);
  const [newFenceData, setNewFenceData] = useState({
    latitude: 0,
    longitude: 0,
    fillColor: 'rgba(255, 150, 0, 0.5)',
    radius: 200,
  });
  const [visibleSetFence, setVisibleSetFence] = useState(false);
  const [visibleSetPolygon, setVisibleSetPolygon] = useState(false);
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [polygonPointList, setPolygonPointList] = useState([]);
  const [drawPolygon, setDrawPolygon] = useState(false);
  const [startPolygonPoint, setStartPolygonPoint] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [startPolygonLocation, setStartPolygonLocation] = useState('');
  const [polygonTitle, setPolygonTitle] = useState('');
  const [locationInfomation, setLocationInfo] = useState({
    latitude: 0,
    longitude: 0,
    coordinates: [],
  });
  const [geofencePageNum, setGeofencePageNum] = useState(1);
  const [pointPageNum, setPointPageNum] = useState(1);
  const [itemNum, setItemNum] = useState(5);
  const [fencePageCount, setFencePageCount] = useState(1);
  const [pointPageCount, setPointPageCount] = useState(1);
  const [displayFenceItems, setDisplayFenceItems] = useState([]);
  const [displayPointItems, setDisplayPointItems] = useState([]);
  const [isRGBcolor, setRGBcolor] = useState(false);

  const [visible, setVisible] = useState({
    map: true,
    point: false,
    fence: false,
  });
  const [addStatus, setAddStatus] = useState({
    point: false,
    circle: false,
    polygon: false,
  });

  useEffect(() => {
    requestPermissions();
    setDisplayFenceItems(geofences.slice(0, itemNum));
    setDisplayPointItems(points.slice(0, itemNum));
    GeoLocation.getCurrentPosition(
      position => {
        setLocationInfo({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          coordinates: locationInfomation.coordinates.concat({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        });
        setSelectedRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => {
        alert(error.message.toString());
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      },
    );
  }, []);

  useEffect(() => {
    setPoints(formValue[element.field_name]?.points || []);
    setGeoFences(formValue[element.field_name]?.geofences || []);
    const tempFencePageCount = Math.ceil(
      geofences.length / itemNum,
    );
    const tempPointPageCount = Math.ceil(
      points.length / itemNum,
    );
    if (geofencePageNum > tempFencePageCount) {
      setGeofencePageNum(1);
    }
    if (pointPageNum > tempPointPageCount) {
      setPointPageNum(1);
    }
    setFencePageCount(tempFencePageCount === 0 ? 1 : tempFencePageCount);
    setPointPageCount(tempPointPageCount === 0 ? 1 : tempPointPageCount);
    const pageItems1 = geofences.slice(
      itemNum * (geofencePageNum - 1),
      itemNum * (geofencePageNum - 1) + 5,
    );
    setDisplayFenceItems(pageItems1);
    const pageItems2 = points.slice(
      itemNum * (pointPageNum - 1),
      itemNum * (pointPageNum - 1) + 5,
    );
    setDisplayPointItems(pageItems2);
  }, [JSON.stringify(formValue[element.field_name])]);

  useEffect(() => {
    const pageItems = geofences.slice(
      itemNum * (geofencePageNum - 1),
      itemNum * (geofencePageNum - 1) + 5,
    );
    setDisplayFenceItems(pageItems);
  }, [geofencePageNum]);

  useEffect(() => {
    const pageItems = points.slice(
      itemNum * (pointPageNum - 1),
      itemNum * (pointPageNum - 1) + 5,
    );
    setDisplayPointItems(pageItems);
  }, [pointPageNum]);

  const onPress = ({latitude, longitude}) => {
    setLocationInfo({
      latitude: latitude,
      longitude: longitude,
      coordinates: locationInfomation.coordinates.concat({
        latitude: latitude,
        longitude: longitude,
      }),
    });
  };

  function getAddressFromCoordinates({latitude, longitude}) {
    return new Promise(resolve => {
      const url = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=aTIsqpmBkF_FuHUeiRhmb5xVomPvXT4pkmcQqihJeSY&mode=retrieveAddresses&prox=${latitude},${longitude}`;
      fetch(url)
        .then(res => res.json())
        .then(resJson => {
          // the response had a deeply nested structure :/
          if (resJson?.Response?.View[0]?.Result[0]) {
            resolve(resJson.Response.View[0].Result[0].Location.Address.Label);
          } else {
            resolve();
          }
        })
        .catch(e => {
          console.log('Error in getAddressFromCoordinates', e);
          resolve();
        });
    });
  }

  const onClickAddPoint = () => {
    setAddStatus({
      ...addStatus,
      point: !addStatus.point,
      circle: false,
      polygon: false,
    });
    setDrawPolygon(false);
    setPolygonPointList([]);
  };

  const onClickAddFence = () => {
    setAddStatus({
      ...addStatus,
      point: false,
      circle: !addStatus.circle,
      polygon: false,
    });
    setDrawPolygon(false);
    setPolygonPointList([]);
  };

  const onClickAddPolygon = () => {
    setAddStatus({
      ...addStatus,
      point: false,
      circle: false,
      polygon: !addStatus.polygon,
    });
  };

  const onClickOnMap = coordinate => {
    const {latitude, longitude} = coordinate;
    onPress(coordinate);
    const address = getAddressFromCoordinates({
      latitude: latitude,
      longitude: longitude,
    });
    address.then(e => setSearchQuery(e));
    if (addStatus.point) {
      setVisibleSetPoint(true);
    }

    if (addStatus.circle) {
      setVisibleSetFence(true);
      setRGBcolor(false);
    }

    if (addStatus.polygon) {
      if (!drawPolygon) {
        setVisibleSetPolygon(true);
        setDrawPolygon(true);
        setRGBcolor(false);
        setStartPolygonPoint(coordinate);
        address.then(startLocation => setStartPolygonLocation(startLocation));
      }
      const tempPolygonPointList = JSON.parse(JSON.stringify(polygonPointList));
      tempPolygonPointList.push(coordinate);
      setPolygonPointList(tempPolygonPointList);
    }
  };

  const onChangePointData = (data, key) => {
    if (key === 'title') {
      setNewPointData({
        ...newPointData,
        title: data,
      });
    }
    if (key === 'description') {
      setNewPointData({
        ...newPointData,
        description: data,
      });
    }
  };

  const onChangeFenceData = (data, key) => {
    if (key === 'radius') {
      if (data === '') {
        setNewFenceData({
          ...newFenceData,
          radius: 0,
        });
      } else {
        setNewFenceData({
          ...newFenceData,
          radius: parseInt(data, 10),
        });
      }
    }
    if (key === 'title') {
      setNewFenceData({
        ...newFenceData,
        title: data,
      });
    }
    // if (key === 'description') {
    //   setNewPointData({
    //     ...newFenceData,
    //     description: data,
    //   });
    // }
  };

  const confirmPointData = () => {
    if (!newPointData.title) {
      Alert.alert('Warning', 'Please type the title.');
    } else {
      const tempValue = [...points, {
        ...newPointData,
        latitude: locationInfomation.latitude,
        longitude: locationInfomation.longitude,
        location: searchQuery,
      }];
      setFormValue({...formValue, [element.field_name]: {...formValue[element.field_name], points: tempValue}});
      if (element.event.onCreateNewPoint) {
        Alert.alert(
          'Rule Action',
          `Fired onCreateNewPoint action. rule - ${
            element.event.onCreateNewPoint
          }. newData - ${JSON.stringify(tempValue)}`,
        );
      }
      setVisibleSetPoint(false);
      setNewPointData({title: '', description: ''});
    }
  };

  const confirmFenceData = () => {
    if (!newFenceData.title) {
      Alert.alert('Warning', 'Please type the title.');
    } else if (newFenceData.radius < 100) {
      Alert.alert('Warning', 'Radius value must be bigger than 100.');
    } else {
      const tempValue = [...geofences, {
        ...newFenceData,
        type: 'circleFence',
        latitude: locationInfomation.latitude,
        longitude: locationInfomation.longitude,
        color: `rgba(${red}, ${green}, ${blue}, 0.5)`,
        location: searchQuery,
      }];
      setFormValue({...formValue, [element.field_name]: {...formValue[element.field_name], geofences: tempValue}});
      if (element.event.onCreateNewGeofence) {
        Alert.alert(
          'Rule Action',
          `Fired onCreateNewGeofence action. rule - ${
            element.event.onCreateNewGeofence
          }. newData - ${JSON.stringify(tempElement.meta.data)}`,
        );
      }
      setVisibleSetFence(false);
      setNewFenceData({
        latitude: 0,
        longitude: 0,
        fillColor: 'rgba(255, 150, 0, 0.5)',
        radius: 200,
      });
    }
  };

  const finishDrawPolygon = () => {
    setDrawPolygon(false);
    const tempValue = [...geofences, {
      title: polygonTitle,
      type: 'polygonFence',
      newPolygonPoints: polygonPointList,
      ...startPolygonPoint,
      color: `rgba(${red}, ${green}, ${blue}, 0.5)`,
      location: startPolygonLocation,
    }];
    setFormValue({...formValue, [element.field_name]: {...formValue[element.field_name], geofences: tempValue}});
    setPolygonPointList([]);
    setPolygonTitle('');
  };

  const selectPalette = selectedColor => {
    setRed(parseInt(selectedColor.substring(1, 3), 16));
    setGreen(parseInt(selectedColor.substring(3, 5), 16));
    setBlue(parseInt(selectedColor.substring(5, 7), 16));
  };

  const onChangeRed = e => {
    if (e) {
      if (parseInt(e, 10) > 255) {
        e = '255';
      }
      if (parseInt(e, 10) < 0) {
        e = '0';
      }
      setRed(parseInt(e, 10));
    } else {
      setRed(0);
    }
  };

  const onChangeGreen = e => {
    if (e) {
      if (parseInt(e, 10) > 255) {
        e = '255';
      }
      if (parseInt(e, 10) < 0) {
        e = '0';
      }
      setGreen(parseInt(e, 10));
    } else {
      setGreen(0);
    }
  };

  const onChangeBlue = e => {
    if (e) {
      if (parseInt(e, 10) > 255) {
        e = '255';
      }
      if (parseInt(e, 10) < 0) {
        e = '0';
      }
      setBlue(parseInt(e, 10));
    } else {
      setBlue(0);
    }
  };

  const deleteGeoFence = geofenceIndex => {
    Alert.alert(
      'Delete Geofence',
      'Are you sure want to delete this geofence ?',
      [
        {
          text: 'Yes',
          onPress: () => {
            const tempgeofences = {...geofences};
            tempgeofences.splice(geofenceIndex, 1);
            setFormValue({...formValue, [element.field_name]: {...formValue[element.field_name], points: tempgeofences}});
            if (element.event.onDeleteGeofence) {
              Alert.alert(
                'Rule Action',
                `Fired onDeleteGeofence action. rule - ${
                  element.event.onDeleteGeofence
                }. newData - ${JSON.stringify(tempElement.meta.data)}`,
              );
            }
          },
        },
        {
          text: 'No',
          onPress: () => {},
          style: 'cancel',
        },
      ],
    );
  };

  const deletePoint = pointIndex => {
    Alert.alert('Delete Point', 'Are you sure want to delete this point ?', [
      {
        text: 'Yes',
        onPress: () => {
          const temppoints = {...points};
          temppoints.splice(pointIndex, 1);
          setFormValue({...formValue, [element.field_name]: {...formValue[element.field_name], points: temppoints}});
          if (element.event.onDeletePoint) {
            Alert.alert(
              'Rule Action',
              `Fired onDeletePoint action. rule - ${
                element.event.onDeletePoint
              }. newData - ${JSON.stringify(tempElement.meta.data)}`,
            );
          }
        },
      },
      {
        text: 'No',
        onPress: () => {},
        style: 'cancel',
      },
    ]);
  };

  const editPoint = (oldData, pointIndex) => {
    // setVisibleDlg({
    //   ...visibleDlg,
    //   mapEditDlg: true,
    //   mapEditData: {
    //     type: 'point',
    //     title: oldData.title,
    //     description: oldData.description,
    //     pointIndex: pointIndex,
    //     index: index,
    //     element: element,
    //   },
    // });
  };

  const editGeoFence = (oldData, geofenceIndex) => {
    // setVisibleDlg({
    //   ...visibleDlg,
    //   mapEditDlg: true,
    //   mapEditData: {
    //     type: 'fence',
    //     title: oldData.title,
    //     fenceIndex: geofenceIndex,
    //     index: index,
    //     element: element,
    //   },
    // });
  };

  const selectPoint = selectedIndex => {
    setSelectedRegion({
      latitude: points[selectedIndex].latitude,
      longitude: points[selectedIndex].longitude,
    });
  };

  const selectGeofence = selectedIndex => {
    setSelectedRegion({
      latitude: geofences[selectedIndex].latitude,
      longitude: geofences[selectedIndex].longitude,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <FieldLabel label={element.meta.title || 'Map'} visible={!element.meta.hide_title} />
      <Title
        name="Map"
        visible={visible.map}
        onPress={() => setVisible({...visible, map: !visible.map})}
      />

      {visible.map && (
        <View style={styles.mapView}>
          <MapView
            // mapType={Platform.OS == "android" ? "none" : "standard"}
            provider={PROVIDER_GOOGLE}
            style={styles.mapStyle}
            initialRegion={{
              latitude: locationInfomation.latitude,
              longitude: locationInfomation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            region={{
              ...selectedRegion,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            // customMapStyle={mapStyle}
            onPress={e => onClickOnMap(e.nativeEvent.coordinate)}>
            {points.map((e, i) => {
              return (
                <Marker
                  key={i}
                  // draggable
                  coordinate={{
                    latitude: e.latitude,
                    longitude: e.longitude,
                  }}
                  // onDragEnd={e => alert(JSON.stringify(e.nativeEvent.coordinate))}
                  title={e.title}
                  description={e.description}
                />
              );
            })}
            {polygonPointList.length > 0 && (
              <Polygon
                coordinates={polygonPointList}
                fillColor={`rgba(${red}, ${green}, ${blue}, 0.5)`}
                strokeColor={`rgba(${red}, ${green}, ${blue}, 0.5)`}
                strokeWidth={1}
                lineCap="round"
              />
            )}
            {geofences.map((e, i) => {
              if (e.type === 'circleFence') {
                return (
                  <Circle
                    key={i}
                    center={{
                      latitude: e.latitude,
                      longitude: e.longitude,
                    }}
                    radius={e.radius}
                    strokeWidth={0}
                    fillColor={e.color}
                  />
                );
              }
              if (e.type === 'polygonFence') {
                return (
                  <Polygon
                    key={i}
                    coordinates={e.newPolygonPoints}
                    fillColor={e.color}
                    strokeColor={e.color}
                    strokeWidth={1}
                    lineCap="round"
                  />
                );
              }
            })}
            {geofences.map((e, i) => {
              return (
                <Marker
                  key={i}
                  // draggable
                  coordinate={{
                    latitude: e.latitude,
                    longitude: e.longitude,
                  }}
                  // onDragEnd={e => alert(JSON.stringify(e.nativeEvent.coordinate))}
                  // title={'Selected Location'}
                  // description={searchQuery}
                  pinColor={e.color}
                />
              );
            })}
          </MapView>
          <Dialog
            visible={visibleSetPoint}
            onDismiss={() => setVisibleSetPoint(false)}
            style={{...styles.dialog, backgroundColor: colors.card}}>
            <Text style={{...fonts.headings, marginBottom: 10}}>New Location</Text>
            <Text style={fonts.labels}>
              {'Title'}
            </Text>
            <TextInput
              style={styles.textBox(colors, fonts)}
              underlineColorAndroid="transparent"
              onChangeText={e => onChangePointData(e, 'title')}
              editable
              placeholder={'Point title'}
              placeholderTextColor={colors.placeholder}
              value={newPointData.title}
            />
            <Text style={fonts.labels}>
              {'Description'}
            </Text>
            <TextInput
              style={styles.textBox(colors, fonts)}
              underlineColorAndroid="transparent"
              onChangeText={e => onChangePointData(e, 'description')}
              editable
              placeholder={'Point description'}
              placeholderTextColor={colors.placeholder}
              value={newPointData.description}
            />
            <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10}}>
              <TextButton
                text='Add'
                onPress={confirmPointData}
                textStyle={styles.actionButtonText(colors)}
                style={styles.actionButton(colors)}
              />
              <TextButton
                text='Cancel'
                onPress={() => setVisibleSetPoint(false)}
                textStyle={styles.actionButtonText(colors)}
                style={styles.actionButton(colors)}
              />
            </View>
          </Dialog>
          <Dialog
              visible={visibleSetFence}
              onDismiss={() => setVisibleSetFence(false)}
              style={{...styles.dialog, backgroundColor: colors.card}}>
              <Text style={{...fonts.headings, marginBottom: 10}}>New Fence</Text>
              <Text style={fonts.labels}>
                {'Title'}
              </Text>
              <TextInput
                style={styles.textBox(colors, fonts)}
                underlineColorAndroid="transparent"
                onChangeText={e => onChangeFenceData(e, 'title')}
                editable
                placeholder={'Geofence title'}
                placeholderTextColor={colors.placeholder}
                value={newFenceData.title}
              />
              {/* <Text>{'Description'}</Text>
              <TextInput
                style={{
                  ...styles.textBox(false, 1),
                }}
                underlineColorAndroid="transparent"
                onChangeText={e => onChangeFenceData(e, 'description')}
                editable
                placeholder={'Point description'}
                value={newFenceData.description}
              /> */}
              <Text style={fonts.labels}>
                {'Radius'}
              </Text>
              <TextInput
                style={styles.textBox(colors, fonts)}
                underlineColorAndroid="transparent"
                onChangeText={e => onChangeFenceData(e, 'radius')}
                editable
                placeholder={'Radius of geofence'}
                placeholderTextColor={colors.placeholder}
                value={newFenceData.radius.toString()}
                keyboardType="numeric"
                defaultValue="200"
              />
              <View style={styles.colorLabel}>
                <Text style={fonts.labels}>
                  {'Color'}
                </Text>
                <View style={styles.colorLabel}>
                  <Text
                    style={fonts.labels}>
                    {'RGB color'}
                  </Text>
                  <Switch
                    value={isRGBcolor}
                    onValueChange={() => setRGBcolor(!isRGBcolor)}
                    color={colors.colorButton}
                  />
                </View>
              </View>
              {!isRGBcolor && (
                <ColorPalette
                  onChange={color => selectPalette(color)}
                  // defaultColor={'#C0392B'}
                  // colors={['#C0392B', '#E74C3C', '#9B59B6', '#8E44AD', '#2980B9']}
                  title={''}
                  titleStyles={{height: 0}}
                  paletteStyles={{marginTop: 5}}
                />
              )}
              {isRGBcolor && (
                <View style={styles.colorContainer}>
                  <Text style={{...styles.RGBtext, color: colors.label}}>
                    R
                  </Text>
                  <TextInput
                    keyboardType="numeric"
                    style={{
                      ...styles.RGBvalue,
                      backgroundColor: colors.inputTextBackground,
                      borderColor: colors.inputTextBorder,
                    }}
                    value={red.toString()}
                    onChangeText={onChangeRed}
                  />
                  <Text style={{...styles.RGBtext, color: colors.label}}>
                    G
                  </Text>
                  <TextInput
                    keyboardType="numeric"
                    style={{
                      ...styles.RGBvalue,
                      backgroundColor: colors.inputTextBackground,
                      borderColor: colors.inputTextBorder,
                    }}
                    value={green.toString()}
                    onChangeText={onChangeGreen}
                  />
                  <Text style={{...styles.RGBtext, color: colors.label}}>
                    B
                  </Text>
                  <TextInput
                    keyboardType="numeric"
                    style={{
                      ...styles.RGBvalue,
                      backgroundColor: colors.inputTextBackground,
                      borderColor: colors.inputTextBorder,
                    }}
                    value={blue.toString()}
                    onChangeText={onChangeBlue}
                  />
                  <View style={styles.FillColorContainer}>
                    <View style={styles.lineColor(red, green, blue)} />
                  </View>
                </View>
              )}
              <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10}}>
                <TextButton
                  text='Add'
                  onPress={confirmFenceData}
                  textStyle={styles.actionButtonText(colors)}
                  style={styles.actionButton(colors)}
                />
                <TextButton
                  text='Cancel'
                  onPress={() => setVisibleSetFence(false)}
                  textStyle={styles.actionButtonText(colors)}
                  style={styles.actionButton(colors)}
                />
              </View>
          </Dialog>
          <Dialog
            visible={visibleSetPolygon}
            onDismiss={() => setVisibleSetPolygon(false)}
            style={{...styles.dialog, backgroundColor: colors.card}}>
              <Text style={{...fonts.headings, marginBottom: 10}}>New Polygon Fence</Text>
              <Text style={fonts.labels}>
                {'Title'}
              </Text>
              <TextInput
                style={styles.textBox(colors, fonts)}
                underlineColorAndroid="transparent"
                onChangeText={e => setPolygonTitle(e)}
                editable
                placeholder={'Geofence title'}
                placeholderTextColor={colors.placeholder}
                value={polygonTitle}
              />
              {/* <Text>{'Description'}</Text>
              <TextInput
                style={{
                  ...styles.textBox(false, 1),
                }}
                underlineColorAndroid="transparent"
                onChangeText={e => onChangeFenceData(e, 'description')}
                editable
                placeholder={'Point description'}
                value={newFenceData.description}
              /> */}
              <View style={styles.colorLabel}>
                <Text style={fonts.labels}>
                  {'Color'}
                </Text>
                <View style={styles.colorLabel}>
                  <Text
                    style={fonts.labels}>
                    {'RGB color'}
                  </Text>
                  <Switch
                    value={isRGBcolor}
                    onValueChange={() => setRGBcolor(!isRGBcolor)}
                    color={colors.colorButton}
                  />
                </View>
              </View>
              {!isRGBcolor && (
                <ColorPalette
                  onChange={color => selectPalette(color)}
                  // defaultColor={'#C0392B'}
                  // colors={['#C0392B', '#E74C3C', '#9B59B6', '#8E44AD', '#2980B9']}
                  title={''}
                  titleStyles={{height: 0}}
                  paletteStyles={{marginTop: 5}}
                />
              )}
              {isRGBcolor && (
                <View style={styles.colorContainer}>
                  <Text style={{...styles.RGBtext, color: colors.label}}>
                    R
                  </Text>
                  <TextInput
                    keyboardType="numeric"
                    style={{
                      ...styles.RGBvalue,
                      backgroundColor: colors.inputTextBackground,
                      borderColor: colors.inputTextBorder,
                    }}
                    value={red.toString()}
                    onChangeText={onChangeRed}
                  />
                  <Text style={{...styles.RGBtext, color: colors.label}}>
                    G
                  </Text>
                  <TextInput
                    keyboardType="numeric"
                    style={{
                      ...styles.RGBvalue,
                      backgroundColor: colors.inputTextBackground,
                      borderColor: colors.inputTextBorder,
                    }}
                    value={green.toString()}
                    onChangeText={onChangeGreen}
                  />
                  <Text style={{...styles.RGBtext, color: colors.label}}>
                    B
                  </Text>
                  <TextInput
                    keyboardType="numeric"
                    style={{
                      ...styles.RGBvalue,
                      backgroundColor: colors.inputTextBackground,
                      borderColor: colors.inputTextBorder,
                    }}
                    value={blue.toString()}
                    onChangeText={onChangeBlue}
                  />
                  <View style={styles.FillColorContainer}>
                    <View style={styles.lineColor(red, green, blue)} />
                  </View>
                </View>
              )}
              <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10}}>
                <TextButton
                  text='Ok'
                  onPress={() => {
                    if (!polygonTitle) {
                      Alert.alert('Warning', 'Please input the title.');
                    } else {
                      setVisibleSetPolygon(false);
                    }
                  }}
                  textStyle={styles.actionButtonText(colors)}
                  style={styles.actionButton(colors)}
                />
                <TextButton
                  text='Cancel'
                  onPress={() => {
                    setDrawPolygon(false);
                    setPolygonPointList([]);
                    setPolygonTitle('');
                    setVisibleSetPolygon(false);
                  }}
                  textStyle={styles.actionButtonText(colors)}
                  style={styles.actionButton(colors)}
                />
              </View>
          </Dialog>
          {(role.edit || preview) && (
            <View style={styles.mapControlView}>
              <TouchableOpacity onPress={onClickAddPoint}>
                <View style={styles.markerIcon(addStatus.point, fonts)}>
                  <IconButton
                    icon={'map-marker-plus-outline'}
                    iconColor={addStatus.point ? 'white' : 'grey'}
                    size={20}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClickAddFence}>
                <View style={styles.circleIcon(addStatus.circle, fonts)}>
                  <IconButton
                    icon={'shape-circle-plus'}
                    iconColor={addStatus.circle ? 'white' : 'grey'}
                    size={20}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClickAddPolygon}>
                <View style={styles.polygonIcon(addStatus.polygon, fonts)}>
                  <IconButton
                    icon={'shape-polygon-plus'}
                    iconColor={addStatus.polygon ? 'white' : 'grey'}
                    size={20}
                  />
                </View>
              </TouchableOpacity>
            </View>
          )}
          {drawPolygon && (
            <Button
              title='Finish'
              style={styles.drawPolytonBtn}
              color="white"
              onPress={() => finishDrawPolygon()}
            />
          )}
        </View>
      )}
      <Title
        name={`Points (${points.length})`}
        visible={visible.point}
        onPress={() => setVisible({...visible, point: !visible.point})}
      />
      {visible.point && (
        <View>
          {displayPointItems.map((e, i) => {
            return (
              <TouchableOpacity key={i} onPress={e => selectPoint(i)}>
                <View style={styles.pointItem(i)}>
                  <Text style={{fontSize: 18, color: '#d00'}}>{e.title}</Text>
                  <Text style={{color: color.GREY}}>{e.description}</Text>
                  <Text style={{color: color.GREY}}>{e.location}</Text>
                  {(role.edit || preview) && (
                    <View style={styles.itemIconsContainer}>
                      <IconButton
                        icon={'pencil-outline'}
                        iconColor="grey"
                        size={20}
                        onPress={() =>
                          editPoint(e, itemNum * (pointPageNum - 1) + i)
                        }
                        style={{...globalStyles.iconButton}}
                      />
                      <IconButton
                        icon={'delete-outline'}
                        iconColor="grey"
                        size={20}
                        onPress={() =>
                          deletePoint(itemNum * (pointPageNum - 1) + i)
                        }
                        style={{...globalStyles.iconButton}}
                      />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
          <View style={styles.pointPagenation}>
            <Icon
              name={'chevrons-left'}
              size={20}
              color={color.GREY}
              onPress={() => {
                setPointPageNum(1);
              }}
            />
            <Icon
              name={'chevron-left'}
              size={20}
              color={color.GREY}
              onPress={() => {
                if (pointPageNum > 1) {
                  setPointPageNum(pointPageNum - 1);
                }
              }}
            />
            <Text>{`${pointPageNum}/${pointPageCount}`}</Text>
            <Icon
              name={'chevron-right'}
              size={20}
              color={color.GREY}
              onPress={() => {
                if (pointPageNum < pointPageCount) {
                  setPointPageNum(pointPageNum + 1);
                }
              }}
            />
            <Icon
              name={'chevrons-right'}
              size={20}
              color={color.GREY}
              onPress={() => {
                setPointPageNum(pointPageCount);
              }}
            />
          </View>
        </View>
      )}
      <Title
        name={`Geofences (${geofences.length})`}
        visible={visible.fence}
        onPress={() => setVisible({...visible, fence: !visible.fence})}
      />
      {visible.fence && (
        <View>
          {displayFenceItems.map((e, i) => {
            if (e.type === 'circleFence') {
              return (
                <List.Item
                  key={i}
                  title={e.title}
                  titleStyle={{color: '#d00', fontSize: 18}}
                  description={e.location}
                  descriptionStyle={{color: color.GREY}}
                  right={props => {
                    if (role.edit || preview) {
                      return (
                        <View style={styles.itemIconsContainer1}>
                          <IconButton
                            icon={'pencil-outline'}
                            iconColor="grey"
                            size={20}
                            onPress={() =>
                              editGeoFence(
                                e,
                                itemNum * (geofencePageNum - 1) + i,
                              )
                            }
                            style={globalStyles.iconButton}
                          />
                          <IconButton
                            icon={'delete-outline'}
                            iconColor="grey"
                            size={20}
                            onPress={() =>
                              deleteGeoFence(
                                itemNum * (geofencePageNum - 1) + i,
                              )
                            }
                            style={globalStyles.iconButton}
                          />
                        </View>
                      );
                    }
                  }}
                  onPress={e => selectGeofence(i)}
                  style={{
                    backgroundColor: i % 2 === 1 ? '#ddd' : 'white',
                    borderRadius: 5,
                  }}
                />
              );
            }
            if (e.type === 'polygonFence') {
              return (
                <List.Item
                  key={i}
                  title={e.title}
                  titleStyle={{color: '#d00', fontSize: 18}}
                  description={e.location}
                  descriptionStyle={{color: color.GREY}}
                  right={props => {
                    if (role.edit || preview) {
                      return (
                        <View style={styles.itemIconsContainer1}>
                          <IconButton
                            icon={'pencil-outline'}
                            iconColor="grey"
                            size={20}
                            onPress={() =>
                              editGeoFence(
                                e,
                                itemNum * (geofencePageNum - 1) + i,
                              )
                            }
                            style={globalStyles.iconButton}
                          />
                          <IconButton
                            icon={'delete-outline'}
                            iconColor="grey"
                            size={20}
                            onPress={() =>
                              deleteGeoFence(
                                itemNum * (geofencePageNum - 1) + i,
                              )
                            }
                            style={globalStyles.iconButton}
                          />
                        </View>
                      );
                    }
                  }}
                  onPress={e => selectGeofence(i)}
                  style={{
                    backgroundColor: i % 2 === 1 ? '#ddd' : 'white',
                    borderRadius: 5,
                  }}
                />
              );
            }
          })}
          <View style={styles.pointPagenation}>
            <Icon
              name={'chevrons-left'}
              size={20}
              color={color.GREY}
              onPress={() => {
                setGeofencePageNum(1);
              }}
            />
            <Icon
              name={'chevron-left'}
              size={20}
              color={color.GREY}
              onPress={() => {
                if (geofencePageNum > 1) {
                  setGeofencePageNum(geofencePageNum - 1);
                }
              }}
            />
            <Text>{`${geofencePageNum}/${fencePageCount}`}</Text>
            <Icon
              name={'chevron-right'}
              size={20}
              color={color.GREY}
              onPress={() => {
                if (geofencePageNum < fencePageCount) {
                  setGeofencePageNum(geofencePageNum + 1);
                }
              }}
            />
            <Icon
              name={'chevrons-right'}
              size={20}
              color={color.GREY}
              onPress={() => {
                setGeofencePageNum(fencePageCount);
              }}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const Map = ({element, index}) => {
  const updateFormData = formStore(state => state.updateFormData);
  return useMemo(() => <MapChildComponent element={element} index={index} onClickUpdateField={updateFormData} />, [element, index]);
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  carouselTitle: colors => ({
    fontSize: 16,
    padding: 5,
    color: colors.text,
  }),
  mapView: {
    marginBottom: 10,
  },
  mapControlView: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    top: 10,
    right: 20,
    position: 'absolute',
  },
  colorLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dialog: {
    width: ScreenWidth - 50,
    marginHorizontal: 0,
    alignSelf: 'center',
    marginTop: 0,
    paddingHorizontal: 15,
  },

  itemIconsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  itemIconsContainer1: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  dialogTitle: colors => ({
    color: colors.text,
    fontSize: 18,
    fontFamily: 'PublicSans-Regular',
  }),
  mapFieldStyle: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
    paddingVertical: 5,
  },
  showItem: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  showItem1: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  markerIcon: (addPoint, fonts) => ({
    backgroundColor: addPoint ? fonts.values.color : '#ddd',
    borderRightColor: 'white',
    borderRightWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  }),
  circleIcon: (addFence, fonts) => ({
    backgroundColor: addFence ? fonts.values.color : '#ddd',
    borderRightColor: 'white',
    borderRightWidth: 1,
  }),
  polygonIcon: (addPolygonFence, fonts) => ({
    backgroundColor: addPolygonFence ? fonts.values.color : '#ddd',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  }),
  drawPolytonBtn: {
    backgroundColor: color.GREY,
    opacity: 0.8,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
  },
  points: {
    fontSize: 15,
    color: 'blue',
    marginRight: 10,
  },
  pointItem: i => ({
    borderRadius: 5,
    backgroundColor: i % 2 === 1 ? '#ddd' : 'white',
    padding: 15,
  }),
  pointPagenation: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 5,
  },
  showGeofenceItems: {
    fontSize: 15,
    marginRight: 10,
    color: 'blue',
  },
  colorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginRight: 10,
  },
  RGBtext: {
    width: '11%',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'PublicSans-Regular',
    fontSize: 14,
  },
  RGBvalue: {
    width: '20%',
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: color.GREY,
  },
  FillColorContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginLeft: 10,
    borderColor: color.GREY,
    borderWidth: 1,
    borderRadius: 5,
  },
  lineColor: (red, green, blue) => ({
    width: 30,
    height: 30,
    backgroundColor: '#' + string16(red) + string16(green) + string16(blue),
    alignSelf: 'center',
    borderColor: color.GREY,
    borderWidth: 1,
  }),
  header: headerStyle => ({
    margin: 15,
    marginTop: 20,
    textAlign: 'center',
    fontSize: 25,
    color: 'black',
    ...headerStyle,
  }),
  text: {
    margin: 10,
  },
  editForm: {
    borderColor: color.GREY,
    borderRadius: 5,
    borderWidth: 1,
    margin: 3,
    paddingBottom: 10,
  },
  fieldheader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  switchContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  textBox: (colors, fonts) => ({
    height: 40,
    borderRadius: 10,
    paddingVertical: 0,
    marginBottom: 5,
    backgroundColor: colors.background,
    ...fonts.values,
  }),
  mapStyle: {
    // position: 'absolute',
    width: '100%',
    height: 300,
  },
  actionButtonText: colors => ({
    color: '#FFFFFF',
  }),
  actionButton: colors => ({
    backgroundColor: colors.colorButton,
    borderRadius: 10,
    width: 100,
    paddingVertical: 10
  }),
});

Map.propTypes = {
  index: PropTypes.object,
  element: PropTypes.object,
};

export default React.memo(Map);

const mapStyle = [
  {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#263c3f'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#6b9a76'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#38414e'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#212a37'}],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9ca5b3'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#746855'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#1f2835'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{color: '#f3d19c'}],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{color: '#2f3948'}],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#17263c'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#515c6d'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#17263c'}],
  },
];
