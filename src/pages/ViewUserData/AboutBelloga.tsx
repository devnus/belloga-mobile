import {RootState} from '@/store/reducer';
import React, {useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, Text, Image} from 'react-native';
import {useSelector} from 'react-redux';
import Titles from '@/components/Common/Titles';

function AboutBelloga({route, navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.profileWrapper}>
        <Titles
          title="소개"
          description={'벨로가는 팀 개발바라기별이 제작한 알람 앱입니다.'}
        />
        <View style={styles.centerItem}>
          <Image
            source={require('@assets/images/empty.png')}
            resizeMode="contain"
            style={styles.imgStyle}
          />
        </View>

        <Titles
          title="오류 접수/신고/피드백"
          description={'devnus.official@gmail.com'}
        />
      </View>
      <View style={styles.profileWrapper}>
        {/* <Text></Text>  이후 안내 문구 추가*/}
      </View>
    </View>
  );
}

export default AboutBelloga;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: 'white',
  },
  imgStyle: {
    width: 70,
    height: 70,
  },
  profileWrapper: {
    flex: 1,
  },
  centerItem: {
    alignItems: 'center',
  },
});
