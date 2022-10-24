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
            <Text style={styles.clockText}>
              {alarm.getTimeString().hour} : {alarm.getTimeString().minutes}
            </Text>
            <Text style={styles.title}>{alarm.title}</Text>
          </View>
          <TouchableHighlight
            style={styles.button}
            onPress={() =>
              getAlarmInfo(
                accessToken,
                setBoundingBoxInfo,
                setImageUrl,
                setLoading,
              )
            }
            underlayColor="#fff">
            <Text style={styles.buttonText}>새로고침</Text>
          </TouchableHighlight>
          {loading ? loadBoundingBox : <Text> Loading </Text>}
          <View>
            <TextInput
              description={'answer'}
              onChangeText={(text: String) => setAnswer(text)}
              value={answer}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Pressable
              style={
                answer
                  ? StyleSheet.compose(
                      styles.loginButton,
                      styles.loginButtonActive,
                    )
                  : styles.loginButton
              }
              disabled={!answer}
              onPress={onPressSendButton}>
              <Text>Stop</Text>
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
    borderColor: '#1992fe',
    borderRadius: 25,
  },
  loginButtonActive: {
    backgroundColor: 'whited',
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
