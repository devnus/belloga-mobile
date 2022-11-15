import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import colors from '../assets/constants/colors';

function UserData({totalMissionLog = 0, processingMissionLog = 0}) {
  return (
    <View style={styles.categoriesWrapper}>
      <View style={styles.userInfoRoundWrapper}>
        <View style={styles.userInfoRow}>
          <View style={styles.userInfosDescribe}>
            <Image
              source={require('@/assets/images/label.png')}
              style={styles.userInfoIcon}
            />
            <Text style={styles.titlesSubtitle}>검토 중인 미션</Text>
          </View>
          <Text style={styles.titlesSubtitle}>{processingMissionLog}개</Text>
        </View>

        <View style={styles.userInfoRow}>
          <View style={styles.userInfosDescribe}>
            <Image
              source={require('../assets/images/point.png')}
              style={styles.userInfoIcon}
            />
            <Text style={styles.titlesSubtitle}>진행한 총 미션 수</Text>
          </View>
          <Text style={styles.titlesSubtitle}>{totalMissionLog}개</Text>
        </View>
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
  categoriesWrapper: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  categoriesTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    paddingHorizontal: 20,
  },
  userInfoDetailBtnInside: {
    color: 'white',
    textAlign: 'center',
  },
  userInfosDescribe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  userInfoIcon: {
    width: 20,
    height: 20,
    marginHorizontal: 10,
  },
  userInfoRoundWrapper: {
    backgroundColor: '#f2f6f7',
    borderRadius: 25,
    paddingVertical: 20,
    flexDirection: 'column',
  },
  userInfoHalfRoundWrapper: {
    backgroundColor: '#f2f6f7',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: 20,
    flexDirection: 'column',
  },
  userInfoDetailButton: {
    backgroundColor: '#54a5bc',
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
});

export default UserData;
