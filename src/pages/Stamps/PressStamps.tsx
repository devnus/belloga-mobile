import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import colors from '../../assets/colors';
import Stamp from '@/components/Stamp/Stamp';
import {useAppDispatch} from '@/store';
import {RootState} from '@/store/reducer';
import CurrentPointData from '@/components/Stamp/CurrentPointData';
import {getUserStampInfo} from '@/modules/userPointAPIs';
import ApplyGift from '@/components/Stamp/ApplyGift';
MaterialCommunityIcons.loadFont();

function PressStamps({route, navigation}) {
  const isLoggedIn = useSelector((state: RootState) => !!state.user.email);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      getUserStampInfo(accessToken, dispatch);
    }
  }, [isLoggedIn, accessToken, dispatch]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <SafeAreaView>
          <View style={styles.headerWrapper}>
            <Text style={styles.titlesSubtitle}> 스탬프 찍기 </Text>
          </View>
        </SafeAreaView>
        <ApplyGift />
        <CurrentPointData />

        <View
          style={[
            {
              marginTop: 15,
            },
          ]}>
          <Text>스탬프 찍기</Text>
          <View>
            <MaterialCommunityIcons
              name="crown"
              size={12}
              color={colors.primary}
            />
            <Text>500P를 모으면 스탬프 한개를 받을 수 있어요.</Text>
          </View>
          <Text>내가 응모한 커피 개수 : 9개 </Text>
        </View>

        <Stamp key={'stampView'} />

        {/* Titles */}
        {!isLoggedIn && (
          <View>
            <View style={styles.titlesWrapper}>
              <View>
                <Text style={styles.titlesBoldTitle}>
                  로그인을 통해 도장 응모에 도전하세요~
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
          </View>
        )}
      </ScrollView>
    </View>
  );
}

export default PressStamps;

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
