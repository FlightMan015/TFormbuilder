import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import IconPicker from 'react-native-vector-icon-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

const SettingIcon = ({title, icon, onChange, keyName}) => {
  return (
    <View style={styles.settingView}>
      <Text style={styles.titleLabel}>{title}</Text>
      <View style={styles.switchContainer}>
				<View style={styles.iconPicker}>
					<IconPicker
						icons={[
							{family: 'AntDesign', icons: ['up', 'down', 'right']},
							{family: 'Entypo', icons: ['arrow-down', 'arrow-up']},
							{family: 'Ionicons', icons: ['add', 'arrow-up', 'cart']},
						]}
						onSelect={(icon) => {
							onChange(keyName, icon);
						}}
					/>
				</View>
				{icon && icon.family === 'Ionicons' && (
					<Ionicons name={icon.icon} size={18} color={'#FFFFFF'} style={styles.icon}/>
				)}
				{icon && icon.family === 'Entypo' && (
					<Entypo name={icon.icon} size={18} color={'#FFFFFF'} style={styles.icon}/>
				)}
				{icon && icon.family === 'AntDesign' && (
					<AntDesign name={icon.icon} size={18} color={'#FFFFFF'} style={styles.icon}/>
				)}
			</View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  settingView: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#4B5260',
  },
	switchContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
	iconPicker: {
    borderRadius: 3,
    paddingHorizontal: 15,
		paddingVertical: 5,
    textAlign: 'center',
    fontFamily: 'PublicSans-Regular',
    fontSize: 14,
    marginTop: 5,
		backgroundColor: '#FFFFFF',
  },
	icon: {
		marginLeft: 10,
	}
});

export default SettingIcon;
