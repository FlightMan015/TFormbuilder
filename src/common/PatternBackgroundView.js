import React, { useMemo } from 'react';
import { View, Dimensions, Image } from 'react-native';
import { useTheme } from 'react-native-paper';

const PatternBackgroundView = ({ imageHeight, imageWidth, imageUri, backgroundColor, viewHeight, viewWidth }) => {
	const {colors} = useTheme();
	var images = [];
	var rows = [];
	const screenWidth = viewWidth || Dimensions.get('window').width;
	const screenHeight = viewHeight || Dimensions.get('window').height;

	if (imageUri) {
		for(var i=0; i<Math.ceil(screenWidth / imageWidth); i++) {
			images.push((
				<Image key={i} source={{uri: imageUri}} style={{width: imageWidth, height: imageHeight}} />
			))
		}

		for(var i=0; i<Math.ceil(screenHeight / imageHeight); i++) {
			rows.push((
				<View key={i} style={{flexDirection: 'row'}}>
					{
						images.map(img => img)
					}
				</View>
			))
		}
	}

	return useMemo(() => (
		<View style={{flex: 1, backgroundColor}}>
			{
				rows.map(row => row)
			}
		</View>
	), [backgroundColor, imageUri]);
}

export default PatternBackgroundView;