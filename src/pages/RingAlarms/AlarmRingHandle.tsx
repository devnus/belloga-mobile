import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AlarmRing from './AlarmRing';
import AlarmSuccess from './AlarmSuccess';

const Stack = createNativeStackNavigator();

function AlarmRingHandle() {
  return (
    <Stack.Navigator>
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

export default AlarmRingHandle;
