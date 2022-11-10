import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {containsKey, getData, storeData} from './asyncStorageStoreData';

const PUSH_ALERT = 'pushAlert';

export const savePushAlert = async (
  pushMessage: FirebaseMessagingTypes.RemoteMessage,
) => {
  const isKeyExists = await containsKey(PUSH_ALERT);

  let previousData = [];

  if (isKeyExists) {
    previousData = await getData(PUSH_ALERT);
  }

  const pushAlertData = previousData.concat(pushMessage);
  storeData(PUSH_ALERT, pushAlertData);
};

export const loadPushAlert = async (): Promise<
  FirebaseMessagingTypes.RemoteMessage[]
> => {
  const isKeyExists = await containsKey(PUSH_ALERT);
  let pushAlertData = [];

  if (isKeyExists) {
    pushAlertData = await getData(PUSH_ALERT);
  }

  return pushAlertData;
};
