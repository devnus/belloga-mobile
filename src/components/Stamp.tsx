import {MaterialCommunityIcons} from '@expo/vector-icons';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from '../assets/colors';

function Stamp() {
  return (
    <View style={styles.popularWrapper}>
      <View
        style={[
          styles.popularCardWrapper,
          {
            marginTop: 15,
          },
        ]}>
        <View>
          <Text style={styles.titlesBoldTitle}>스탬프 찍기</Text>
          <View style={styles.popularTopWrapper}>
            <MaterialCommunityIcons
              name="crown"
              size={12}
              color={colors.primary}
            />
            <Text style={styles.popularTopText}>
              500P를 모으면 스탬프 한개를 받을 수 있어요
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default Stamp;

const styles = StyleSheet.create({
  popularWrapper: {
    paddingHorizontal: 20,
  },
  popularCardWrapper: {
    backgroundColor: colors.white,
    borderRadius: 25,
    paddingVertical: 20,
    marginVertical: 30,
    paddingLeft: 20,
    flexDirection: 'row',
    shadowColor: '#4dd1d1d1',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.05,
    elevation: 20,
  },
  popularTopWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularTopText: {
    marginLeft: 10,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
  },
  titlesBoldTitle: {
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.textDark,
  },
});
