import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '@/assets/constants/colors';
import {applyGift} from '@/modules/userPointAPIs';
import {RootState} from '@/store/reducer';
import {useSelector} from 'react-redux';
import {CustomModal} from '../Modals/CustomModal';
import ModalCard from '@components/Modals/ModalCard';
import {useAppDispatch} from '@/store';
import ampInstance from '@/amplitude';

type GiftInfo = {
  id: number;
  title: string;
  giftType: string;
  expectedDrawDate: string;
  giftStatus: any;
  odds: number;
  // imageUrl: string;
  applyCount: number;
};

type ApplyGiftProps = {
  giftInfo: GiftInfo;
  setStampNumbers: any;
  appliedNumbers: number;
  isLoggedIn: boolean;
};
function ApplyGift({
  giftInfo,
  setStampNumbers,
  appliedNumbers,
  isLoggedIn,
}: ApplyGiftProps) {
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const dispatch = useAppDispatch();

  return (
    <CustomModal
      activator={({handleOpen}) => (
        <TouchableOpacity
          onPress={() => {
            ampInstance.logEvent('APPLY_GIFT_CLICKED');
            applyGift(
              accessToken,
              giftInfo.id,
              dispatch,
              setStampNumbers,
              handleOpen,
            );
          }}
          style={styles.giftWrapper}>
          <View style={styles.giftRoundWrapper}>
            <View style={styles.giftInfoRow}>
              <View style={styles.giftDescribe}>
                <Text style={styles.titlesSubtitle}>
                  {giftInfo.expectedDrawDate} 마감
                </Text>
                <Text style={styles.titlesMainTitle}>{giftInfo.title}</Text>
                <View style={styles.applyInfo}>
                  <Text style={styles.joiningInfo}>
                    총 {giftInfo.applyCount}명 응모 중
                  </Text>
                  {isLoggedIn && appliedNumbers && (
                    <Text> {appliedNumbers}번 응모</Text>
                  )}
                </View>
              </View>
              <Image
                // source={{
                //   uri: `${giftInfo.imageUrl}`,
                // }}
                source={require('@/assets/images/sb.png')}
                style={styles.giftIcon}
                resizeMode="contain"
              />
            </View>
          </View>
        </TouchableOpacity>
      )}>
      <ModalCard
        titleText="경품 응모가 왼료되었습니다!"
        middleText="참여해 주셔서 감사드립니다"
      />
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  titlesSubtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: colors.textDark,
  },
  joiningInfo: {
    fontSize: 14,
    color: colors.navy,
  },
  titlesMainTitle: {
    fontSize: 16,
    color: colors.textDark,
    fontWeight: 'bold',
  },
  giftWrapper: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  giftDescribe: {
    flexDirection: 'column',
  },
  giftInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  giftIcon: {
    // width: 75,
    // height: 100,
    width: 50,
    height: 100,
    marginHorizontal: 10,
  },
  giftRoundWrapper: {
    backgroundColor: '#f2f6f7',
    borderRadius: 25,

    flexDirection: 'column',
  },
  applyInfo: {
    flexDirection: 'row',
  },
});

export default ApplyGift;
