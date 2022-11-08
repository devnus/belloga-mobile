import userSlice from '@/slices/user';
import {NaverLogin} from '@react-native-seoul/naver-login';
import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  Alert,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import colors from '../../assets/constants/colors';
import UserData from '@/components/UserData';
import {useAppDispatch} from '@/store';
import {RootState} from '@/store/reducer';
import LabelingLogInfo from '@/components/LabelingLogInfo';
import {getUserPointInfo} from '@/modules/userPointAPIs';
import {useGetAccessToken, useIsLoggedIn} from '@/hooks/useAuthInfo';
import {getMyLabelingLogInfo} from '@/modules/labelingAPIs';
import {useIsFocused} from '@react-navigation/native';
import {calcDailyLogs, LabelingLogType} from '@/modules/calcLabelingLogs';
import EncryptedStorage from 'react-native-encrypted-storage';
import EmptyCard from '@/components/Common/EmptyCard';

Feather.loadFont();
MaterialCommunityIcons.loadFont();

function UserInfo({route, navigation}) {
  const isLoggedIn = useIsLoggedIn();
  const userName = useSelector((state: RootState) => state.user.name);
  const accessToken = useGetAccessToken();
  const dispatch = useAppDispatch();

  const [labelingLog, setLabelingLog] = useState<LabelingLogType[]>([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (accessToken && isFocused) {
      //isFocused를 넣어서 탭이 전환될때마다 useEffect를 실행되게 함
      getUserPointInfo(accessToken, dispatch);
      getMyLabelingLogInfo(accessToken, setLabelingLog);
    }
  }, [isFocused, accessToken, dispatch]);

  const dailyLogs = useMemo(
    () => calcDailyLogs(labelingLog).reverse(),
    [labelingLog],
  );
  const unProcessedLogs = useMemo(() => {
    const waitingLogs = labelingLog.filter(
      log => log.labelingVerificationStatus === 'WAITING',
    );

    return waitingLogs.length;
  }, [labelingLog]);

  const appLogOut = async () => {
    NaverLogin.logout();
    dispatch(userSlice.actions.setInitial());
    await EncryptedStorage.clear();
    Alert.alert('알림', '로그아웃 되었습니다.');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <SafeAreaView>
          <View style={styles.headerWrapper}>
            <Text style={styles.titlesSubtitle}> </Text>
          </View>
        </SafeAreaView>

        {/* Titles */}
        {isLoggedIn ? (
          <View>
            <View style={styles.titlesWrapper}>
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate('UserProfile');
                }}>
                <View>
                  <Text style={styles.titlesBoldTitle}>{userName}님</Text>
                  <Text style={styles.titlesSubtitle}>안녕하세요.</Text>
                </View>
              </TouchableWithoutFeedback>
              <Pressable style={styles.loginButton} onPress={appLogOut}>
                <Text style={styles.loginButtonText}>로그아웃</Text>
              </Pressable>
            </View>
            {/* User Information */}
            <UserData
              totalMissionLog={labelingLog.length}
              processingMissionLog={unProcessedLogs}
            />
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              showsVerticalScrollIndicator={false}>
              <View>
                {/* User Information */}
                <View style={styles.titlesWrapper}>
                  <Text
                    style={
                      styles.titlesSubtitle
                    }>{`${userName}님의 미션 알람 수행 내역`}</Text>
                </View>
                {dailyLogs.length === 0 ? (
                  <View style={styles.emptyCardWrapper}>
                    <EmptyCard description="아직 미션 알람을 수행하지 않았어요" />
                  </View>
                ) : (
                  dailyLogs.map(log => (
                    <LabelingLogInfo
                      date={log.dateInfo}
                      isProcessed={log.processStatus}
                      labeledLog={log.dailyInfo}
                      key={log.dateInfo}
                    />
                  ))
                )}
              </View>
            </ScrollView>
          </View>
        ) : (
          <View>
            <View style={styles.titlesWrapper}>
              <View>
                <Text style={styles.titlesBoldTitle}>
                  로그인으로 하루를 기록해요
                </Text>
              </View>

              <Pressable
                style={styles.loginButton}
                onPress={() => {
                  navigation.navigate('Login');
                }}>
                <Text style={styles.loginButtonText}>로그인</Text>
              </Pressable>
            </View>

            <View style={styles.advertisingContainer}>
              <Image
                source={require('@assets/images/coffee.png')}
                resizeMode="contain"
                style={styles.coffeeImage}
              />
              <Text style={styles.advertisingText}>아침에 일어나기만 해도</Text>
              <Text style={styles.advertisingText}>모닝 커피가 한 잔!</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

export default UserInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  titlesWrapper: {
    marginTop: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titlesSubtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: colors.textDark,
  },
  titlesBoldTitle: {
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.textDark,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  coffeeImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  advertisingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 200,
  },
  loginButton: {
    backgroundColor: '#54a5bc',
    borderRadius: 13.5,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white',
  },
  advertisingText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'grey',
    marginTop: 2,
  },
  emptyCardWrapper: {
    paddingVertical: 100,
  },
});
