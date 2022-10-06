import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import colors from '@assets/colors';
import Stamp from '@/components/Stamp/Stamp';
import {useAppDispatch} from '@/store';
import {RootState} from '@/store/reducer';
import CurrentPointData from '@/components/Stamp/CurrentPointData';
import {getUserStampInfo} from '@/modules/userPointAPIs';
import ApplyGift from '@/components/Stamp/ApplyGift';
import useAskExitSure from '@/hooks/useAskExitSure';
MaterialCommunityIcons.loadFont();

function PressStamps({route, navigation}) {
  const isLoggedIn = useSelector((state: RootState) => !!state.user.email);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const [stampNumbers, setStampNumbers] = useState<number>(0);
  const dispatch = useAppDispatch();

  useAskExitSure();

  useEffect(() => {
    if (accessToken) {
      getUserStampInfo(accessToken, dispatch, setStampNumbers);
    }
  }, [isLoggedIn, accessToken, dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.scrollView}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}>
          {/* Header */}
          <SafeAreaView>
            <View style={styles.headerWrapper}>
              <Text style={styles.titlesSubtitle}> </Text>
            </View>
          </SafeAreaView>
          <View style={styles.bodyWrapper}>
            <View style={styles.titlesWrapper}>
              <View>
                <Text style={styles.titlesBoldTitle}>경품 응모 스탬프판</Text>
                <Text style={styles.titlesSubtitle}>
                  500P로 스탬프 한 개를 받을 수 있어요
                </Text>
              </View>
            </View>

            <View style={styles.pressStampContainer}>
              <CurrentPointData />
              <Stamp
                setStampNumbers={setStampNumbers}
                stampNumbers={stampNumbers}
                key={'stampView'}
              />
            </View>

            <View style={styles.giftInfoWrapper}>
              <ApplyGift />
              <ApplyGift />
              <ApplyGift />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default PressStamps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  scrollView: {
    backgroundColor: 'white',
    flex: 1,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  bodyWrapper: {
    flex: 5,
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
    flex: 1,
  },
  giftInfoWrapper: {
    flex: 2,
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
  pressStampContainer: {
    backgroundColor: 'white',
    marginTop: 30,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginHorizontal: '5%',
    paddingVertical: 15,
    display: 'flex',
    shadowColor: '#CDCDCD',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.02,
    elevation: 10,
  },
});
