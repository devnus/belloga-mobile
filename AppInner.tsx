import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Alarms from './src/pages/Alarms';
import Ranking from './src/pages/Ranking';
import Setting from './src/pages/Setting';

export type LoggedInParamList = {
  Orders: undefined;
  Settings: undefined;
  Delivery: undefined;
  Complete: {orderId: string};
};

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const Tab = createBottomTabNavigator();

function AppInner() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="알람"
        component={Alarms}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="정보"
        component={Setting}
        options={{title: '내 정보'}}
      />
    </Tab.Navigator>
  );
}

export default AppInner;
