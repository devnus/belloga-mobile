import userSlice from '@/slices/user';
import {getProfile} from '@react-native-seoul/naver-login';
import {Alert} from 'react-native';

/**accessToken을 받아서 getProfile 함수를 통해 유저 정보를 가져오고, setUser 액션을 발생시켜 값을 리듀서에 저장한다.*/
export const getNaverUserProfile = async (
  accessToken: string,
  dispatch: any,
) => {
  const profileResult = await getProfile(accessToken);
  if (profileResult.resultcode === '024') {
    Alert.alert(
      '유저 정보 불러오기에 실패했습니다. 다시 로그인해 주세요',
      profileResult.message,
    );
    return;
  }
  dispatch(
    userSlice.actions.setUser({
      name: profileResult.response.nickname,
      email: profileResult.response.email,
      birthYear: profileResult.response.birthyear,
      phoneNumber: profileResult.response.mobile,
    }),
  );
};
