import {useEffect} from 'react';
import {Alert, BackHandler} from 'react-native';

function useAskExitSure() {
  useEffect(() => {
    const backAction = () => {
      Alert.alert('알림', '정말 앱을 종료하시겠습니까?', [
        {
          text: '더 둘러보기',
          onPress: () => null,
          style: 'cancel',
        },
        {text: '종료', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
}

export default useAskExitSure;
