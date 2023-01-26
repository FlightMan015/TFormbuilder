/* eslint-disable prettier/prettier */

import {Canvas, Path, Skia, ImageSVG} from '@shopify/react-native-skia';
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
import {CustomButton} from '../../../common/CustomButton';
import Title from '../../../common/Title';
import formStore from '../../../store/formStore';

const Bitmap = ({element, index, editRole}) => {
  const {colors} = useTheme();
  const updateFormData = formStore(state => state.updateFormData)
  // Array of completed paths from global state
  // const completedPaths = useDrawingStore(state => state.completedPaths);
  const completedPaths = JSON.parse(JSON.stringify(element.meta.paths));
  const svgDatas = JSON.parse(JSON.stringify(element.meta.svgs));
  const [imageData, setImageData] = useState({
    imageUri:
      element.meta.imageUri !== undefined && element.meta.imageUri
        ? element.meta.imageUri
        : '',
    imageName:
      element.meta.imageName !== undefined && element.meta.imageName
        ? element.meta.imageName
        : '',
  });
  const [visible, setVisible] = useState(false);
  const imageScreenWidth = useRef(element.meta.imageWidth || 0);
  const setVisibleDrawingDlg = useDrawingStore(
    state => state.setVisibleBitmapDrawingDlg,
  );
  const setBitmapImageData = useDrawingStore(state => state.setBitmapImageData);
  // We need to provide absolute height to the canvas as percentages/flex won't work.
  // Therefore when the `View` renders, we get the height and keep it in state. This
  // height will be the height of Canvas & SkiaView components.
  const onLayout = event => {
    // setCanvasHeight(event.nativeEvent.layout.height);
    imageScreenWidth.current = event.nativeEvent.layout.width;
    useDrawingStore.getState().setCanvasInfo({
      width: event.nativeEvent.layout.width - 20,
      height: 400,
    });
  };

  const [imageSize, setImageSize] = useState({width: 0, height: 0});

  useEffect(() => {
    if (element.meta.imageUri !== undefined && element.meta.imageUri) {
      setImageData({
        ...imageData,
        imageUri: element.meta.imageUri,
        imageName: element.meta.imageName,
      });
      Image.getSize(element.meta.imageUri, (imageWidth, imageHeight) => {
        setImageSize({
          ...imageSize,
          ...utils.handleImageSize(
            imageWidth,
            imageHeight,
            imageScreenWidth.current,
            300,
          ),
        });
      });
    }
  }, [element]);

  const OpenURLButton = linkdata => {
    const {url, name, svg} = linkdata;
    const linkIndex = linkdata.index;
    const handlePress = useCallback(async () => {
      // await Linking.openSettings();
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);

      // if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
      // } else {
      //   Alert.alert(`Don't know how to open this URL: ${url}`);
      // }
    }, [url]);

    return (
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.renderItemContainer(index)}>
          <View style={styles.thumbnail}>
            <Canvas style={{width: 50, height: 50}}>
              <ImageSVG
                svg={Skia.SVG.MakeFromString(svg)}
                x={0}
                y={0}
                width={50}
                height={50}
              />
            </Canvas>
            <Text style={styles.linkName}>{name}</Text>
          </View>
          <View style={styles.itemIconsContainer}>
            <IconButton
              icon={'pencil-outline'}
              color={colors.icon}
              size={15}
              onPress={() => {
                // setVisibleDlg({
                //   ...visibleDlg,
                //   editBitmapLink: true,
                //   bitmapIndex: index,
                //   bitmapLinkIndex: linkIndex,
                //   bitmapElement: element,
                //   bitmapLinkData: {name: name, link: url},
                // });
              }}
              style={styles.actionButton}
            />
            <IconButton
              icon={'delete-outline'}
              color={colors.icon}
              size={15}
              onPress={() => {
                Alert.alert(
                  'Delete link',
                  'Are you sure want to delete this link ?',
                  [
                    {
                      text: 'Yes',
                      onPress: () => {
                        const tempElement = JSON.parse(JSON.stringify(element));
                        tempElement.meta.paths.splice(linkIndex, 1);
                        tempElement.meta.svgs.splice(linkIndex, 1);
                        updateFormData(index, tempElement);
                        if (element.event.onDeleteMarker) {
                          Alert.alert('Rule Action', `Fired onDeleteMarker action. rule - ${element.event.onDeleteMarker}. newSeries - ${JSON.stringify(tempElement.meta)}`);
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
              }}
              style={styles.actionButton}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.bitmapContainer}>
        <View style={styles.selectImageContainer}>
          <Text style={{
            ...styles.imageName,
            color: colors.text,
            borderColor: colors.border,
            backgroundColor: colors.inputTextBackground,
            }}>
            {imageData.imageName || 'Select the image'}
          </Text>
          <CustomButton
            onPress={() => {
              DocumentPicker.pick({
                type: types.images,
              })
                .then(result => {
                  const tempElement = JSON.parse(JSON.stringify(element));
                  if (
                    tempElement.imageName !== result[0].name ||
                    tempElement.imageUri !== result[0].uri
                  ) {
                    const tempMetaData = {
                      ...tempElement.meta,
                      imageName: result[0].name,
                      imageUri: result[0].uri,
                      imageWidth: imageScreenWidth.current,
                      paths: [],
                      svgs: [],
                    };
                    updateFormData(index, {
                      ...tempElement,
                      meta: tempMetaData,
                    });
                    if (element.event.onSelectImage) {
                      Alert.alert('Rule Action', `Fired onSelectImage action. rule - ${element.event.onSelectImage}. newSeries - ${JSON.stringify(tempMetaData)}`);
                    }
                  }
                })
                .catch({});
            }}
            style={{
              ...styles.iconButton,
              backgroundColor: colors.borderIconButtonBackground,
              borderColor: colors.colorIconButtonBorder,
              borderWidth: 1,
            }}
            iconColor={colors.colorButton}
            icon="folder"
            iconSize={18}
          />
          {editRole && imageData.imageName && (
            <CustomButton
              onPress={() => {
                setVisibleDrawingDlg(true);
                setBitmapImageData({
                  imageUri: imageData.imageUri,
                  width: imageSize.width,
                  height: imageSize.height,
                  index: index,
                  element: element,
                });
              }}
              style={{
                ...styles.iconButton,
                backgroundColor: colors.borderIconButtonBackground,
                borderColor: colors.colorIconButtonBorder,
                borderWidth: 1,
              }}
              iconColor={colors.colorButton}
              icon="edit"
              iconSize={18}
            />
          )}
        </View>

        <View
          onLayout={onLayout}
          style={{
            ...styles.imageContainer,
            height: imageSize.height,
            width: '100%',
          }}>
          {imageData.imageUri && (
            <Image
              style={{width: imageSize.width, height: imageSize.height, alignSelf: 'center'}}
              source={{uri: imageData.imageUri}}
            />
          )}

          <Canvas
            style={{
              ...styles.canvas,
              height: imageSize.height,
              width: imageSize.width,
            }}>
            {completedPaths.length > 0
              ? completedPaths.map((path, i) => {
                  return (
                    <ImageSVG
                      key={i}
                      svg={Skia.SVG.MakeFromString(path)}
                      x={0}
                      y={0}
                      width={imageSize.width}
                      height={imageSize.height}
                    />
                  );
                })
              : null}
          </Canvas>
        </View>

        <View style={styles.linkButton}>
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
        </View>
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
    backgroundColor: '#FFE694',
    borderRadius: 5,
  },
  imageName: {
    width: '75%',
    height: 35,
    borderWidth: 1,
    borderColor: color.GREY,
    borderRadius: 5,
    textAlignVertical: 'center',
    paddingLeft: 5,
  },
  selectImageContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  bitmapContainer: {
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 10,
  },
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
  renderItemContainer: index => ({
    flexDirection: 'row',
    // backgroundColor: index % 2 === 1 ? color.GREY : color.WHITE,
    marginVertical: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  linkName: {
    height: 40,
    textAlignVertical: 'center',
    paddingLeft: 10,
    textDecorationLine: 'underline',
    color: color.PRIMARY,
    fontSize: 15,
  },
});

export default Bitmap;
