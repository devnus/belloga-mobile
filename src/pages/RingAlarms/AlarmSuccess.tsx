import colors from '@/assets/constants/colors';
import Button from '@/components/Button';
import CoinAnimation from '@/components/LottieAnimations/CoinAnimation';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function AlarmSuccess({route, navigation}) {
  const onPressSendButton = () => {
    navigation.navigate('Alarms');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.clockText}>미션 수행 완료!</Text>
        <View style={styles.checkAnimationWrapper}>{CoinAnimation()}</View>
        <View style={styles.buttonContainer}>
          <Button onPress={onPressSendButton} title="확인" fill={true} />
        </View>
      </View>
    </View>
  );
}

export default AlarmSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center', //Centered vertically
    alignItems: 'center', // Centered horizontally
  },
  image: {
    padding: 30,
  },
  clockText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
    padding: 25,
    marginBottom: 60,
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
  },

  loginButton: {
    padding: 10,
    margin: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 2,
    borderColor: '#1992fe',
    borderRadius: 25,
    backgroundColor: 'white',
  },
  card: {
    width: '90%',
    padding: 10,
    backgroundColor: 'white',
    justifyContent: 'center', //Centered vertically
    alignItems: 'center', // Centered horizontally
    borderTopLeftRadius: 10, // to provide rounded corners
    borderTopRightRadius: 10, // to provide rounded corners,
    borderBottomRightRadius: 10, // to provide rounded corners,
    borderBottomLeftRadius: 10, // to provide rounded corners,
  },
});
