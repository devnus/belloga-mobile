import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import AlarmInfo from '../components/AlarmInfo';
import {
  disableAlarm,
  enableAlarm,
  getAlarmState,
  getAllAlarms,
} from '../modules/alarms';

function AlarmList({navigation}: any) {
  const [alarms, setAlarms] = useState([]);
  const [scheduler, setScheduler] = useState(null);

  useEffect(() => {
    navigation.addListener('focus', async () => {
      setAlarms(await getAllAlarms());
      setScheduler(setInterval(fetchState, 10000)); //1초마다 fetchState 하도록 설정, 알람 새로 생겼는지 체크
    });
    navigation.addListener('blur', async () => {
      clearInterval(scheduler);
    });
    fetchState();
  }, []);

  async function fetchState() {
    const alarmUid = await getAlarmState(); //알람 state를 가져온다
    if (alarmUid) {
      navigation.navigate('Ring', {alarmUid});
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.earliestAlarmContainer}>
        {alarms.length == 0 ? (
          <Text> 알람이 없습니다 </Text>
        ) : (
          <View style={styles.earliestAlarmContainer}>
            <Text> 다음 알람까지 </Text>
            <Text> 11 : 00 : 30 </Text>
            <Text> 06월 29일 8:56 </Text>
          </View>
        )}
      </View>
      <View style={styles.innerContainer}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {alarms &&
            alarms.map(a => (
              <AlarmInfo
                key={a.uid}
                uid={a.uid}
                onChange={async active => {
                  if (active) {
                    await enableAlarm(a.uid);
                  } else {
                    await disableAlarm(a.uid);
                  }
                }}
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

const styles = StyleSheet.create({
  earliestAlarmContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f6f7',
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
