import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Setting from './src/pages/ViewUserData/Setting';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import AlarmRingHandle from './src/pages/RingAlarms/AlarmRingHandle';
import AlarmList from '@/pages/EditAlarms/AlarmList';
import AlarmSettings from '@/pages/EditAlarms/AlarmSettings';
import PressStamps from '@/pages/Stamps/PressStamps';
import {WarningModal} from '@/components/Modals/WarningModal';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AlarmTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="알람"
        component={AlarmList}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name="bell" size={20} color="#000" />,
        }}
      />
      <Tab.Screen
        name="응모"
        component={PressStamps}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name="user" size={20} color="#000" />,
        }}
      />
      <Tab.Screen
        name="기록"
        component={Setting}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name="user" size={20} color="#000" />,
        }}
      />
    </Tab.Navigator>
  );
}

function AlarmAppStacks() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Alarms"
        component={AlarmTabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Edit"
        component={AlarmSettings}
        options={{title: '알람 시간 지정'}}
      />
      <Stack.Screen
        name="Ring"
        component={AlarmRingHandle}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function AppInner() {
  return <AlarmAppStacks />;
}

export default AppInner;
