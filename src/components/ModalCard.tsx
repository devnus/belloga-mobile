import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from '@assets/colors';
import CheckAnimation from '@components/LottieAnimations/PressStampAnimation';

function ModalCard() {
  return (
    <View style={styles.giftWrapper}>
      <View style={styles.checkAnimationWrapper}>{CheckAnimation()}</View>
      <Text style={styles.titlesMainTitle}>스탬프판에 도장을 찍었습니다!</Text>
      <Text style={styles.joiningInfo}>참여해 주셔서 감사드립니다. </Text>
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
    backgroundColor: '#f2f6f7',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkAnimationWrapper: {
    padding: 40,
  },
});

export default ModalCard;
