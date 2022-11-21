import {RootState} from '@/store/reducer';
import React, {useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, Text} from 'react-native';
import {useSelector} from 'react-redux';
import Titles from '@/components/Common/Titles';

function UserProfileInfo({route, navigation}) {
  const user = useSelector((state: RootState) => state.user);

  return (
    <View style={styles.container}>
      <View style={styles.profileWrapper}>
        <Titles title="닉네임" description={user.name} />
        <Titles title="출생년도" description={user.birthYear} />
        <Titles title="이메일" description={user.email} />
      </View>
      <View style={styles.profileWrapper}>
        {/* <Text></Text>  이후 안내 문구 추가*/}
      </View>
    </View>
  );
}

export default UserProfileInfo;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: 'white',
  },
  profileWrapper: {
    flex: 1,
  },
});
