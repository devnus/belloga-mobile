import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

import axios from 'axios';
import Button from '../../components/Button';
import TextInput from '../../components/AlarmSetting/TextInput';
import Alarm, {getAlarm, snoozeAlarm, stopAlarm} from '../../modules/alarms';
import {CalcBoundingBoxOnImage} from '@/modules/calcBoundingBox';
import Config from 'react-native-config';

function RenderImage({boundingBoxInfo, imageUrl}) {
  const [topPosition, setTopPosition] = useState(0);
  const [bottomPosition, setBottomPosition] = useState(0);
  const [leftPosition, setLeftPosition] = useState(0);
  const [rightPosition, setRightPosition] = useState(0);

  useEffect(() => {
    const xArray = boundingBoxInfo.x;
    const yArray = boundingBoxInfo.y;
    Image.getSize(imageUrl, (width, height) => {
      const positionResultArray = CalcBoundingBoxOnImage(
        xArray,
        yArray,
        width,
        height,
      );
      //boundingBboxId, 왼쪽 위, 윈쪽아래, 오른쪽위, 오른쪽아래
      setTopPosition(positionResultArray[0]);
      setBottomPosition(positionResultArray[1]);
      setLeftPosition(positionResultArray[2]);
      setRightPosition(positionResultArray[3]);
    });
  }, []);

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
}

const showBoundingBox = (boundingBoxInfo, imageUrl) => {
  console.log('showBoundingBox called');

  if (boundingBoxInfo && imageUrl) {
    return (
      <>
        <View style={{height: 200, width: 200}}>
          {imageUrl && boundingBoxInfo ? (
            <>
              <Image
                source={{
                  uri: `${imageUrl}`,
                }}
                style={{height: 200, width: 200, resizeMode: 'contain'}}
              />
              <RenderImage
                boundingBoxInfo={boundingBoxInfo}
                imageUrl={imageUrl}
              />
            </>
          ) : (
            <Text>로딩중</Text>
          )}
        </View>
      </>
    );
  }
};

function LabelingAlarmRing({route, navigation, receivedAlarm}) {
  const [alarm, setAlarm] = useState<Alarm | undefined>();
  const [imageUrl, setImageUrl] = useState('');
  const [answer, setAnswer] = useState<String>('');
  const [loading, setLoading] = useState(false);
  const [boundingBoxList, setboundingBoxList] = useState([]);
  const [boundingBoxIndex, setBoundingBoxIndex] = useState(0);

  useEffect(() => {
    setAlarm(receivedAlarm);
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
    navigation.navigate('AlarmSuccess');
  };

  const getAlarmInfo = async () => {
    try {
      await axios
        .get(`${Config.API_URL}/api/labeled-data/v1/ocr-data`)
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

  const sendLabelingResult = async (boundingBoxId, labelText) => {
    try {
      await axios
        .post(
          `${Config.API_URL}/api/labeled-data/v1/ocr-data`,
          {
            boundingBoxId: boundingBoxId,
            label: labelText,
          },
          {
            headers: {
              'labeler-id': 'gildong',
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
