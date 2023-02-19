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
import CustomButton from '../../../common/CustomButton';
import Title from '../../../common/Title';
import formStore from '../../../store/formStore';
import FieldLabel from '../../../common/FieldLabel';

const Bitmap = ({element, index}) => {
  const {colors, fonts} = useTheme();
  const userRole = formStore(state => state.userRole);
  const role = element.role.find(e => e.name === userRole);
  const formValue = formStore(state => state.formValue);
  const setFormValue = formStore(state => state.setFormValue);
  const preview = formStore(state => state.preview);
  // Array of completed paths from global state
  // const completedPaths = useDrawingStore(state => state.completedPaths);
  // const completedPaths = JSON.parse(JSON.stringify(element.meta.paths));
  const completedPaths = formValue[element.field_name]?.paths ? [...formValue[element.field_name]?.paths] : [];
  // const svgDatas = JSON.parse(JSON.stringify(element.meta.svgs));
  const svgDatas = formValue[element.field_name]?.svgs ? [...formValue[element.field_name]?.svgs] : [];
  const [imageData, setImageData] = useState({
    imageUri: formValue[element.field_name]?.imageUri || '',
    imageName: formValue[element.field_name]?.imageName || '',
  });
  const [visible, setVisible] = useState(false);
  const imageScreenWidth = useRef(formValue[element.field_name]?.imageWidth || 0);
  const setVisibleDrawingDlg = useDrawingStore(
    state => state.setVisibleBitmapDrawingDlg,
  );
  const setBitmapImageData = useDrawingStore(state => state.setBitmapImageData);
  const visibleDlg = useDrawingStore(state => state.visibleDlg);
  const setVisibleDlg = useDrawingStore(state => state.setVisibleDlg);
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
    if (formValue[element.field_name]?.imageUri) {
      setImageData({
        ...imageData,
        imageUri: formValue[element.field_name].imageUri,
        imageName: formValue[element.field_name].imageName,
      });
      Image.getSize(formValue[element.field_name].imageUri, (imageWidth, imageHeight) => {
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
  }, [JSON.stringify(formValue[element.field_name])]);

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
        <View style={styles.renderItemContainer(colors)}>
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
            <Text style={styles.linkName(fonts)}>{name}</Text>
          </View>
          <View style={styles.itemIconsContainer}>
            <IconButton
              icon={'pencil-outline'}
              iconColor={colors.colorButton}
              size={18}
              onPress={() => {
                setVisibleDlg({
                  ...visibleDlg,
                  editBitmapLink: true,
                  bitmapIndex: index,
                  bitmapLinkIndex: linkIndex,
                  bitmapElement: element,
                  bitmapLinkData: {name: name, link: url},
                });
              }}
              style={styles.actionButton}
            />
            <IconButton
              icon={'delete-outline'}
              iconColor={colors.colorButton}
              size={18}
              onPress={() => {
                Alert.alert(
                  'Delete link',
                  'Are you sure want to delete this link ?',
                  [
                    {
                      text: 'Yes',
                      onPress: () => {
                        const tempValue = {...formValue[element.field_name]};
                        tempValue.paths.splice(linkIndex, 1);
                        tempValue.svgs.splice(linkIndex, 1);
                        setFormValue({...formValue, [element.field_name]: tempValue});
                        if (element.event.onDeleteMarker) {
                          Alert.alert('Rule Action', `Fired onDeleteMarker action. rule - ${element.event.onDeleteMarker}. newSeries - ${JSON.stringify(tempValue)}`);
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
        <FieldLabel label={element.meta.title || 'Bitmap'} visible={!element.meta.hide_title} />
        <View style={styles.selectImageContainer(colors)}>
          <View style={{flexDirection: 'row'}}>
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
            {(role.edit || preview) && imageData.imageName && (
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
                  ...styles.iconButton
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
    marginRight: 5,
  },
  imageName: (fonts) => ({
    height: 40,
    borderRadius: 10,
    textAlignVertical: 'center',
    paddingLeft: 10,
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
  bitmapContainer: {
    padding: 5,
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
