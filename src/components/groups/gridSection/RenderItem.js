import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { TouchableOpacity } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';

const RenderItem = ({uri, height, onClick, index, editRole, autoColumn, width}) => {
  const {colors, size, fonts} = useTheme();

  return (
    <View
      style={autoColumn ? {...styles.autoContainer, width: width, height: height} : styles.container}>
      <TouchableOpacity onPress={() => onClick(index, 'select')}>
        <ImageBackground
          source={{ uri: uri ? uri : null }}
          resizeMode="cover"
          style={{
            ...styles.imageThumbnail,
            height: height,
            backgroundColor: colors.icon,
          }}>
          {editRole && <View style={styles.iconContainer}>
            <IconButton
              icon="pencil"
              size={size.s18}
              iconColor={colors.icon}
              style={{...styles.iconBtn, borderColor: colors.icon}}
              onPress={() => onClick(index, 'edit')}
            />
            <IconButton
              icon="delete-forever"
              size={size.s18}
              iconColor={colors.icon}
              style={{...styles.iconBtn, borderColor: colors.icon}}
              onPress={() => onClick(index, 'delete')}
            />
          </View>}
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    margin: 1,
  },
  autoContainer: {
    flexDirection: 'column',
    margin: 1,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  iconBtn: {
    backgroundColor: 'white',
    margin: 3,
    borderWidth: 1,
  },
  iconContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: 10,
    top: 10,
  },
});

RenderItem.propTypes = {};

export default RenderItem;
