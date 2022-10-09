import {RootState} from '@/store/reducer';
import {useSelector} from 'react-redux';

export function useGetAccessToken() {
  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  return accessToken;
}

export function useIsLoggedIn() {
  const isLoggedIn = useSelector((state: RootState) => !!state.user.email);

  return isLoggedIn;
}

export function useGetUserID() {
  const userEmail = useSelector((state: RootState) => state.user.email);

  return userEmail;
}
