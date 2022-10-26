import axios from 'axios';
import {Dispatch, SetStateAction} from 'react';
import Config from 'react-native-config';
import {LabelingLogType} from './calcLabelingLogs';

export type boundingBoxTypes = {
  boundingBoxId: number;
  x: [];
  y: [];
};

/**
 * alarm의 정보를 서버로부터 받아와 띄워주는 함수
 * @param accessToken accessToken이 필요
 * @param setBoundingBoxList boundingBoxList를 설정해줌
 * @param setImageUrl imgUrl을 설정
 * @param setLoading Loading을 설정
 */

export const getAlarmInfo = async (
  accessToken: string,
  setBoundingBoxList: Dispatch<
    React.SetStateAction<boundingBoxTypes | undefined>
  >,
  setImageUrl: Dispatch<SetStateAction<string>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
) => {
  try {
    const response = await axios.get(
      `${Config.API_URL}/api/data/v1/target/OCR`,
      {
        headers: {
          Authorization: accessToken,
        },
      },
    );

    console.log('got response', response.data);
    const boundingBoxData = {
      boundingBoxId: response.data.response.boundingBoxId,
      x: response.data.response.x,
      y: response.data.response.y,
    };
    setBoundingBoxList(() => boundingBoxData);
    setImageUrl(() => response.data.response.imageUrl);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(() => true);
  }
};

/**
 *
 * @param boundingBoxId 라벨링하는 boundingbox의 ID를 쏴준다
 * @param labelText 라벨의 Text를 전송
 * @param accessToken accessToken을 전송
 */
export const sendLabelingResult = async (
  boundingBoxId: number | undefined,
  labelText: string,
  accessToken: string,
) => {
  try {
    const response = await axios.post(
      `${Config.API_URL}/api/labeled-data/v1/ocr-data`,
      {
        boundingBoxId: boundingBoxId,
        label: labelText,
      },
      {
        headers: {
          Authorization: accessToken,
        },
      },
    );

    console.log(response.data.success);
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 * @param accessToken 액세스토큰을 받아옴
 * @param setLabelingLog 라벨링로그를 설정하는 함수
 */
export const getMyLabelingLogInfo = async (
  accessToken: string,
  setLabelingLog: Dispatch<React.SetStateAction<LabelingLogType[]>>,
) => {
  try {
    const response = await axios.get(
      `${Config.API_URL}/api/labeled-data/v1/ocr-data`,
      {
        headers: {
          Authorization: accessToken,
        },
      },
    );

    const myLog: LabelingLogType[] = response.data.response.content;

    setLabelingLog(myLog);
  } catch (error) {
    console.log(error);
  } finally {
  }
};
