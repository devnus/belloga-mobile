import Alarm from '@/modules/alarms';
import {
  calcNextAlarm,
  calcRemainTime,
  leftPad,
  toStringByFormatting,
} from '@/modules/calcAlarmsTime';
import React from 'react';
import {StyleSheet, Text} from 'react-native';

function DisplayAlarmTimeInfo({alarms}: Alarm[]) {
  const activeAlarms = alarms.filter((alarm: Alarm) => alarm.active === true);

  if (activeAlarms.length === 0) {
    return (
      <>
        <Text style={styles.nextAlarmInfo}> 예정된 알람이 없습니다 </Text>
      </>
    );
  }

  const [minDate, targetAlarm]: any = calcNextAlarm(activeAlarms);
  return (
    <>
      <Text style={styles.nextAlarmGuideText}> 다음 알람까지 </Text>

      {minDate / 60 < 24 ? (
        <Text style={styles.nextAlarmLeftTime}>
          {`${Math.floor((minDate / 60) % 24)} : ${leftPad(
            Math.floor(minDate % 60),
          )}`}
        </Text>
      ) : (
        <Text style={styles.nextAlarmLeftTime}>
          {`${Math.floor(minDate / 60 / 24)} 일`}
        </Text>
      )}

      <Text style={styles.nextAlarmInfo}>
        {toStringByFormatting(calcRemainTime(targetAlarm))}{' '}
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
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
export default DisplayAlarmTimeInfo;
