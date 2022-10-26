import userSlice from '@/slices/user';
import axios from 'axios';
import {useEffect} from 'react';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';

export const useAxiosInterceptor = (dispatch: any) => {
  const resInterceptor = axios.interceptors.response.use(
    response => {
      return response;
    },
    async error => {
      console.log('인터셉터 적용됨');
      const {config, response} = error;
      if (
        response.status === 403 &&
        response.data.error.message ===
          'User is not authorized to access this resource with an explicit deny'
      ) {
        console.log(config);
        const originalRequest = config;
        const refreshToken = await EncryptedStorage.getItem('refreshToken');
        // token refresh 요청
        const {data} = await axios.post(
          `${Config.API_URL}/api/account/v1/auth/reissue`, // token refresh api
          {
            refreshToken: refreshToken,
          },
        );

        // 새로운 토큰 저장
        dispatch(
          userSlice.actions.setToken({
            accessToken: data.response.accessToken,
            refreshToken: data.response.refreshToken,
          }),
        );
        await EncryptedStorage.setItem(
          'refreshToken',
          data.response.refreshToken,
        );

        originalRequest.headers.authorization = `${data.response.accessToken}`;

        // 419로 요청 실패했던 요청 새로운 토큰으로 재요청
        return axios(originalRequest);
      }
      axios.interceptors.response.eject(resInterceptor);
      return Promise.reject(error);
    },
  );
  useEffect(() => {
    return () => {
      axios.interceptors.response.eject(resInterceptor);
    };
  }, [resInterceptor]);
};
