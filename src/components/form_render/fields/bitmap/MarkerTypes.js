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
import {IconButton, useTheme, Switch, Checkbox} from 'react-native-paper';
import {color} from '../../../../theme/styles';
import useDrawingStore from '../../../../store/bitmapStore';
import utils from './utils';
import CustomButton from '../../../../common/CustomButton';
import formStore from '../../../../store/formStore';
import {Svg, Rect, Ellipse, Circle, Polygon, Path, Polyline, Defs, Use, G, Line, Text as SVGText, Pattern} from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollEnabledContext } from '../../index';

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
  title: 'New Marker Type',
  strokeWidth: 2,
  stroke: "#FF0000FF",
  fill: "#FF000000",
  pattern: false,
};

const PatternComponent = <Defs key={`marker-type-def`}>
  <Pattern
    id="marker-type-pattern"
    patternUnits="userSpaceOnUse"
    x="0"
    y="0"
    width="8"
    height="8"
    viewBox="0 0 10 10"
  >
    <Line x1="0" y1="10" x2="10" y2="0" strokeWidth="2" stroke={`${defaultStypeProps.fill.substring(0, 7)}`} />
  </Pattern>
</Defs>;

const MarkerTypes = ({element, index, imageSize, imageData}) => {
  const {colors, fonts} = useTheme();
  const userRole = formStore(state => state.userRole);
  const role = element.role.find(e => e.name === userRole);
  const updateFormData = formStore(state => state.updateFormData);
  const preview = formStore(state => state.preview);
  const i18nValues = formStore(state => state.i18nValues);
  const [svgMarkerTypes, setSvgMarkerTypes] = useState(element.meta.markers);
  const [svgMarkerType, setSvgMarkerType] = useState([]);
  const setIsEnabled = useContext(ScrollEnabledContext);

  const [markerTypeCtrl, setMarkerTypeCtrl] = useState({
    new: false,
    view: false
  });
  const [drawType, setDrawType] = useState(MarkerShapes[2].name);
  const [currentPath, setCurrentPath] = useState([]);
  const [paths, setPaths] = useState([]);
  const touchStartPoint = useRef({});
  const touchEndPoint = useRef({});
  const minPoint = useRef({x: -1, y: -1});
  const maxPoint = useRef({x: -1, y: -1});
  const [styleProps, setStyleProps] = useState(defaultStypeProps);
  const [textProps, setTextProps] = useState({text: 'Text', fontSize: 20});
  const [polygonPoints, setPolygonPoints] = useState('');
  const polygonFirstPoint = useRef({});
  const [useDrawingFunc, setUseDrawingFunc] = useState(false);
  const [newStrokeWidth, setNewStrokeWidth] = useState(`${styleProps.strokeWidth}`);
  const [selectedMarkerType, setSelectedMarkerType] = useState({});
  const [newFontSize, setNewFontSize] = useState(`${textProps.fontSize}`)
  const scrollRef = useRef();

  const setIsEnabledImageView = (bool) => {
    scrollRef.current && scrollRef.current.setNativeProps({scrollEnabled: bool});
  };

  useEffect(() => {
    if (markerTypeCtrl.new) {
      setUseDrawingFunc(false);
      setSvgMarkerType([]);
    }
    minPoint.current = {...minPoint.current, x: -1, y: -1};
    maxPoint.current = {...maxPoint.current, x: -1, y: -1};
  }, [markerTypeCtrl.new])

  useEffect(() => {
    setSvgMarkerTypes(element.meta.markers);
  }, [JSON.stringify(element.meta.markers)]);

  // const OpenURLButton = linkdata => {
  //   const {url, name, svg} = linkdata;
  //   const linkIndex = linkdata.index;
  //   const handlePress = useCallback(async () => {
  //     // await Linking.openSettings();
  //     // Checking if the link is supported for links with custom URL scheme.
  //     const supported = await Linking.canOpenURL(url);

  //     // if (supported) {
  //     // Opening the link with some app, if the URL scheme is "http" the web link should be opened
  //     // by some browser in the mobile
  //     await Linking.openURL(url);
  //     // } else {
  //     //   Alert.alert(`Don't know how to open this URL: ${url}`);
  //     // }
  //   }, [url]);

  //   return (
  //     <TouchableOpacity onPress={handlePress}>
  //       <View style={styles.renderItemContainer(colors)}>
  //         <View style={styles.thumbnail}>
  //           <Canvas style={{width: 50, height: 50}}>
  //             <ImageSVG
  //               svg={Skia.SVG.MakeFromString(svg)}
  //               x={0}
  //               y={0}
  //               width={50}
  //               height={50}
  //             />
  //           </Canvas>
  //           <Text style={styles.linkName(fonts)}>{name}</Text>
  //         </View>
  //         {
  //           (role.edit || preview) && (
  //             <View style={styles.itemIconsContainer}>
  //               <IconButton
  //                 icon={'pencil-outline'}
  //                 iconColor={colors.colorButton}
  //                 size={18}
  //                 onPress={() => {
  //                   setVisibleDlg({
  //                     ...visibleDlg,
  //                     editBitmapLink: true,
  //                     bitmapIndex: index,
  //                     bitmapLinkIndex: linkIndex,
  //                     bitmapElement: element,
  //                     bitmapLinkData: {name: name, link: url},
  //                   });
  //                 }}
  //                 style={styles.actionButton}
  //               />
  //               <IconButton
  //                 icon={'delete-outline'}
  //                 iconColor={colors.colorButton}
  //                 size={18}
  //                 onPress={() => {
  //                   Alert.alert(
  //                     'Delete link',
  //                     'Are you sure want to delete this link ?',
  //                     [
  //                       {
  //                         text: 'Yes',
  //                         onPress: () => {
  //                           const tempValue = {...formValue[element.field_name]};
  //                           tempValue.paths.splice(linkIndex, 1);
  //                           tempValue.svgs.splice(linkIndex, 1);
  //                           setFormValue({...formValue, [element.field_name]: tempValue});
  //                           if (element.event.onDeleteMarker) {
  //                             Alert.alert('Rule Action', `Fired onDeleteMarker action. rule - ${element.event.onDeleteMarker}. newSeries - ${JSON.stringify(tempValue)}`);
  //                           }
  //                         },
  //                       },
  //                       {
  //                         text: 'No',
  //                         onPress: () => {},
  //                         style: 'cancel',
  //                       },
  //                     ],
  //                   );
  //                 }}
  //                 style={styles.actionButton}
  //               />
  //             </View>
  //           ) 
  //         }
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };

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
    // svgPosition({minPoint: minPoint.current, maxPoint: maxPoint.current});
    // setTouchState(true);

    if (markerTypeCtrl.new && drawType === MarkerShapes[5].name) {
      const tempPoints = polygonPoints;
      if (!tempPoints) {
        polygonFirstPoint.current = {x: Math.floor(locationX), y: Math.floor(locationY)};
        const newPolygonPoints = `${Math.floor(locationX)},${Math.floor(locationY)}`;
        setPolygonPoints(newPolygonPoints);
      } else if((Math.pow(Math.abs(polygonFirstPoint.current.x - Math.floor(locationX)), 2) + Math.pow(Math.abs(polygonFirstPoint.current.y - Math.floor(locationY)), 2)) < 50){
        setSvgMarkerType([
          ...svgMarkerType,
          {
          id: `${drawType}-${Date.now()}`,
          name: drawType,
          points: tempPoints,
          ...styleProps,
        }]);
        setPolygonPoints('');
      } else {
        const newPolygonPoints = `${tempPoints} ${Math.floor(locationX)},${Math.floor(locationY)}`;
        setPolygonPoints(newPolygonPoints);
      }
    }
    if (markerTypeCtrl.new && drawType === MarkerShapes[7].name) {
      setSvgMarkerType([
        ...svgMarkerType,
        {
        name: drawType,
        x: touchStartPoint.current.x,
        y: touchStartPoint.current.y,
        ...styleProps,
        ...textProps,
      }]);
    }
  }

  const onTouchMove = (event) => {    
    //get current user touches position
    const locationX = event.nativeEvent.locationX;
    const locationY = event.nativeEvent.locationY;

    minPoint.current = {x: Math.min(minPoint.current.x, Math.floor(locationX)), y: Math.min(minPoint.current.y, Math.floor(locationY))};
    maxPoint.current = {x: Math.max(maxPoint.current.x, Math.floor(locationX)), y: Math.max(maxPoint.current.y, Math.floor(locationY))};
    // svgPosition({minPoint: minPoint.current, maxPoint: maxPoint.current});
    if (drawType === MarkerShapes[0].name) {
      const newPath = [...currentPath];

      // create new point
      const newPoint = `${newPath.length === 0 ? 'M' : ''}${locationX.toFixed(0)},${locationY.toFixed(0)} `;

      // add the point to older points
      newPath.push(newPoint);
      setCurrentPath(newPath);
    }
  };

  const onTouchEnd = (event) => {
    setIsEnabled(true);
    setIsEnabledImageView(true);
    const locationX = event.nativeEvent.locationX;
    const locationY = event.nativeEvent.locationY;
    touchEndPoint.current = {x: Math.floor(locationX), y: Math.floor(locationY)};
    minPoint.current = {x: Math.min(minPoint.current.x, Math.floor(locationX)), y: Math.min(minPoint.current.y, Math.floor(locationY))};
    maxPoint.current = {x: Math.max(maxPoint.current.x, Math.floor(locationX)), y: Math.max(maxPoint.current.y, Math.floor(locationY))};
    // svgPosition({minPoint: minPoint.current, maxPoint: maxPoint.current});
    if (markerTypeCtrl.new && drawType === MarkerShapes[0].name) {
      const currentPaths = [...paths];
      const newPath = [...currentPath];

      //push new path with old path and clean current path state
      currentPaths.push(newPath);
      setSvgMarkerType([
        ...svgMarkerType,
        {
          name: drawType,
          pathData: currentPaths,
          ...styleProps,
        }
      ])
      setPaths(currentPaths);
      setCurrentPath([]);
    }
    if (markerTypeCtrl.new && drawType === MarkerShapes[1].name) {
      setSvgMarkerType([
        ...svgMarkerType,
        {
          id: `${drawType}-${Date.now()}`,
          name: drawType,
          x: Math.min(touchStartPoint.current.x, touchEndPoint.current.x),
          y: Math.min(touchStartPoint.current.y, touchEndPoint.current.y),
          width: Math.min(Math.abs(touchStartPoint.current.x - touchEndPoint.current.x), Math.abs(touchStartPoint.current.y - touchEndPoint.current.y)),
          height: Math.min(Math.abs(touchStartPoint.current.x - touchEndPoint.current.x), Math.abs(touchStartPoint.current.y - touchEndPoint.current.y)),
          ...styleProps,
        }]);
    }
    if (markerTypeCtrl.new && drawType === MarkerShapes[2].name) {
      setSvgMarkerType([
        ...svgMarkerType,
        {
        id: `${drawType}-${Date.now()}`,
        name: drawType,
        x: Math.min(touchStartPoint.current.x, touchEndPoint.current.x),
        y: Math.min(touchStartPoint.current.y, touchEndPoint.current.y),
        width: Math.abs(touchStartPoint.current.x - touchEndPoint.current.x),
        height: Math.abs(touchStartPoint.current.y - touchEndPoint.current.y),
        ...styleProps,
      }]);
    }
    if (markerTypeCtrl.new && drawType === MarkerShapes[3].name) {
      const rx = Math.floor(Math.abs(touchStartPoint.current.x - touchEndPoint.current.x)/2);
      const cx = Math.min(touchStartPoint.current.x, touchEndPoint.current.x) + rx;
      const ry = Math.floor(Math.abs(touchStartPoint.current.y - touchEndPoint.current.y)/2);
      const cy = Math.min(touchStartPoint.current.y, touchEndPoint.current.y) + ry;
      setSvgMarkerType([
        ...svgMarkerType,
        {
        id: `${drawType}-${Date.now()}`,
        name: drawType,
        cx: cx,
        cy: cy,
        rx: Math.min(rx, ry),
        ry: Math.min(rx, ry),
        ...styleProps,
      }]);
    }
    if (markerTypeCtrl.new && drawType === MarkerShapes[4].name) {
      const rx = Math.floor(Math.abs(touchStartPoint.current.x - touchEndPoint.current.x)/2);
      const cx = Math.min(touchStartPoint.current.x, touchEndPoint.current.x) + rx;
      const ry = Math.floor(Math.abs(touchStartPoint.current.y - touchEndPoint.current.y)/2);
      const cy = Math.min(touchStartPoint.current.y, touchEndPoint.current.y) + ry;
      setSvgMarkerType([
        ...svgMarkerType,
        {
        id: `${drawType}-${Date.now()}`,
        name: drawType,
        cx: cx,
        cy: cy,
        rx: rx,
        ry: ry,
        ...styleProps,
      }]);
    }
    if (markerTypeCtrl.new && drawType === MarkerShapes[6].name) {
      setSvgMarkerType([
        ...svgMarkerType,
        {
        name: drawType,
        x1: touchStartPoint.current.x,
        y1: touchStartPoint.current.y,
        x2: touchEndPoint.current.x,
        y2: touchEndPoint.current.y,
        ...styleProps,
      }]);
    }
    // setTouchState(false);
  };

  return (
    <View>
      <ScrollView
        ref={scrollRef}
        horizontal
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
              onTouchStart={e => {if(drawType) onTouchStart(e)}}
              onTouchEnd={e => {if(drawType) onTouchEnd(e)}}
              onTouchMove={e => {if(drawType) onTouchMove(e)}}
              onTouchCancel={() => {
                if (drawType) {
                  setIsEnabledImageView(true);
                  setIsEnabled(true);
                }
              }}
              style={{
                ...styles.canvas,
                height: imageSize.height,
                width: imageSize.width,
              }}
            >
              <Svg height={imageData.height} width={imageData.width}>
                {
                  svgMarkerType.map((svgMarker, markerIndex) => {
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
                        {PatternComponent}
                        <Rect
                          key={`marker-rect-${markerIndex}`}
                          x={`${svgMarker.x}`}
                          y={`${svgMarker.y}`}
                          width={`${svgMarker.width}`}
                          height={`${svgMarker.height}`}
                          fill={`${svgMarker.pattern}` === 'true' ? `url(#marker-type-pattern)` : `${svgMarker.fill}`}
                          strokeWidth={`${svgMarker.strokeWidth}`}
                          stroke={`${svgMarker.stroke}`}
                        />
                      </View>
                      
                    }
                    if (svgMarker.name === MarkerShapes[3].name || svgMarker.name === MarkerShapes[4].name) {
                      return <View key={markerIndex}>
                        {PatternComponent}
                        <Ellipse
                          key={`marker-ellipse-${markerIndex}`}
                          cx={`${svgMarker.cx}`}
                          cy={`${svgMarker.cy}`}
                          rx={`${svgMarker.rx}`}
                          ry={`${svgMarker.ry}`}
                          stroke={`${svgMarker.stroke}`}
                          strokeWidth={`${svgMarker.strokeWidth}`}
                          fill={`${svgMarker.pattern}` === 'true' ? `url(#marker-type-pattern)` : `${svgMarker.fill}`}
                        />
                      </View>;
                    }
                    if (svgMarker.name === MarkerShapes[5].name) {
                      return <View key={markerIndex}>
                        {PatternComponent}
                        <Polygon
                          key={`marker-polygon-${markerIndex}`}
                          points={`${svgMarker.points}`}
                          stroke={`${svgMarker.stroke}`}
                          strokeWidth={`${svgMarker.strokeWidth}`}
                          fill={`${svgMarker.pattern}` === 'true' ? `url(#marker-type-pattern)` : `${svgMarker.fill}`}
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
              setMarkerTypeCtrl({
                ...markerTypeCtrl,
                new: !markerTypeCtrl.new,
                view: false,
              });
            }}
            style={{
              ...styles.editButton1(colors),
              backgroundColor: markerTypeCtrl.new ? colors.colorButton : '#FFFFFF',
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
            }}
            text={i18nValues.t("setting_labels.add_marker_type")}
            textStyle={{color: markerTypeCtrl.new ? '#FFFFFF' : colors.colorButton}}
          />
          <CustomButton
            onPress={() => {
              setMarkerTypeCtrl({
                ...markerTypeCtrl,
                new: false,
                view: !markerTypeCtrl.view,
              });
            }}
            style={{
              ...styles.editButton1(colors),
              backgroundColor: markerTypeCtrl.view ? colors.colorButton : '#FFFFFF',
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
            }}
            text={i18nValues.t("setting_labels.view_marker_type")}
            textStyle={{color: markerTypeCtrl.view ? '#FFFFFF' : colors.colorButton}}
          />
        </View>
        {
          markerTypeCtrl.new && (
            <>
              <View style={{marginHorizontal: 20, marginVertical: 5}}>
                <View style={{alignItems: 'center', marginVertical: 10}}>
                  <Text style={{textAlign: 'center'}}>{i18nValues.t("warnings.marker_types")}</Text>
                </View>
                <Text style={{...fonts.values, color: fonts.labels.color}}>{i18nValues.t("setting_labels.new_marker_type_name")}</Text>
                <TextInput
                  value={styleProps.title || ''}
                  style={{
                    ...styles.textBox,
                    backgroundColor: colors.card,
                    borderColor: colors.card,
                    ...fonts.values,
                  }}
                  onChangeText={e => {
                    setStyleProps({
                      ...styleProps,
                      title: e
                    });
                  }}
                />
              </View>
              <View style={{marginHorizontal: 20, marginVertical: 5}}>
                <Text style={{...fonts.values, color: fonts.labels.color}}>{i18nValues.t("setting_labels.use_default_function")}</Text>
                <View style={{flexDirection: 'row-reverse', alignItems: 'center', marginVertical: 5}}>
                  <Switch
                    color={colors.colorButton}
                    value={useDrawingFunc}
                    onValueChange={() => setUseDrawingFunc(!useDrawingFunc)}
                  />
                  <Text style={{flex: 1, marginHorizontal: 10}}>
                    {i18nValues.t("setting_labels.sel_draw_func_desc")}
                  </Text>
                </View>
              </View>
              
              <View style={{marginHorizontal: 20}}>
                <Text style={{...fonts.values, color: fonts.labels.color}}>{i18nValues.t("setting_labels.sel_draw_func")}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap'}}>
                  {
                    MarkerShapes.map((shape, shapeIndex) => {
                      if (shapeIndex !== 1 && shapeIndex !== 3) {
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
                    (drawType === MarkerShapes[0].name) ? i18nValues.t("warnings.pen_drawing_desc") : ''
                  }
                  {
                    (drawType === MarkerShapes[2].name) ? i18nValues.t("warnings.rect_drawing_desc") : ''
                  }
                  {
                    (drawType === MarkerShapes[4].name) ? i18nValues.t("warnings.ellipse_drawing_desc") : ''
                  }
                  {
                    (drawType === MarkerShapes[5].name) ? i18nValues.t("warnings.polygon_drawing_desc") : ''
                  }
                  {
                    (drawType === MarkerShapes[6].name) ? i18nValues.t("warnings.line_drawing_desc") : ''
                  }
                  {
                    (drawType === MarkerShapes[7].name) ? i18nValues.t("warnings.text_drawing_desc") : ''
                  }
                </Text>
                {
                  (drawType === MarkerShapes[7].name) && (
                    <>
                      <Text style={{...fonts.values, color: fonts.labels.color}}>{i18nValues.t("setting_labels.draw_text")}</Text>
                      <TextInput
                        value={textProps.text || ''}
                        style={{
                          ...styles.textBox,
                          backgroundColor: colors.card,
                          borderColor: colors.card,
                          ...fonts.values,
                        }}
                        onChangeText={e => {
                          setTextProps({
                            ...textProps,
                            text: e
                          });
                        }}
                      />
                      <Text style={{...fonts.values, color: fonts.labels.color, marginTop: 5}}>{i18nValues.t("setting_labels.font_size")}</Text>
                      <TextInput
                        value={`${newFontSize}` || ''}
                        style={{
                          ...styles.textBox,
                          backgroundColor: colors.card,
                          borderColor: colors.card,
                          ...fonts.values,
                        }}
                        keyboardType='numeric'
                        onChangeText={e => {
                          setNewFontSize(e);
                        }}
                        onBlur={() => {
                          if (newFontSize && parseInt(newFontSize)) {
                            setTextProps({
                              ...textProps,
                              fontSize: parseInt(newFontSize, 10)
                            });
                          } else {
                            setTextProps({
                              ...textProps,
                              fontSize: 1
                            });
                          }
                        }}
                      />
                    </>
                  )
                }
                {
                  (drawType !== MarkerShapes[7].name) && (
                    <>
                      <Text style={{...fonts.values, color: fonts.labels.color, marginTop: 5}}>{i18nValues.t("setting_labels.stroke_width")}</Text>
                      <TextInput
                        value={`${newStrokeWidth}` || ''}
                        style={{
                          ...styles.textBox,
                          backgroundColor: colors.card,
                          borderColor: colors.card,
                          ...fonts.values,
                        }}
                        keyboardType='numeric'
                        onChangeText={e => {
                          setNewStrokeWidth(e);
                        }}
                        onBlur={() => {
                          if (newStrokeWidth && parseInt(newStrokeWidth)) {
                            setStyleProps({
                              ...styleProps,
                              strokeWidth: parseInt(newStrokeWidth, 10)
                            });
                          } else {
                            setStyleProps({
                              ...styleProps,
                              strokeWidth: 1,
                            });
                          }
                        }}
                      />
                    </>
                  )
                }
                
                {
                  (drawType === MarkerShapes[2].name || drawType === MarkerShapes[4].name || drawType === MarkerShapes[5].name) && (
                    <View style={{marginTop: 5}}>
                      <Text style={{...fonts.values, color: fonts.labels.color}}>{i18nValues.t("setting_labels.use_pattern")}</Text>
                      <View style={{flexDirection: 'row-reverse', alignItems: 'center', marginVertical: 5}}>
                        <Switch
                          color={colors.colorButton}
                          value={styleProps.pattern}
                          onValueChange={() => setStyleProps({...styleProps, pattern: !styleProps.pattern})}
                        />
                        <Text style={{flex: 1, marginHorizontal: 10}}>
                          {i18nValues.t("setting_labels.use_pattern_desc")}
                        </Text>
                      </View>
                    </View>
                  ) 
                }
              </View>
              {
                svgMarkerType.length > 0 && (
                  <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <CustomButton
                      onPress={() => {
                        const metaData = {...element.meta};
                        const tempMarkers = [...metaData.markers];
                        updateFormData(
                          index,
                          {
                            ...element,
                            meta: {
                              ...metaData,
                              markers: [
                                ...tempMarkers,
                                {
                                  id: `marker-type-${Date.now()}`,
                                  name: styleProps.title,
                                  data: svgMarkerType,
                                  minPoint: minPoint.current,
                                  maxPoint: maxPoint.current,
                                  useDrawingFunc,
                                  drawType
                                }
                              ]
                            }
                          }
                        );
                        minPoint.current = {...minPoint.current, x: -1, y: -1};
                        maxPoint.current = {...maxPoint.current, x: -1, y: -1};
                        setSvgMarkerType([]);
                      }}
                      style={{
                        ...styles.editButton1(colors),
                        backgroundColor: colors.colorButton,
                        borderRadius: 5,
                        width: 80,
                      }}
                      text="Add"
                      textStyle={{color: '#FFFFFF'}}
                    />              
                    <CustomButton
                      onPress={() => {
                        minPoint.current = {...minPoint.current, x: -1, y: -1};
                        maxPoint.current = {...maxPoint.current, x: -1, y: -1};
                        setSvgMarkerType([]);
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
                )
              }
            </>
          )
        }
        {
          markerTypeCtrl.view && (
            <View style={styles.dlgContent}>
              {
                svgMarkerTypes.map((marker, markerTypeIndex) => {
                  const markerWidth = marker.maxPoint.x - marker.minPoint.x;
                  const markerHeight = marker.maxPoint.y - marker.minPoint.y;
                  const svgSize = 40;
                  var svgWidth = svgSize;
                  var svgHeight = svgSize;
                  var scaleX = 1;
                  var scaleY = 1;
                  var isNotTransform = false;
                  if (markerWidth <= svgSize && markerHeight <= svgSize) {
                    svgHeight = markerHeight;
                    svgWidth = markerWidth;
                    isNotTransform = true;
                  } else {
                    if (markerWidth >= markerHeight) {
                      svgHeight = Math.floor(svgSize * markerHeight / markerWidth);
                    } else {
                      svgWidth = Math.floor(svgSize * markerWidth / markerHeight);
                    }
                    isNotTransform = false;
                  }
                  scaleX = svgWidth / markerWidth;
                  scaleY = svgHeight / markerHeight;
                  return <TouchableOpacity
                    key={markerTypeIndex}
                    style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 2, backgroundColor: selectedMarkerType.id === marker.id ? 'grey' : colors.background, padding: 5, borderRadius: 10}}
                    onPress={() => {
                      setSelectedMarkerType(marker);
                      setSvgMarkerType(marker.data);
                    }}>
                    <View style={{height: svgSize, width: svgSize, alignItems: 'center', justifyContent: 'center', marginRight: 10}}>
                      <Svg height={svgHeight} width={svgWidth}>
                        <G transform={`translate(${-marker.minPoint.x * scaleX}, ${-marker.minPoint.y * scaleY}) scale(${isNotTransform ? 1 : scaleX} ${isNotTransform ? 1 : scaleY})`}>
                          {
                            marker.data.map((svgMarker, svgMarkerIndex) => {
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
                                return <>
                                  {PatternComponent}
                                  <Rect
                                    key={`marker-rect-${svgMarkerIndex}`}
                                    x={`${svgMarker.x}`}
                                    y={`${svgMarker.y}`}
                                    width={`${svgMarker.width}`}
                                    height={`${svgMarker.height}`}
                                    fill={`${svgMarker.pattern}` === 'true' ? `url(#marker-type-pattern)` : `${svgMarker.fill}`}
                                    strokeWidth={`${svgMarker.strokeWidth}`}
                                    stroke={`${svgMarker.stroke}`}
                                  />
                                </>
                                
                              }
                              if (svgMarker.name === MarkerShapes[3].name || svgMarker.name === MarkerShapes[4].name) {
                                return <>
                                  {PatternComponent}
                                  <Ellipse
                                    key={`marker-ellipse-${svgMarkerIndex}`}
                                    cx={`${svgMarker.cx}`}
                                    cy={`${svgMarker.cy}`}
                                    rx={`${svgMarker.rx}`}
                                    ry={`${svgMarker.ry}`}
                                    stroke={`${svgMarker.stroke}`}
                                    strokeWidth={`${svgMarker.strokeWidth}`}
                                    fill={`${svgMarker.pattern}` === 'true' ? `url(#marker-type-pattern)` : `${svgMarker.fill}`}
                                  />
                                </>;
                              }
                              if (svgMarker.name === MarkerShapes[5].name) {
                                return <>
                                  {PatternComponent}
                                  <Polygon
                                    key={`marker-polygon-${svgMarkerIndex}`}
                                    points={`${svgMarker.points}`}
                                    stroke={`${svgMarker.stroke}`}
                                    strokeWidth={`${svgMarker.strokeWidth}`}
                                    fill={`${svgMarker.pattern}` === 'true' ? `url(#marker-type-pattern)` : `${svgMarker.fill}`}
                                  />
                                </>;
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
                        </G>
                      </Svg>
                    </View>
                    <Text>{marker.name}</Text>
                    <IconButton
                      icon={'delete-outline'}
                      iconColor={colors.colorButton}
                      size={18}
                      disabled={selectedMarkerType.id !== marker.id}
                      onPress={() => {
                        const metaData = {...element.meta};
                        const tempMarkers = [...metaData.markers];
                        tempMarkers.splice(markerTypeIndex, 1);
                        updateFormData(
                          index,
                          {
                            ...element,
                            meta: {
                              ...metaData,
                              markers: [...tempMarkers]
                            }
                          }
                        );
                      }}
                      style={styles.actionButton}
                    />
                  </TouchableOpacity>
                })
              }
            </View>
          )
        }
      </View>

      {/* <View style={styles.linkButton}>
        <Title
          name="Hyperlinks"
          onPress={() => setVisible(!visible)}
          visible={visible}
        />
        {visible && (
          <>
            {svgDatas.map((svgData, i) => {
              return (
                <OpenURLButton
                  key={i}
                  url={svgData.link}
                  name={svgData.name}
                  svg={svgData.svg}
                  index={i}
                />
              );
            })}
          </>
        )}
      </View> */}
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
  textBox: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 3,
    paddingLeft: 10,
    marginTop: 5,
  },
  dlgContent: {
    marginHorizontal: 20,
  },
});

export default MarkerTypes;
