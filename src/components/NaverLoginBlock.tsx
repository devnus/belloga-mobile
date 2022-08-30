import React from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Button,
  Platform,
  Pressable,
  Text,
  Image,
  Dimensions,
  View,
} from 'react-native';
import {NaverLogin, getProfile} from '@react-native-seoul/naver-login';
import Config from 'react-native-config';

const iosKeys = {
  kConsumerKey: 'VC5CPfjRigclJV_TFACU',
  kConsumerSecret: 'f7tLFw0AHn',
  kServiceAppName: '테스트앱(iOS)',
  kServiceAppUrlScheme: 'testapp', // only for iOS
};

const androidKeys = {
  kConsumerKey: `${Config.NAVER_LOGIN_API_KEY}`,
  kConsumerSecret: `${Config.NAVER_LOGIN_API_SECRET}`,
  kServiceAppName: 'Belloga',
};

const initials = Platform.OS === 'ios' ? iosKeys : androidKeys;

const NaverLoginBlock = () => {
  const [naverToken, setNaverToken] = React.useState(null);

  const naverLogin = props => {
    return new Promise((resolve, reject) => {
      NaverLogin.login(props, (err, token) => {
        console.log(`\n\n  Token is fetched  :: ${token} \n\n`);
        setNaverToken(token);
        if (err) {
          reject(err);
          return;
        }
        resolve(token);
      });
    });
  };

  const naverLogout = () => {
    NaverLogin.logout();
    setNaverToken('');
  };

  const getUserProfile = async () => {
    const profileResult = await getProfile(naverToken.accessToken);
    if (profileResult.resultcode === '024') {
      Alert.alert('로그인 실패', profileResult.message);
      return;
    }
    console.log('profileResult', profileResult);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={styles.naverButton}
        onPress={() => naverLogin(initials)}>
        <Image
          source={require('../assets/images/ico_naver.png')}
          style={styles.companyIcon}
        />
        <Text
          style={[
            {
              color: 'white',
            },
          ]}>
          네이버로 로그인
        </Text>
      </Pressable>

      {!!naverToken && <Button title="로그아웃하기" onPress={naverLogout} />}

      {!!naverToken && (
        <Button title="회원정보 가져오기" onPress={getUserProfile} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  naverButton: {
    alignSelf: 'stretch',
    marginHorizontal: 20,
    padding: 10,
    margin: 10,
    backgroundColor: '#03c75a',
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

export default NaverLoginBlock;
