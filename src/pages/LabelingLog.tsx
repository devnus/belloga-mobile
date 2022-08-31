import React from 'react';
import {Image, Text, View} from 'react-native';

function LabelingLog() {
  return (
    <View>
      <Text>라벨링 로그입니다</Text>
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

export default LabelingLog;
