import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useContext,
} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Alert,
  TextInput,
  ScrollView
} from 'react-native';
import DocumentPicker, {
  DocumentPickerResponse,
  isInprogress,
  types,
} from 'react-native-document-picker';
import {IconButton, useTheme} from 'react-native-paper';
import {color} from '../../../theme/styles';
import useDrawingStore from '../../../store/bitmapStore';
import utils from './utils';
import CustomButton from '../../../common/CustomButton';
import Title from '../../../common/Title';
import formStore from '../../../store/formStore';
import FieldLabel from '../../../common/FieldLabel';
import ResizedImage from '../../../common/ResizedImage';
import {Svg, Rect, Ellipse, Circle, Polygon, Path, Polyline, Defs, Use, G, Line, Text as SVGText, Pattern, Symbol} from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollEnabledContext } from '../../Body';
import ColorDlg from '../../../dialogs/ColorDlg';
import MarkerTypes from './MarkerTypes';
import Regions from './Regions';

const MarkerShapes = [
  {name: 'draw', icon: 'draw'},
  {name: 'square', icon: 'square-outline'},
  {name: 'rectangle', icon: 'rectangle-outline'},
  {name: 'circle', icon: 'circle-outline'},
  {name: 'ellipse', icon: 'ellipse-outline'},
  {name: 'polygon', icon: 'pentagon-outline'},
  {name: 'line', icon: 'slash-forward'},
  {name: 'text', icon: 'alphabetical-variant'},
];

const defaultStypeProps = {
  strokeWidth: 2,
  stroke: "#FF0000FF",
  fill: "#FFFF00FF",
  pattern: false,
};

const Bitmap = ({element, index}) => {
  const {colors, fonts} = useTheme();
  const userRole = formStore(state => state.userRole);
  const role = element.role.find(e => e.name === userRole);
  const formValue = formStore(state => state.formValue);
  const setFormValue = formStore(state => state.setFormValue);
  const updateFormData = formStore(state => state.updateFormData);
  const preview = formStore(state => state.preview);
  const i18nValues = formStore(state => state.i18nValues);
  const [svgRegions, setSvgRegions] = useState(element.meta.regions);
  const [imageData, setImageData] = useState({
    imageUri: formValue[element.field_name]?.imageUri || '',
    imageName: formValue[element.field_name]?.imageName || '',
  });
  const valueMarkers = formValue[element.field_name]?.markers ? [...formValue[element.field_name]?.markers] : [];
  const imageScreenWidth = useRef(formValue[element.field_name]?.imageWidth || 0);
  const setVisibleMarkerAddDlg = formStore(
    state => state.setVisibleMarkerAddDlg,
  );
  const setBitmapImageData = useDrawingStore(state => state.setBitmapImageData);
  const visibleDlg = useDrawingStore(state => state.visibleDlg);
  const setVisibleDlg = useDrawingStore(state => state.setVisibleDlg);
  const [tabState, setTabState] = useState({
    regions: false,
    markers: false,
    markerTypes: false,
  });
  const setIsEnabled = useContext(ScrollEnabledContext);

  const onLayout = event => {
    imageScreenWidth.current = event.nativeEvent.layout.width;
    useDrawingStore.getState().setCanvasInfo({
      width: event.nativeEvent.layout.width - 20,
      height: 400,
    });
  };

  const [imageSize, setImageSize] = useState({width: 0, height: 0});
  const [drawType, setDrawType] = useState(null);
  const [currentPath, setCurrentPath] = useState([]);
  const [paths, setPaths] = useState([]);
  const touchStartPoint = useRef({});
  const touchEndPoint = useRef({});
  const minPoint = useRef({x: -1, y: -1});
  const maxPoint = useRef({x: -1, y: -1});
  const [polygonPoints, setPolygonPoints] = useState('');
  const polygonFirstPoint = useRef({});
  const selectedMarkerType = useDrawingStore(state => state.selectedMarkerType);
  const setMarkerTypeToAdd = useDrawingStore(state => state.setMarkerTypeToAdd);

  const scrollRef = useRef();

  const setIsEnabledImageView = (bool) => {
    scrollRef.current && scrollRef.current.setNativeProps({scrollEnabled: bool});
  };

  useEffect(() => {
    if (formValue[element.field_name]?.imageUri) {

      Image.getSize(formValue[element.field_name].imageUri, (imageWidth, imageHeight) => {
        if (imageWidth/imageHeight > imageScreenWidth.current/300) {
          setImageSize({
            ...imageSize,
            ...utils.handleImageSize(
              imageWidth,
              imageHeight,
              imageWidth * 300 / imageHeight,
              300,
            ),
          });
        } else {
          setImageSize({
            ...imageSize,
            ...utils.handleImageSize(
              imageWidth,
              imageHeight,
              imageScreenWidth.current,
              imageHeight * imageScreenWidth.current / imageWidth,
            ),
          });
        }
      });
      setImageData({
        ...imageData,
        imageUri: formValue[element.field_name].imageUri,
        imageName: formValue[element.field_name].imageName,
      });
    }
  }, [JSON.stringify(formValue[element.field_name])]);

  useEffect(() => {

  }, [JSON.stringify(imageSize)]);

  useEffect(() => {
    minPoint.current = {...minPoint.current, x: -1, y: -1};
    maxPoint.current = {...maxPoint.current, x: -1, y: -1};
    setMarkerTypeToAdd({});
  }, [JSON.stringify(tabState)]);

  const onTouchStart = (event) => {
    if (tabState.markers && `${selectedMarkerType?.useDrawingFunc}` === 'false') {
      setIsEnabled(false);
      setIsEnabledImageView(false);
      const locationX = Math.floor(event.nativeEvent.locationX);
      const locationY = Math.floor(event.nativeEvent.locationY);
      const tempValue = formValue[element.field_name] ? {...formValue[element.field_name]} : {};
      const tempMarkers = tempValue.markers ? [...tempValue.markers] : [];
      setFormValue({...formValue, [element.field_name]: {...tempValue, markers: [...tempMarkers, {...selectedMarkerType, x: locationX - parseInt(`${selectedMarkerType.minPoint.x}`, 10) - Math.floor((selectedMarkerType.maxPoint.x - selectedMarkerType.minPoint.x)/2), y: locationY - parseInt(`${selectedMarkerType.minPoint.y}`, 10) - (selectedMarkerType.maxPoint.y - selectedMarkerType.minPoint.y)/2}]}});
    }
    if (tabState.markers && `${selectedMarkerType?.useDrawingFunc}` === 'true') {
      setIsEnabled(false);
      setIsEnabledImageView(false);
      const locationX = event.nativeEvent.locationX;
      const locationY = event.nativeEvent.locationY;
      touchStartPoint.current = {x: Math.floor(locationX), y: Math.floor(locationY)};
      if (minPoint.current.x < 0 && minPoint.current.y < 0) {
        minPoint.current = {x: Math.floor(locationX), y: Math.floor(locationY)};
      } else {
        minPoint.current = {x: Math.min(minPoint.current.x, Math.floor(locationX)), y: Math.min(minPoint.current.y, Math.floor(locationY))};
      }
      if (maxPoint.current.x < 0 && maxPoint.current.y < 0) {
        maxPoint.current = {x: Math.floor(locationX), y: Math.floor(locationY)};
      } else {
        maxPoint.current = {x: Math.max(maxPoint.current.x, Math.floor(locationX)), y: Math.max(maxPoint.current.y, Math.floor(locationY))};
      }

      var newMarkerData = {};
      if (selectedMarkerType.drawType === MarkerShapes[5].name) {
        const tempPoints = polygonPoints;
        if (!tempPoints) {
          polygonFirstPoint.current = {x: Math.floor(locationX), y: Math.floor(locationY)};
          const newPolygonPoints = `${Math.floor(locationX)},${Math.floor(locationY)}`;
          setPolygonPoints(newPolygonPoints);
        } else if((Math.pow(Math.abs(polygonFirstPoint.current.x - Math.floor(locationX)), 2) + Math.pow(Math.abs(polygonFirstPoint.current.y - Math.floor(locationY)), 2)) < 50){
          newMarkerData = {
            ...selectedMarkerType.data[0],
            id: `${drawType}-${Date.now()}`,
            name: selectedMarkerType.drawType,
            points: tempPoints,
            stroke: selectedMarkerType.stroke,
            strokeWidth: selectedMarkerType.strokeWidth,
            fill: selectedMarkerType.fill
          };
          const tempValue = formValue[element.field_name] ? {...formValue[element.field_name]} : {};
          const tempMarkers = tempValue.markers ? [...tempValue.markers] : [];
          const newData = [];
          newData.push(newMarkerData);
          setFormValue({...formValue, [element.field_name]: {...tempValue, markers: [...tempMarkers, {...selectedMarkerType, data: newData}]}});
          setPolygonPoints('');
        } else {
          const newPolygonPoints = `${tempPoints} ${Math.floor(locationX)},${Math.floor(locationY)}`;
          setPolygonPoints(newPolygonPoints);
        }
      }
      if (selectedMarkerType.drawType === MarkerShapes[7].name) {
        newMarkerData = {
          ...selectedMarkerType.data[0],
          id: `${drawType}-${Date.now()}`,
          name: selectedMarkerType.drawType,
          x: touchStartPoint.current.x,
          y: touchStartPoint.current.y,
          stroke: selectedMarkerType.stroke,
          strokeWidth: selectedMarkerType.strokeWidth,
          fill: selectedMarkerType.fill
        };
        const tempValue = formValue[element.field_name] ? {...formValue[element.field_name]} : {};
        const tempMarkers = tempValue.markers ? [...tempValue.markers] : [];
        const newData = [];
        newData.push(newMarkerData);
        setFormValue({...formValue, [element.field_name]: {...tempValue, markers: [...tempMarkers, {...selectedMarkerType, data: newData}]}});
      }
      
    }
  }

  const onTouchMove = (event) => {
    if (tabState.markers && `${selectedMarkerType?.useDrawingFunc}` === 'true') {
      //get current user touches position
      const locationX = event.nativeEvent.locationX;
      const locationY = event.nativeEvent.locationY;

      minPoint.current = {x: Math.min(minPoint.current.x, Math.floor(locationX)), y: Math.min(minPoint.current.y, Math.floor(locationY))};
      maxPoint.current = {x: Math.max(maxPoint.current.x, Math.floor(locationX)), y: Math.max(maxPoint.current.y, Math.floor(locationY))};
      // svgPosition({minPoint: minPoint.current, maxPoint: maxPoint.current});
      if (selectedMarkerType.drawType === MarkerShapes[0].name) {
        const newPath = [...currentPath];

        // create new point
        const newPoint = `${newPath.length === 0 ? 'M' : ''}${locationX.toFixed(0)},${locationY.toFixed(0)} `;

        // add the point to older points
        newPath.push(newPoint);
        setCurrentPath(newPath);
      }
    }
  };

  const onTouchEnd = (event) => {
    setIsEnabled(true);
    setIsEnabledImageView(true);
    const locationX = event.nativeEvent.locationX;
    const locationY = event.nativeEvent.locationY;
    if (tabState.markers && `${selectedMarkerType?.useDrawingFunc}` === 'true') {
      touchEndPoint.current = {x: Math.floor(locationX), y: Math.floor(locationY)};
      minPoint.current = {x: Math.min(minPoint.current.x, Math.floor(locationX)), y: Math.min(minPoint.current.y, Math.floor(locationY))};
      maxPoint.current = {x: Math.max(maxPoint.current.x, Math.floor(locationX)), y: Math.max(maxPoint.current.y, Math.floor(locationY))};

      var newMarkerData = {};

      if (selectedMarkerType.drawType === MarkerShapes[0].name) {
        const currentPaths = [...paths];
        const newPath = [...currentPath];

        //push new path with old path and clean current path state
        currentPaths.push(newPath);

        newMarkerData = {
          ...selectedMarkerType.data[0],
          pathData: currentPaths,
          stroke: selectedMarkerType.stroke,
          strokeWidth: selectedMarkerType.strokeWidth,
          fill: selectedMarkerType.fill
        };

        setPaths(currentPaths);
        setCurrentPath([]);
      }
      if (selectedMarkerType.drawType === MarkerShapes[2].name) {
        newMarkerData = {
          ...selectedMarkerType.data[0],
          id: `${drawType}-${Date.now()}`,
          name: selectedMarkerType.drawType,
          x: Math.min(touchStartPoint.current.x, touchEndPoint.current.x),
          y: Math.min(touchStartPoint.current.y, touchEndPoint.current.y),
          width: Math.abs(touchStartPoint.current.x - touchEndPoint.current.x),
          height: Math.abs(touchStartPoint.current.y - touchEndPoint.current.y),
          stroke: selectedMarkerType.stroke,
          strokeWidth: selectedMarkerType.strokeWidth,
          fill: selectedMarkerType.fill
        };
      }
      if (selectedMarkerType.drawType === MarkerShapes[3].name) {
        const rx = Math.floor(Math.abs(touchStartPoint.current.x - touchEndPoint.current.x)/2);
        const cx = Math.min(touchStartPoint.current.x, touchEndPoint.current.x) + rx;
        const ry = Math.floor(Math.abs(touchStartPoint.current.y - touchEndPoint.current.y)/2);
        const cy = Math.min(touchStartPoint.current.y, touchEndPoint.current.y) + ry;
        newMarkerData = {
          ...selectedMarkerType.data[0],
          id: `${drawType}-${Date.now()}`,
          name: selectedMarkerType.drawType,
          cx: cx,
          cy: cy,
          rx: Math.min(rx, ry),
          ry: Math.min(rx, ry),
          stroke: selectedMarkerType.stroke,
          strokeWidth: selectedMarkerType.strokeWidth,
          fill: selectedMarkerType.fill
        };
      }
      if (selectedMarkerType.drawType === MarkerShapes[4].name) {
        const rx = Math.floor(Math.abs(touchStartPoint.current.x - touchEndPoint.current.x)/2);
        const cx = Math.min(touchStartPoint.current.x, touchEndPoint.current.x) + rx;
        const ry = Math.floor(Math.abs(touchStartPoint.current.y - touchEndPoint.current.y)/2);
        const cy = Math.min(touchStartPoint.current.y, touchEndPoint.current.y) + ry;
        newMarkerData = {
          ...selectedMarkerType.data[0],
          id: `${drawType}-${Date.now()}`,
          name: selectedMarkerType.drawType,
          cx: cx,
          cy: cy,
          rx: rx,
          ry: ry,
          stroke: selectedMarkerType.stroke,
          strokeWidth: selectedMarkerType.strokeWidth,
          fill: selectedMarkerType.fill
        };
      }
      if (selectedMarkerType.drawType === MarkerShapes[6].name) {
        newMarkerData = {
          ...selectedMarkerType.data[0],
          id: `${drawType}-${Date.now()}`,
          name: selectedMarkerType.drawType,
          x1: touchStartPoint.current.x,
          y1: touchStartPoint.current.y,
          x2: touchEndPoint.current.x,
          y2: touchEndPoint.current.y,
          stroke: selectedMarkerType.stroke,
          strokeWidth: selectedMarkerType.strokeWidth,
          fill: selectedMarkerType.fill
        };
      }
      const tempValue = formValue[element.field_name] ? {...formValue[element.field_name]} : {};
      const tempMarkers = tempValue.markers ? [...tempValue.markers] : [];
      const newData = [];
      newData.push(newMarkerData);
      setFormValue({...formValue, [element.field_name]: {...tempValue, markers: [...tempMarkers, {...selectedMarkerType, data: newData}]}});
    }
  };

  console.log(imageSize.width, imageSize.height);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.bitmapContainer(element)}>
        <FieldLabel label={element.meta.title || i18nValues.t("field_labels.bitmap")} visible={!element.meta.hide_title} />
        <View style={styles.selectImageContainer(colors)}>
          <View style={{flexDirection: 'row'}}>
            {(
              <CustomButton
                onPress={() => {
                  DocumentPicker.pick({
                    type: types.images,
                  })
                    .then(result => {
                      if (
                        imageData.imageName !== result[0].name ||
                        imageData.imageUri !== result[0].uri
                      ) {
                        const tempMetaData = {
                          imageName: result[0].name,
                          imageUri: result[0].uri,
                          imageWidth: imageScreenWidth.current,
                          paths: [],
                          svgs: [],
                        };
                        setFormValue({...formValue, [element.field_name]: tempMetaData});
                        if (element.event.onSelectImage) {
                          Alert.alert('Rule Action', `Fired onSelectImage action. rule - ${element.event.onSelectImage}. newSeries - ${JSON.stringify(tempMetaData)}`);
                        }
                      }
                    })
                    .catch({});
                }}
                style={{
                  ...styles.iconButton,
                }}
                iconColor={colors.colorButton}
                icon="folder"
                iconSize={18}
              />
            )}
            {imageData.imageName && tabState.markers && (
              <CustomButton
                onPress={() => {
                  setVisibleMarkerAddDlg(true);
                  setBitmapImageData({element});
                  minPoint.current = {...minPoint.current, x: -1, y: -1};
                  maxPoint.current = {...maxPoint.current, x: -1, y: -1};
                }}
                style={{
                  ...styles.iconButton,
                }}
                iconColor={colors.colorButton}
                icon="edit"
                iconSize={18}
              />
            )}
          </View>

          <Text style={styles.imageName(fonts)}>
            {imageData.imageName || 'Select the image'}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          {(role.setting && !preview) && imageData.imageName && (
              <CustomButton
                onPress={() => {
                  setTabState({
                    ...tabState,
                    regions: !tabState.regions,
                    markers: false,
                    markerTypes: false,
                  });
                }}
                style={{
                  ...styles.editButton(colors),
                  backgroundColor: tabState.regions ? colors.colorButton : '#FFFFFF'
                }}
                text={i18nValues.t("setting_labels.regions")}
                textStyle={{color: tabState.regions ? '#FFFFFF' : colors.colorButton}}
              />
          )}
          {(role.setting && !preview) && imageData.imageName && (
            <CustomButton
              onPress={() => {
                setTabState({
                  ...tabState,
                  markerTypes: !tabState.markerTypes,
                  regions: false,
                  markers: false,
                });
              }}
              style={{
                ...styles.editButton(colors),
                backgroundColor: tabState.markerTypes ? colors.colorButton : '#FFFFFF'
              }}
              text={i18nValues.t("setting_labels.marker_types")}
              textStyle={{color: tabState.markerTypes ? '#FFFFFF' : colors.colorButton}}
            />
          )}
          {(role.edit || preview) && imageData.imageName && (
            <CustomButton
              onPress={() => {
                setTabState({
                  ...tabState,
                  markers: !tabState.markers,
                  regions: false,
                  markerTypes: false
                });
                // setVisibleMarkerAddDlg(true);
                // setBitmapImageData({element});
              }}
              style={{
                ...styles.editButton(colors),
                backgroundColor: tabState.markers ? colors.colorButton : '#FFFFFF'
              }}
              text={i18nValues.t("setting_labels.markers")}
              textStyle={{color: tabState.markers ? '#FFFFFF' : colors.colorButton}}
            />
          )}
        </View>
        {
          !tabState.markerTypes && !tabState.regions && (
            <>
              <ScrollView
                horizontal
                ref={scrollRef}
                onLayout={onLayout}
                style={{
                  ...styles.imageContainer,
                  height: imageSize.height,
                  width: '100%',
                }}>
                {imageData.imageUri && (
                  <Image
                    style={{width: imageSize.width, height: imageSize.height, alignSelf: 'center', resizeMode: 'contain'}}
                    source={typeof(imageData.imageUri) !== 'string' ? imageData.imageUri : {uri: imageData.imageUri}}
                  />
                )}

                {
                  imageSize.height !== 0 && imageSize.width !== 0 && (
                    <View
                      onTouchStart={e => {if(tabState.markers) onTouchStart(e)}}
                      onTouchEnd={e => {if(tabState.markers) onTouchEnd(e)}}
                      onTouchMove={e => {if(tabState.markers) onTouchMove(e)}}
                      onTouchCancel={() => {
                        setIsEnabled(true);
                        setIsEnabledImageView(true);
                      }}
                      style={{
                        ...styles.canvas,
                        height: imageSize.height,
                        width: imageSize.width,
                      }}
                    >
                      <Svg height={imageSize.height} width={imageSize.width}>
                        {
                          element.meta.regions.map((svgRegion, regionIndex) => {
                            const visibleRegion = ((svgRegion.selected && element.meta.selectedShow) || (!svgRegion.selected && !element.meta.selectedShow) || tabState.regions);
                            if (svgRegion.name === MarkerShapes[2].name) {
                              return <Rect
                                key={`region-rect-${regionIndex}`}
                                x={`${svgRegion.x}`}
                                y={`${svgRegion.y}`}
                                width={`${svgRegion.width}`}
                                height={`${svgRegion.height}`}
                                strokeWidth={`${svgRegion.strokeWidth}`}
                                fill={visibleRegion ? `${svgRegion.fill}` : `${svgRegion.fill}`.substring(0, 7) + '00'}
                                stroke={visibleRegion ? `${svgRegion.stroke}` : `${svgRegion.stroke}`.substring(0, 7) + '00'}
                                onPress={() => {
                                  const tempElement = {...element};
                                  tempElement.meta.regions.splice(regionIndex, 1, {...svgRegion, selected: !svgRegion.selected});
                                  updateFormData(index, tempElement);
                                }}
                                disabled={!element.meta.userSelectable || tabState.markers}
                              />;
                            }
                            if (svgRegion.name === MarkerShapes[4].name) {
                              return <Ellipse
                                key={`region-ellipse-${regionIndex}`}
                                cx={`${svgRegion.cx}`}
                                cy={`${svgRegion.cy}`}
                                rx={`${svgRegion.rx}`}
                                ry={`${svgRegion.ry}`}
                                strokeWidth={`${svgRegion.strokeWidth}`}
                                fill={visibleRegion ? `${svgRegion.fill}` : `${svgRegion.fill}`.substring(0, 7) + '00'}
                                stroke={visibleRegion ? `${svgRegion.stroke}` : `${svgRegion.stroke}`.substring(0, 7) + '00'}
                                onPress={() => {
                                  const tempElement = {...element};
                                  tempElement.meta.regions.splice(regionIndex, 1, {...svgRegion, selected: !svgRegion.selected});
                                  updateFormData(index, tempElement);
                                }}
                                disabled={!element.meta.userSelectable || tabState.markers}
                              />;
                            }
                            if (svgRegion.name === MarkerShapes[5].name) {
                              return <Polygon
                                key={`region-polygon-${regionIndex}`}
                                points={`${svgRegion.points}`}
                                strokeWidth={`${svgRegion.strokeWidth}`}
                                fill={visibleRegion ? `${svgRegion.fill}` : `${svgRegion.fill}`.substring(0, 7) + '00'}
                                stroke={visibleRegion ? `${svgRegion.stroke}` : `${svgRegion.stroke}`.substring(0, 7) + '00'}
                                onPress={() => {
                                  const tempElement = {...element};
                                  tempElement.meta.regions.splice(regionIndex, 1, {...svgRegion, selected: !svgRegion.selected});
                                  updateFormData(index, tempElement);
                                }}
                                disabled={!element.meta.userSelectable || tabState.markers}
                              />;
                            }
                          })
                        }
                        {
                          element.meta.markers.map((marker, mindex) => {
                            const width = marker.maxPoint.x - marker.minPoint.x;
                            const height = marker.maxPoint.y - marker.minPoint.y;
                            // return <Symbol key={`def-${mindex}`} id={`${marker.id}`} viewBox={`${marker.minPoint.x} ${marker.minPoint.y} ${width} ${height}`} width={`${width}`} height={`${height}`}>
                            // </Symbol>;
                            return <Defs key={`def-${mindex}`}>
                            <G id={marker.id}>
                              <G>
                              {
                                marker.data.map((svgMarker, markerIndex) => {
                                  if (svgMarker.name === MarkerShapes[0].name && svgMarker.pathData.length > 0) {
                                    return svgMarker.pathData.map((item, itemIndex) => {
                                      return <Path
                                        key={`marker-path-${itemIndex}`}
                                        d={item.join('')}
                                        fill={`${svgMarker.fill}`}
                                        stroke={`${svgMarker.stroke}`}
                                        strokeWidth={`${svgMarker.strokeWidth}`}
                                        strokeLinejoin={'round'}
                                        strokeLinecap={'round'}
                                      />;
                                    })
                                  }
                                  if (svgMarker.name === MarkerShapes[1].name || svgMarker.name === MarkerShapes[2].name) {
                                    return <View key={markerIndex}>
                                      <Defs key={`marker-def-${markerIndex}`}>
                                        <Pattern
                                          id={svgMarker.id}
                                          patternUnits="userSpaceOnUse"
                                          x="0"
                                          y="0"
                                          width="6"
                                          height="6"
                                          viewBox="0 0 10 10"
                                        >
                                          <Line x1="0" y1="10" x2="10" y2="0" strokeWidth="2" stroke={`${svgMarker.fill.substring(0, 7)}`} />
                                        </Pattern>
                                      </Defs>
                                      <Rect
                                        key={`marker-rect-${markerIndex}`}
                                        x={`${svgMarker.x}`}
                                        y={`${svgMarker.y}`}
                                        width={`${svgMarker.width}`}
                                        height={`${svgMarker.height}`}
                                        fill={`${svgMarker.pattern}` === 'true' ? `url(#${svgMarker.id})` : `${svgMarker.fill}`}
                                        strokeWidth={`${svgMarker.strokeWidth}`}
                                        stroke={`${svgMarker.stroke}`}
                                      />
                                    </View>
                                    
                                  }
                                  if (svgMarker.name === MarkerShapes[3].name || svgMarker.name === MarkerShapes[4].name) {
                                    return <View key={markerIndex}>
                                      <Defs key={`marker-def-${markerIndex}`}>
                                        <Pattern
                                          id={svgMarker.id}
                                          patternUnits="userSpaceOnUse"
                                          x="0"
                                          y="0"
                                          width="6"
                                          height="6"
                                          viewBox="0 0 10 10"
                                        >
                                          <Line x1="0" y1="10" x2="10" y2="0" strokeWidth="2" stroke={`${svgMarker.fill.substring(0, 7)}`} />
                                        </Pattern>
                                      </Defs>
                                      <Ellipse
                                        key={`marker-ellipse-${markerIndex}`}
                                        cx={`${svgMarker.cx}`}
                                        cy={`${svgMarker.cy}`}
                                        rx={`${svgMarker.rx}`}
                                        ry={`${svgMarker.ry}`}
                                        stroke={`${svgMarker.stroke}`}
                                        strokeWidth={`${svgMarker.strokeWidth}`}
                                        fill={`${svgMarker.pattern}` === 'true' ? `url(#${svgMarker.id})` : `${svgMarker.fill}`}
                                      />
                                    </View>;
                                  }
                                  if (svgMarker.name === MarkerShapes[5].name) {
                                    return <View key={markerIndex}>
                                      <Defs key={`marker-def-${markerIndex}`}>
                                        <Pattern
                                          id={svgMarker.id}
                                          patternUnits="userSpaceOnUse"
                                          x="0"
                                          y="0"
                                          width="6"
                                          height="6"
                                          viewBox="0 0 10 10"
                                        >
                                          <Line x1="0" y1="10" x2="10" y2="0" strokeWidth="2" stroke={`${svgMarker.fill.substring(0, 7)}`} />
                                        </Pattern>
                                      </Defs>
                                      <Polygon
                                        key={`marker-polygon-${markerIndex}`}
                                        points={`${svgMarker.points}`}
                                        stroke={`${svgMarker.stroke}`}
                                        strokeWidth={`${svgMarker.strokeWidth}`}
                                        fill={`${svgMarker.pattern}` === 'true' ? `url(#${svgMarker.id})` : `${svgMarker.fill}`}
                                      />
                                    </View>;
                                  }
                                  if (svgMarker.name === MarkerShapes[6].name) {
                                    return <Line
                                      key={`marker-line-${markerIndex}`}
                                      x1={`${svgMarker.x1}`}
                                      y1={`${svgMarker.y1}`}
                                      x2={`${svgMarker.x2}`}
                                      y2={`${svgMarker.y2}`}
                                      stroke={`${svgMarker.stroke}`}
                                      strokeWidth={`${svgMarker.strokeWidth}`}
                                    />;
                                  }
                                  if (svgMarker.name === MarkerShapes[7].name) {
                                    return <SVGText
                                        key={`marker-text-${markerIndex}`}
                                        fill={`${svgMarker.fill}`}
                                        stroke={`${svgMarker.stroke}`}
                                        fontSize={`${svgMarker.fontSize}`}
                                        fontWeight="bold"
                                        x={`${svgMarker.x}`}
                                        y={`${svgMarker.y}`}
                                        textAnchor="middle"
                                      >
                                        {svgMarker.text}
                                      </SVGText>;
                                  }
                                })
                              }
                              </G>
                            </G>
                          </Defs>;
                          })
                        }
                        {valueMarkers.map((valueMarker, valueIndex) => {
                          const width = valueMarker.maxPoint.x - valueMarker.minPoint.x;
                          const height = valueMarker.maxPoint.y - valueMarker.minPoint.y;
                          if (`${valueMarker.useDrawingFunc}` === 'false') {
                            return <Use key={`valueMarker-${valueIndex}`} href={`#${valueMarker.id}`} x={`${valueMarker.x}`} y={`${valueMarker.y}`} width={`${width}`} height={`${height}`}/>
                          } 
                          if (`${valueMarker.useDrawingFunc}` === 'true') {
                            return valueMarker.data.map((svgMarker, svgMarkerIndex) => {
                              if (svgMarker.name === MarkerShapes[0].name && svgMarker.pathData.length > 0) {
                                return svgMarker.pathData.map((item, itemIndex) => {
                                  return <Path
                                    key={`marker-path-${itemIndex}`}
                                    d={item.join('')}
                                    fill={`${svgMarker.fill}`}
                                    stroke={`${svgMarker.stroke}`}
                                    strokeWidth={`${svgMarker.strokeWidth}`}
                                    strokeLinejoin={'round'}
                                    strokeLinecap={'round'}
                                  />;
                                })
                              }
                              if (svgMarker.name === MarkerShapes[1].name || svgMarker.name === MarkerShapes[2].name) {
                                return <View key={svgMarkerIndex}>
                                  <Defs key={`marker-def-${svgMarkerIndex}`}>
                                    <Pattern
                                      id={svgMarker.id}
                                      patternUnits="userSpaceOnUse"
                                      x="0"
                                      y="0"
                                      width="6"
                                      height="6"
                                      viewBox="0 0 10 10"
                                    >
                                      <Line x1="0" y1="10" x2="10" y2="0" strokeWidth="2" stroke={`${svgMarker.fill.substring(0, 7)}`} />
                                    </Pattern>
                                  </Defs>
                                  <Rect
                                    key={`marker-rect-${svgMarkerIndex}`}
                                    x={`${svgMarker.x}`}
                                    y={`${svgMarker.y}`}
                                    width={`${svgMarker.width}`}
                                    height={`${svgMarker.height}`}
                                    fill={`${svgMarker.pattern}` === 'true' ? `url(#${svgMarker.id})` : `${svgMarker.fill}`}
                                    strokeWidth={`${svgMarker.strokeWidth}`}
                                    stroke={`${svgMarker.stroke}`}
                                  />
                                </View>
                                
                              }
                              if (svgMarker.name === MarkerShapes[3].name || svgMarker.name === MarkerShapes[4].name) {
                                return <View key={svgMarkerIndex}>
                                  <Defs key={`marker-def-${svgMarkerIndex}`}>
                                    <Pattern
                                      id={svgMarker.id}
                                      patternUnits="userSpaceOnUse"
                                      x="0"
                                      y="0"
                                      width="6"
                                      height="6"
                                      viewBox="0 0 10 10"
                                    >
                                      <Line x1="0" y1="10" x2="10" y2="0" strokeWidth="2" stroke={`${svgMarker.fill.substring(0, 7)}`} />
                                    </Pattern>
                                  </Defs>
                                  <Ellipse
                                    key={`marker-ellipse-${svgMarkerIndex}`}
                                    cx={`${svgMarker.cx}`}
                                    cy={`${svgMarker.cy}`}
                                    rx={`${svgMarker.rx}`}
                                    ry={`${svgMarker.ry}`}
                                    stroke={`${svgMarker.stroke}`}
                                    strokeWidth={`${svgMarker.strokeWidth}`}
                                    fill={`${svgMarker.pattern}` === 'true' ? `url(#${svgMarker.id})` : `${svgMarker.fill}`}
                                  />
                                </View>;
                              }
                              if (svgMarker.name === MarkerShapes[5].name) {
                                return <View key={svgMarkerIndex}>
                                  <Defs key={`marker-def-${svgMarkerIndex}`}>
                                    <Pattern
                                      id={svgMarker.id}
                                      patternUnits="userSpaceOnUse"
                                      x="0"
                                      y="0"
                                      width="6"
                                      height="6"
                                      viewBox="0 0 10 10"
                                    >
                                      <Line x1="0" y1="10" x2="10" y2="0" strokeWidth="2" stroke={`${svgMarker.fill.substring(0, 7)}`} />
                                    </Pattern>
                                  </Defs>
                                  <Polygon
                                    key={`marker-polygon-${svgMarkerIndex}`}
                                    points={`${svgMarker.points}`}
                                    stroke={`${svgMarker.stroke}`}
                                    strokeWidth={`${svgMarker.strokeWidth}`}
                                    fill={`${svgMarker.pattern}` === 'true' ? `url(#${svgMarker.id})` : `${svgMarker.fill}`}
                                  />
                                </View>;
                              }
                              if (svgMarker.name === MarkerShapes[6].name) {
                                return <Line
                                  key={`marker-line-${svgMarkerIndex}`}
                                  x1={`${svgMarker.x1}`}
                                  y1={`${svgMarker.y1}`}
                                  x2={`${svgMarker.x2}`}
                                  y2={`${svgMarker.y2}`}
                                  stroke={`${svgMarker.stroke}`}
                                  strokeWidth={`${svgMarker.strokeWidth}`}
                                />;
                              }
                              if (svgMarker.name === MarkerShapes[7].name) {
                                return <SVGText
                                    key={`marker-text-${svgMarkerIndex}`}
                                    fill={`${svgMarker.fill}`}
                                    stroke={`${svgMarker.stroke}`}
                                    fontSize={`${svgMarker.fontSize}`}
                                    fontWeight="bold"
                                    x={`${svgMarker.x}`}
                                    y={`${svgMarker.y}`}
                                    textAnchor="middle"
                                  >
                                    {svgMarker.text}
                                  </SVGText>;
                              }
                            })
                          } 
                        })}
                        {
                          polygonPoints.length > 0 && (
                            <Polyline
                              points={polygonPoints}
                              fill="none"
                              stroke={`${selectedMarkerType.data[0].stroke}`}
                              strokeWidth={`${selectedMarkerType.data[0].strokeWidth}`}
                            />
                          )
                        }
                      </Svg>
                    </View>
                  )
                }
              </ScrollView>

              {
                valueMarkers.length > 0 && tabState.markers && element.meta.markers.length !== 0 && (
                  <View style={{alignItems: 'center'}}>
                    <CustomButton
                      onPress={() => {
                        const tempValue = {...formValue[element.field_name]};
                        const tempMarkers = [...tempValue.markers];
                        tempMarkers.splice(tempMarkers.length - 1, 1);
                        setFormValue({...formValue, [element.field_name]: {...tempValue, markers: tempMarkers}});
                      }}
                      style={{
                        ...styles.editButton1(colors),
                        backgroundColor: colors.colorButton,
                        borderRadius: 5,
                        width: 150,
                      }}
                      text="Cancel last marker"
                      textStyle={{color: '#FFFFFF'}}
                    />
                  </View>
                )
              }              
            </>
          )
        }
        {
          tabState.regions && (
            <Regions element={element} index={index} imageData={imageData} imageSize={imageSize} />
          )
        }
        {
          tabState.markerTypes && (
            <MarkerTypes element={element} index={index} imageData={imageData} imageSize={imageSize} />
          )
        }
        {
          tabState.markers && (
            <Text style={{textAlign: 'center'}}>
              {
                // console.log(selectedMarkerType)
                Object.keys(selectedMarkerType).length > 0 ? selectedMarkerType.useDrawingFunc ? i18nValues.t("warnings.draw_marker") : i18nValues.t("warnings.click_marker_point") : i18nValues.t("warnings.select_marker_type")
              }
            </Text>
          )
        }
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  thumbnail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIconsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    margin: 3,
  },
  iconButton: {
    width: 35,
    height: 35,
    marginRight: 5,
  },
  editButton: colors => ({
    width: 110,
    marginRight: 5,
    paddingLeft: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.colorButton,
    marginTop: 10,
    paddingVertical: 5,
  }),
  editButton1: colors => ({
    width: 110,
    marginRight: 5,
    paddingLeft: 5,
    borderWidth: 1,
    borderColor: colors.colorButton,
    marginTop: 10,
    paddingVertical: 5,
  }),
  imageName: (fonts) => ({
    borderRadius: 10,
    paddingLeft: 10,
    paddingVertical: 10,
    ...fonts.values,
  }),
  selectImageContainer: colors => ({
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row-reverse',
  }),
  bitmapContainer: element => ({
    ...element.meta.padding
  }),
  safeAreaView: {width: '100%'},
  imageContainer: {
    width: '100%',
    marginTop: 10,
  },
  canvas: {
    width: '100%',
    position: 'absolute',
    alignSelf: 'center',
  },
  linkButton: {
    width: '100%',
    marginVertical: 10,
  },
  renderItemContainer: colors => ({
    flexDirection: 'row',
    marginVertical: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: 10,
  }),
  linkName: fonts => ({
    height: 40,
    textAlignVertical: 'center',
    paddingLeft: 10,
    textDecorationLine: 'underline',
    ...fonts.values,
  }),
});

export default Bitmap;
