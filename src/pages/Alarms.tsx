import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AlarmList from './AlarmList';
import AlarmRing from './AlarmRing';
import AlarmSettings from './AlarmSettings';
import AlarmSuccess from './AlarmSuccess';

const Stack = createNativeStackNavigator();

function Alarms() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Alarms"
        component={AlarmList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Edit"
        component={AlarmSettings}
        options={{title: '알람 시간 지정'}}
      />
      <Stack.Screen
        name="Ring"
        component={AlarmRing}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AlarmSuccess"
        component={AlarmSuccess}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default Alarms;
