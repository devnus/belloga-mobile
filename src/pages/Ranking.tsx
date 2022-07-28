import React from 'react';
import {Image, Text, View} from 'react-native';

function Ranking() {
  return (
    <View>
      <Text>랭팅</Text>
      <Image
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
        style={{height: 200, width: 200}}
        resizeMode={'cover'}
      />
    </View>
  );
}

export default Ranking;
