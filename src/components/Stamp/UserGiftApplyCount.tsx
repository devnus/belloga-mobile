import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from '@assets/colors';

function UserGiftApplyCount() {
  return (
    <View style={styles.userInfoRow}>
      <Text style={styles.titlesSubtitle}> 응모 횟수 </Text>
      <Text style={styles.pointValue}> 16 </Text>
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
