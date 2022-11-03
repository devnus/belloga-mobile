import {RootState} from '@/store/reducer';
import React from 'react';
import {View, SafeAreaView, StyleSheet, Text} from 'react-native';
import {useSelector} from 'react-redux';
import Titles from '@/components/Common/Titles';
import colors from '@/assets/constants/colors';

function UserProfileInfo({route, navigation}) {
  const user = useSelector((state: RootState) => state.user);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <Text style={styles.titlesSubtitle}> 회원님의 가입 정보입니다.</Text>
        </View>
      </View>
      <Titles title="닉네임" description={user.name} />
      <Titles title="생일" description={user.birthYear} />
      <Titles title="이메일" description={user.email} />
      <Titles title="전화번호" description={user.phoneNumber} />
    </SafeAreaView>
  );
}

export default UserProfileInfo;

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
  titlesSubtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: colors.textDark,
  },
});
