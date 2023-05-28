import React, {useState, useEffect, useMemo} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  IconButton,
  useTheme,
} from 'react-native-paper';
import MapView, {
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import GeoLocation from 'react-native-geolocation-service';
import Title from '../../../common/Title';
import formStore from '../../../store/formStore';
import FieldLabel from '../../../common/FieldLabel';

const MapChildComponent = ({element}) => {
  const {colors, fonts} = useTheme();
  const i18nValues = formStore(state => state.i18nValues);
  const [selectedRegion, setSelectedRegion] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [locationInfomation, setLocationInfo] = useState({
    latitude: 0,
    longitude: 0,
    coordinates: [],
  });

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

  return (
    <SafeAreaView style={styles.container(element)}>
      <FieldLabel label={element.meta.title || i18nValues.t("field_labels.map")} visible={!element.meta.hide_title} />
      <Title
        name={i18nValues.t("field_labels.map")}
        visible={visible.map}
        onPress={() => setVisible({...visible, map: !visible.map})}
      />

      {visible.map && (
        <View style={styles.mapView}>
          <MapView
            // mapType={Platform.OS == "android" ? "none" : "standard"}
            provider={PROVIDER_GOOGLE}
            // provider={ Platform.OS === 'ios' ? PROVIDER_DEFAULT : PROVIDER_GOOGLE }
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
            }}>
          </MapView>
          <View style={styles.mapControlView}>
            <TouchableOpacity disabled>
              <View style={styles.markerIcon(addStatus.point, colors)}>
                <IconButton
                  icon={'map-marker-plus-outline'}
                  iconColor={addStatus.point ? 'white' : 'grey'}
                  size={20}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity disabled>
              <View style={styles.circleIcon(addStatus.circle, colors)}>
                <IconButton
                  icon={'shape-circle-plus'}
                  iconColor={addStatus.circle ? 'white' : 'grey'}
                  size={20}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity disabled>
              <View style={styles.polygonIcon(addStatus.polygon, colors)}>
                <IconButton
                  icon={'shape-polygon-plus'}
                  iconColor={addStatus.polygon ? 'white' : 'grey'}
                  size={20}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const Map = ({element, index}) => {
  const updateFormData = formStore(state => state.updateFormData);
  const formValue = formStore(state => state.formValue);
  return useMemo(() => <MapChildComponent element={element} index={index} onClickUpdateField={updateFormData} />, [element, index, JSON.stringify(formValue[element.field_name])]);
};

const styles = StyleSheet.create({
  container: element => ({
    ...element.meta.padding
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
  markerIcon: (addPoint, colors) => ({
    backgroundColor: addPoint ? colors.colorButton : '#ddd',
    borderRightColor: 'white',
    borderRightWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  }),
  circleIcon: (addFence, colors) => ({
    backgroundColor: addFence ? colors.colorButton : '#ddd',
    borderRightColor: 'white',
    borderRightWidth: 1,
  }),
  polygonIcon: (addPolygonFence, colors) => ({
    backgroundColor: addPolygonFence ? colors.colorButton : '#ddd',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  }),
  text: {
    margin: 10,
  },
  mapStyle: {
    // position: 'absolute',
    width: '100%',
    height: 300,
  },
});

Map.propTypes = {
  element: PropTypes.object,
};

export default React.memo(Map);
