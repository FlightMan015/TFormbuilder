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
import {Svg, Rect, Ellipse, Circle, Polygon, Path, Polyline, Defs, Use, G, Line, Text as SVGText, Pattern} from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollEnabledContext } from '../../Body';
import ColorDlg from '../../../dialogs/ColorDlg';

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
  pattern: true,
};

const Regions = ({element, index, imageData, imageSize}) => {
  const {colors, fonts} = useTheme();
  const userRole = formStore(state => state.userRole);
  const role = element.role.find(e => e.name === userRole);
  const formValue = formStore(state => state.formValue);
  const updateFormData = formStore(state => state.updateFormData);
  const preview = formStore(state => state.preview);
  const i18nValues = formStore(state => state.i18nValues);
  const [svgRegions, setSvgRegions] = useState(element.meta.regions);
  const valueMarkers = formValue[element.field_name]?.markers ? [...formValue[element.field_name]?.markers] : [];
  const imageScreenWidth = useRef(formValue[element.field_name]?.imageWidth || 0);
  const setIsEnabled = useContext(ScrollEnabledContext);

  const [regionCtrl, setRegionCtrl] = useState({
    new: false,
    edit: false,
  });
  const [drawType, setDrawType] = useState(MarkerShapes[2].name);
  const touchStartPoint = useRef({});
  const touchEndPoint = useRef({});
  const minPoint = useRef({x: -1, y: -1});
  const maxPoint = useRef({x: -1, y: -1});
  const [styleProps, setStyleProps] = useState(defaultStypeProps);
  const [polygonPoints, setPolygonPoints] = useState('');
  const polygonFirstPoint = useRef({});
  const [dlgState, setDlgState] = useState({
    borderColor: false,
    borderWidth: false,
    borderOpacity: false,
    fillColor: false,
    fillOpacity: false,
  });
  const [selectedRegion, setSelectedRegion] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    if (!regionCtrl.edit) {
      setSelectedRegion(null);
      setSvgRegions(element.meta.regions);
    }
  }, [regionCtrl.edit]);

  useEffect(() => {
    if (regionCtrl.edit && selectedRegion) {
      const selectedRegionIndex = svgRegions.findIndex(e => e.id === selectedRegion.id);
      svgRegions.splice(selectedRegionIndex, 1, selectedRegion);
      setSvgRegions([...svgRegions]);
    }
  }, [JSON.stringify(selectedRegion)])

  const setIsEnabledImageView = (bool) => {
    scrollRef.current && scrollRef.current.setNativeProps({scrollEnabled: bool});
  };

  const onTouchStart = (event) => {
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

    if (drawType === MarkerShapes[5].name && regionCtrl.new) {
      const tempPoints = polygonPoints;
      if (!tempPoints) {
        polygonFirstPoint.current = {x: Math.floor(locationX), y: Math.floor(locationY)};
        const newPolygonPoints = `${Math.floor(locationX)},${Math.floor(locationY)}`;
        setPolygonPoints(newPolygonPoints);
      } else if((Math.pow(Math.abs(polygonFirstPoint.current.x - Math.floor(locationX)), 2) + Math.pow(Math.abs(polygonFirstPoint.current.y - Math.floor(locationY)), 2)) < 50){
        setSvgRegions([...svgRegions, {
          id: `${drawType}-${Date.now()}`,
          name: drawType,
          points: tempPoints,
          selected: element.meta.defaultState,
          ...styleProps,
        }]);
        setPolygonPoints('');
      } else {
        const newPolygonPoints = `${tempPoints} ${Math.floor(locationX)},${Math.floor(locationY)}`;
        setPolygonPoints(newPolygonPoints);
      }
    }
  }

  const onTouchMove = (event) => {    
    const locationX = event.nativeEvent.locationX;
    const locationY = event.nativeEvent.locationY;

    minPoint.current = {x: Math.min(minPoint.current.x, Math.floor(locationX)), y: Math.min(minPoint.current.y, Math.floor(locationY))};
    maxPoint.current = {x: Math.max(maxPoint.current.x, Math.floor(locationX)), y: Math.max(maxPoint.current.y, Math.floor(locationY))};
  };

  const onTouchEnd = (event) => {
    const locationX = event.nativeEvent.locationX;
    const locationY = event.nativeEvent.locationY;
    touchEndPoint.current = {x: Math.floor(locationX), y: Math.floor(locationY)};
    minPoint.current = {x: Math.min(minPoint.current.x, Math.floor(locationX)), y: Math.min(minPoint.current.y, Math.floor(locationY))};
    maxPoint.current = {x: Math.max(maxPoint.current.x, Math.floor(locationX)), y: Math.max(maxPoint.current.y, Math.floor(locationY))};
    if (drawType === MarkerShapes[2].name && regionCtrl.new) {
      setSvgRegions([
        ...svgRegions,
        {
          id: `${drawType}-${Date.now()}`,
          name: drawType,
          x: Math.min(touchStartPoint.current.x, touchEndPoint.current.x),
          y: Math.min(touchStartPoint.current.y, touchEndPoint.current.y),
          width: Math.abs(touchStartPoint.current.x - touchEndPoint.current.x),
          height: Math.abs(touchStartPoint.current.y - touchEndPoint.current.y),
          defaultSelected: element.meta.defaultState,
          ...styleProps,
        }
      ]);
    }
    if (drawType === MarkerShapes[4].name && regionCtrl.new) {
      const rx = Math.floor(Math.abs(touchStartPoint.current.x - touchEndPoint.current.x)/2);
      const cx = Math.min(touchStartPoint.current.x, touchEndPoint.current.x) + rx;
      const ry = Math.floor(Math.abs(touchStartPoint.current.y - touchEndPoint.current.y)/2);
      const cy = Math.min(touchStartPoint.current.y, touchEndPoint.current.y) + ry;
      setSvgRegions([
        ...svgRegions,
        {
          name: drawType,
          id: `${drawType}-${Date.now()}`,
          cx: cx,
          cy: cy,
          rx: rx,
          ry: ry,
          defaultSelected: element.meta.defaultState,
          ...styleProps,
        }
      ]);
    }
    setIsEnabled(true);
    setIsEnabledImageView(true);
  };

  return (
    <View style={styles.safeAreaView}>
      <View>
        <ScrollView
          ref={scrollRef}
          horizontal
          scrollEventThrottle={0}
          style={{
            ...styles.imageContainer,
            height: imageSize.height,
            width: '100%',
          }}>
          {imageData?.imageUri && (
            <Image
              style={{width: imageSize.width, height: imageSize.height, alignSelf: 'center', resizeMode: 'contain'}}
              source={typeof(imageData.imageUri) !== 'string' ? imageData.imageUri : {uri: imageData.imageUri}}
            />
          )}

          {
            imageSize?.height !== 0 && imageSize?.width !== 0 && (
              <View
                onTouchStart={e => {if(drawType) onTouchStart(e)}}
                onTouchEnd={e => {if(drawType) onTouchEnd(e)}}
                onTouchMove={e => {if(drawType) onTouchMove(e)}}
                onTouchCancel={() => {if(drawType) {
                  setIsEnabled(true);
                  setIsEnabledImageView(true);
                }}}
                style={{
                  ...styles.canvas,
                  height: imageSize.height,
                  width: imageSize.width,
                }}
              >
                <Svg height={imageData.height} width={imageData.width}>
                  {
                    svgRegions.map((svgRegion, index) => {
                      // const visibleRegion = ((svgRegion.selected && element.meta.selectedShow) || (!svgRegion.selected && !element.meta.selectedShow));
                      const visibleRegion = true;
                      if (svgRegion.name === MarkerShapes[2].name) {
                        return <Rect
                          key={`region-rect-${index}`}
                          x={`${svgRegion.x}`}
                          y={`${svgRegion.y}`}
                          width={`${svgRegion.width}`}
                          height={`${svgRegion.height}`}
                          strokeWidth={`${svgRegion.strokeWidth}`}
                          fill={visibleRegion ? `${svgRegion.fill}` : `${svgRegion.fill}`.substring(0, 7) + '00'}
                          stroke={visibleRegion ? `${svgRegion.stroke}` : `${svgRegion.stroke}`.substring(0, 7) + '00'}
                          onPress={() => {
                            if (regionCtrl.edit) {
                              setSelectedRegion(svgRegion);
                            }
                          }}
                          disabled={(!element.meta.userSelectable) && !regionCtrl.edit}
                        />;
                      }
                      if (svgRegion.name === MarkerShapes[4].name) {
                        return <Ellipse
                          key={`region-ellipse-${index}`}
                          cx={`${svgRegion.cx}`}
                          cy={`${svgRegion.cy}`}
                          rx={`${svgRegion.rx}`}
                          ry={`${svgRegion.ry}`}
                          strokeWidth={`${svgRegion.strokeWidth}`}
                          fill={visibleRegion ? `${svgRegion.fill}` : `${svgRegion.fill}`.substring(0, 7) + '00'}
                          stroke={visibleRegion ? `${svgRegion.stroke}` : `${svgRegion.stroke}`.substring(0, 7) + '00'}
                          onPress={() => {
                            if (regionCtrl.edit) {
                              setSelectedRegion(svgRegion);
                            }
                          }}
                          disabled={!element.meta.userSelectable}
                        />;
                      }
                      if (svgRegion.name === MarkerShapes[5].name) {
                        return <Polygon
                          key={`region-polygon-${index}`}
                          points={`${svgRegion.points}`}
                          strokeWidth={`${svgRegion.strokeWidth}`}
                          fill={visibleRegion ? `${svgRegion.fill}` : `${svgRegion.fill}`.substring(0, 7) + '00'}
                          stroke={visibleRegion ? `${svgRegion.stroke}` : `${svgRegion.stroke}`.substring(0, 7) + '00'}
                          onPress={() => {
                            if (regionCtrl.edit) {
                              setSelectedRegion(svgRegion);
                            }
                          }}
                          disabled={!element.meta.userSelectable}
                        />;
                      }
                    })
                  }
                  {
                    polygonPoints.length > 0 && (
                      <Polyline
                        points={polygonPoints}
                        fill="none"
                        stroke={`${styleProps.stroke}`}
                        strokeWidth={`${styleProps.strokeWidth}`}
                      />
                    )
                  }
                </Svg>
              </View>
            )
          }
        </ScrollView>
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <CustomButton
              onPress={() => {
                setRegionCtrl({
                  ...regionCtrl,
                  new: !regionCtrl.new,
                  edit: false,
                });
              }}
              style={{
                ...styles.editButton1(colors),
                backgroundColor: regionCtrl.new ? colors.colorButton : '#FFFFFF',
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
              }}
              text={i18nValues.t("setting_labels.new_regions")}
              textStyle={{color: regionCtrl.new ? '#FFFFFF' : colors.colorButton}}
            />
            <CustomButton
              onPress={() => {
                setRegionCtrl({
                  ...regionCtrl,
                  new: false,
                  edit: !regionCtrl.edit,
                });
              }}
              style={{
                ...styles.editButton1(colors),
                backgroundColor: regionCtrl.edit ? colors.colorButton : '#FFFFFF',
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
              }}
              text={i18nValues.t("setting_labels.edit_regions")}
              textStyle={{color: regionCtrl.edit ? '#FFFFFF' : colors.colorButton}}
            />
          </View>
          {
            regionCtrl.new && (
              <View style={{marginHorizontal: 20}}>
                <View style={{alignItems: 'center', marginTop: 10}}>
                  <Text style={{textAlign: 'center'}}>{i18nValues.t("warnings.new_regions")}</Text>
                </View>
                <Text style={{...fonts.values, color: fonts.labels.color, marginTop: 5}}>{i18nValues.t("setting_labels.region_shape")}</Text>
                <View style={{flexDirection: 'row', marginLeft: 20}}>
                  {
                    MarkerShapes.map((shape, shapeIndex) => {
                      if (shapeIndex === 2 || shapeIndex === 4 || shapeIndex === 5) {
                        return <TouchableOpacity key={shapeIndex} style={{width: 50, alignItems: 'center', paddingVertical: 5, borderRadius: 5, borderWidth: 1, borderColor: colors.colorButton, marginTop: 5, marginHorizontal: 1, backgroundColor: drawType === shape.name ? colors.colorButton : colors.background}} onPress={() => {
                            if (drawType !== shape.name) {
                              setDrawType(shape.name);
                            } else {
                              setDrawType(null);
                            }
                          }}>
                          <Icon name={shape.icon} size={18} color={drawType === shape.name ? '#FFFFFF' : colors.colorButton} />
                        </TouchableOpacity>;
                      }
                    }
                    )
                  }
                </View>
                <Text style={{marginLeft: 20, marginTop: 5}}>
                  {
                    (drawType === MarkerShapes[2].name) ? i18nValues.t("warnings.rect_drawing_desc") : ''
                  }
                  {
                    (drawType === MarkerShapes[4].name) ? i18nValues.t("warnings.ellipse_drawing_desc") : ''
                  }
                  {
                    (drawType === MarkerShapes[5].name) ? i18nValues.t("warnings.polygon_drawing_desc") : ''
                  }
                </Text>
              </View>
            )
          }
          {
            regionCtrl.edit && !selectedRegion && (
              <View style={{alignItems: 'center', marginTop: 10}}>
                <Text>{i18nValues.t("warnings.edit_regions")}</Text>
              </View>
            )
          }
          {
            (regionCtrl.new || (regionCtrl.edit && selectedRegion)) && (
              <View style={{marginHorizontal: 20}}>
                {/* <Text style={{...fonts.values, color: fonts.labels.color, marginTop: 5}}>Name:</Text>
                <TextInput
                  value={Number(`0x${styleProps.stroke.substring(7, 9)}`).toString()}
                  keyboardType='numeric'
                  onChangeText={newText => {
                    if (!newText || parseInt(newText, 10) < 0) {
                      setStyleProps({...styleProps, stroke: styleProps.stroke.substring(0, 7) + '00'});
                    } else if (parseInt(newText, 10) > 255) {
                      setStyleProps({...styleProps, stroke: styleProps.stroke.substring(0, 7) + 'FF'});
                    } else {
                      if (parseInt(newText, 10) > 16) {
                        setStyleProps({...styleProps, stroke: `${styleProps.stroke.substring(0, 7)}${parseInt(newText, 10).toString(16)}`});
                      } else {
                        setStyleProps({...styleProps, stroke: `${styleProps.stroke.substring(0, 7)}0${parseInt(newText, 10).toString(16)}`});
                      }
                    }
                  }}
                  style={{width: '100%', height: 30, backgroundColor: colors.background, borderRadius: 5, borderWidth: 1, borderColor: 'grey', marginTop: 5, paddingLeft: 10, padding: 0, color: fonts.values.color}}
                /> */}
                <Text style={{...fonts.values, color: fonts.labels.color, marginTop: 5}}>{i18nValues.t("setting_labels.border")}</Text>
                <View style={{flexDirection: 'row', marginTop: 5}}>
                  <View style={{flex: 1, flexDirection: 'row', paddingRight: 5}}>
                    <Text style={{...fonts.values, color: fonts.labels.color}}>{i18nValues.t("setting_labels.color")}</Text>
                    <TouchableOpacity
                      style={{width: 20, height: 20, backgroundColor: regionCtrl.new ? styleProps.stroke.substring(0, 7) : selectedRegion.stroke.substring(0, 7), borderWidth: 1, borderColor: 'grey', marginLeft: 10}}
                      onPress={() => setDlgState({...dlgState, borderColor: true})}
                    />
                  </View>
                  <View style={{flex: 1, flexDirection: 'row', paddingRight: 5}}>
                    <Text style={{...fonts.values, color: fonts.labels.color}}>{i18nValues.t("setting_labels.width")}</Text>
                    <TextInput
                      value={`${styleProps.strokeWidth}`}
                      keyboardType='numeric'
                      onChangeText={newText => {
                        if (regionCtrl.edit) {
                          setSelectedRegion({...selectedRegion, strokeWidth: newText});
                        } else {
                          setStyleProps({...styleProps, strokeWidth: newText})
                        }
                      }}
                      style={{width: 40, height: 20, backgroundColor: colors.background, borderRadius: 3, borderWidth: 1, borderColor: 'grey', marginLeft: 10, paddingLeft: 2, padding: 0, color: fonts.values.color}}
                    />
                  </View>
                  <View style={{flex: 1, flexDirection: 'row', paddingRight: 5}}>
                    <Text style={{...fonts.values, color: fonts.labels.color}}>{i18nValues.t("setting_labels.opacity")}</Text>
                    <TextInput
                      value={Number(`0x${(regionCtrl.edit) ? selectedRegion.stroke.substring(7, 9) : styleProps.stroke.substring(7, 9)}`).toString()}
                      keyboardType='numeric'
                      onChangeText={newText => {
                        if (regionCtrl.edit) {
                          if (!newText || parseInt(newText, 10) < 0) {
                            setSelectedRegion({...selectedRegion, stroke: styleProps.stroke.substring(0, 7) + '00'});
                          } else if (parseInt(newText, 10) > 255) {
                            setSelectedRegion({...selectedRegion, stroke: styleProps.stroke.substring(0, 7) + 'FF'});
                          } else {
                            if (parseInt(newText, 10) > 16) {
                              setSelectedRegion({...selectedRegion, stroke: `${styleProps.stroke.substring(0, 7)}${parseInt(newText, 10).toString(16)}`});
                            } else {
                              setSelectedRegion({...selectedRegion, stroke: `${styleProps.stroke.substring(0, 7)}0${parseInt(newText, 10).toString(16)}`});
                            }
                          }
                        }
                        else {
                          if (!newText || parseInt(newText, 10) < 0) {
                            setStyleProps({...styleProps, stroke: styleProps.stroke.substring(0, 7) + '00'});
                          } else if (parseInt(newText, 10) > 255) {
                            setStyleProps({...styleProps, stroke: styleProps.stroke.substring(0, 7) + 'FF'});
                          } else {
                            if (parseInt(newText, 10) > 16) {
                              setStyleProps({...styleProps, stroke: `${styleProps.stroke.substring(0, 7)}${parseInt(newText, 10).toString(16)}`});
                            } else {
                              setStyleProps({...styleProps, stroke: `${styleProps.stroke.substring(0, 7)}0${parseInt(newText, 10).toString(16)}`});
                            }
                          }
                        }

                        // if (regionCtrl.edit) {
                        //   if (!newText || parseInt(newText, 10) < 0) {
                        //     setSelectedRegion({...selectedRegion, stroke: styleProps.stroke.substring(0, 7) + '00'});
                        //   } else if (parseInt(newText, 10) > 100) {
                        //     setSelectedRegion({...selectedRegion, stroke: styleProps.stroke.substring(0, 7) + 'FF'});
                        //   } else {
                        //     if (parseInt(newText, 10) > Math.floor(100/16)) {
                        //       setSelectedRegion({...selectedRegion, stroke: `${styleProps.stroke.substring(0, 7)}${(Math.floor(parseInt(newText, 10) * 255 / 100)).toString(16)}`});
                        //     } else {
                        //       setSelectedRegion({...selectedRegion, stroke: `${styleProps.stroke.substring(0, 7)}0${(Math.floor(parseInt(newText, 10) * 255 / 100)).toString(16)}`});
                        //     }
                        //   }
                        // }
                        // else {
                        //   if (!newText || parseInt(newText, 10) < 0) {
                        //     setStyleProps({...styleProps, stroke: styleProps.stroke.substring(0, 7) + '00'});
                        //   } else if (parseInt(newText, 10) > 100) {
                        //     setStyleProps({...styleProps, stroke: styleProps.stroke.substring(0, 7) + 'FF'});
                        //   } else {
                        //     if (parseInt(newText, 10) > Math.floor(100/16)) {
                        //       setStyleProps({...styleProps, stroke: `${styleProps.stroke.substring(0, 7)}${(Math.floor(parseInt(newText, 10) * 255 / 100)).toString(16)}`});
                        //     } else {
                        //       setStyleProps({...styleProps, stroke: `${styleProps.stroke.substring(0, 7)}0${(Math.floor(parseInt(newText, 10) * 255 / 100)).toString(16)}`});
                        //     }
                        //   }
                        // }
                      }}
                      style={{width: 40, height: 20, backgroundColor: colors.background, borderRadius: 3, borderWidth: 1, borderColor: 'grey', marginLeft: 10, paddingLeft: 2, padding: 0, color: fonts.values.color}}
                    />
                  </View>
                </View>
                <Text style={{...fonts.values, color: fonts.labels.color, marginTop: 5}}>{i18nValues.t("setting_labels.fill")}</Text>
                <View style={{flexDirection: 'row', marginTop: 5}}>
                  <View style={{flex: 1, flexDirection: 'row', paddingRight: 5}}>
                    <Text style={{...fonts.values, color: fonts.labels.color}}>{i18nValues.t("setting_labels.color")}</Text>
                    <TouchableOpacity
                      style={{width: 20, height: 20, backgroundColor: regionCtrl.new ? styleProps.fill.substring(0, 7) : selectedRegion.fill.substring(0, 7), borderWidth: 1, borderColor: 'grey', marginLeft: 10}}
                      onPress={() => setDlgState({...dlgState, fillColor: true})}
                    />
                  </View>
                  <View style={{flex: 1, flexDirection: 'row', paddingRight: 5}}>
                    <Text style={{...fonts.values, color: fonts.labels.color}}>{i18nValues.t("setting_labels.opacity")}</Text>
                    <TextInput
                      value={Number(`0x${(regionCtrl.edit) ? selectedRegion.fill.substring(7, 9) : styleProps.fill.substring(7, 9)}`).toString()}
                      keyboardType='numeric'
                      onChangeText={newText => {
                        if (regionCtrl.edit) {
                          if (!newText || parseInt(newText, 10) < 0) {
                            setSelectedRegion({...selectedRegion, fill: styleProps.fill.substring(0, 7) + '00'});
                          } else if (parseInt(newText, 10) > 255) {
                            setSelectedRegion({...selectedRegion, fill: styleProps.fill.substring(0, 7) + 'FF'});
                          } else {
                            if (parseInt(newText, 10) > 16) {
                              setSelectedRegion({...selectedRegion, fill: `${styleProps.fill.substring(0, 7)}${parseInt(newText, 10).toString(16)}`});
                            } else {
                              setSelectedRegion({...selectedRegion, fill: `${styleProps.fill.substring(0, 7)}0${parseInt(newText, 10).toString(16)}`});
                            }
                          }
                        }
                        else {
                          if (!newText || parseInt(newText, 10) < 0) {
                            setStyleProps({...styleProps, fill: styleProps.fill.substring(0, 7) + '00'});
                          } else if (parseInt(newText, 10) > 255) {
                            setStyleProps({...styleProps, fill: styleProps.fill.substring(0, 7) + 'FF'});
                          } else {
                            if (parseInt(newText, 10) > 16) {
                              setStyleProps({...styleProps, fill: `${styleProps.fill.substring(0, 7)}${parseInt(newText, 10).toString(16)}`});
                            } else {
                              setStyleProps({...styleProps, fill: `${styleProps.fill.substring(0, 7)}0${parseInt(newText, 10).toString(16)}`});
                            }
                            
                          }
                        }
                        
                        // if (regionCtrl.edit) {
                        //   if (!newText || parseInt(newText, 10) < 0) {
                        //     setSelectedRegion({...selectedRegion, fill: styleProps.fill.substring(0, 7) + '00'});
                        //   } else if (parseInt(newText, 10) > 100) {
                        //     setSelectedRegion({...selectedRegion, fill: styleProps.fill.substring(0, 7) + 'FF'});
                        //   } else {
                        //     if (parseInt(newText, 10) > Math.floor(100/16)) {
                        //       setSelectedRegion({...selectedRegion, fill: `${styleProps.fill.substring(0, 7)}${(Math.floor(parseInt(newText, 10) * 255 / 100)).toString(16)}`});
                        //     } else {
                        //       setSelectedRegion({...selectedRegion, fill: `${styleProps.strofillke.substring(0, 7)}0${(Math.floor(parseInt(newText, 10) * 255 / 100)).toString(16)}`});
                        //     }
                        //   }
                        // }
                        // else {
                        //   if (!newText || parseInt(newText, 10) < 0) {
                        //     setStyleProps({...styleProps, fill: styleProps.fill.substring(0, 7) + '00'});
                        //   } else if (parseInt(newText, 10) > 100) {
                        //     setStyleProps({...styleProps, fill: styleProps.fill.substring(0, 7) + 'FF'});
                        //   } else {
                        //     if (parseInt(newText, 10) > Math.floor(100/16)) {
                        //       setStyleProps({...styleProps, fill: `${styleProps.fill.substring(0, 7)}${(Math.floor(parseInt(newText, 10) * 255 / 100)).toString(16)}`});
                        //     } else {
                        //       setStyleProps({...styleProps, fill: `${styleProps.fill.substring(0, 7)}0${(Math.floor(parseInt(newText, 10) * 255 / 100)).toString(16)}`});
                        //     }
                        //   }
                        // }

                      }}
                      style={{width: 40, height: 20, backgroundColor: colors.background, borderRadius: 3, borderWidth: 1, borderColor: 'grey', marginLeft: 10, paddingLeft: 2, padding: 0, color: fonts.values.color}}
                    />
                  </View>
                  <View style={{flex: 1, flexDirection: 'row', paddingRight: 5}}>
                  </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <CustomButton
                    onPress={() => {
                      const metaData = {...element.meta};
                      updateFormData(index, {...element, meta: {...metaData, regions: svgRegions}});
                    }}
                    style={{
                      ...styles.editButton1(colors),
                      backgroundColor: colors.colorButton,
                      borderRadius: 5,
                      width: 80,
                    }}
                    text="Save"
                    textStyle={{color: '#FFFFFF'}}
                  />
                  {
                    regionCtrl.edit &&
                    <CustomButton
                      onPress={() => {
                        const selectedRegionIndex = svgRegions.findIndex(e => e.id === selectedRegion.id);
                        svgRegions.splice(selectedRegionIndex, 1);
                        const metaData = {...element.meta};
                        updateFormData(index, {...element, meta: {...metaData, regions: svgRegions}});
                      }}
                      style={{
                        ...styles.editButton1(colors),
                        backgroundColor: colors.colorButton,
                        borderRadius: 5,
                        width: 80,
                      }}
                      text="Delete"
                      textStyle={{color: '#FFFFFF'}}
                    />
                  }
                  
                  <CustomButton
                    onPress={() => {
                      setSvgRegions(element.meta.regions);
                      setSelectedRegion(null);
                    }}
                    style={{
                      ...styles.editButton1(colors),
                      backgroundColor: colors.colorButton,
                      borderRadius: 5,
                      width: 80,
                    }}
                    text="Cancel"
                    textStyle={{color: '#FFFFFF'}}
                  />
                </View>
              </View>
            )
          }
        </View>
      </View>
      <ColorDlg
        title={"Border Color"}
        visibleDlg={dlgState.borderColor}
        setVisibleDlg={() => setDlgState({...dlgState, borderColor: false})}
        selectColor={newColor => {
          if (regionCtrl.new) {
            setStyleProps({...styleProps, stroke: `${newColor}${styleProps.stroke.substring(7, 9)}`})
          }
          if (regionCtrl.edit) {
            setSelectedRegion({...selectedRegion, stroke: `${newColor}${styleProps.stroke.substring(7, 9)}`})
          }
        }}
        color={styleProps.stroke.substring(0, 7)}
      />
      <ColorDlg
        title={"Fill Color"}
        visibleDlg={dlgState.fillColor}
        setVisibleDlg={() => setDlgState({...dlgState, fillColor: false})}
        selectColor={newColor => {
          if (regionCtrl.new) {
            setStyleProps({...styleProps, fill: `${newColor}${styleProps.fill.substring(7, 9)}`})
          }
          if (regionCtrl.edit) {
            setSelectedRegion({...selectedRegion, fill: `${newColor}${styleProps.fill.substring(7, 9)}`})
          }
        }}
        color={styleProps.fill.substring(0, 7)}
      />
    </View>
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

export default Regions;
