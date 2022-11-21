import colors from '@/assets/constants/colors';
import Button from '@/components/Button';
import CoinAnimation from '@/components/LottieAnimations/CoinAnimation';
import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';

function AlarmSuccess({route, navigation}) {
  const onPressSendButton = () => {
    navigation.navigate('Alarms');
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.backgroundImage}>
        <View style={[globalStyles.innerContainer, styles.container]}>
          <View style={styles.textContainer}>
            <Text style={styles.clockText}>미션 수행 완료!</Text>
            <View style={styles.descriptionStyle}>
              <Text style={styles.clockDateText}>
                미션이 심사를 통과하면 포인트가 지급됩니다.
              </Text>
              <Text style={styles.detailText}>(심사 결과는 설정 > 라벨링 심사 내역에서 확인 가능합니다.)</Text>
            </View>
          </View>
          <View style={styles.checkAnimationWrapper}>{CoinAnimation()}</View>
          <View style={styles.buttonContainer}>
            <Button onPress={onPressSendButton} title="확인" fill={true} />
          </View>
        </View>
      </View>
    </View>
  );
}

export default AlarmSuccess;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    padding: 30,
  },
  clockText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
    padding: 25,
  },
  textContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '60%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    padding: 10,
  },
  checkAnimationWrapper: {
    padding: 100,
    marginBottom: 60,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  detailText: {
    color: colors.gray,
    fontSize: 12,

    paddingBottom: 20,
  },
  clockDateText: {
    color: colors.gray,
    fontSize: 16,
    borderRadius: 10,
    padding: 20,
  },
  descriptionStyle: {
    backgroundColor: colors.background,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
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
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  innerContainer: {
    height: '90%',
    display: 'flex',
    alignItems: 'center',
  },
});
