import {MaterialCommunityIcons} from '@expo/vector-icons';
import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../assets/colors';
import Button from './Button';
import {CalcCircularView} from '@/modules/calcCircularView';

function Stamp() {
  const [stampNumbers, setStampNumbers] = useState<number>(0);

  const windowWidth = Dimensions.get('window').width * 0.9;
  const windowHeight = Dimensions.get('window').height * 0.9;
  const imgSize = 60;

  const displayStamps = (sNums: number) => {
    const stampStyles: StyleProp<ImageStyle>[] = CalcCircularView(
      windowWidth,
      imgSize,
    );
    let stampIcons = [];
    for (let i = 0; i < 8; ++i) {
      if (i < sNums) {
        stampIcons.push(
          <Image
            source={require('@/assets/images/stamp.png')}
            style={stampStyles[i]}
          />,
        );
      } else {
        stampIcons.push(
          <TouchableHighlight
            key={i}
            style={stampStyles[i]}
            underlayColor="#DDDDDD">
            <Text style={styles.stampInsideText}>{i}</Text>
          </TouchableHighlight>,
        );
      }
    }
    return stampIcons;
  };

  return (
    <SafeAreaView style={styles.popularWrapper}>
      <View
        style={[
          styles.popularCardWrapper,
          {
            marginTop: 15,
          },
        ]}>
        <Text style={styles.titlesBoldTitle}>스탬프 찍기</Text>
        <View style={styles.popularTopWrapper}>
          <MaterialCommunityIcons
            name="crown"
            size={12}
            color={colors.primary}
          />
          <Text style={styles.popularTopText}>
            500P를 모으면 스탬프 한개를 받을 수 있어요.
          </Text>
        </View>
        <Text style={styles.popularTopText}>내가 응모한 커피 개수 : 9개 </Text>

        {stampNumbers < 10 ? (
          <TouchableOpacity
            style={styles.pressStampBtn}
            onPress={() => {
              setStampNumbers(() => stampNumbers + 1);
              Alert.alert('알림', '500포인트를 소모하여 스탬프를 찍었습니다');
            }}>
            <LinearGradient
              colors={['#b4eee7', '#b4e2ed', '#b4e1ee']}
              style={styles.linearGradient}>
              <Text style={styles.pressBtnInsideText}> STAMP</Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <Button title="커피 응모" onPress={() => {}} />
        )}
      </View>

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            borderRadius: Math.round(windowWidth + windowHeight) / 2,
            width: windowWidth * 0.8,
            height: windowWidth * 0.8,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {displayStamps(stampNumbers)}
          {/* <Image
            source={require('@/assets/images/stamp.png')}
            style={{
              height: imgSize,
              width: imgSize,
              position: 'absolute',
              bottom: windowWidth * 0.8 - imgSize,
            }}
          />
          <Image
            source={require('@/assets/images/stamp.png')}
            style={{
              height: imgSize,
              width: imgSize,
              position: 'absolute',
              bottom: diagonalVerticalPosition,
              right: diagonalHorizontalPosition,
            }}
          />
          <Image
            source={require('@/assets/images/stamp.png')}
            style={{
              height: imgSize,
              width: imgSize,
              position: 'absolute',
              bottom: diagonalVerticalPosition,
              left: diagonalHorizontalPosition,
            }}
          />
          <Image
            source={require('@/assets/images/stamp.png')}
            style={{
              height: imgSize,
              width: imgSize,
              position: 'absolute',
              top: windowWidth * 0.8 - imgSize,
            }}
          />
          <Image
            source={require('@/assets/images/stamp.png')}
            style={{
              height: imgSize,
              width: imgSize,
              position: 'absolute',
              top: diagonalVerticalPosition,
              right: diagonalHorizontalPosition,
            }}
          />
          <Image
            source={require('@/assets/images/stamp.png')}
            style={{
              height: imgSize,
              width: imgSize,
              position: 'absolute',
              top: diagonalVerticalPosition,
              left: diagonalHorizontalPosition,
            }}
          />
          <Image
            source={require('@/assets/images/stamp.png')}
            style={{
              height: imgSize,
              width: imgSize,
              position: 'absolute',
              bottom: windowWidth * 0.4 - imgSize / 2,
              left: 0,
            }}
          />
          <Image
            source={require('@/assets/images/stamp.png')}
            style={{
              height: imgSize,
              width: imgSize,
              position: 'absolute',
              bottom: windowWidth * 0.4 - imgSize / 2,
              right: 0,
            }}
          /> */}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Stamp;

const styles = StyleSheet.create({
  popularWrapper: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  popularCardWrapper: {
    backgroundColor: colors.white,
    borderRadius: 25,
    paddingVertical: 20,
    marginVertical: 30,
    paddingLeft: 20,
  },
  popularTopWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularTopText: {
    marginLeft: 10,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
  },
  titlesBoldTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#0f5078',
  },
  stampContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: 300,
    marginVertical: 20,
    marginTop: 40,
  },
  nonCheckedStamp: {
    borderRadius: 25,
    width: 50,
    height: 50,
    marginHorizontal: 5,
    marginVertical: 2,
    borderColor: '#d2e3e1',
    borderWidth: 2,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stampInsideText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#d2e3e1',
  },
  stampImage: {
    borderRadius: 25,
    width: 50,
    height: 50,
    marginHorizontal: 5,
    marginVertical: 2,
  },
  linearGradient: {
    borderRadius: 5,
  },
  pressStampBtn: {
    width: 300,
  },
  pressBtnInsideText: {
    marginVertical: 15,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
