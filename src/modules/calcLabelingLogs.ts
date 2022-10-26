export type LabelingLogType = {
  createdDate: string; //2022-10-12T07:58:53.698871
  labelingUUID: string; //5865edc6-a306-427b-a411-4ddcf5b39db8/867
  labelingVerificationStatus: string; //WAITING, SUCCESS, FAIL
  textLabel: string; //test 10/12 17:02
};

type MissionStatusType = {
  sortDate: string;
  createdDate: Date;
  status: string;
};

export type DailyLogType = {
  dateInfo: string;
  dailyInfo: MissionStatusType[];
  processStatus: boolean;
};

export function calcDailyLogs(myLog: LabelingLogType[]) {
  const labeled = myLog.map((log: LabelingLogType) => {
    const logDate = new Date(log.createdDate);

    return {
      sortDate: `${logDate.getMonth() + 1}/${logDate.getDate()}`,
      createdDate: logDate,
      status: log.labelingVerificationStatus,
    };
  });

  const dateInfoIdArray = labeled
    .map(item => item.sortDate)
    .filter((value, index, self) => self.indexOf(value) === index);

  const dateArray = dateInfoIdArray.map(date => ({
    dateInfo: date,
  }));

  const labelingLog: DailyLogType[] = dateArray.map(log => {
    const results = labeled.filter(rawLog => log.dateInfo === rawLog.sortDate);

    const processSuccessStatus = results.filter(
      singleLog => singleLog.status === 'SUCCESS',
    ).length;

    return {
      dateInfo: log.dateInfo,
      dailyInfo: results,
      processStatus: processSuccessStatus === results.length,
    };
  });

  return labelingLog;
}
