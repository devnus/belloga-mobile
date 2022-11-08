import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Titles from '@/components/Common/Titles';
import Header from '@/components/Common/Header';
import EmptyCard from '@/components/Common/EmptyCard';
import {
  alarmLogType,
  loadAlarm,
  saveAlarm,
  totalAlarmLog,
} from '@/modules/AsyncStorage/getAlarmLog';
import {useIsFocused} from '@react-navigation/native';
import AlarmLog from '@/components/AlarmLog/AlarmLog';

MaterialCommunityIcons.loadFont();

function AlarmLogPage({route, navigation}) {
  const [alarmLog, setAlarmLog] = useState<alarmLogType[] | undefined>([]);
  const isFocused: boolean = useIsFocused();

  useEffect(() => {
    if (isFocused === true) {
      loadAlarm().then(data => {
        setAlarmLog(() => data);
        console.log(data);
      });
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.scrollView}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}>
          <Header />
          <View style={styles.bodyWrapper}>
            <Titles
              title="나의 기상 기록"
              description="일어난 기록을 확인해보세요"
            />
          </View>
          {alarmLog?.length === 0 ? (
            <View style={styles.emptyCardWrapper}>
              <EmptyCard description="아직 기상 기록이 없어요" />
            </View>
          ) : (
            alarmLog?.map((log: alarmLogType) => (
              <AlarmLog
                alarmDate={log.alarmDate}
                alarmLogArr={log.alarmLog}
                key={log.alarmDate}
              />
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
}

export default AlarmLogPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  scrollView: {
    backgroundColor: 'white',
    flex: 1,
  },
  bodyWrapper: {
    flex: 5,
    marginBottom: 20,
  },
  emptyCardWrapper: {
    paddingVertical: 150,
  },
});
