import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

import Button from '@components/Button';
import TextInput from '@components/AlarmSetting/TextInput';
import Alarm, {snoozeAlarm, stopAlarm} from '@/modules/alarms';
import {useGetAccessToken} from '@/hooks/useAuthInfo';
import {showBoundingBox} from '@/components/AlarmRing/RenderImage';
import {
  boundingBoxTypes,
  getAlarmInfo,
  sendLabelingResult,
} from '@/modules/labelingAPIs';
import AlarmTime from '@/components/AlarmRing/AlarmTime';
import ampInstance from '@/amplitude';
import {saveAlarm} from '@/modules/AsyncStorage/getAlarmLog';
import colors from '@/assets/constants/colors';

function LabelingAlarmRing({route, navigation, receivedAlarm}) {
  const [alarm, setAlarm] = useState<Alarm | undefined>();
  const [imageUrl, setImageUrl] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [boundingBoxInfo, setBoundingBoxInfo] = useState<boundingBoxTypes>();
  const accessToken = useGetAccessToken();

  useEffect(() => {
    ampInstance.logEvent('MISSON_ALERT_START');
    setAlarm(receivedAlarm);
    if (accessToken !== '') {
      getAlarmInfo(accessToken, setBoundingBoxInfo, setImageUrl, setLoading);
    }

    return;
  }, [accessToken]);

  const onPressSendButton = useCallback(() => {
    ampInstance.logEvent('SEND_MISSION_ALARM');
    const boundingBoxId = boundingBoxInfo?.boundingBoxId;

    sendLabelingResult(boundingBoxId, answer, accessToken);

    const finishAlarm = async () => {
      await stopAlarm();
      saveAlarm('Mission');
      navigation.navigate('AlarmSuccess');
    };

    finishAlarm();
  }, [boundingBoxInfo, answer, accessToken, navigation]);

  const loadBoundingBox = useMemo(
    () => showBoundingBox(boundingBoxInfo, imageUrl),
    [boundingBoxInfo, imageUrl],
  );

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
            <AlarmTime
              hour={alarm.getTimeString().hour}
              minutes={alarm.getTimeString().minutes}
            />

            <Text style={styles.title}>{alarm.title}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              ampInstance.logEvent('REFRESH_MISSION_ALARM');
              getAlarmInfo(
                accessToken,
                setBoundingBoxInfo,
                setImageUrl,
                setLoading,
              );
            }}>
            <Text style={styles.guideText}>새로고침</Text>
          </TouchableOpacity>

          {loading ? (
            loadBoundingBox
          ) : (
            <View style={styles.loadingStyle}>
              <ActivityIndicator size="large" />
            </View>
          )}
          {/* <Text style={styles.guideText}>
            만약 이미지가 없다면 "없음"을 입력해주세요
          </Text> */}
          <View>
            <TextInput
              description={'정답 입력'}
              onChangeText={(text: string) => setAnswer(text)}
              value={answer}
              placeholder={' 이미지 안에 보이는 글자를 입력해주세요.'}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Pressable disabled={!answer} onPress={onPressSendButton}>
              <Text
                style={[
                  answer
                    ? styles.loginButtonActive
                    : styles.loginButtonInactive,
                  styles.loginButton,
                ]}>
                알람 종료
              </Text>
            </Pressable>

            {alarm.snoozeInterval > 0 && (
              <Button
                title={'다시 울림'}
                fill={true}
                onPress={async () => {
                  await snoozeAlarm();
                  navigation.goBack();
                }}
              />
            )}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default LabelingAlarmRing;

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
    borderRadius: 25,
  },
  loginButtonInactive: {
    backgroundColor: '#d0d5dc',
    borderColor: '#d0d5dc',
    color: 'black',
  },
  loginButtonActive: {
    backgroundColor: '#0f5078',
    borderColor: '#0f5078',
    color: 'white',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  guideText: {
    backgroundColor: colors.background,
    color: colors.gray,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    opacity: 0.9,
  },
  loadingStyle: {
    height: 200,
    width: 200,
    justifyContent: 'center',
    backgroundColor: '#d0d5dc',
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
