import axios from 'axios';
import {Dispatch, SetStateAction} from 'react';
import Config from 'react-native-config';

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
  setBoundingBoxList: Dispatch<SetStateAction<Array<boundingBoxTypes>>>,
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
    setBoundingBoxList(() => [boundingBoxData]);
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
  boundingBoxId: number,
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

export const getMyLabelingLogInfo = async (accessToken: string) => {
  try {
    const response = await axios.get(
      `${Config.API_URL}/api/labeled-data/v1/ocr-data`,
      {
        headers: {
          Authorization: accessToken,
        },
      },
    );

    console.log('나의 라벨링 데이터', response.data.response.content);
  } catch (error) {
    console.log(error);
  } finally {
  }
};
