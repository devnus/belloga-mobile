import React, {useEffect, useState} from 'react';
import {Animated, ScrollView, StyleSheet, Text, View} from 'react-native';
import AlarmInfo from '../components/AlarmInfo';
import AddButton from '../components/AlarmSetting/AddButton';
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
  console.log(alarms);

  let AnimatedHeaderValue = new Animated.Value(0);
  const Header_Maximum_Height = 200;
  //Max Height of the Header
  const Header_Minimum_Height = 50;
  //Min Height of the Header

  const animateHeaderHeight = AnimatedHeaderValue.interpolate({
    inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],
    outputRange: [Header_Maximum_Height, Header_Minimum_Height],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.animatedToolbarContainer,
          {
            height: animateHeaderHeight,
            // backgroundColor: '#f2f6f7',
          },
        ]}>
        <View style={styles.earliestAlarmContainer}>
          {alarms.length == 0 ? (
            <Text> 알람이 없습니다 </Text>
          ) : (
            <View style={styles.nextAlarmTextContainer}>
              <Text style={styles.nextAlarmGuideText}> 다음 알람까지 </Text>
              <Text style={styles.nextAlarmLeftTime}> 11 : 00 </Text>
              <Text style={styles.nextAlarmInfo}> 06월 29일 8:56 </Text>
            </View>
          )}
          <View style={styles.addButtonContainer}>
            <AddButton
              title={'+'}
              onPress={() => navigation.navigate('Edit')}
            />
          </View>
        </View>
      </Animated.View>

      <View style={styles.innerContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: AnimatedHeaderValue}}}],
            {useNativeDriver: false},
          )}>
          {alarms &&
            alarms.map(a => {
              console.log('map function', a.days);
              return (
                <AlarmInfo
                  key={a.uid}
                  uid={a.uid}
                  onChange={async active => {
                    if (active) {
                      await enableAlarm(a.uid);
                      setAlarms(await getAllAlarms());
                    } else {
                      await disableAlarm(a.uid);
                      setAlarms(await getAllAlarms());
                    }
                  }}
                  onPress={() => navigation.navigate('Edit', {alarm: a})}
                  title={a.title}
                  hour={a.hour}
                  minutes={a.minutes}
                  days={a.days}
                  isActive={a.active}
                />
              );
            })}
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
    justifyContent: 'flex-end',
    flexDirection: 'column',
    width: '90%',
  },
  animatedToolbarContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  addButtonContainer: {
    height: 50,
    width: '100%',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    backgroundColor: '#f2f6f7',
  },
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f2f6f7',
  },
  innerContainer: {
    alignItems: 'center',
    flex: 1,
  },
  scrollView: {
    width: '100%',
    alignItems: 'center',
  },
  nextAlarmTextContainer: {
    alignItems: 'center',
  },
  nextAlarmGuideText: {
    color: '#8abccb',
    fontSize: 14,
  },
  nextAlarmLeftTime: {
    color: '#0f5078',
    fontSize: 50,
    fontWeight: 'bold',
  },
  nextAlarmInfo: {
    color: '#0f5078',
    fontSize: 18,
  },
});
