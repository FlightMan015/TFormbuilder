import React, { useEffect, useState } from 'react';
import {Image} from 'react-native';
import { handleImageSize } from '../utils';

const ResizedImage = ({uri, maxWidth, maxHeight, borderRadius}) => {
  const [imageSize, setImageSize] = useState({width: 0, height: 0});
  useEffect(() => {
    Image.getSize(uri, (width, height) => {
      setImageSize({
        ...imageSize,
        ...handleImageSize(
          width,
          height,
          maxWidth,
          maxHeight
        )
      })
    });
  }, [uri]);
  return (
    <Image
      style={{width: imageSize.width, height: imageSize.height, alignSelf: 'center', borderRadius, resizeMode: 'contain'}}
      source={typeof(uri) !== 'string' ? uri : {uri: uri}}
    />
  );
};

export default ResizedImage;
