import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import Config from 'react-native-config';

export const sendFirebaseToken = async (accessToken: string) => {
  const fcmToken = await messaging().getToken();

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
  }
};
