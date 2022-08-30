import {NaverLogin} from '@react-native-seoul/naver-login';
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../assets/colors';
import KakaoLoginBlock from '../components/KakaoLoginBlock';
import NaverLoginBlock from '../components/NaverLoginBlock';

Feather.loadFont();
MaterialCommunityIcons.loadFont();

function Setting() {
  return (
    <View style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <SafeAreaView>
          <View style={styles.headerWrapper}>
            <Text style={styles.titlesSubtitle}>Belloga</Text>
          </View>
        </SafeAreaView>

        {/* Titles */}
        <View style={styles.titlesWrapper}>
          <View>
            <Text style={styles.titlesBoldTitle}>홍길동님</Text>
            <Text style={styles.titlesSubtitle}>안녕하세요.</Text>
          </View>
          <Image
            source={require('../assets/images/profile.png')}
            style={styles.profileImage}
          />
        </View>
        {/* Categories */}
        <View style={styles.categoriesWrapper}>
          <View style={styles.userInfoWrapper}>
            <View style={styles.userInfoRow}>
              <View style={styles.userInfosDescribe}>
                <Image
                  source={require('../assets/images/coin.png')}
                  style={styles.userInfoIcon}
                />
                <Text style={styles.titlesSubtitle}>내 포인트</Text>
              </View>
              <Text style={styles.titlesSubtitle}> 6803P</Text>
            </View>

            <View style={styles.userInfoRow}>
              <View style={styles.userInfosDescribe}>
                <Image
                  source={require('../assets/images/point.png')}
                  style={styles.userInfoIcon}
                />
                <Text style={styles.titlesSubtitle}>지급 예정 포인트</Text>
              </View>
              <Text style={styles.titlesSubtitle}>1000P</Text>
            </View>
          </View>

          <Text style={styles.addPizzaButton}>지급 예정 포인트</Text>
        </View>

        {/* Popular */}
        <View style={styles.popularWrapper}>
          <View
            style={[
              styles.popularCardWrapper,
              {
                marginTop: 10,
              },
            ]}>
            <View>
              <View>
                <View style={styles.popularTitlesWrapper}>
                  <Text style={styles.titlesBoldTitle}>스탬프 찍기</Text>
                  <View style={styles.popularTopWrapper}>
                    <MaterialCommunityIcons
                      name="crown"
                      size={12}
                      color={colors.primary}
                    />
                    <Text style={styles.popularTopText}>
                      500P를 모으면 스탬프 한개를 받을 수 있어요
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <NaverLoginBlock />
        <KakaoLoginBlock />
      </ScrollView>
    </View>
  );
}

export default Setting;

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
    marginTop: 5,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  search: {
    flex: 1,
    marginLeft: 10,
    borderBottomColor: colors.textLight,
    borderBottomWidth: 2,
  },
  searchText: {
    fontFamily: 'Montserrat-Semibold',
    fontSize: 14,
    marginBottom: 5,
    color: colors.textLight,
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
  popularWrapper: {
    paddingHorizontal: 20,
  },
  popularTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
  },
  popularCardWrapper: {
    backgroundColor: colors.white,
    borderRadius: 25,
    paddingVertical: 20,
    marginVertical: 30,
    paddingLeft: 20,
    flexDirection: 'row',
    shadowColor: '#4dd1d1d1',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.05,
    elevation: 20,
  },
  popularTopWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularTopText: {
    marginLeft: 10,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
  },
  popularTitlesWrapper: {
    marginTop: 20,
  },
  popularTitlesTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: colors.textDark,
  },
  popularTitlesWeight: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: colors.textLight,
    marginTop: 5,
  },
  popularCardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: -20,
  },
  addPizzaButton: {
    backgroundColor: '#54a5bc',
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
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
  userInfosDescribe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  userInfoIcon: {
    width: 20,
    height: 20,
    marginHorizontal: 10,
  },
  userInfoWrapper: {
    backgroundColor: '#f2f6f7',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingVertical: 20,
    flexDirection: 'column',
  },
});
