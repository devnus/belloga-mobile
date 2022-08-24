import axios from 'axios';
import React, {useEffect} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

function AlarmSuccess({route, navigation}) {
  const onPressSendButton = () => {};

  return (
    <View style={globalStyles.container}>
      <View style={[globalStyles.innerContainer, styles.container]}>
        <View style={styles.card}>
          <Text style={styles.clockText}>라벨링 완료!</Text>
          <Text style={styles.title}>총 지급 예정 포인트</Text>
          <Text style={styles.title}> +20 p</Text>
          <Image style={styles.image} source={require('../assets/coin.png')} />
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.loginButton} onPress={onPressSendButton}>
            <Text> 확인 </Text>
          </Pressable>
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    padding: 10,
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
  loginButtonActive: {
    backgroundColor: 'whited',
  },
  rectangle: {
    borderWidth: 3,
    borderColor: 'red',
    position: 'absolute',
  },
  card: {
    width: '100%',
    height: 400,
    backgroundColor: '#fff',
    justifyContent: 'center', //Centered vertically
    alignItems: 'center', // Centered horizontally
    borderTopLeftRadius: 10, // to provide rounded corners
    borderTopRightRadius: 10, // to provide rounded corners,
    borderBottomRightRadius: 10, // to provide rounded corners,
    borderBottomLeftRadius: 10, // to provide rounded corners,
  },
});
const globalStyles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#BDE0EC',
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
