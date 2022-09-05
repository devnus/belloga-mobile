import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DayPicker from './AlarmSetting/DayPicker';
import SwitcherInput from './SwitcherInput';

// // type alarmInfoProps = {
//   uid,
//   hour,
//   minutes,
//   days,
//   title,
//   onPress,
//   isActive,
//   onChange,
// // };

function AlarmInfo({
  uid,
  hour,
  minutes,
  days,
  title,
  onPress,
  isActive,
  onChange,
}: any) {
  /**
   24시간 포맷으로 된 시간 정보를 넣으면 AM, PM 이 붙어 12시간 포맷으로 가공되는 함수다
   */
  function newHour(hour) {
    let changedHour;
    if (hour - 12 > 0) {
      changedHour = hour - 12;
    } else if (hour == 0) {
      changedHour = '12';
    } else {
      changedHour = hour;
    }
    return changedHour;
  }

  return (
    <TouchableOpacity onPress={() => onPress(uid)} style={styles.container}>
      <View style={styles.alarmUpperBlock}>
        <View style={styles.leftInnerContainer}>
          <Image
            source={require('../assets/images/watch.png')}
            style={styles.clockIcon}
          />
          <Text style={styles.clock}>
            {newHour(hour) < 10 ? '0' + newHour(hour) : newHour(hour)}:
            {minutes < 10 ? '0' + minutes : minutes}
          </Text>
          <Text style={styles.timeRange}> {hour < 12 ? 'AM' : 'PM'}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.rightInnerContainer}>
          <SwitcherInput isActive={isActive} onToggle={onChange} />
        </View>
      </View>
      <DayPicker activeDays={days} isDisabled={true} />
    </TouchableOpacity>
  );
}

export default AlarmInfo;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: '5%',
    height: 120,
    display: 'flex',
    justifyContent: 'space-between',
    shadowColor: '#4dd1d1d1',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.02,
    elevation: 10,
  },
  alarmUpperBlock: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 3,
  },
  leftInnerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  rightInnerContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  timeRange: {
    color: '#0f5078',
    fontSize: 18,
  },
  clock: {
    color: '#0f5078',
    fontSize: 25,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 12,
    color: '#8abccb',
    marginLeft: 7,
  },
  clockIcon: {
    width: 15,
    height: 15,

    marginRight: 5.5,
  },
});
