import userSlice from '@/slices/user';
import {NaverLogin} from '@react-native-seoul/naver-login';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  Alert,
  Image,
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
import {DailyLogType, getMyLabelingLogInfo} from '@/modules/labelingAPIs';
import {useIsFocused} from '@react-navigation/native';

Feather.loadFont();
MaterialCommunityIcons.loadFont();

function UserInfo({route, navigation}) {
  const isLoggedIn = useIsLoggedIn();
  const userName = useSelector((state: RootState) => state.user.name);
  const accessToken = useGetAccessToken();
  const dispatch = useAppDispatch();

  const [labelingLog, setLabelingLog] = useState<DailyLogType[]>([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (accessToken && isFocused) {
      //isFocused를 넣어서 탭이 전환될때마다 useEffect를 실행되게 함
      getUserPointInfo(accessToken, dispatch);
      getMyLabelingLogInfo(accessToken, setLabelingLog);
    }
  }, [isFocused, accessToken, dispatch]);

  const appLogOut = () => {
    NaverLogin.logout();
    dispatch(userSlice.actions.setInitial());
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
              <View>
                <Text style={styles.titlesBoldTitle}>{userName}님</Text>
                <Text style={styles.titlesSubtitle}>안녕하세요.</Text>
              </View>
              <Pressable style={styles.loginButton} onPress={appLogOut}>
                <Text style={styles.loginButtonText}>로그아웃</Text>
              </Pressable>
            </View>
            {/* User Information */}
            <UserData />
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
                {labelingLog.map(log => (
                  <LabelingLogInfo
                    date={log.dateInfo}
                    isProcessed={log.processStatus}
                    labeledLog={log.dailyInfo}
                  />
                ))}
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
              <Text style={styles.titlesBoldTitle}>아침에 일어나기만 해도</Text>
              <Text style={styles.titlesBoldTitle}>모닝 커피가 한 잔!</Text>
              <Image
                source={require('@assets/images/coffee.png')}
                resizeMode="contain"
                style={styles.coffeeImage}
              />
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
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 40,
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
  categoriesWrapper: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  categoriesTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    paddingHorizontal: 20,
  },
  categoriesListWrapper: {
    paddingTop: 15,
    paddingBottom: 20,
  },
  categoryItemWrapper: {
    backgroundColor: '#F5CA48',
    marginRight: 20,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  categoryItemImage: {
    width: 60,
    height: 60,
    marginTop: 25,
    alignSelf: 'center',
    marginHorizontal: 20,
  },
  categoryItemTitle: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    marginTop: 10,
  },
  coffeeImage: {
    width: 200,
    height: 200,
  },
  categorySelectWrapper: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: 26,
    height: 26,
    borderRadius: 26,
    marginBottom: 20,
  },
  categorySelectIcon: {
    alignSelf: 'center',
  },
  advertisingContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 2,
  },
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  rating: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    color: colors.textDark,
    marginLeft: 5,
  },
  popularCardRight: {
    marginLeft: 40,
  },
  popularCardImage: {
    width: 210,
    height: 125,
    resizeMode: 'contain',
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
});
