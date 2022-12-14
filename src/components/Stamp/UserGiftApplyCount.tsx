import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from '@/assets/constants/colors';

type giftCount = {
  stampNumbers: number;
  giftApplyCount: number;
};

function UserGiftApplyCount({stampNumbers = 0, giftApplyCount = 0}: giftCount) {
  return (
    <View style={styles.userInfoRow}>
      {stampNumbers >= 8 ? (
        <>
          <Text style={styles.titlesSubtitle}> 내 응모 횟수 </Text>
          <Text style={styles.pointValue}> {giftApplyCount}회 </Text>
        </>
      ) : (
        <>
          <Text style={styles.titlesSubtitle}> 응모까지 </Text>
          <Text style={styles.pointValue}> {8 - stampNumbers}개 </Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  titlesSubtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: colors.textDark,
  },
  pointValue: {
    fontSize: 20,
    color: colors.navy,
    fontWeight: 'bold',
  },
  userInfoRow: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
});

export default UserGiftApplyCount;
