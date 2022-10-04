import userSlice from '@/slices/user';
import axios from 'axios';
import {Dispatch, SetStateAction} from 'react';
import {Alert} from 'react-native';
import Config from 'react-native-config';

export const getUserPointInfo = async (
  accessToken: string,
  dispatch: Dispatch<any>,
) => {
  try {
    const response = await axios.get(`${Config.API_URL}/api/point/v1/info`, {
      headers: {
        Authorization: accessToken,
      },
    });
    console.log(response.data.response, 'user point info');
  } catch (error) {
    console.error(error);

    //에러일 경우 강제 로그아웃
    // dispatch(
    //   userSlice.actions.setUser({
    //     name: '',햣
    //     email: '',
    //     userId: '',
    //   }),
    // );
    Alert.alert('포인트 정보 불러오기에 실패했습니다. 다시 로그인해 주세요');
  }
};

/**
 * user data를 받아오는 함수, 문제가 있을 경우에는 로그아웃을 시킨다.
 * @param accessToken header에 넣을 accessToken을 보낸다
 * @param dispatch dispatch를 함수를 넣어준다
 */
export const getUserStampInfo = async (
  accessToken: string,
  dispatch: Dispatch<any>,
  setStampNumbers: Dispatch<SetStateAction<number>>,
) => {
  try {
    const response = await axios.get(`${Config.API_URL}/api/stamp/v1/info`, {
      headers: {
        Authorization: accessToken,
      },
    });

    setStampNumbers(() => response.data.response.stampValue);
  } catch (error) {
    console.error(error);

    dispatch(
      userSlice.actions.setUser({
        name: '',
        email: '',
        userId: '',
      }),
    );
    Alert.alert('스탬프 정보 불러오기에 실패했습니다. 다시 로그인해 주세요');
  }
};

/**
 * stamp를 1개 찍어주는 함수
 * @param accessToken header에 넣을 accessToken을 보낸다
 * @param dispatch dispatch를 함수를 넣어준다
 */
export const pressStamp = async (
  accessToken: string,
  setStampNumbers: Dispatch<SetStateAction<number>>,
  handleOpen: () => void,
) => {
  try {
    const response = await axios.get(`${Config.API_URL}/api/stamp/v1/add`, {
      headers: {
        Authorization: accessToken,
      },
    });
    console.log(response, 'press a stamp');
    setStampNumbers(prev => prev + 1);
    handleOpen();
  } catch (error) {
    console.error(error);

    //에러일 경우 강제 로그아웃
    // dispatch(
    //   userSlice.actions.setUser({
    //     name: '',
    //     email: '',
    //     userId: '',
    //   }),
    // );
    Alert.alert('스탬프 찍기가 잘못 처리되었습니다. 다시 로그인해 주세요');
  }
};
