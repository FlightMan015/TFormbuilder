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
} from 'react-native';
import useDrawingStore from '../../../store/bitmapStore';
import history from './history';
import Header from './header';
import formStore from '../../../store/formStore';
import utils from './utils';

const DrawingPanel = ({svgPosition}) => {
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


  const imageData = useDrawingStore(state => state.bitmapImageData);

  const onDrawingStart = useCallback(
    touchInfo => {
      if (currentPath.current) {
        return;
      }
      const {x, y} = touchInfo;
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
    },
    [stroke],
  );

  const onDrawingActive = useCallback(touchInfo => {
    const {x, y} = touchInfo;
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
  }, []);

  const onDrawingFinished = useCallback(() => {
    updatePaths();
    // reset the path. prepare for the next draw
    currentPath.current = null;
    // set touchState to false
    touchState.current = false;
    svgPosition({
      minPosition: minPosition.current,
      maxPosition: maxPosition.current,
    });
  }, [completedPaths.length]);

  const updatePaths = () => {
    if (!currentPath.current) {
      return;
    }
    const tempCompletedPaths = useDrawingStore.getState().completedPaths;
    // Copy paths in global state
    const updatedPaths = [...tempCompletedPaths];

    // Push the newly created path
    updatedPaths.push({
      path: currentPath.current?.path.copy(),
      paint: currentPath.current?.paint.copy(),
      // The current color of the stroke
      color: useDrawingStore.getState().color,
    });

    // Update history (will get to this later in the blog)
    history.push(currentPath.current);

    // Update the state.
    useDrawingStore.getState().setCompletedPaths([...updatedPaths]);
  };

  const touchHandler = useTouchHandler({
    onActive: onDrawingActive,
    onStart: onDrawingStart,
    onEnd: onDrawingFinished,
  });

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
  }, []);

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
          {completedPaths.length > 0 && (
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
          )}
        </Canvas>
      </View>
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
});

export default DrawingPanel;
