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
  let topPosition;
  let bottomPosition;
  let leftPosition;
  let rightPosition;

  console.log('showBoundingBox called');
  if (boundingBoxInfo) {
    const xArray = boundingBoxInfo.x;
    const yArray = boundingBoxInfo.y;

    //boundingboxId, 왼쪽 위, 윈쪽아래, 오른쪽위, 오른쪽아래
    topPosition = yArray[0];
    bottomPosition = yArray[2];
    leftPosition = xArray[0];
    rightPosition = xArray[2];
  }

  return (
    <>
      <View style={{height: 200, width: 200}}>
        {imageUrl && boundingBoxInfo ? (
          <>
            <Image
              source={{
                uri: `${imageUrl}`,
              }}
              style={{height: 200, width: 200}}
            />
            {renderImage(
              topPosition,
              bottomPosition,
              leftPosition,
              rightPosition,
            )}
          </>
        ) : (
          <Text>로딩중</Text>
        )}
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

  const onPressSendButton = useCallback(() => {
    const currentIndex = boundingBoxIndex;
    const maxIndex = boundingBoxList.length - 1;
    const boundingBoxId = boundingBoxList[boundingBoxIndex].boundingBoxId;

    sendLabelingResult(boundingBoxId, answer);

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
    navigation.goBack();
  };

  const getAlarmInfo = async () => {
    try {
      await axios
        .get<{data: string}>(
          `http://a138b0b67de234557afc8eaf29aa97b6-1258302528.ap-northeast-2.elb.amazonaws.com/api/data/v1/target/OCR`,
        )
        .then(res => {
          console.log('got response', res.data);
          const boundingBoxData = {
            boundingBoxId: res.data.response.boundingBoxId,
            x: res.data.response.x,
            y: res.data.response.y,
          };
          setboundingBoxList(() => [boundingBoxData]);
          setImageUrl(() => res.data.response.imageUrl);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(() => true);
    }
  };

  const sendLabelingResult = async (boundingBoxId, lebelText) => {
    try {
      await axios
        .post(
          `https://api.belloga.com/api/labeled-data/v1/ocr-data`,
          {
            boundingBoxId: boundingBoxId,
            label: lebelText,
          },
          {
            headers: {
              Authorization:
                'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IkxBQkVMRVIiLCJ1c2VySWQiOiJZNTN4Q0pxSE96MGdXMUUybmVENm4zcTFmOUwrL0YzdHBJcXU5c0UrZG51a1NwNURqeVVYK0UyeVprY3FFdmpuIiwic3ViIjoiYWNjZXNzVG9rZW4iLCJleHAiOjE2OTQ5MDgxMjN9.TwMTd4lZubepa5m3dF3PsMKpjGokF_yDK7siV0BBDSU',
            },
          },
        )
        .then(res => {
          console.log(res.data.success);
        });
    } catch (error) {
      console.log(error);
    } finally {
      // setLoading(() => true);
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
            onPress={onPressSendButton}>
            <Text>Stop</Text>
          </Pressable>

          <Button
            title={'Snooze'}
            onPress={async () => {
              await snoozeAlarm();
              navigation.navigate('AlarmSuccess');
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
