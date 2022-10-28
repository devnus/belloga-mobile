import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from '@/assets/constants/colors';
import WarningAnimation from '../LottieAnimations/WarningAnimation';

function WarningModalCard({titleText, middleText}: any) {
  return (
    <View style={styles.giftWrapper}>
      <View style={styles.checkAnimationWrapper}>{WarningAnimation()}</View>
      <Text style={styles.titlesMainTitle}>{titleText}</Text>
      <Text style={styles.joiningInfo}>{middleText}</Text>
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

export default WarningModalCard;
