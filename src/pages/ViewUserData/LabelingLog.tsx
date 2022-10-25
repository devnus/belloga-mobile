import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import colors from '../../assets/constants/colors';
import LabelingLogInfo from '../../components/LabelingLogInfo';

function LabelingLog() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}>
        {/* Header
        <SafeAreaView>
          <View style={styles.headerWrapper}>
            <Text style={styles.titlesSubtitle}> 내 기록 </Text>
          </View>
        </SafeAreaView> */}

        <View>
          {/* User Information */}

          <Text style={styles.titlesSubtitle}> 라벨링 내역 </Text>
          <LabelingLogInfo />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default LabelingLog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  titlesWrapper: {
    marginTop: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titlesSubtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: '#0f5078',
  },
  titlesBoldTitle: {
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold',
    fontSize: 20,
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
  categoriesListWrapper: {
    paddingTop: 15,
    paddingBottom: 20,
  },
  categoryItemWrapper: {
    backgroundColor: '#F5CA48',
    marginRight: 20,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  categoryItemImage: {
    width: 60,
    height: 60,
    marginTop: 25,
    alignSelf: 'center',
    marginHorizontal: 20,
  },
  categoryItemTitle: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    marginTop: 10,
  },
  categorySelectWrapper: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: 26,
    height: 26,
    borderRadius: 26,
    marginBottom: 20,
  },
  categorySelectIcon: {
    alignSelf: 'center',
  },
  userInfoDetailBtnInside: {
    color: 'white',
    textAlign: 'center',
  },
  userInfosDescribe: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 5,
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
    borderRadius: 25,
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
