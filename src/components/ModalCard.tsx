import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import colors from '@assets/colors';

function ModalCard() {
  return (
    <View style={styles.giftWrapper}>
      <View style={styles.giftRoundWrapper}>
        <Text style={styles.titlesMainTitle}>도장을 찍었습니다!</Text>
        <Text style={styles.joiningInfo}>참여해 주셔서 감사드립니다 </Text>
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
    padding: 40,
    borderRadius: 25,
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default ModalCard;
