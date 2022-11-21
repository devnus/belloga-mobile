import userSlice from '@/slices/user';
import axios from 'axios';
import {useEffect} from 'react';
import {Alert} from 'react-native';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useIsLoggedIn} from './useAuthInfo';

export const useAutoLogin = (
  dispatch: any,
  connectionInfo: boolean | null = false,
) => {
  // 앱 실행 시 토큰 있으면 로그인하는 코드

  const isLoggedIn = useIsLoggedIn();

  useEffect(() => {
    const getTokenAndRefresh = async () => {
      try {
        const token = await EncryptedStorage.getItem('refreshToken');
        if (!token) {
          return;
        }
        const tokenRes = await axios.post(
          `${Config.API_URL}/api/account/v1/auth/reissue`,
          {
            refreshToken: `${token}`,
          },
        );

        await EncryptedStorage.setItem(
          'refreshToken',
          tokenRes.data.response.refreshToken,
        );

        const {data} = await axios.get(
          `${Config.API_URL}/api/user/v1/labeler`,
          {
            headers: {
              Authorization: `${tokenRes.data.response.refreshToken}`,
            },
          },
        );

        dispatch(
          userSlice.actions.setUser({
            name: data.response.name,
            email: data.response.email,
            birthYear: data.response.birthYear,
            phoneNumber: data.response.mobile,
          }),
        );

        dispatch(
          userSlice.actions.setToken({
            accessToken: tokenRes.data.response.accessToken,
            refreshToken: tokenRes.data.response.refreshToken,
          }),
        );
      } catch (error) {
        console.error(error);
        Alert.alert('알림', '다시 로그인 해주세요.');
        // if ((error as AxiosError).response?.data.code === 'expired') {
        //   Alert.alert('알림', '다시 로그인 해주세요.');
        // }
      }
    };
    if (isLoggedIn === false && connectionInfo === true) {
      //로그인이 되어 있지 않고, 네트워크 연결이 된 상태에서만 자동로그인을 한다.
      getTokenAndRefresh();
    }
  }, [dispatch, isLoggedIn, connectionInfo]);
};
