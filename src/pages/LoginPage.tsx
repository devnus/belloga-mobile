import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import NaverLoginBlock from '../components/NaverLoginBlock';

function LoginPage({route, navigation}) {
  return (
    <View style={styles.container}>
      <Text>여기는 로그인</Text>
      <NaverLoginBlock
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
}

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
