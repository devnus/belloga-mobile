import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserInfo from './UserInfo';
import LoginPage from './LoginPage';
import LabelingLog from './LabelingLog';

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
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default Setting;
