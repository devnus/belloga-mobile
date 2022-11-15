import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserInfo from './UserInfo';
import LoginPage from './LoginPage';
import LabelingLog from './LabelingLog';
import UserProfileInfo from './UserProfileInfo';
import ProcessingLabelingInfo from './ProcessingLabelingInfo';
import AboutBelloga from './AboutBelloga';

const Stack = createNativeStackNavigator();

function Setting() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UserInfo"
        component={UserInfo}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginPage}
        options={{title: 'Alarm', headerShown: false}}
      />
      <Stack.Screen
        name="LabelingLog"
        component={LabelingLog}
        options={{title: '내 기록'}}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfileInfo}
        options={{title: '유저 정보'}}
      />
      <Stack.Screen
        name="ProcessingLabelingInfo"
        component={ProcessingLabelingInfo}
        options={{title: '진행중인 라벨링'}}
      />
      <Stack.Screen
        name="AboutBelloga"
        component={AboutBelloga}
        options={{title: '벨로가 소개'}}
      />
    </Stack.Navigator>
  );
}

export default Setting;
