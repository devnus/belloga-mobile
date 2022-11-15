import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Setting from './src/pages/ViewUserData/Setting';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import AlarmRingHandle from './src/pages/RingAlarms/AlarmRingHandle';
import AlarmList from '@/pages/EditAlarms/AlarmList';
import AlarmSettings from '@/pages/EditAlarms/AlarmSettings';
import PressStamps from '@/pages/Stamps/PressStamps';
import {Text} from 'react-native';
import {useAppDispatch} from '@/store';
import {useAxiosInterceptor} from '@/hooks/useAxiosInterceptor';
import {useAutoLogin} from '@/hooks/useAutoLogin';
import {useCheckNetwork} from '@/hooks/useCheckNetwork';
import AlarmLogPage from '@/pages/AlarmLogs/AlarmLogPage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AlarmTabs() {
  const setColor = (focused: boolean) => {
    return focused ? '#68A3B9' : '#D9E5E4';
  };

  const iconTextStyle = (focused: boolean) => {
    return {color: setColor(focused), fontSize: 10, marginBottom: 5};
  };

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="알람"
        component={AlarmList}
        options={{
          headerShown: false,
          tabBarLabel: ({focused}) => (
            <Text style={iconTextStyle(focused)}>알람</Text>
          ),
          tabBarIcon: ({focused}) => {
            return <Icon name="bell" size={20} color={setColor(focused)} />;
          },
        }}
      />
      <Tab.Screen
        name="응모"
        component={PressStamps}
        options={{
          headerShown: false,
          tabBarLabel: ({focused}) => (
            <Text style={iconTextStyle(focused)}>응모</Text>
          ),
          tabBarIcon: ({focused}) => (
            <Icon name="gift" size={20} color={setColor(focused)} />
          ),
        }}
      />
      <Tab.Screen
        name="기록"
        component={AlarmLogPage}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Icon name="th-large" size={20} color={setColor(focused)} />
          ),
          tabBarLabel: ({focused}) => (
            <Text style={iconTextStyle(focused)}>기록</Text>
          ),
        }}
      />
      <Tab.Screen
        name="설정"
        component={Setting}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Icon name="gear" size={20} color={setColor(focused)} />
          ),
          tabBarLabel: ({focused}) => (
            <Text style={iconTextStyle(focused)}>설정</Text>
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
  const connectionInfo = useCheckNetwork();

  useAxiosInterceptor(dispatch);

  useAutoLogin(dispatch, connectionInfo);

  return <AlarmAppStacks />;
}

export default AppInner;
