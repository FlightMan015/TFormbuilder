import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SettingContent from './SettingContent';
import Body from './Body';

const Drawer = createDrawerNavigator();

const SettingDrawer = props => {
  return (
    <Drawer.Navigator
      id="RightDrawer"
      drawerType="slide"
      drawerContent={() => <SettingContent />}
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerStyle: {
          backgroundColor: '#212529',
        },
        swipeEnabled: false,
      }}>
      <Drawer.Screen
        name="Body"
        component={Body}
        options={{
          drawerLabel: () => null,
          drawerItemStyle: {display: 'none'},
          drawerIcon: () => null,
        }}
      />
    </Drawer.Navigator>
  );
};

export default SettingDrawer;
