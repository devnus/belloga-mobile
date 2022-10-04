import React, {useEffect, useState} from 'react';
import Alarm, {getAlarm} from '@modules/alarms';
import LabelingAlarmRing from './LabelingAlarmRing';
import CommonAlarmRing from './CommonAlarmRing';
import {Text} from 'react-native';

function SelectAlarmRingMode({route, navigation}) {
  const [alarm, setAlarm] = useState<Alarm | undefined>();

  useEffect(() => {
    const alarmUid = route.params.alarmUid;
    (async function () {
      const alarmInfo = await getAlarm(alarmUid);
      setAlarm(alarmInfo);
    })();
  }, []);

  if (!alarm) {
    return <Text> 로딩중입니다!</Text>;
  }

  return (
    <>
      {alarm?.isMissionAlert ? (
        <LabelingAlarmRing
          route={route}
          navigation={navigation}
          receivedAlarm={alarm}
        />
      ) : (
        <CommonAlarmRing
          route={route}
          navigation={navigation}
          receivedAlarm={alarm}
        />
      )}
    </>
  );
}

export default SelectAlarmRingMode;
