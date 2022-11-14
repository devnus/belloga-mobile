import {StyleSheet} from 'react-native';
import Alarm, {updateAlarm, updateOffAlarm} from './alarms';
import {getKoreanDayName} from '../components/AlarmSetting/DayPicker';

/**
 * 반복하지 않는 알람의 경우 언제 울리는지 계산해주는 함수 (오늘 혹은 내일)
 */

export function calcNoRepeatingAlarmTime(alarms: Alarm[]) {
  //중복 알람이 아닌 알람들을 추려냄
  const noRepeatingAlarms = alarms.filter(
    (alarm: Alarm) => alarm.repeating === false,
  );

  noRepeatingAlarms.map((alarm: Alarm) => {
    const day: number = calcAlarmRingTime(alarm.hour, alarm.minutes);
    alarm.days = [day];

    if (alarm.active === false) {
      updateOffAlarm(alarm);
    }
  });
}

/**
 * 가장 빠르게 울리는 알람이 어느 것인지 계산해주는 함수
 */

export function calcNextAlarm(activeAlarms: Alarm[]) {
  const today = new Date();

  const remainTimes = activeAlarms.map((alarm: Alarm) => {
    return Math.floor((calcRemainTime(alarm) - today) / (1000 * 60));
  });

  const min = Math.min(...remainTimes);
  const index = remainTimes.indexOf(min);

  return [min, activeAlarms[index]];
}

/**
 * Alarm Array를 넣으면 시간 순, 켜진 순으로 소트되어 나온다
 * @param alarmList Alarm Array
 * @returns 정렬된 Alarm Array
 */
export function sortAlarm(alarmList: []) {
  alarmList.sort((a: Alarm, b: Alarm) => {
    return calcRemainTime(b).valueOf() - calcRemainTime(a).valueOf();
  });

  alarmList.sort((a: Alarm, b: Alarm) => {
    return Number(b.enabled) - Number(a.enabled);
  });

  return alarmList;
}

/**
 *
 * @param value 숫자를 넣으면
 * @returns 한자리일 경우 앞에 0을 붙여서 string으로 리턴
 */
export function leftPad(value: number) {
  if (value >= 10) {
    return value;
  }

  return `0${value}`;
}

/**
 *
 * @param source 날짜
 * @returns 몇월 몇일 무슨 요일이라고 string으로 리턴
 */
export function toStringByFormatting(source: Date) {
  let hours: number = Number(leftPad(source.getHours()));
  const minutes = leftPad(source.getMinutes());

  const timeZone = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  hours = Number(leftPad(hours));

  return `${toStringOnlyDates(source)} ${
    String(hours) + ':' + minutes + ' ' + timeZone
  }`;
}

/**
 *Date를 받아 string format로 한글로 된 걸 돌려주는 함수
 * @param source Date 날짜
 * @returns 몇월 몇일 무슨 요일이라고 string으로 리턴
 */
export function toStringOnlyDates(source: Date) {
  const month = leftPad(source.getMonth() + 1);
  const day = leftPad(source.getDate());

  return `${month}월 ${day}일 ${getKoreanDayName(source.getDay())}요일 `;
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
export function calcRemainTime(alarm: Alarm) {
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

/**
 *
 * @param a 알람 A
 * @param b 알람 B
 * @returns 값을 비교한 결과
 */
export const sortAlarmList = (a: Alarm, b: Alarm) => {
  if (a.hour === b.hour) {
    const isEarlier = a.hour < b.hour;
    const isEqual = a.hour === b.hour;
    if (isEarlier === true) {
      return -1;
    } else if (isEqual) {
      return 0;
    } else {
      return 1;
    }
  }
  return a.hour - b.hour;
};
