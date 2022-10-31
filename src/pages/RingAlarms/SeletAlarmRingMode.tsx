import React, {useEffect, useState} from 'react';
import Alarm, {getAlarm} from '@modules/alarms';
import LabelingAlarmRing from './LabelingAlarmRing';
import CommonAlarmRing from './CommonAlarmRing';
import {Text} from 'react-native';
import {useCheckNetwork} from '@/hooks/useCheckNetwork';

function SelectAlarmRingMode({route, navigation}) {
  const [alarm, setAlarm] = useState<Alarm | undefined>();
  const connectionInfo = useCheckNetwork();

  useEffect(() => {
    const alarmUid = route.params.alarmUid;
    (async function () {
      const alarmInfo = await getAlarm(alarmUid);
      console.log('불러온 알람', alarm);
      setAlarm(alarmInfo);
    })();
  }, []);

  if (!alarm) {
    return <Text> 로딩중입니다!</Text>;
  }

  return (
    <>
      {alarm?.isMissionAlert === true && connectionInfo === true ? (
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
