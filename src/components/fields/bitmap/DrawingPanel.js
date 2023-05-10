import {
  Canvas,
  ExtendedTouchInfo,
  ICanvas,
  Path,
  Skia,
  SkiaView,
  TouchInfo,
  useDrawCallback,
  useTouchHandler,
  ImageSVG,
} from '@shopify/react-native-skia';
import React, {useCallback, useContext, useRef, useState} from 'react';
import {
  LayoutChangeEvent,
  SafeAreaView,
  useWindowDimensions,
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import useDrawingStore from '../../../store/bitmapStore';
import history from './history';
import Header from './header';
import formStore from '../../../store/formStore';
import utils from './utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';
import CustomButton from '../../../common/CustomButton';

const shapes = [
  {name: 'draw', icon: 'draw'},
  {name: 'square', icon: 'square-outline'},
  {name: 'rectangle', icon: 'rectangle-outline'},
  {name: 'circle', icon: 'circle-outline'},
  {name: 'ellipse', icon: 'ellipse-outline'},
  {name: 'polygon', icon: 'pentagon-outline'},
  {name: 'line', icon: 'slash-forward'},
  {name: 'text', icon: 'alphabetical-variant'},
];

const DrawingPanel = ({svgPosition}) => {
  const {colors} = useTheme();
  // Is user touching the screen
  const touchState = useRef(false);
  // Instance of canvas for imperative access
  const canvas = useRef();
  const minPosition = useRef({x: -1, y: -1});
  const maxPosition = useRef({x: 0, y: 0});
  // The current path which the user is drawing. The value is reset when finger is raised from screen
  const currentPath = useRef();

  // Array of completed paths from global state
  const completedPaths = useDrawingStore(state => state.completedPaths);
  // Stroke value from global state
  const stroke = useDrawingStore(state => state.stroke);
  const updateFormData = formStore(state => state.updateFormData);
  const [drawType, setDrawType] = useState(shapes[0].name);
  const imageData = useDrawingStore(state => state.bitmapImageData);
  const shapeData = useRef();
  const svgData = useDrawingStore.getState().svgData;
  const setSVGData = useDrawingStore.getState().setSVGData;
  const [polygonData, setPolygonData] = useState([]);
  const [drawingPolygon, setDrawingPolygon] = useState(false);

  const onDrawingStart = useCallback(
    touchInfo => {
      const {x, y} = touchInfo;
      console.log(drawType);
      if (drawType === shapes[0].name) {
        if (currentPath.current) {
          return;
        }
        currentPath.current = {
          path: Skia.Path.Make(),
          paint: stroke.copy(),
        };
  
        touchState.current = true;
        currentPath.current.path?.moveTo(x, y);
  
        if (currentPath.current) {
          canvas.current?.drawPath(
            currentPath.current.path,
            currentPath.current.paint,
          );
        }
      }
      if (drawType === shapes[1].name || drawType === shapes[2].name || drawType === shapes[3].name || drawType === shapes[4].name || drawType === shapes[6].name) {
        shapeData.current = {
          startPoint: {x: x, y: y},
        }
      }
      if (drawType === shapes[5].name) {
        if (!drawingPolygon) setDrawingPolygon(true);
        const tempPolygonData = JSON.parse(JSON.stringify(polygonData));
        tempPolygonData.push({x, y});
        setPolygonData(tempPolygonData);
        // setPolygonData([...polygonData, {x, y}]);
        console.log(polygonData, '-------------------------')
      }
    },
    [stroke, drawType, JSON.stringify(polygonData)],
  );

  const onDrawingActive = useCallback(touchInfo => {
    const {x, y} = touchInfo;
    if (drawType === shapes[0].name) {
      if (!currentPath.current?.path) {
        return;
      }
      if (touchState.current) {
        if (minPosition.current.x === -1) {
          minPosition.current = {
            ...minPosition.current,
            x: x,
          };
        }
        if (minPosition.current.y === -1) {
          minPosition.current = {
            ...minPosition.current,
            y: y,
          };
        }
        if (x > maxPosition.current.x) {
          maxPosition.current = {
            ...maxPosition.current,
            x: x,
          };
        }
        if (x < minPosition.current.x) {
          minPosition.current = {
            ...minPosition.current,
            x: x >= 0 ? x : 0,
          };
        }
        if (y > maxPosition.current.y) {
          maxPosition.current = {
            ...maxPosition.current,
            y: y,
          };
        }
        if (y < minPosition.current.y) {
          minPosition.current = {
            ...minPosition.current,
            y: y >= 0 ? y : 0,
          };
        }
        currentPath.current.path.lineTo(x, y);
        if (currentPath.current) {
          canvas.current?.drawPath(
            currentPath.current.path,
            currentPath.current.paint,
          );
        }
      }
    }
    if (drawType === shapes[1].name || drawType === shapes[2].name || drawType === shapes[3].name || drawType === shapes[4].name || drawType === shapes[6].name) {
      if (touchState.current) {
        shapeData.current = {
          ...shapeData.current,
          endPoint: {x: x, y: y},
        }
      }
    }
  }, [drawType]);

  const onDrawingFinished = useCallback((touchInfo) => {
    const {x, y} = touchInfo;
    if (touchState.current) {
      if (minPosition.current.x === -1) {
        minPosition.current = {
          ...minPosition.current,
          x: x,
        };
      }
      if (minPosition.current.y === -1) {
        minPosition.current = {
          ...minPosition.current,
          y: y,
        };
      }
      if (x > maxPosition.current.x) {
        maxPosition.current = {
          ...maxPosition.current,
          x: x,
        };
      }
      if (x < minPosition.current.x) {
        minPosition.current = {
          ...minPosition.current,
          x: x >= 0 ? x : 0,
        };
      }
      if (y > maxPosition.current.y) {
        maxPosition.current = {
          ...maxPosition.current,
          y: y,
        };
      }
      if (y < minPosition.current.y) {
        minPosition.current = {
          ...minPosition.current,
          y: y >= 0 ? y : 0,
        };
      }
    }
    if (drawType === shapes[0].name) {
      updatePaths();
      // reset the path. prepare for the next draw
      currentPath.current = null;
    }
    if (drawType === shapes[1].name) {
      shapeData.current = {
        startPoint: {x: Math.min(x, shapeData.current.startPoint.x), y: Math.min(y, shapeData.current.startPoint.y)},
        endPoint: {x: Math.max(x, shapeData.current.startPoint.x), y: Math.max(y, shapeData.current.startPoint.y)}
      }
      const width = shapeData.current.endPoint.x - shapeData.current.startPoint.x;
      const height = shapeData.current.endPoint.y - shapeData.current.startPoint.y;
      if (width > height) {
        shapeData.current = {
          ...shapeData.current,
          endPoint: {x: shapeData.current.startPoint.x + height, y: shapeData.current.endPoint.y},
        }
      } else {
        shapeData.current = {
          ...shapeData.current,
          endPoint: {x: shapeData.current.endPoint.x, y: shapeData.current.startPoint.y + width},
        }
      }
      setSVGData({...svgData, rectangles: [...svgData.rectangles, shapeData.current]});
    }
    if (drawType === shapes[2].name) {
      shapeData.current = {
        startPoint: {x: Math.min(x, shapeData.current.startPoint.x), y: Math.min(y, shapeData.current.startPoint.y)},
        endPoint: {x: Math.max(x, shapeData.current.startPoint.x), y: Math.max(y, shapeData.current.startPoint.y)}
      }
      setSVGData({...svgData, rectangles: [...svgData.rectangles, shapeData.current]});
    }
    if (drawType === shapes[3].name) {
      shapeData.current = {
        startPoint: {x: Math.min(x, shapeData.current.startPoint.x), y: Math.min(y, shapeData.current.startPoint.y)},
        endPoint: {x: Math.max(x, shapeData.current.startPoint.x), y: Math.max(y, shapeData.current.startPoint.y)}
      }
      const width = shapeData.current.endPoint.x - shapeData.current.startPoint.x;
      const height = shapeData.current.endPoint.y - shapeData.current.startPoint.y;
      if (width > height) {
        shapeData.current = {
          ...shapeData.current,
          endPoint: {x: shapeData.current.startPoint.x + height, y: shapeData.current.endPoint.y},
        }
      } else {
        shapeData.current = {
          ...shapeData.current,
          endPoint: {x: shapeData.current.endPoint.x, y: shapeData.current.startPoint.y + width},
        }
      }
      setSVGData({...svgData, ellipses: [...svgData.ellipses, shapeData.current]});
    }
    if (drawType === shapes[4].name) {
      shapeData.current = {
        startPoint: {x: Math.min(x, shapeData.current.startPoint.x), y: Math.min(y, shapeData.current.startPoint.y)},
        endPoint: {x: Math.max(x, shapeData.current.startPoint.x), y: Math.max(y, shapeData.current.startPoint.y)}
      }
      setSVGData({...svgData, ellipses: [...svgData.ellipses, shapeData.current]});
    }
    if (drawType === shapes[6].name) {
      shapeData.current = {
        ...shapeData.current,
        endPoint: {x: x, y: y}
      }
      setSVGData({...svgData, lines: [...svgData.lines, shapeData.current]});
    }
    // set touchState to false
    touchState.current = false;
    shapeData.current = {};
    svgPosition({
      minPosition: minPosition.current,
      maxPosition: maxPosition.current,
    });
  }, [drawType, JSON.stringify(svgData)]);

  const updatePaths = () => {
    if (!currentPath.current) {
      return;
    }

    // Update history (will get to this later in the blog)
    history.push(currentPath.current);

    const originPaths = [...svgData.paths];
    originPaths.push({
      path: currentPath.current?.path.copy(),
      paint: currentPath.current?.paint.copy(),
      // The current color of the stroke
      color: useDrawingStore.getState().color,
    });
  
    setSVGData({...svgData, paths: originPaths});
  };

  const touchHandler = useTouchHandler({
    onActive: onDrawingActive,
    onStart: onDrawingStart,
    onEnd: onDrawingFinished,
  }, [drawType]);

  const onDraw = useDrawCallback((_canvas, info) => {
    // if (addState) {
    touchHandler(info.touches);
    // if (!canvas.current) {
    useDrawingStore.getState().setCanvasInfo({
      width: info.width,
      height: info.height,
    });

    canvas.current = _canvas;
    // }
    // }
  }, [drawType]);

  const onSave = () => {
    const element = {...imageData.element};
    const metaData = {
      ...element.meta,
      paths: [...element.meta.paths, ...completedPaths],
    };
    const fieldIndex = useDrawingStore.getState().bitmapImageData.index;
    updateFormData(fieldIndex, {...element, meta: metaData});
  };

  return (
    <SafeAreaView style={styles.panel}>
      <View style={{flexDirection: 'row'}}>
        {
          shapes.map((shape, shapeIndex) => <TouchableOpacity key={shapeIndex} style={{flex: 1, alignItems: 'center', paddingVertical: 5, borderWidth: 1, borderColor: colors.colorButton, marginTop: 5, backgroundColor: drawType === shape.name ? colors.colorButton : '#FFFFFF'}} onPress={() => {setDrawType(shape.name)}}>
            <Icon name={shape.icon} size={18} color={drawType === shape.name ? '#FFFFFF' : colors.colorButton} />
          </TouchableOpacity>)
        }
      </View>
      <Header onSave={onSave} />
      <View
        style={{
          ...styles.panelView,
          height: imageData.height,
          width: imageData.width,
        }}>
        {imageData.imageUri && (
          <Image
            style={{width: imageData.width, height: imageData.height}}
            source={{uri: imageData.imageUri}}
          />
        )}
        <SkiaView
          onDraw={onDraw}
          style={{
            ...styles.skiaView,
            height: imageData.height,
            width: imageData.width,
          }}
        />
        <Canvas
          style={{
            ...styles.canvas,
            height: imageData.height,
            width: imageData.width,
          }}>
          {/* {completedPaths.length > 0
            ? completedPaths.map((path, index) => (
                <Path
                  key={index}
                  path={path.path}
                  //@ts-ignore
                  paint={{current: path.paint}}
                />
              ))
            : null} */}
          {/* {completedPaths.length > 0 && (
            <ImageSVG
              svg={Skia.SVG.MakeFromString(
                utils.makeImageSvgFromPaths(completedPaths, {
                  minPosition: {x: 0, y: 0},
                  maxPosition: {x: imageData.width, y: imageData.height},
                }))}
              x={0}
              y={0}
              width={imageData.width}
              height={imageData.height}
            />
          )} */}
          <ImageSVG
            svg={Skia.SVG.MakeFromString(
              utils.makeImageSvgFromNewData(polygonData, {
                minPosition: {x: 0, y: 0},
                maxPosition: {x: imageData.width, y: imageData.height},
              }))}
            x={0}
            y={0}
            width={imageData.width}
            height={imageData.height}
          />
          <ImageSVG
            svg={Skia.SVG.MakeFromString(
              utils.makeImageSvgFromData(svgData, {
                minPosition: {x: 0, y: 0},
                maxPosition: {x: imageData.width, y: imageData.height},
              }))}
            x={0}
            y={0}
            width={imageData.width}
            height={imageData.height}
          />
        </Canvas>
      </View>
      {drawType === shapes[5].name && drawingPolygon && <CustomButton
        onPress={() => {
          const polygons = JSON.parse(JSON.stringify(svgData.polygons));
          polygons.push(polygonData);
          setSVGData({...svgData, polygons});
          setPolygonData([]);
          setDrawingPolygon(false);
        }}
        style={styles.button(colors)}
        textStyle={{color: colors.colorButton}}
        text="Finish to draw polygon"
      />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  panel: {
    width: '100%',
    paddingHorizontal: 10,
  },
  panelView: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 1,
    marginTop: 10,
    alignSelf: 'center',
  },
  skiaView: {
    width: '100%',
    zIndex: 10,
    position: 'absolute',
  },
  canvas: {
    width: '100%',
    position: 'absolute',
  },
  button: colors => ({
    width: '80%',
    height: 30,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: colors.colorButton,
    alignSelf: 'center',
    marginTop: 10
  }),
});

export default DrawingPanel;
