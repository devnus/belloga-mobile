import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LabelingAlarmRing from '@pages/RingAlarms/LabelingAlarmRing';
import AlarmSuccess from '@pages/RingAlarms/AlarmSuccess';
import CommonAlarmRing from '@pages/RingAlarms/CommonAlarmRing';
import SelectAlarmRingMode from './SeletAlarmRingMode';

const Stack = createNativeStackNavigator();

function AlarmRingHandle() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LabelingAlarmRing"
        component={LabelingAlarmRing}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CommonAlarmRing"
        component={CommonAlarmRing}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SelectAlarmRingMode"
        component={SelectAlarmRingMode}
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

export default AlarmRingHandle;
