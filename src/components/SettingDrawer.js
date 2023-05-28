import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SettingContent from './SettingContent';
import FormBuilder from './form_builder';

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
        component={FormBuilder}
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
