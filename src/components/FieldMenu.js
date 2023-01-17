import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SettingDrawer from './SettingDrawer';
import MenuContent from './MenuContent';

const Drawer = createDrawerNavigator();

const FieldMenu = () => {
  return (
    <Drawer.Navigator
      id="FieldMenu"
      drawerType="slide"
      drawerContent={() => <MenuContent />}
      screenOptions={{
        headerShown: false,
        drawerPosition: 'left',
        drawerStyle: {
          backgroundColor: '#212529',
        },
        swipeEnabled: false,
      }}>
      <Drawer.Screen
        name="SettingDrawer"
        component={SettingDrawer}
        options={{
          drawerLabel: () => null,
          drawerItemStyle: {display: 'none'},
          drawerIcon: () => null,
        }}
      />
    </Drawer.Navigator>
  );
};

export default FieldMenu;
