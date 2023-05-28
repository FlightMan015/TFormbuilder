import React, {
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
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native';
import DocumentPicker, {
  types,
} from 'react-native-document-picker';
import {useTheme} from 'react-native-paper';
import useDrawingStore from '../../../../store/bitmapStore';
import utils from './utils';
import CustomButton from '../../../../common/CustomButton';
import formStore from '../../../../store/formStore';
import FieldLabel from '../../../../common/FieldLabel';
import { ScrollEnabledContext } from '../../index';
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
  const formValue = formStore(state => state.formValue);
  const setFormValue = formStore(state => state.setFormValue);
  const updateFormData = formStore(state => state.updateFormData);
  const i18nValues = formStore(state => state.i18nValues);
  const [imageData, setImageData] = useState({
    imageUri: element.meta.imageUri || '',
    imageName: element.meta.imageName || '',
  });
  const valueMarkers = formValue[element.field_name]?.markers ? [...formValue[element.field_name]?.markers] : [];
  const imageScreenWidth = useRef(formValue[element.field_name]?.imageWidth || 0);
  const [tabState, setTabState] = useState({
    regions: false,
    markers: false,
    markerTypes: false,
  });

  const onLayout = event => {
    imageScreenWidth.current = event.nativeEvent.layout.width;
    useDrawingStore.getState().setCanvasInfo({
      width: event.nativeEvent.layout.width - 20,
      height: 400,
    });
  };

  const [imageSize, setImageSize] = useState({width: 0, height: 0});
  const minPoint = useRef({x: -1, y: -1});
  const maxPoint = useRef({x: -1, y: -1});
  const setMarkerTypeToAdd = useDrawingStore(state => state.setMarkerTypeToAdd);

  const scrollRef = useRef();

  useEffect(() => {
    if (element.meta.imageUri) {
      Image.getSize(element.meta.imageUri, (imageWidth, imageHeight) => {
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
    }
    setImageData({
      ...imageData,
      imageUri: element.meta.imageUri,
      imageName: element.meta.imageName,
    });
  }, [element.meta.imageUri, element.meta.imageName]);

  useEffect(() => {
    minPoint.current = {...minPoint.current, x: -1, y: -1};
    maxPoint.current = {...maxPoint.current, x: -1, y: -1};
    setMarkerTypeToAdd({});
  }, [JSON.stringify(tabState)]);

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
                        // const tempMetaData = {
                        //   imageName: result[0].name,
                        //   imageUri: result[0].uri,
                        //   imageWidth: imageScreenWidth.current,
                        //   paths: [],
                        //   svgs: [],
                        // };
                        // setFormValue({...formValue, [element.field_name]: tempMetaData});

                        const newMetaData = {
                          ...element.meta,
                          imageUri: result[0].uri,
                          imageName: result[0].name,
                        };
                        updateFormData(index, {...element, meta: newMetaData});

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
          </View>

          <Text style={styles.imageName(fonts)}>
            {imageData.imageName || 'Select the image'}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          {imageData.imageName && (
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
          {imageData.imageName && (
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
