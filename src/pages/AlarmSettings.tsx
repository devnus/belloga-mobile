import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Alarm, {
  removeAlarm,
  scheduleAlarm,
  updateAlarm,
} from '../modules/alarms';
import TextInput from '../components/TextInput';
import DayPicker from '../components/DayPicker';
import TimePicker from '../components/TimePicker';
import Button from '../components/Button';
import SwitcherInput from '../components/SwitcherInput';

function AlarmSettings({route, navigation}) {
  const [alarm, setAlarm] = useState(null);
  const [mode, setMode] = useState(null);

  useEffect(() => {
    if (route.params && route.params.alarm) {
      setAlarm(new Alarm(route.params.alarm));
      setMode('EDIT');
    } else {
      setAlarm(new Alarm());
      setMode('CREATE');
    }
  }, []);

  function update(updates) {
    const a = Object.assign({}, alarm);
    for (let u of updates) {
      a[u[0]] = u[1];
    }
    setAlarm(a);
  }

  async function onSave() {
    if (mode === 'EDIT') {
      alarm.active = true;
      await updateAlarm(alarm);
    }
    if (mode === 'CREATE') {
      await scheduleAlarm(alarm);
    }
    console.log('alarmSettings', 'setting Complete');
    navigation.goBack();
  }

  async function onDelete() {
    await removeAlarm(alarm.uid);
    navigation.goBack();
  }

  if (!alarm) {
    return <View />;
  }
  return (
    <View style={globalStyles.container}>
      <View style={[globalStyles.innerContainer, styles.container]}>
        <View styles={styles.inputsContainer}>
          <TimePicker
            onChange={(h, m) =>
              update([
                ['hour', h],
                ['minutes', m],
              ])
            }
            hour={alarm.hour}
            minutes={alarm.minutes}
          />
        </View>

        <TextInput
          description={'Title'}
          style={styles.textInput}
          onChangeText={v => update([['title', v]])}
          value={alarm.title}
        />
        <TextInput
          description={'Description'}
          style={styles.textInput}
          onChangeText={v => update([['description', v]])}
          value={alarm.description}
        />

        <SwitcherInput
          description={'진동모드'}
          value={'진동모드'}
          onChange={v => v}
        />

        <SwitcherInput
          description={'Repeat'}
          value={alarm.repeating}
          onChange={v => update([['repeating', v]])}
        />
        {alarm.repeating && (
          <DayPicker
            onChange={v => update([['days', v]])}
            activeDays={alarm.days}
          />
        )}

        <View style={styles.buttonContainer}>
          {mode === 'EDIT' && <Button onPress={onDelete} title={'Delete'} />}
          <Button fill={true} onPress={onSave} title={'Save'} />
        </View>
      </View>
    </View>
  );
}

export default AlarmSettings;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
  },
  inputsContainer: {
    width: '100%',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
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
