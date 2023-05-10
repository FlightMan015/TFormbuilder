import React, {useState} from 'react';
import {StyleSheet, ScrollView, Text, View, TouchableOpacity, TextInput} from 'react-native';
import {Dialog, useTheme} from 'react-native-paper';
import JSONTree from 'react-native-json-tree';
import TextButton from '../common/TextButton';
import formStore from '../store/formStore';
import useDrawingStore from '../store/bitmapStore';
import { Checkbox } from 'react-native-paper';
import {Svg, Rect, Ellipse, Circle, Polygon, Path, Polyline, Defs, Use, G, Line, Text as SVGText, Pattern} from 'react-native-svg';
import ColorDlg from './ColorDlg';
import { useEffect } from 'react';

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
  fill: "#FF0000FF",
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
    <Line x1="0" y1="10" x2="10" y2="0" strokeWidth="2" stroke='#FF0000' />
  </Pattern>
</Defs>;

const BitmapMarkerAddDlg = () => {
  const {colors, fonts} = useTheme();
	const visibleJsonDlg = formStore(state => state.visibleMarkerAddDlg);
	const setVisibleJsonDlg = formStore(state => state.setVisibleMarkerAddDlg);
	const formData = formStore(state => state.formData);
  const formValue = formStore(state => state.formValue);
  const setFormValue = formStore(state => state.setFormValue);
  const i18nValues = formStore(state => state.i18nValues);
  const imageData = useDrawingStore.getState().bitmapImageData;
  const selectedMarkerType = useDrawingStore(state => state.selectedMarkerType);
  const setMarkerTypeToAdd = useDrawingStore(state => state.setMarkerTypeToAdd);
  const [markerIdToAdd, setMarkerIdToAdd] = useState({});
  const element = imageData?.element ? {...imageData.element} : null;
  const [dlgState, setDlgState] = useState({
    strokeColor: false,
    strokeWidth: false,
    borderOpacity: false,
    fillColor: false,
    fillOpacity: false,
  });
  const [styleProps, setStyleProps] = useState(defaultStypeProps);

  useEffect(() => {
    setStyleProps(defaultStypeProps);
  }, [JSON.stringify(markerIdToAdd)])

  useEffect(() => {
    setMarkerIdToAdd(selectedMarkerType);
  }, [JSON.stringify(selectedMarkerType)])

  const hideDialog = () => {
    setVisibleJsonDlg(false);
  };

  return (
    <Dialog
      visible={visibleJsonDlg}
      onDismiss={hideDialog}
      style={{...styles.dialog, backgroundColor: colors.card}}>
    	<Text style={{...fonts.headings, marginBottom: 10}}>{i18nValues.t("setting_labels.add_marker")}</Text>
			<ScrollView style={styles.dlgContent}>
				{
          element?.meta.markers.map((marker, index) => {
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
            return (
              <>
                <View key={index} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5}}>
                  <View style={{height: svgSize, width: svgSize, alignItems: 'center', justifyContent: 'center'}}>
                    <Svg height={svgHeight} width={svgWidth}>
                      <G transform={`translate(${-marker.minPoint.x * scaleX}, ${-marker.minPoint.y * scaleY}) scale(${isNotTransform ? 1 : scaleX} ${isNotTransform ? 1 : scaleY})`}>
                        {
                          marker.data.map((svgMarker, index) => {
                            if (svgMarker.name === MarkerShapes[0].name && svgMarker.pathData.length > 0) {
                              return svgMarker.pathData.map((item, index) => {
                                return <Path
                                  key={`marker-path-${index}`}
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
                              return <View key={index}>
                                {PatternComponent}
                                <Rect
                                  key={`marker-rect-${index}`}
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
                              return <View key={index}>
                                {PatternComponent}
                                <Ellipse
                                  key={`marker-ellipse-${index}`}
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
                              return <View key={index}>
                                {PatternComponent}
                                <Polygon
                                  key={`marker-polygon-${index}`}
                                  points={`${svgMarker.points}`}
                                  stroke={`${svgMarker.stroke}`}
                                  strokeWidth={`${svgMarker.strokeWidth}`}
                                  fill={`${svgMarker.pattern}` === 'true' ? `url(#marker-type-pattern)` : `${svgMarker.fill}`}
                                />
                              </View>;
                            }
                            if (svgMarker.name === MarkerShapes[6].name) {
                              return <Line
                                key={`marker-line-${index}`}
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
                                  key={`marker-text-${index}`}
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
                  <Checkbox
                    status={markerIdToAdd.id === marker.id ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setMarkerIdToAdd({...marker})
                    }}
                    color={colors.colorButton}
                    uncheckedColor={colors.colorButton}
                  />
                </View>
                {
                  markerIdToAdd.id === marker.id && marker.useDrawingFunc && (
                    <>
                      <View style={{flexDirection: 'row', marginVertical: 10, paddingLeft: 10}}>
                        <View style={{flex: 1, paddingRight: 5, alignItems: 'center'}}>
                          <Text style={{...fonts.values, color: fonts.labels.color, marginBottom: 5}}>{i18nValues.t("setting_labels.stroke_color")}</Text>
                          <TouchableOpacity
                            style={{width: 20, height: 20, backgroundColor: styleProps.stroke.substring(0, 7), borderWidth: 1, borderColor: 'grey', marginLeft: 10}}
                            onPress={() => setDlgState({...dlgState, strokeColor: true})}
                          />
                        </View>
                        <View style={{flex: 1, paddingRight: 5, alignItems: 'center'}}>
                          <Text style={{...fonts.values, color: fonts.labels.color, marginBottom: 5}}>{i18nValues.t("setting_labels.stroke_width")}</Text>
                          <TextInput
                            value={`${styleProps.strokeWidth}`}
                            keyboardType='numeric'
                            onChangeText={newText => {
                              setStyleProps({...styleProps, strokeWidth: newText});
                            }}
                            style={{width: '100%', backgroundColor: colors.background, borderRadius: 3, borderWidth: 1, borderColor: 'grey', paddingLeft: 10, paddingVertical: 0, color: fonts.values.color}}
                          />
                        </View>
                        <View style={{flex: 1, alignItems: 'center'}}>
                          <Text style={{...fonts.values, color: fonts.labels.color, marginBottom: 5}}>{i18nValues.t("setting_labels.fill_color")}</Text>
                          <TouchableOpacity
                            style={{width: 20, height: 20, backgroundColor: styleProps.fill.substring(0, 7), borderWidth: 1, borderColor: 'grey', marginLeft: 10}}
                            onPress={() => setDlgState({...dlgState, fillColor: true})}
                          />
                        </View>
                      </View>
                      <Text style={{marginLeft: 20, marginTop: 5}}>
                      {
                        (marker.drawType === MarkerShapes[0].name) ? i18nValues.t("warnings.pen_drawing_desc") : ''
                      }
                      {
                        (marker.drawType === MarkerShapes[2].name) ? i18nValues.t("warnings.rect_drawing_desc") : ''
                      }
                      {
                        (marker.drawType === MarkerShapes[4].name) ? i18nValues.t("warnings.ellipse_drawing_desc") : ''
                      }
                      {
                        (marker.drawType === MarkerShapes[5].name) ? i18nValues.t("warnings.polygon_drawing_desc") : ''
                      }
                      {
                        (marker.drawType === MarkerShapes[6].name) ? i18nValues.t("warnings.line_drawing_desc") : ''
                      }
                      {
                        (marker.drawType === MarkerShapes[7].name) ? i18nValues.t("warnings.text_drawing_desc") : ''
                      }
                      </Text>
                    </>
                  )
                }
                {
                  markerIdToAdd.id === marker.id && !marker.useDrawingFunc && (
                    <Text style={{marginLeft: 20, marginTop: 5}}>
                      {i18nValues.t("warnings.point_marker")}
                    </Text>
                  )
                }
              </>
              
            );
          })
        }
        {
          element?.meta.markers.length === 0 && (
            <Text style={{alignSelf: 'center', marginVertical: 10, textAlign: 'center', paddingHorizontal: 20, ...fonts.values}}>
              {i18nValues.t("warnings.no_marker_type")}
            </Text>
          )
        }
			</ScrollView>
      <ColorDlg
        title={i18nValues.t("setting_labels.border_color")}
        visibleDlg={dlgState.strokeColor}
        setVisibleDlg={() => setDlgState({...dlgState, strokeColor: false})}
        selectColor={newColor => {
          setStyleProps({...styleProps, stroke: `${newColor}${styleProps.stroke.substring(7, 9)}`});
        }}
        color={styleProps.stroke.substring(0, 7)}
      />
      <ColorDlg
        title={i18nValues.t("setting_labels.fill_color")}
        visibleDlg={dlgState.fillColor}
        setVisibleDlg={() => setDlgState({...dlgState, fillColor: false})}
        selectColor={newColor => {
          setStyleProps({...styleProps, fill: `${newColor}${styleProps.fill.substring(7, 9)}`})
        }}
        color={styleProps.fill.substring(0, 7)}
      />
			<TextButton
				text={i18nValues.t("setting_labels.ok")}
				onPress={() => {
          const markerData = {...markerIdToAdd, ...styleProps}
          setMarkerTypeToAdd(markerData);
          hideDialog();
        }}
				textStyle={styles.actionButtonText}
				style={styles.actionButton(colors)}
			/>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  dlgContent: {
    paddingBottom: 0,
    maxHeight: 400,
  },
  dlgTitle: {
    fontFamily: 'PublicSans-Bold',
    fontSize: 18,
  },
  dlgAction: {
    paddingRight: 30,
  },
  dragItem: {
    width: '100%',
    maxHeight: 300,
  },
	dialog: {
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 0,
    paddingHorizontal:  20,
  },
	actionButtonText: {
    color: '#FFFFFF',
  },
  actionButton: colors => ({
    backgroundColor: colors.colorButton,
    borderRadius: 10,
    width: 100,
    paddingVertical: 10,
		marginVertical: 10,
		alignSelf: 'center',
  }),
});

export default BitmapMarkerAddDlg;