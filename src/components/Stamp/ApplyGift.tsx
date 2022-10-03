import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import colors from '@assets/colors';

function ApplyGift() {
  return (
    <View style={styles.giftWrapper}>
      <View style={styles.giftRoundWrapper}>
        <View style={styles.giftInfoRow}>
          <View style={styles.giftDescribe}>
            <Text style={styles.titlesSubtitle}>금주의 응모 상품</Text>
            <Text style={styles.titlesMainTitle}>스타벅스 아메리카노</Text>
            <Text style={styles.joiningInfo}>3029명이 참여 중</Text>
          </View>
          <Image
            source={require('@assets/images/sb.png')}
            style={styles.giftIcon}
          />
        </View>
      </View>
    </View>
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
    marginTop: 30,
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
