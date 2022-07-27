import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
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
import axios, {AxiosError} from 'axios';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import {getAlarm, snoozeAlarm, stopAlarm} from '../modules/alarms';

const renderImage = (
  topPosition,
  bottomPosition,
  leftPosition,
  rightPosition,
) => {
  return (
    <View
      style={[
        styles.rectangle,
        {
          top: topPosition,
          bottom: bottomPosition,
          left: leftPosition,
          right: rightPosition,
        },
      ]}
    />
  );
};

const showBoundingBox = (boundingBoxInfo, imageUrl) => {
  console.log('showBoundingBox called');
  if (boundingBoxInfo) {
    const boundingboxId = boundingBoxInfo.boundingboxId;

    const xArray = boundingBoxInfo.x;
    const yArray = boundingBoxInfo.y;

    //boundingboxId, 왼쪽 위, 윈쪽아래, 오른쪽위, 오른쪽아래
    const topPosition = yArray[0];
    const bottomPosition = yArray[2];
    const leftPosition = xArray[0];
    const rightPosition = xArray[2];
  }

  return (
    <>
      <View style={{height: 200, width: 200}}>
        {imageUrl ? (
          <Image
            source={{
              uri: `${imageUrl}`,
            }}
            style={{height: 200, width: 200}}
          />
        ) : (
          <Text>로딩중</Text>
        )}
        {renderImage(40, 20, 20, 30)}
      </View>
    </>
  );
};

function AlarmRing({route, navigation}) {
  const [alarm, setAlarm] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [boundingBoxList, setboundingBoxList] = useState([]);
  const [boundingBoxIndex, setBoundingBoxIndex] = useState(0);

  useEffect(() => {
    const alarmUid = route.params.alarmUid;
    (async function () {
      const alarmInfo = await getAlarm(alarmUid);
      setAlarm(alarmInfo);
    })();

    getAlarmInfo();
  }, []);

  const increaseBoundingBoxIndex = useCallback(() => {
    const currentIndex = boundingBoxIndex;
    const maxIndex = boundingBoxList.length - 1;

    console.log(currentIndex, maxIndex, 'pressed!');

    if (currentIndex < maxIndex) {
      console.log('increas!');
      setBoundingBoxIndex(() => boundingBoxIndex + 1);
    } else {
      async () => {
        console.log('is async?');
        await stopAlarm();
        navigation.goBack();
      };
    }
  }, [boundingBoxList, boundingBoxIndex, navigation]);

  const loadBoundingBox = useMemo(
    () => showBoundingBox(boundingBoxList[boundingBoxIndex], imageUrl),
    [boundingBoxList, boundingBoxIndex, imageUrl],
  );

  const getAlarmInfo = async () => {
    try {
      await axios
        .get<{data: string}>(
          `http://a138b0b67de234557afc8eaf29aa97b6-1258302528.ap-northeast-2.elb.amazonaws.com/api/data/v1/target/OCR`,
        )
        .then(res => {
          console.log(res.data.response.boundingBox);
          setboundingBoxList(() => res.data.response.boundingBox);
          setImageUrl(() => res.data.response.imageUrl);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(() => true);
    }
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
        {loading ? loadBoundingBox : <Text> Loading </Text>}
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
            onPress={increaseBoundingBoxIndex}>
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
