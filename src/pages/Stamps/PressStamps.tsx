import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import Stamp from '@/components/Stamp/Stamp';
import {RootState} from '@/store/reducer';
import CurrentPointData from '@/components/Stamp/CurrentPointData';
import {
  getAppliedGiftInfo,
  getGiftInfo,
  GiftInfo,
} from '@modules/userPointAPIs';
import ApplyGift from '@/components/Stamp/ApplyGift';
import Titles from '@/components/Common/Titles';
import {calcMyGiftInfo} from '@/modules/calcGiftInfo';
import Header from '@/components/Common/Header';
import EmptyCard from '@/components/Common/EmptyCard';

MaterialCommunityIcons.loadFont();

function PressStamps({route, navigation}) {
  const isLoggedIn = useSelector((state: RootState) => !!state.user.email);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const [stampNumbers, setStampNumbers] = useState<number>(0);
  const [giftList, setGiftList] = useState<GiftInfo[]>([]);
  const [giftAppliedInfo, setGiftAppliedInfo] = useState<any>([]);

  useEffect(() => {
    getGiftInfo(setGiftList);
  }, []);

  useEffect(() => {
    if (accessToken) {
      getAppliedGiftInfo(accessToken, setGiftAppliedInfo);
    }
  }, [isLoggedIn, accessToken]);

  const {applyCount, myGiftAppliedInfo} = calcMyGiftInfo(giftAppliedInfo);

  return (
    <View style={styles.container}>
      <View style={styles.scrollView}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}>
          <Header />
          <View style={styles.bodyWrapper}>
            <Titles
              title="경품 응모 스탬프판"
              description="매일 일어나서 도장 찍고 선물 받아가세요!"
            />

            <View style={styles.pressStampContainer}>
              <CurrentPointData key="current" />
              <Stamp
                setStampNumbers={setStampNumbers}
                stampNumbers={stampNumbers}
                giftNumbers={applyCount}
                key="stampView"
              />
            </View>

            <Titles
              title="경품 목록"
              description="응모하고 싶은 블럭을 눌러 응모하세요"
            />

            {giftList.length === 0 ? (
              <View style={styles.emptyCardWrapper}>
                <EmptyCard description="아직 응모 가능한 선물이 없어요" />
              </View>
            ) : (
              <View style={styles.giftInfoWrapper}>
                {giftList.map((gift: GiftInfo) => {
                  const giftId = gift.id;

                  return (
                    <ApplyGift
                      giftInfo={gift}
                      setStampNumbers={setStampNumbers}
                      key={giftId}
                      appliedNumbers={myGiftAppliedInfo[giftId]} //array가 아니라 object지만 .을 쓰면 에러가 나서 이 방법으로 대체
                      isLoggedIn={isLoggedIn}
                    />
                  );
                })}
              </View>
            )}
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
  giftInfoWrapper: {
    flex: 2,
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
  emptyCardWrapper: {
    paddingVertical: 40,
  },
});
