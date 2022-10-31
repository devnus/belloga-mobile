import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Setting from './src/pages/ViewUserData/Setting';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import AlarmRingHandle from './src/pages/RingAlarms/AlarmRingHandle';
import AlarmList from '@/pages/EditAlarms/AlarmList';
import AlarmSettings from '@/pages/EditAlarms/AlarmSettings';
import PressStamps from '@/pages/Stamps/PressStamps';
import {Alert, Text} from 'react-native';
import {useAppDispatch} from '@/store';
import axios, {AxiosError} from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
import userSlice from '@/slices/user';
import {useAxiosInterceptor} from '@/hooks/useAxiosInterceptor';
import {useAutoLogin} from '@/hooks/useAutoLogin';

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
          tabBarLabel: ({focused}) => (
            <Text
              style={{color: focused ? '#68A3B9' : '#D9E5E4', fontSize: 10}}>
              알람
            </Text>
          ),
          tabBarIcon: ({focused}) => {
            return (
              <Icon
                name="bell"
                size={20}
                color={focused ? '#68A3B9' : '#D9E5E4'}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="응모"
        component={PressStamps}
        options={{
          headerShown: false,
          tabBarLabel: ({focused}) => (
            <Text
              style={{color: focused ? '#68A3B9' : '#D9E5E4', fontSize: 10}}>
              응모
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <Icon
              name="gift"
              size={20}
              color={focused ? '#68A3B9' : '#D9E5E4'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="기록"
        component={Setting}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Icon
              name="th-large"
              size={20}
              color={focused ? '#68A3B9' : '#D9E5E4'}
            />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{color: focused ? '#68A3B9' : '#D9E5E4', fontSize: 10}}>
              기록
            </Text>
          ),
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
  const dispatch = useAppDispatch();

  useAxiosInterceptor(dispatch);
  useAutoLogin(dispatch);

  return <AlarmAppStacks />;
}

export default AppInner;
