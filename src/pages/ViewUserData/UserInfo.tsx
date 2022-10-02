import userSlice from '@/slices/user';
import {NaverLogin} from '@react-native-seoul/naver-login';
import * as React from 'react';
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
import colors from '../../assets/colors';
import UserData from '@/components/UserData';
import {useAppDispatch} from '@/store';
import {RootState} from '@/store/reducer';
import LabelingLogInfo from '@/components/LabelingLogInfo';

Feather.loadFont();
MaterialCommunityIcons.loadFont();

function UserInfo({route, navigation}) {
  const isLoggedIn = useSelector((state: RootState) => !!state.user.email);
  const dispatch = useAppDispatch();
  console.log(isLoggedIn);

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
                <Text style={styles.titlesBoldTitle}>홍길동님</Text>
                <Text style={styles.titlesSubtitle}>안녕하세요.</Text>
              </View>
              <Pressable
                style={styles.loginButton}
                onPress={() => {
                  NaverLogin.logout();
                  dispatch(userSlice.actions.setInitial());
                  Alert.alert('알림', '로그아웃 되었습니다.');
                }}>
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

                <Text style={styles.titlesSubtitle}> 라벨링 내역 </Text>
                <LabelingLogInfo />
              </View>
            </ScrollView>
          </View>
        ) : (
          <View>
            <View style={styles.titlesWrapper}>
              <View>
                <Text style={styles.titlesBoldTitle}>로그인이 필요합니다.</Text>
              </View>

              <Pressable
                style={styles.loginButton}
                onPress={() => {
                  navigation.navigate('Login');
                }}>
                <Text style={styles.loginButtonText}>로그인</Text>
              </Pressable>
            </View>
            <UserData isLoggedIn={isLoggedIn} />
            <View style={styles.advertisingContainer}>
              <Text style={styles.titlesBoldTitle}>아침에 일어나기만 해도</Text>
              <Text style={styles.titlesBoldTitle}>모닝 커피가 한 잔!</Text>
              <Image
                source={require('../../assets/images/coffee.png')}
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
