import React, {useState} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Button,
  Platform,
  Pressable,
  Text,
  Image,
} from 'react-native';
import Config from 'react-native-config';
import {useAppDispatch} from '@/store';
import userSlice from '@/slices/user';
import axios from 'axios';
import {getNaverUserProfile} from '@/modules/naverLoginApis';
import EncryptedStorage from 'react-native-encrypted-storage';
import {NaverLogin, TokenResponse} from '@react-native-seoul/naver-login';

const iosKeys = {
  kConsumerKey: 'VC5CPfjRigclJV_TFACU',
  kConsumerSecret: 'f7tLFw0AHn',
  kServiceAppName: '테스트앱(iOS)',
  kServiceAppUrlScheme: 'testApp', // only for iOS
};

const androidKeys = {
  kConsumerKey: `${Config.NAVER_LOGIN_API_KEY}`,
  kConsumerSecret: `${Config.NAVER_LOGIN_API_SECRET}`,
  kServiceAppName: 'Belloga',
};

const initials = Platform.OS === 'ios' ? iosKeys : androidKeys;

const NaverLoginBlock = ({onPress}) => {
  const dispatch = useAppDispatch();
  const [naverToken, setNaverToken] = useState<TokenResponse | undefined>(
    undefined,
  );

  const naverLogin = (props: any) => {
    return new Promise((resolve, reject) => {
      NaverLogin.login(props, (err, token) => {
        //토큰이 있다면 NaverToken에 값을 할당하고, getUserProfile로 액션을 발생시킨다.
        if (token) {
          setNaverToken(token);
          getTokenAndRefresh(token.accessToken);
          getNaverUserProfile(token.accessToken, dispatch);
          onPress();
        }
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
    dispatch(
      userSlice.actions.setUser({
        name: '',
        email: '',
        userId: '',
      }),
    );
    setNaverToken(undefined);
  };

  const getTokenAndRefresh = async (accessToken: string) => {
    try {
      const response = await axios.post(
        `${Config.API_URL}/api/account/v1/auth/signin/naver/account`,
        {token: accessToken},
      );
      dispatch(
        userSlice.actions.setToken({
          accessToken: response.data.response.accessToken,
          refreshToken: response.data.response.refreshToken,
        }),
      );
      await EncryptedStorage.setItem(
        'refreshToken',
        response.data.response.refreshToken,
      );
    } catch (error) {
      console.error(error);
      Alert.alert('보안을 위해 로그인이 만료되었습니다. 다시 로그인해 주세요');
    }
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
            // eslint-disable-next-line react-native/no-inline-styles
            {
              color: 'white',
            },
          ]}>
          네이버로 로그인
        </Text>
      </Pressable>

      {!!naverToken && <Button title="로그아웃하기" onPress={naverLogout} />}
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
    borderRadius: 10,
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
