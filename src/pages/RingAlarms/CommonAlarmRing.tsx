import React, {useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import Button from '@components/Button';
import Alarm, {snoozeAlarm, stopAlarm} from '@modules/alarms';
import {toStringOnlyDates} from '@/modules/calcAlarmsTime';
import styled from 'styled-components/native';
import {saveAlarm} from '@/modules/getAlarmLog';

function CommonAlarmRing({route, navigation, receivedAlarm}) {
  const [alarm, setAlarm] = useState<Alarm | undefined>();

  useEffect(() => {
    setAlarm(receivedAlarm);
  }, []);

  const finishAlarm = async () => {
    await stopAlarm();
    saveAlarm('common');
    navigation.goBack();
  };

  if (!alarm) {
    return <View />;
  }

  return (
    <View style={globalStyles.container}>
      <ImageBackground
        source={require('@assets/images/bg_illust.png')}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <View style={[globalStyles.innerContainer, styles.container]}>
          <View style={styles.textContainer}>
            <StyledText style={styles.clockText}>
              {alarm.getTimeString().hour} : {alarm.getTimeString().minutes}{' '}
            </StyledText>
            <StyledText style={styles.clockDateText}>
              {toStringOnlyDates(new Date())}{' '}
            </StyledText>
            <Text style={styles.title}>{alarm.title}</Text>
          </View>
          <View style={styles.buttonContainer}>
            {alarm.snoozeInterval > 0 && (
              <Button
                title={'Snooze'}
                fill={true}
                onPress={async () => {
                  await snoozeAlarm();
                  navigation.goBack();
                }}
              />
            )}

            <Button
              title={'Cancel'}
              fill={true}
              onPress={async () => {
                finishAlarm();
              }}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default CommonAlarmRing;

const StyledText = styled.Text`
  text-shadow-color: rgba(0, 0, 0, 0.25);
  text-shadow-offset: 0px 0px;
  text-shadow-radius: 10px;
  shadow-opacity: 0.5;
`;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  clockText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 50,
    shadowColor: '#bcbcbc',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
  },
  clockDateText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
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
    flex: 1,
    justifyContent: 'center',
  },
  innerContainer: {
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
