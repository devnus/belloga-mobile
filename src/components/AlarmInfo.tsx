import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SwitcherInput from './SwitcherInput';

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
  const [isEnabled, setIsEnabled] = useState(isActive);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    onChange(isEnabled);
  };
  return (
    <TouchableOpacity onPress={() => onPress(uid)} style={styles.container}>
      <View style={styles.alarmUpperBlock}>
        <View style={styles.leftInnerContainer}>
          <Image
            source={require('../assets/images/watch.png')}
            style={styles.clockIcon}
          />
          <Text style={styles.clock}>
            {hour < 10 ? '0' + hour : hour}:
            {minutes < 10 ? '0' + minutes : minutes}
          </Text>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.rightInnerContainer}>
          <SwitcherInput isOn={isEnabled} onToggle={toggleSwitch} />
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
  let weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sa t'];
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
  },
  alarmUpperBlock: {
    alignItems: 'center',
    flexDirection: 'row',
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
