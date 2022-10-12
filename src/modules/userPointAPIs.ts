import alertSlice from '@/slices/alert';
import userSlice from '@/slices/user';
import axios from 'axios';
import {Dispatch, SetStateAction} from 'react';
import {Alert} from 'react-native';
import Config from 'react-native-config';

/**
 * 유저의 포인트와 현재 보유 중인 포인트를 확인할수 있다
 * @param accessToken accessToken을 넣어주자
 * @param dispatch 액션을 발생해서 스토어에 있는 유저 정보를 수정
 */
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

    dispatch(
      userSlice.actions.setPoints({
        points: response.data.response.pointValue,
        tempPoints: response.data.response.tempPointValue,
      }),
    );
  } catch (error) {
    console.error(error);

    dispatch(userSlice.actions.setInitial());
    displayWarningAlert(
      dispatch,
      '포인트 정보 불러오기가 처리되지 않았습니다',
      '다시 로그인해 주세요',
    );
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

    //로그아웃
    // dispatch(userSlice.actions.setInitial());
    displayWarningAlert(
      dispatch,
      '스탬프 정보 불러오기에 실패했습니다',
      '다시 로그인해 주세요',
    );
  }
};

/**
 * stamp를 1개 찍어주는 함수
 * @param accessToken header에 넣을 accessToken을 보낸다
 * @param dispatch dispatch를 함수를 넣어준다
 */
export const pressStamp = async (
  accessToken: string,
  points: number,
  setStampNumbers: Dispatch<SetStateAction<number>>,
  handleOpen: () => void,
) => {
  console.log('알람 누름');
  // if (points < 10) {
  //   Alert.alert(
  //     '포인트가 충분하지 않습니다. 기상 미션을 통해 더 많은 포인트를 모아보세요!',
  //   );
  //   return;
  // }
  try {
    const response = await axios.post(
      `${Config.API_URL}/api/stamp/v1/add`,
      {},
      {
        headers: {
          Authorization: accessToken,
        },
      },
    );
    handleOpen();
    setStampNumbers(prev => prev + 1);
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

    //포인트 적은 경우를 분기
    Alert.alert('스탬프 찍기가 처리되지 않았어요. 버튼을 다시 눌러 주세요');
  }
};

/**
 * gift 정보를 받아오는 함수
 * @param accessToken header에 넣을 accessToken을 보낸다
 */
export const getGiftInfo = async (accessToken: string, setGiftList) => {
  try {
    const response = await axios.get(`${Config.API_URL}/api/gift/v1`, {
      headers: {
        Authorization: accessToken,
      },
    });

    console.log('선물정보', response.data.response.content);
    setGiftList(() => response.data.response.content);
  } catch (error) {
    console.error(error);

    Alert.alert('선물 정보 불러오기에 실패했습니다. 다시 로그인해 주세요');
  }
};

/**
 * gift 정보를 받아오는 함수
 * @param accessToken header에 넣을 accessToken을 보낸다
 */
export const getAppliedGiftInfo = async (
  accessToken: string,
  setGiftAppliedInfo,
) => {
  try {
    const response = await axios.get(`${Config.API_URL}/api/gift/v1/apply`, {
      headers: {
        Authorization: accessToken,
      },
    });

    console.log('응모한 정보', response.data.response.content);
    const appliedInfo = response.data.response.content;
    const appliedInfoIdArray = appliedInfo.map(info => info.id);
    console.log(appliedInfoIdArray);

    const giftAppliedInfo = appliedInfoIdArray.reduce(
      (ac, v) => ({...ac, [v]: (ac[v] || 0) + 1}),
      {},
    );
    console.log('가공된 어레이', giftAppliedInfo);

    setGiftAppliedInfo(giftAppliedInfo);
  } catch (error) {
    console.error(error);

    Alert.alert('선물 정보 불러오기에 실패했습니다. 다시 로그인해 주세요');
  }
};

/**
 * gift를 응모하는 함수
 * @param accessToken header에 넣을 accessToken을 보낸다
 * @param giftID : gift ID, number
 */
export const applyGift = async (
  accessToken: string,
  giftId: number,
  dispatch: Dispatch<any>,
  setStampNumbers: Dispatch<SetStateAction<number>>,
  handleOpen: () => void,
) => {
  if (accessToken === '') {
    displayWarningAlert(
      dispatch,
      '선물 응모를 위해서 로그인이 필요해요',
      '로그인 후 이용해주세요',
    );

    return;
  }
  try {
    const response = await axios.post(
      `${Config.API_URL}/api/gift/v1/apply`,
      {
        giftId: giftId,
      },
      {
        headers: {
          Authorization: accessToken,
        },
      },
    );
    setStampNumbers(() => 0);
    handleOpen();
  } catch (error) {
    console.error(error);

    if (error.response.data.message === 'Unauthorized') {
      // Alert.alert('선물 응모를 위해서 로그인이 필요합니다');
      displayWarningAlert(
        dispatch,
        '선물 응모를 위해서 로그인이 필요해요',
        '로그인 후 이용해주세요',
      );
    }

    if (error.response.data.error.code === 'STAMP_001') {
      displayWarningAlert(
        dispatch,
        '스탬프가 부족합니다',
        '포인트를 모아 스탬프를 찍어주세요!',
      );
    }
  }
};

function displayWarningAlert(
  dispatch: Dispatch<any>,
  titleMessage = '',
  middleMessage = '',
) {
  dispatch(
    alertSlice.actions.setAlert({
      isOpen: true,
      titleMessage: titleMessage,
      middleMessage: middleMessage,
    }),
  );
}
