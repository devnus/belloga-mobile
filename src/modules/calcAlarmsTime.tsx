import React from 'react';
import {AlarmType} from '../pages/AlarmSettings';
import {StyleSheet, Text} from 'react-native';
import {updateAlarm} from './alarms';

/**
 * 반복하지 않는 알람의 경우 언제 울리는지 계산해주는 함수 (오늘 혹은 내일)
 */

export function calcNoRepeatingAlarmTime(alarms) {
  //중복 알람이 아닌 알람들을 추려냄
  const noRepeatingAlarms = alarms.filter(
    (alarm: AlarmType) => alarm.repeating === false,
  );

  noRepeatingAlarms.map((alarm: AlarmType) => {
    if (alarm.active === true) {
      const day: number = calcAlarmRingTime(alarm.hour, alarm.minutes);
      alarm.days = [day];
      updateAlarm(alarm);
    }
  });
}

/**
 * 가장 빠르게 울리는 알람이 어느 것인지 계산해주는 함수
 */

export function calcNextAlarm(alarms) {
  const today = new Date();

  const activeAlarms = alarms.filter(
    (alarm: AlarmType) => alarm.active === true,
  );

  if (activeAlarms.length === 0) {
    return (
      <>
        <Text style={styles.nextAlarmInfo}> 예정된 알람이 없습니다 </Text>
      </>
    );
  }

  const remainTimes = activeAlarms.map((alarm: AlarmType) => {
    return Math.floor((calcRemainTime(alarm) - today) / (1000 * 60));
  });

  const min = Math.min(...remainTimes);
  const index = remainTimes.indexOf(min);

  return (
    <>
      <Text style={styles.nextAlarmGuideText}> 다음 알람까지 </Text>
      <Text style={styles.nextAlarmLeftTime}>
        {`${Math.floor((min / 60) % 24)} : ${Math.floor(min % 60)}`}{' '}
      </Text>
      <Text style={styles.nextAlarmInfo}>
        {calcRemainTime(activeAlarms[index]).toString()}{' '}
      </Text>
    </>
  );
}

function leftPad(value: number) {
  if (value >= 10) {
    return value;
  }

  return `0${value}`;
}

function toStringByFormatting(source: Date, delimiter = '-') {
  const year = source.getFullYear();
  const month = leftPad(source.getMonth() + 1);
  const day = leftPad(source.getDate());

  return [year, month, day].join(delimiter);
}

/**
 시간과 분을 넣으면 해당 알람이 오늘 울려야 하는지 내일 울려야 하는지 요일을 계산해주는 함수
 * @param hour : number
 * @param minutes : number
 * @returns : number
 */
export function calcAlarmRingTime(hour: number, minutes: number) {
  const today = new Date();
  if (today.getHours() >= hour) {
    if (today.getHours() === hour && today.getMinutes() < minutes) {
      return today.getDay();
    }

    //일요일인 경우 0으로 핸들링
    if (today.getDay() === 6) {
      return 0;
    }
    return today.getDay() + 1;
  } else {
    return today.getDay();
  }
}

/**
   * @param AlarmType
   * @returns Date
   알람을 받아 해당 알람이 언제 울릴 건지 리턴해주는 함수
   */
export function calcRemainTime(alarm: AlarmType) {
  const alarmHour = alarm.hour;
  const alarmMinutes = alarm.minutes;
  const alarmDays: number[] = alarm.days;
  const today = new Date();

  //오늘 알람이 울릴 예정이었고 아직 울리지 않았다면 리턴
  if (
    alarmDays.includes(today.getDay()) &&
    (today.getHours() < alarmHour ||
      (today.getHours() === alarmHour && today.getMinutes() < alarmMinutes))
  ) {
    today.setHours(alarmHour);
    today.setMinutes(alarmMinutes);
    return today;
  }

  const dayArray = alarmDays.map(day => {
    if (day <= today.getDay()) {
      return day + 7 - today.getDay();
    } else {
      return day - today.getDay();
    }
  });

  const min = Math.min(...dayArray);
  const closeDate = new Date(today.setDate(today.getDate() + min));
  closeDate.setHours(alarmHour);
  closeDate.setMinutes(alarmMinutes);

  return closeDate;
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
