import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import colors from '@/assets/constants/colors';
import {totalAlarmLog} from '@/modules/AsyncStorage/getAlarmLog';

type AlarmLogProps = {
  alarmDate: string;
  alarmLogArr: totalAlarmLog[];
};
function AlarmLog({alarmDate, alarmLogArr}: AlarmLogProps) {
  return (
    <View style={styles.giftRoundWrapper}>
      <View style={styles.giftInfoRow}>
        <View style={styles.giftDescribe}>
          <Text style={styles.titlesMainTitle}>{alarmDate}</Text>

          {alarmLogArr.map((log: totalAlarmLog) => {
            const date: Date = new Date(log.todayDate as string);
            const alarmType = log.alarmType;

            return (
              <View style={styles.applyInfo} key={log.alarmDate}>
                <Text style={styles.joiningInfo}>
                  {date.getHours()} :{date.getMinutes()}
                </Text>
                <Text
                  style={
                    alarmType === 'common'
                      ? styles.commonText
                      : styles.missionText
                  }>
                  {alarmType === 'common' ? '일반 알람' : '미션 알람'}
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
  },
  titlesMainTitle: {
    fontSize: 16,
    color: colors.textDark,
    fontWeight: 'bold',
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    paddingVertical: 10,
  },
  giftWrapper: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  giftDescribe: {
    width: '100%',
    flexDirection: 'column',
  },
  giftInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  commonText: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: colors.green,
    color: 'white',
    fontSize: 12,
  },
  missionText: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: colors.navy,
    color: 'white',
    fontSize: 12,
  },
});

export default AlarmLog;
