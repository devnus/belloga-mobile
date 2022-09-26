import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AlarmList from './AlarmList';
import AlarmSettings from './AlarmSettings';

const Stack = createNativeStackNavigator();

function EditAlarmsHandle() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Alarms"
        component={AlarmList}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="Edit"
        component={AlarmSettings}
        options={{title: '알람 시간 지정'}}
      /> */}
    </Stack.Navigator>
  );
}

export default EditAlarmsHandle;
