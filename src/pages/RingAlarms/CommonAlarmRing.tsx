import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Button from '@components/Button';
import Alarm, {snoozeAlarm, stopAlarm} from '@modules/alarms';

function CommonAlarmRing({route, navigation, receivedAlarm}) {
  const [alarm, setAlarm] = useState<Alarm | undefined>();

  useEffect(() => {
    setAlarm(receivedAlarm);
  }, []);

  const finishAlarm = async () => {
    await stopAlarm();
    navigation.navigate('AlarmSuccess');
  };

  if (!alarm) {
    return <View />;
  }

  return (
    <View style={globalStyles.container}>
      <View style={[globalStyles.innerContainer, styles.container]}>
        <View style={styles.textContainer}>
          <Text style={styles.clockText}>
            {alarm.getTimeString().hour} : {alarm.getTimeString().minutes}
          </Text>
          <Text style={styles.title}>{alarm.title}</Text>
        </View>
        <View style={styles.buttonContainer}>
          {alarm.snoozeInterval > 0 && (
            <Button
              title={'Snooze'}
              onPress={async () => {
                await snoozeAlarm();
                navigation.goBack();
              }}
            />
          )}

          <Button
            title={'Cancel'}
            onPress={async () => {
              finishAlarm();
            }}
          />
        </View>
      </View>
    </View>
  );
}

export default CommonAlarmRing;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  clockText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 50,
  },
  textContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#d0d5dc',
  },
  loginButton: {
    padding: 10,
    margin: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 2,
    borderColor: '#1992fe',
    borderRadius: 25,
  },
  loginButtonActive: {
    backgroundColor: 'whited',
  },
  rectangle: {
    borderWidth: 3,
    borderColor: 'red',
    position: 'absolute',
  },
});
const globalStyles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  innerContainer: {
    width: '90%',
    height: '90%',
    display: 'flex',
    alignItems: 'center',
  },
  scrollView: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
