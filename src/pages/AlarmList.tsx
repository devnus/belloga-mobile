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

  useEffect(() => {
    console.log('hello?');

    (async function () {
      console.log('hi?');
      await axios
        .get(
          `http://a138b0b67de234557afc8eaf29aa97b6-1258302528.ap-northeast-2.elb.amazonaws.com/api/data/v1/target/OCR`,
        )
        .then(res => {
          console.log('got response', res.data);
        })
        .catch(error => {
          console.log(error);
        });
    })();
  }, []);

  async function fetchState() {
    const alarmUid = await getAlarmState(); //알람 state를 가져온다
    if (alarmUid) {
      navigation.navigate('Ring', {alarmUid});
    }
  }
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
