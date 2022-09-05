import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
          <Text style={styles.title}> {hour < 12 ? 'AM' : 'PM'}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.rightInnerContainer}>
          <SwitcherInput isActive={isActive} onToggle={onChange} />
        </View>
      </View>

      <View style={styles.descContainer}>
        <Text>{getAlphabeticalDays(days)}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default AlarmInfo;

function getAlphabeticalDays(days: any) {
  let weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  let activeDays = [];
  for (let i = 0; i < days.length; i++) {
    activeDays.push(weekdays[parseInt(days[i])] + ' ');
  }
  return activeDays;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    height: 100,
    display: 'flex',
    justifyContent: 'space-between',
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
    margin: 5,
    marginRight: 0,
    flex: 1,
    alignItems: 'flex-end',
  },
  descContainer: {
    flexDirection: 'row',
    color: 'grey',
    flex: 1,
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
    marginHorizontal: 10,
  },
});
