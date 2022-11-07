import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Titles from '@/components/Common/Titles';
import Header from '@/components/Common/Header';
MaterialCommunityIcons.loadFont();

function AlarmLogPage({route, navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.scrollView}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}>
          <Header />
          <View style={styles.bodyWrapper}>
            <Titles
              title="나의 기상 기록"
              description="일어난 기록을 확인해보세요"
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default AlarmLogPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  scrollView: {
    backgroundColor: 'white',
    flex: 1,
  },

  bodyWrapper: {
    flex: 5,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  giftInfoWrapper: {
    flex: 2,
  },
  pressStampContainer: {
    backgroundColor: 'white',
    marginTop: 30,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginHorizontal: '5%',
    paddingVertical: 15,
    display: 'flex',
    shadowColor: '#CDCDCD',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.02,
    elevation: 10,
  },
});
