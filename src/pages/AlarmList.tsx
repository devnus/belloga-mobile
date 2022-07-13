import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import AlarmInfo from '../components/AlarmInfo';

function AlarmList({navigation}: any) {
  const alarms: any = [
    {
      uid: 123,
      title: 'test alarm',
      hour: 8,
      minutes: 20,
      days: 1,
      active: true,
    },
  ];
  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.innerContainer}>
        <ScrollView contentContainerStyle={globalStyles.scrollView}>
          {alarms && alarms.length === 0 && <Text>No alarms</Text>}
          {alarms &&
            alarms.map(a => (
              <AlarmInfo
                key={a.uid}
                uid={a.uid}
                onPress={() => navigation.navigate('Edit', {alarm: a})}
                title={a.title}
                hour={a.hour}
                minutes={a.minutes}
                days={a.days}
                isActive={a.active}
              />
            ))}
        </ScrollView>
      </View>
    </View>
  );
}

export default AlarmList;

const globalStyles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  innerContainer: {
    width: '90%',
    height: '90%',
    display: 'flex',
    alignItems: 'center',
  },
  scrollView: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
