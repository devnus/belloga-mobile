import {View, Button, StyleSheet, Pressable, Text, Image} from 'react-native';
import React, {useState} from 'react';
import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
} from '@react-native-seoul/kakao-login';
import {SafeAreaView} from 'react-native-safe-area-context';

function KakaoLoginBlock() {
  const [result, setResult] = useState<string>('');

  const signInWithKakao = async (): Promise<void> => {
    try {
      const token = await login();

      setResult(JSON.stringify(token));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('login err', err);
    }
  };

  const signOutWithKakao = async (): Promise<void> => {
    try {
      const message = await logout();

      setResult(message);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('signOut error', err);
    }
  };

  const getProfile = async (): Promise<void> => {
    try {
      const profile = await getKakaoProfile();

      setResult(JSON.stringify(profile));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('signOut error', err);
    }
  };

  const unlinkKakao = async (): Promise<void> => {
    try {
      const message = await unlink();

      setResult(message);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('signOut error', err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.kakaoButton} onPress={() => signInWithKakao()}>
        <Image
          source={require('../assets/images/ico_kakao.png')}
          style={styles.companyIcon}
        />
        <Text>카카오로 로그인</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  kakaoButton: {
    alignSelf: 'stretch',
    marginHorizontal: 20,
    padding: 10,
    margin: 10,
    backgroundColor: '#f7e317',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyIcon: {
    width: 15,
    height: 15,
    marginHorizontal: 10,
  },
});

export default KakaoLoginBlock;
