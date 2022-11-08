import colors from '@/assets/constants/colors';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

function EmptyCard({description = ''}) {
  return (
    <View style={styles.emptyContainer}>
      <Image
        source={require('@assets/images/empty.png')}
        resizeMode="contain"
        style={styles.emptyImage}
      />
      <Text style={styles.advertisingText}>{description}</Text>
    </View>
  );
}

export default EmptyCard;

const styles = StyleSheet.create({
  emptyContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  advertisingText: {
    fontSize: 16,
    color: 'grey',
    marginTop: 2,
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15,
  },
});
