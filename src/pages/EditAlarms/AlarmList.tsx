import React, {useEffect, useState} from 'react';
import {Animated, ScrollView, StyleSheet, Text, View} from 'react-native';
import AddButton from 'components/AlarmSetting/AddButton';
import Alarm, {
  disableAlarm,
  enableAlarm,
  getAlarmState,
  getAllAlarms,
  showAlarmToastMessage,
} from 'modules/alarms';
import {calcNoRepeatingAlarmTime} from 'modules/calcAlarmsTime';
import AlarmInfo from '@components/AlarmInfo';
import DisplayAlarmTimeInfo from '@/components/DisplayAlarmTimeInfo';

//움직이는 탭바를 위한 상수
const Header_Maximum_Height = 300;
//Max Height of the Header
const Header_Minimum_Height = 50;
//Min Height of the Header

function AlarmList({navigation}: any) {
  const [alarms, setAlarms] = useState<Array<Alarm>>([]);
  const [scheduler, setScheduler] = useState(null);

  useEffect(() => {
    navigation.addListener('focus', async () => {
      const alarmLists = await getAllAlarms(); //저장된 모든 알람 목록을 불러온다.
      setAlarms(() => alarmLists);
      await fetchState();
      setScheduler(setInterval(fetchState, 10000)); //1초마다 fetchState 하도록 설정, 알람 새로 생겼는지 체크
    });
    navigation.addListener('blur', async () => {
      clearInterval(scheduler);
    });
  }, []);

  useEffect(() => {
    alarms && calcNoRepeatingAlarmTime(alarms); //repeat에 false가 눌러져 있는 알람들이 언제 울려야 하는지 알려준다
  }, [alarms]);

  async function fetchState() {
    const alarmUid = await getAlarmState(); //알람 state를 가져온다

    if (alarmUid) {
      navigation.navigate('Ring', {
        screen: 'SelectAlarmRingMode',
        params: {alarmUid},
      });
    }
  }

  let AnimatedHeaderValue = new Animated.Value(0);
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
          },
        ]}>
        <View style={styles.earliestAlarmContainer}>
          <View style={styles.nextAlarmTextContainer}>
            {alarms.length === 0 ? (
              <Text> 알람이 없습니다 </Text>
            ) : (
              <DisplayAlarmTimeInfo alarms={alarms} />
            )}
          </View>
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
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: AnimatedHeaderValue}}}],
            {useNativeDriver: false},
          )}>
          {alarms &&
            alarms.map((a: Alarm) => (
              <AlarmInfo
                key={a.uid}
                uid={a.uid}
                onChange={async (active: Boolean) => {
                  if (active) {
                    await enableAlarm(a.uid);
                    showAlarmToastMessage(a);
                    setAlarms(await getAllAlarms());
                  } else {
                    await disableAlarm(a.uid);
                    setAlarms(await getAllAlarms());
                  }
                }}
                onPress={() => navigation.navigate('Edit', {alarm: a})}
                title={a.title}
                repeating={a.repeating}
                hour={a.hour}
                minutes={a.minutes}
                days={a.days}
                isActive={a.active}
                alarm={a}
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
    justifyContent: 'space-between',
    flexDirection: 'column',
    width: '90%',
    flex: 1,
  },
  animatedToolbarContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  addButtonContainer: {
    zIndex: 1,
    height: 50,
    bottom: 0,
    position: 'absolute',
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
    backgroundColor: '#f2f6f7',
  },
  nextAlarmTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
