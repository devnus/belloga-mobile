/* eslint-disable prettier/prettier */
import {NativeModules} from 'react-native';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {AlarmType} from '@/pages/EditAlarms/AlarmSettings';

const AlarmService = NativeModules.AlarmModule;

export async function scheduleAlarm(alarm: Alarm) {
  if (!(alarm instanceof Alarm)) {
    alarm = new Alarm(alarm);
  }
  try {
    await AlarmService.set(alarm.toAndroid());
  } catch (e) {
    console.log(e);
  }
}

export async function enableAlarm(uid: string) {
  try {
    await AlarmService.enable(uid);
  } catch (e) {
    console.log(e);
  }
}

export async function showAlarmToastMessage(alarm: Alarm) {
  if (!(alarm instanceof Alarm)) {
    alarm = new Alarm(alarm);
  }
  try {
    await AlarmService.showRemainTimeToast(alarm.toAndroid());
  } catch (e) {
    console.log(e);
  }
}

export async function disableAlarm(uid: string) {
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

export async function removeAlarm(uid: string) {
  try {
    await AlarmService.remove(uid);
  } catch (e) {
    console.log(e);
  }
}

export async function updateAlarm(alarm: Alarm) {
  alarm.active = true;
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
  active: boolean;
  days: number[];
  description: string;
  enabled: boolean;
  hour: number;
  minutes: number;
  repeating: boolean;
  snoozeInterval: number;
  title: string;
  uid: string;
  isSoundOn: boolean;
  isVibrateOn: boolean;
  isMissionAlert: boolean;

  constructor(params: AlarmType) {
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
    this.isSoundOn = getParam(params, 'isSoundOn', false);
    this.isVibrateOn = getParam(params, 'isVibrateOn', false);
    this.isMissionAlert = getParam(params, 'isMissionAlert', false);
  }

  static getEmpty() {
    return new Alarm({
      title: '',
      description: '',
      hour: 0,
      minutes: 0,
      repeating: false,
      days: [],
      active: true,
      enabled: true,
      snoozeInterval: 0,
      uid: '',
      isSoundOn: false,
      isVibrateOn: false,
      isMissionAlert: false,
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

function getParam(param, key, defaultValue: any) {
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
  return daysArray.map((day: number) => (day + 1) % 7);
}

export function fromAndroidDays(daysArray) {
  return daysArray.map((d: number) => (d === 0 ? 6 : d - 1));
}
