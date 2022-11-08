import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import colors from '@/assets/constants/colors';
import {totalAlarmLog} from '@/modules/AsyncStorage/getAlarmLog';
import {leftPad} from '@/modules/calcAlarmsTime';

type AlarmLogProps = {
  alarmDate: string;
  alarmLogArr: totalAlarmLog[];
};
function AlarmLog({alarmDate, alarmLogArr}: AlarmLogProps) {
  const sortedAlarmLog = alarmLogArr.sort();

  return (
    <View style={styles.giftRoundWrapper}>
      <View style={styles.giftInfoRow}>
        <View style={styles.giftDescribe}>
          <Text style={styles.titlesMainTitle}>{alarmDate}</Text>

          {sortedAlarmLog.map((log: totalAlarmLog) => {
            const date: Date = new Date(log.todayDate as string);
            const alarmType = log.alarmType;

            return (
              <View style={styles.applyInfo} key={date.getTime()}>
                <Text
                  style={
                    alarmType === 'common'
                      ? styles.commonText
                      : styles.missionText
                  }>
                  {alarmType === 'common' ? '일반 알람' : '미션 알람'}
                </Text>
                <Text style={styles.joiningInfo}>
                  {leftPad(date.getHours())} :{leftPad(date.getMinutes())}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titlesSubtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: colors.textDark,
  },
  joiningInfo: {
    fontSize: 14,
    color: colors.navy,
    marginLeft: 10,
  },
  titlesMainTitle: {
    fontSize: 16,
    color: colors.textDark,
    fontWeight: 'bold',
    borderBottomColor: colors.textLight,
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 10,
  },
  giftWrapper: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  giftDescribe: {
    width: '100%',
    flexDirection: 'column',
    paddingHorizontal: 4,
    paddingVertical: 20,
  },
  giftInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  giftRoundWrapper: {
    backgroundColor: '#f2f6f7',
    borderRadius: 25,
    marginVertical: 10,
    flexDirection: 'column',
  },
  applyInfo: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  commonText: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: colors.textLight,
    color: 'white',
    fontSize: 12,
  },
  missionText: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: colors.lightBlue,
    color: colors.textDark,
    fontSize: 12,
  },
});

export default AlarmLog;
