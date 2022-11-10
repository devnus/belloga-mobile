import {containsKey, getData, storeData} from './asyncStorageStoreData';

const ALARM_LOG = 'alarmLog';

export type totalAlarmLog = {
  alarmType: string;
  todayDate: Date | string;
  alarmDate: string;
};

export type alarmLogType = {
  alarmDate: string;
  alarmLog: totalAlarmLog[];
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

  const alarmLogInfo: alarmLogType = {
    alarmDate: alarmOffInfo.alarmDate,
    alarmLog: [alarmOffInfo],
  };

  const alarmLogData = mergeAlarm(previousData, alarmLogInfo);
  storeData(ALARM_LOG, alarmLogData);
};

export const loadAlarm = async (): Promise<alarmLogType[]> => {
  const isAlarmLogExists = await containsKey(ALARM_LOG);
  let alarmLogs = [];

  if (isAlarmLogExists) {
    alarmLogs = await getData(ALARM_LOG);
  }

  return alarmLogs;
};

/**
 * 새로운 알람 로그를 받으면 날짜를 기준으로 해서 어레이 안에 묶어주는 데이터를 형성
 * @param alarmLogs 기존의 알람 로그
 * @param newLog 새로운 알람 로그
 * @returns 수정된 알람 로그
 */
const mergeAlarm = (alarmLogs: alarmLogType[], newLog: alarmLogType) => {
  const alarmKeys = alarmLogs.map((log: alarmLogType) => log.alarmDate); //해당 날짜의 로그가 기존에 있는지 체크

  if (alarmKeys.includes(newLog.alarmDate) === true) {
    const targetAlarm: alarmLogType[] = alarmLogs.map((log: alarmLogType) => {
      const alarmLogArray = log.alarmLog.concat(newLog.alarmLog);

      return log.alarmDate === newLog.alarmDate
        ? {
            ...log,
            alarmLog: alarmLogArray,
          }
        : log;
    });

    return targetAlarm;
  } else {
    return alarmLogs.concat(newLog);
  }
};
