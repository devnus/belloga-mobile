import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '@assets/colors';

function CurrentPointData() {
  return (
    <View style={styles.pointDataWrapper}>
      <View style={styles.userInfoRow}>
        <Text style={styles.titlesSubtitle}> 보유 중 </Text>
        <Image
          source={require('@assets/images/coin.png')}
          style={styles.userInfoIcon}
        />
        <Text style={styles.pointValue}> 6803P </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titlesSubtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: colors.textDark,
  },
  pointValue: {
    fontSize: 20,
    color: colors.navy,
    fontWeight: 'bold',
  },
  pointDataWrapper: {
    paddingHorizontal: 20,
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  userInfoIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});

export default CurrentPointData;
