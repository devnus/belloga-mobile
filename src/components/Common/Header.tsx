import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function Header({}) {
  return (
    <SafeAreaView>
      <View style={styles.headerWrapper}>
        <Text> </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
});
export default Header;
