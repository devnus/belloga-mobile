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

type LabelingLogType = {
  createdDate: string; //2022-10-12T07:58:53.698871
  labelingUUID: string; //5865edc6-a306-427b-a411-4ddcf5b39db8/867
  labelingVerificationStatus: string; //WAITING, SUCCESS, FAIL
  textLabel: string; //test 10/12 17:02
};

export const getMyLabelingLogInfo = async (
  accessToken: string,
  setLabelingLog: Dispatch<SetStateAction<[]>>,
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

    const myLog: [] = response.data.response.content;
    const labeled = myLog.map((log: LabelingLogType) => {
      const logDate = new Date(log.createdDate);

      return {
        sortDate: `${logDate.getMonth() + 1}/${logDate.getDate()}`,
        createdDate: logDate,
        status: log.labelingVerificationStatus,
      };
    });

    const dateInfoIdArray = labeled
      .map(item => item.sortDate)
      .filter((value, index, self) => self.indexOf(value) === index);

    const dateArray = dateInfoIdArray.map(date => ({
      dateInfo: date,
    }));

    const labelingLog = dateArray.map(log => {
      const results = labeled.filter(
        rawLog => log.dateInfo === rawLog.sortDate,
      );

      return {
        dateInfo: log.dateInfo,
        dailyInfo: results,
      };
    });

    setLabelingLog(labelingLog);
  } catch (error) {
    console.log(error);
  } finally {
  }
};
