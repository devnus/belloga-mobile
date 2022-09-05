import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Alarm, {
  removeAlarm,
  scheduleAlarm,
  updateAlarm,
} from '../modules/alarms';
import TextInput from '../components/AlarmSetting/TextInput';
import DayPicker from '../components/AlarmSetting/DayPicker';
import TimePicker from '../components/AlarmSetting/TimePicker';
import Button from '../components/Button';
import AlarmSettingDetail from '../components/AlarmSetting/AlarmSettingDetail';
import {SafeAreaView} from 'react-native-safe-area-context';
import SettingTitleText from '../components/AlarmSetting/SettingTitleText';

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
    console.log('눌렸뜸', updates);
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
    console.log('alarmSettings', alarm);
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
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
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

      <View style={styles.selectionsContainer}>
        <View style={styles.scrollView}>
          <ScrollView>
            <DayPicker
              onChange={v => update([['days', v]])}
              activeDays={alarm.days}
            />
            <TextInput
              description={'알람 이름'}
              onChangeText={v => update([['title', v]])}
              value={alarm.title}
            />

            <SettingTitleText text="설정" />
            <View style={styles.settingsDetailContainer}>
              <AlarmSettingDetail
                detailTitle="공휴일에 알람 끄기"
                detailDiscription="대체 공휴일, 임시 공휴일 미포함"
              />
              <AlarmSettingDetail
                detailTitle="소리"
                detailDiscription="어쩔티비"
              />
              <AlarmSettingDetail detailTitle="진동" detailDiscription="On" />

              <AlarmSettingDetail
                detailTitle="다시 울림"
                detailDiscription="5분 간격으로 다시 울림"
              />
            </View>

            {mode === 'EDIT' && <Button onPress={onDelete} title={'삭제'} />}
          </ScrollView>
        </View>

        <View style={styles.buttonContainer}>
          {/* {mode === 'EDIT' && <Button onPress={onDelete} title={'Delete'} />} */}
          <View style={styles.buttonBox}>
            <Button
              onPress={() => {
                navigation.goBack();
              }}
              title={'취소'}
            />
          </View>
          <View style={styles.buttonBox}>
            <Button fill={true} onPress={onSave} title={'저장'} />
          </View>
        </View>
      </View>
    </View>
  );
}

export default AlarmSettings;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f2f6f7',
    justifyContent: 'space-between',
    flex: 1,
  },
  inputsContainer: {
    justifyContent: 'center',
    flex: 2,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
  },
  selectionsContainer: {
    flex: 3,
  },
  scrollView: {
    paddingHorizontal: 13,
    paddingTop: 24.5,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: 'white',
    flex: 3,
  },
  settingsDetailContainer: {
    borderTopColor: '#dce2e3',
    borderTopWidth: 1,
    paddingTop: 10,
  },
  buttonBox: {
    flex: 1,
  },
});
