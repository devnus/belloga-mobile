import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '@assets/colors';
import {applyGift} from '@/modules/userPointAPIs';
import {RootState} from '@/store/reducer';
import {useSelector} from 'react-redux';

type GiftInfo = {
  id: number;
  title: string;
  giftType: string;
  expectedDrawDate: string;
  giftStatus: any;
  odds: number;
  imageUrl: string;
};

type ApplyGiftProps = {
  giftInfo: GiftInfo;
  setStampNumbers: any;
};
function ApplyGift({giftInfo, setStampNumbers}: ApplyGiftProps) {
  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  return (
    <TouchableOpacity
      onPress={() => applyGift(accessToken, giftInfo.id, setStampNumbers)}
      style={styles.giftWrapper}>
      <View style={styles.giftRoundWrapper}>
        <View style={styles.giftInfoRow}>
          <View style={styles.giftDescribe}>
            <Text style={styles.titlesSubtitle}>
              {giftInfo.expectedDrawDate} 마감
            </Text>
            <Text style={styles.titlesMainTitle}>{giftInfo.title}</Text>
            <Text style={styles.joiningInfo}>3029명이 참여 중</Text>
          </View>
          <Image
            source={{
              uri: `${giftInfo.imageUrl}`,
            }}
            style={styles.giftIcon}
            resizeMode="contain"
          />
        </View>
      </View>
    </TouchableOpacity>
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
    width: 75,
    height: 100,
    marginHorizontal: 10,
  },
  giftRoundWrapper: {
    backgroundColor: '#f2f6f7',
    borderRadius: 25,

    flexDirection: 'column',
  },
});

export default ApplyGift;
