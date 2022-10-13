import React, {useEffect, useState} from 'react';
import {BackHandler, ScrollView, StyleSheet, View} from 'react-native';
import Alarm, {
  removeAlarm,
  scheduleAlarm,
  showAlarmToastMessage,
  updateAlarm,
} from 'modules/alarms';
import TextInput from 'components/AlarmSetting/TextInput';
import DayPicker from 'components/AlarmSetting/DayPicker';
import TimePicker from 'components/AlarmSetting/TimePicker';
import Button from 'components/Button';
import AlarmSettingDetail from 'components/AlarmSetting/AlarmSettingDetail';
import SettingTitleText from 'components/AlarmSetting/SettingTitleText';
import {calcAlarmRingTime} from 'modules/calcAlarmsTime';
import {useAppDispatch} from '@/store';
import alertSlice from '@/slices/alert';

export type AlarmType = {
  active: boolean;
  days: number[];
  description: string;
  enabled: boolean;
  hour: number;
  minutes: number;
  repeating: boolean;
  snoozeInterval: number;
  title: string;
  uid: string;
  isSoundOn: boolean;
  isVibrateOn: boolean;
  isMissionAlert: boolean;
};

function AlarmSettings({route, navigation}) {
  //뒤로가기 버튼 누를 때 핸들링, 덮어쓴다

  const [alarm, setAlarm] = useState<Alarm>(null);
  const [mode, setMode] = useState<string>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (route.params && route.params.alarm) {
      const deliveredAlarm = route.params.alarm;

      if (deliveredAlarm.repeating === false) {
        deliveredAlarm.days = [];
      }

      setAlarm(new Alarm(deliveredAlarm));
      setMode('EDIT');
    } else {
      setAlarm(new Alarm());
      setMode('CREATE');
    }
  }, []);

  /**
  업데이트 시키는 함수를 넣으면 알람 정보에 있는 걸 업데이트 시켜주는 함수
   * @param updates : 
   */
  function update(updates) {
    const a: Alarm = Object.assign({}, alarm);
    for (let u of updates) {
      a[u[0]] = u[1];
    }
    console.log('눌렸뜸', updates);
    setAlarm(a);
  }

  /**
   * 해당 알람을 저장할 떄, 만약 날짜를 지정하지 않았다면 repeating을 true or false로 지정한다.
   */

  async function onSave() {
    if (alarm.days.length === 0) {
      alarm.repeating = false;
      const day: number = calcAlarmRingTime(alarm.hour, alarm.minutes);
      alarm.days = [day];
    } else {
      alarm.repeating = true;
    }

    if (mode === 'EDIT') {
      await updateAlarm(alarm);
      await showAlarmToastMessage(alarm);
    }
    if (mode === 'CREATE') {
      await scheduleAlarm(alarm);
      await showAlarmToastMessage(alarm);
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
            <SettingTitleText text="알람 모드" />
            <View style={styles.buttonContainer}>
              {/* {mode === 'EDIT' && <Button onPress={onDelete} title={'Delete'} />} */}
              <View style={styles.buttonBox}>
                <Button
                  onPress={() => {
                    dispatch(
                      alertSlice.actions.setAlert({
                        isOpen: true,
                        titleMessage: '준비중인 기능입니다',
                        middleMessage: '다음 업데이트를 기대해주세요!',
                      }),
                    );
                  }}
                  title={'미션 알람'}
                  custom={true}
                  borderColor={alarm.isMissionAlert ? '#54a5bc' : '#c1c6c7'}
                  backgroundColor={alarm.isMissionAlert ? '#54a5bc' : '#ffffff'}
                  textColor={alarm.isMissionAlert ? '#ffffff' : '#c1c6c7'}
                />
              </View>
              <View style={styles.buttonBox}>
                <Button
                  onPress={() => update([['isMissionAlert', false]])}
                  title={'일반 알람'}
                  custom={true}
                  borderColor={!alarm.isMissionAlert ? '#54a5bc' : '#c1c6c7'}
                  backgroundColor={
                    !alarm.isMissionAlert ? '#54a5bc' : '#ffffff'
                  }
                  textColor={!alarm.isMissionAlert ? '#ffffff' : '#c1c6c7'}
                />
              </View>
            </View>

            <SettingTitleText text="설정" />
            <View style={styles.settingsDetailContainer}>
              <AlarmSettingDetail
                detailTitle="진동"
                detailDescription="진동을 설정합니다"
                isActive={alarm.isVibrateOn}
                onChange={(v: boolean) => update([['isVibrateOn', v]])}
              />
              <AlarmSettingDetail
                detailTitle="소리"
                detailDescription="소리를 설정합니다"
                isActive={alarm.isSoundOn}
                onChange={(v: boolean) => update([['isSoundOn', v]])}
              />
              <AlarmSettingDetail
                detailTitle="다시 울림"
                detailDescription="알람이 꺼져도 잠시 후 다시 울립니다"
                isActive={alarm.snoozeInterval > 0}
                onChange={(v: boolean) =>
                  update([['snoozeInterval', v ? 1 : 0]])
                }
              />
              {/* 
              snoozeInterval이 0이면 snooze 없음, number type를 boolean 으로 처리해주는 방식이다. */}
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
    paddingTop: 40,
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
