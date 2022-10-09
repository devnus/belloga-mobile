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
  const [boundingBoxList, setBoundingBoxList] = useState<boundingBoxTypes>([]);
  const [boundingBoxIndex, setBoundingBoxIndex] = useState<number>(0);
  const accessToken = useGetAccessToken();

  useEffect(() => {
    setAlarm(receivedAlarm);
    getAlarmInfo(accessToken, setBoundingBoxList, setImageUrl, setLoading);
  }, []);

  const onPressSendButton = useCallback(() => {
    const currentIndex = boundingBoxIndex;
    const maxIndex = boundingBoxList.length - 1;
    const boundingBoxId = boundingBoxList[boundingBoxIndex].boundingBoxId;

    sendLabelingResult(boundingBoxId, answer, accessToken);

    if (currentIndex < maxIndex) {
      setBoundingBoxIndex(() => boundingBoxIndex + 1);
      setAnswer(() => '');
    } else {
      finishAlarm();
    }
  }, [boundingBoxList, boundingBoxIndex, answer]);

  const loadBoundingBox = useMemo(
    () => showBoundingBox(boundingBoxList[boundingBoxIndex], imageUrl),
    [boundingBoxList, boundingBoxIndex, imageUrl],
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
                setBoundingBoxList,
                setImageUrl,
                setLoading,
              )
            }
            underlayColor="#fff">
            <Text style={styles.buttonText}>새로고침티비</Text>
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
