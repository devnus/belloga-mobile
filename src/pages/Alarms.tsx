import React from 'react';
import {StyleSheet, Text, TouchableHighlight} from 'react-native';
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
        options={params => ({
          title: 'Alarms',
          headerRight: () => (
            <AddButton
              title={'+ '}
              onPress={() => params.navigation.navigate('Edit')}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Edit"
        component={AlarmSettings}
        options={{title: 'Alarm'}}
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

function AddButton({title, onPress}: any) {
  return (
    <TouchableHighlight
      style={styles.button}
      onPress={onPress}
      underlayColor="#fff">
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    padding: 10,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25,
  },
});

export default Alarms;
