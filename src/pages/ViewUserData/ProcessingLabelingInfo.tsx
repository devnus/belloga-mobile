import React, {useEffect, useMemo, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import UserData from '@/components/UserData';
import EmptyCard from '@/components/Common/EmptyCard';
import LabelingLogInfo from '@/components/LabelingLogInfo';
import {getMyLabelingLogInfo} from '@/modules/labelingAPIs';
import {calcDailyLogs, LabelingLogType} from '@/modules/calcLabelingLogs';
import {useGetAccessToken} from '@/hooks/useAuthInfo';

function ProcessingLabelingInfo({route, navigation}) {
  const [labelingLog, setLabelingLog] = useState<LabelingLogType[]>([]);
  const accessToken = useGetAccessToken();

  useEffect(() => {
    if (accessToken) {
      getMyLabelingLogInfo(accessToken, setLabelingLog);
    }
  }, [accessToken]);

  const dailyLogs = useMemo(
    () => calcDailyLogs(labelingLog).reverse(),
    [labelingLog],
  );
  const unProcessedLogs = useMemo(() => {
    const waitingLogs = labelingLog.filter(
      log => log.labelingVerificationStatus === 'WAITING',
    );

    return waitingLogs.length;
  }, [labelingLog]);

  return (
    <View style={styles.container}>
      <View>
        {/* User Information */}
        <UserData
          totalMissionLog={labelingLog.length}
          processingMissionLog={unProcessedLogs}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}>
          <View>
            {dailyLogs.length === 0 ? (
              <View style={styles.emptyCardWrapper}>
                <EmptyCard description="아직 미션 알람을 수행하지 않았어요" />
              </View>
            ) : (
              dailyLogs.map(log => (
                <LabelingLogInfo
                  date={log.dateInfo}
                  isProcessed={log.processStatus}
                  labeledLog={log.dailyInfo}
                  key={log.dateInfo}
                />
              ))
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default ProcessingLabelingInfo;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: 'white',
  },
  profileWrapper: {
    flex: 1,
  },
  emptyCardWrapper: {
    paddingVertical: 100,
  },
});
