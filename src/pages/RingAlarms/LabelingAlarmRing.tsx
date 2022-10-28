import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
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

function LabelingAlarmRing({route, navigation, receivedAlarm}) {
  const [alarm, setAlarm] = useState<Alarm | undefined>();
  const [imageUrl, setImageUrl] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [boundingBoxInfo, setBoundingBoxInfo] = useState<boundingBoxTypes>();
  const accessToken = useGetAccessToken();

  useEffect(() => {
    setAlarm(receivedAlarm);
    getAlarmInfo(accessToken, setBoundingBoxInfo, setImageUrl, setLoading);

    return;
  }, []);

  const onPressSendButton = useCallback(() => {
    const boundingBoxId = boundingBoxInfo?.boundingBoxId;

    sendLabelingResult(boundingBoxId, answer, accessToken);
    finishAlarm();
  }, [boundingBoxInfo, answer, accessToken]);

  const loadBoundingBox = useMemo(
    () => showBoundingBox(boundingBoxInfo, imageUrl),
    [boundingBoxInfo, imageUrl],
  );

  const finishAlarm = async () => {
    await stopAlarm();
    navigation.navigate('AlarmSuccess');
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
            <AlarmTime
              hour={alarm.getTimeString().hour}
              minutes={alarm.getTimeString().minutes}
            />

            <Text style={styles.title}>{alarm.title}</Text>
          </View>
          <TouchableHighlight
            onPress={() =>
              getAlarmInfo(
                accessToken,
                setBoundingBoxInfo,
                setImageUrl,
                setLoading,
              )
            }
            underlayColor="#fff">
            <Text>새로고침</Text>
          </TouchableHighlight>
          {loading ? loadBoundingBox : <Text> Loading </Text>}
          <View>
            <TextInput
              description={'answer'}
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
                Stop
              </Text>
            </Pressable>

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
