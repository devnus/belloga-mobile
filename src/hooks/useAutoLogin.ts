import userSlice from '@/slices/user';
import axios from 'axios';
import {useEffect} from 'react';
import {Alert} from 'react-native';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';

export const useAutoLogin = (dispatch: any) => {
  // 앱 실행 시 토큰 있으면 로그인하는 코드
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
              authorization: `${token}`,
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
    getTokenAndRefresh();
  }, [dispatch]);
};
