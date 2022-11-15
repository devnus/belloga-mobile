export type LabelingLogType = {
  createdDate: string; //2022-10-12T07:58:53.698871
  labelingUUID: string; //5865edc6-a306-427b-a411-4ddcf5b39db8/867
  labelingVerificationStatus: string; //WAITING, SUCCESS, FAIL
  textLabel: string; //test 10/12 17:02
};

export type MissionStatusType = {
  sortDate: string;
  createdDate: Date;
  status: string;
};

export type DailyLogType = {
  dateInfo: string;
  dailyInfo: MissionStatusType[];
  processStatus: boolean;
};

/**
 * 라벨링 데이터를 넣으면 가공해서 해당 데이터를 라벨링 러그 포맷에 맞게 가공해주는 함수
 * @param myLog labelonglog를 넣음
 * @returns 날짜, 라벨링 채점 상태, 해당 날짜의 라벨링 로그가 남겨진 객체를 리턴
 */
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
