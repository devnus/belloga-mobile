import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from '@/assets/constants/colors';

function Titles({title = '', description = ''}) {
  return (
    <View style={styles.titlesWrapper}>
      <View>
        <Text style={styles.titlesBoldTitle}>{title}</Text>
        <Text style={styles.titlesSubtitle}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titlesWrapper: {
    marginTop: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  giftInfoWrapper: {
    flex: 2,
  },
  titlesSubtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: colors.textDark,
  },
  titlesBoldTitle: {
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.textDark,
  },
});
export default Titles;
