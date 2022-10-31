import {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';

export function useCheckNetwork() {
  const [connectionInfo, setNetInfo] = useState<boolean | null>(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetInfo(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return connectionInfo;
}
