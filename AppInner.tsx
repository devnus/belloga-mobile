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
import userSlice from '@/slices/user';
import Config from 'react-native-config';

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

  // 앱 실행 시 토큰 있으면 로그인하는 코드
  useEffect(() => {
    const getTokenAndRefresh = async () => {
      try {
        const token = await EncryptedStorage.getItem('refreshToken');
        if (!token) {
          return;
        }
        const tokenRes = await axios.post(
          `${Config.API_URL}/api/account/v1/auth/reissue`,
          {
            refreshToken: `${token}`,
          },
        );

        console.log('data,', tokenRes.data);

        // const userInfoRes = await axios.get(
        //   `${Config.API_URL}/api/user/v1/labeler`,
        //   {
        //     headers: {
        //       authorization: `${token}`,
        //     },
        //   },
        // );
        // dispatch(
        //   userSlice.actions.setUser({
        //     name: response.data.data.name,
        //     email: response.data.data.email,
        //     accessToken: response.data.data.accessToken,
        //   }),
        // );
      } catch (error) {
        console.error(error);
        Alert.alert('알림', '다시 로그인 해주세요.');
        // if ((error as AxiosError).response?.data.code === 'expired') {
        //   Alert.alert('알림', '다시 로그인 해주세요.');
        // }
      }
    };
    getTokenAndRefresh();
  }, [dispatch]);

  return <AlarmAppStacks />;
}

export default AppInner;
