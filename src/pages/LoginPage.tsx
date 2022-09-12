import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import NaverLoginBlock from '../components/NaverLoginBlock';

function LoginPage({route, navigation}) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/bg_illust.png')}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/images/belloga_chracter.png')}
            resizeMode="contain"
            style={styles.iconImage}
          />
          <Image
            source={require('../assets/images/logo_blur.png')}
            resizeMode="contain"
            style={styles.logoImage}
          />
        </View>

        <NaverLoginBlock
          onPress={() => {
            navigation.goBack();
          }}
        />
      </ImageBackground>
    </View>
  );
}

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  iconImage: {
    width: 100,
    height: 100,
  },
  logoImage: {
    width: 200,
    height: 100,
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
