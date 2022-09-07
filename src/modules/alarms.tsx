/* eslint-disable prettier/prettier */
import {NativeModules} from 'react-native';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {AlarmType} from '../pages/AlarmSettings';

const AlarmService = NativeModules.AlarmModule;

export async function scheduleAlarm(alarm: AlarmType) {
  if (!(alarm instanceof Alarm)) {
    alarm = new Alarm(alarm);
  }
  try {
    await AlarmService.set(alarm.toAndroid());
  } catch (e) {
    console.log(e);
  }
}

export async function enableAlarm(uid) {
  try {
    await AlarmService.enable(uid);
  } catch (e) {
    console.log(e);
  }
}

export async function disableAlarm(uid) {
  try {
    await AlarmService.disable(uid);
  } catch (e) {
    console.log(e);
  }
}

export async function stopAlarm() {
  try {
    await AlarmService.stop();
  } catch (e) {
    console.log(e);
  }
}

export async function snoozeAlarm() {
  try {
    await AlarmService.snooze();
  } catch (e) {
    console.log(e);
  }
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

export async function removeAlarm(uid) {
  try {
    await AlarmService.remove(uid);
  } catch (e) {
    console.log(e);
  }
}

export async function updateAlarm(alarm) {
  if (!(alarm instanceof Alarm)) {
    alarm = new Alarm(alarm);
  }
  try {
    await AlarmService.update(alarm.toAndroid());
  } catch (e) {
    console.log(e);
  }
}

export async function removeAllAlarms() {
  try {
    await AlarmService.removeAll();
  } catch (e) {
    console.log(e);
  }
}

export async function getAllAlarms() {
  try {
    const alarms = await AlarmService.getAll();
    return alarms.map(a => Alarm.fromAndroid(a));
  } catch (e) {
    console.log(e);
  }
}

export async function getAlarm(uid: string) {
  try {
    const alarm = await AlarmService.get(uid);
    return Alarm.fromAndroid(alarm);
  } catch (e) {
    console.log(e);
  }
}

export async function getAlarmState() {
  try {
    return AlarmService.getState();
  } catch (e) {
    console.log(e);
  }
}

export default class Alarm {
  constructor(params = null) {
    this.uid = getParam(params, 'uid', uuidv4());
    this.enabled = getParam(params, 'enabled', true);
    this.title = getParam(params, 'title', '');
    this.description = getParam(params, 'description', 'Wake up');
    this.hour = getParam(params, 'hour', new Date().getHours());
    this.minutes = getParam(params, 'minutes', new Date().getMinutes() + 1);
    this.snoozeInterval = getParam(params, 'snoozeInterval', 1);
    this.repeating = getParam(params, 'repeating', false);
    this.active = getParam(params, 'active', true);
    this.days = getParam(params, 'days', []);
  }

  static getEmpty() {
    return new Alarm({
      title: '',
      description: '',
      hour: 0,
      minutes: 0,
      repeating: false,
      days: [],
    });
  }

  toAndroid() {
    return {
      ...this,
      days: toAndroidDays(this.days),
    };
  }

  static fromAndroid(alarm) {
    alarm.days = fromAndroidDays(alarm.days);
    return new Alarm(alarm);
  }

  getTimeString() {
    const hour = this.hour < 10 ? '0' + this.hour : this.hour;
    const minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes;
    return {hour, minutes};
  }

  getTime() {
    const timeDate = new Date();
    timeDate.setMinutes(this.minutes);
    timeDate.setHours(this.hour);
    return timeDate;
  }
}

function getParam(param, key, defaultValue) {
  try {
    if (param && (param[key] !== null || param[key] !== undefined)) {
      return param[key];
    } else {
      return defaultValue;
    }
  } catch (e) {
    return defaultValue;
  }
}

export function toAndroidDays(daysArray) {
  return daysArray.map(day => (day + 1) % 7);
}

export function fromAndroidDays(daysArray) {
  return daysArray.map(d => (d === 0 ? 6 : d - 1));
}
