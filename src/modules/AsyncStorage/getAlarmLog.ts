import {containsKey, getData, storeData} from './asyncStorageStoreData';

const ALARM_LOG = 'alarmLog';

export type totalAlarmLog = {
  alarmType: string;
  todayDate: Date | string;
  alarmDate: string;
};

export const saveAlarm = async (alarmType: string) => {
  const isAlarmLogExists = await containsKey(ALARM_LOG);

  let previousData = [];

  if (isAlarmLogExists) {
    previousData = await getData(ALARM_LOG);
  }

  const todayDate = new Date();
  const alarmOffInfo: totalAlarmLog = {
    alarmType: alarmType,
    todayDate: todayDate,
    alarmDate: `${todayDate.getMonth()}/${todayDate.getDate()}`,
  };

  const alarmLogData = previousData.concat(alarmOffInfo);
  storeData(ALARM_LOG, alarmLogData);
};

export const loadAlarm = async (): Promise<totalAlarmLog[]> => {
  const isAlarmLogExists = await containsKey(ALARM_LOG);
  let alarmLogs = [];

  if (isAlarmLogExists) {
    alarmLogs = await getData(ALARM_LOG);
  }

  return alarmLogs;
};
