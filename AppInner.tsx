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
        name="Orders"
        component={Alarms}
        options={{title: '오더 목록'}}
      />
      <Tab.Screen
        name="Delivery"
        component={Ranking}
        options={{title: '내 오더'}}
      />
      <Tab.Screen
        name="Settings"
        component={Setting}
        options={{title: '내 정보'}}
      />
    </Tab.Navigator>
  );
}

export default AppInner;
