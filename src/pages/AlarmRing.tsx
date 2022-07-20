import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DismissKeyboardView from '../components/DismissKeyboardView';
import axios, {AxiosError} from 'axios';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import {getAlarm, snoozeAlarm, stopAlarm} from '../modules/alarms';

function AlarmRing({route, navigation}) {
  const [alarm, setAlarm] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    const alarmUid = route.params.alarmUid;
    (async function () {
      const alarmInfo = await getAlarm(alarmUid);
      setAlarm(alarmInfo);
    })();

    getAlarmInfo();
  }, []);

  const getAlarmInfo = async () => {
    await axios
      .get<{data: string}>(`http://10.0.2.2:4000/OCR`)
      .then(res => {
        setImageUrl(() => res.data.response.imageUrl);
      })
      .catch(error => console.log(error));
  };

  // const onSubmit = useCallback(async () => {
  //   if (!answer || !answer.trim()) {
  //     return Alert.alert('알림', '정답을 입력해주세요.');
  //   }

  //   console.log(answer);
  //   try {
  //     const response = await axios.post(`${Config.API_URL}/user`, {});
  //     console.log(response.data);
  //     Alert.alert('알림', '기록 되었습니다.');
  //     navigation.navigate('SignIn');
  //   } catch (error) {
  //     const errorResponse = (error as AxiosError).response;
  //     console.error(errorResponse);
  //     if (errorResponse) {
  //       Alert.alert('알림', errorResponse.data.message);
  //     }
  //   }
  // }, [answer]);

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
        <View>
          <Image
            source={{
              uri: `${imageUrl}`,
            }}
            style={{height: 200, width: 200}}
          />
        </View>
        <View>
          <TextInput
            description={'answer'}
            style={styles.textInput}
            onChangeText={text => setAnswer(text)}
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
            onPress={async () => {
              await stopAlarm();
              navigation.goBack();
            }}>
            <Text>Stop</Text>
          </Pressable>

          <Button
            title={'Snooze'}
            onPress={async () => {
              await snoozeAlarm();
              navigation.goBack();
            }}
          />
        </View>
      </View>
    </View>
  );
}

export default AlarmRing;

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
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonActive: {
    backgroundColor: 'blue',
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
