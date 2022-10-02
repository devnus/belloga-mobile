import React from 'react';
import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';

export function displayStamps(
  sNums: number,
  windowWidth: number,
  imgSize: number,
) {
  const stampStyles: StyleProp<ImageStyle>[] = CalcCircularView(
    windowWidth,
    imgSize,
  );
  let stampIcons = [];
  for (let i = 0; i < 8; ++i) {
    if (i < sNums) {
      stampIcons.push(
        <Image
          source={require('@/assets/images/stamp.png')}
          style={stampStyles[i]}
        />,
      );
    } else {
      stampIcons.push(
        <TouchableHighlight
          key={i}
          style={stampStyles[i]}
          underlayColor="#DDDDDD">
          <Text style={styles.stampInsideText}>{i}</Text>
        </TouchableHighlight>,
      );
    }
  }
  return stampIcons;
}

export function CalcCircularView(windowWidth: number, imgSize: number) {
  const diagonalVerticalPosition =
    windowWidth * 0.8 - windowWidth * 0.4 * 0.3 - imgSize + (imgSize / 2) * 0.3;
  const diagonalHorizontalPosition =
    windowWidth * 0.4 * 0.3 - (imgSize / 2) * 0.3;

  // 시계방향으로부터 1번
  const firstStamp: StyleProp<ImageStyle> = {
    height: imgSize,
    width: imgSize,
    position: 'absolute',
    bottom: windowWidth * 0.8 - imgSize,
  };

  const secondStamp: StyleProp<ImageStyle> = {
    height: imgSize,
    width: imgSize,
    position: 'absolute',
    bottom: diagonalVerticalPosition,
    right: diagonalHorizontalPosition,
  };

  const thirdStamp: StyleProp<ImageStyle> = {
    height: imgSize,
    width: imgSize,
    position: 'absolute',
    bottom: windowWidth * 0.4 - imgSize / 2,
    right: 0,
  };

  const forthStamp: StyleProp<ImageStyle> = {
    height: imgSize,
    width: imgSize,
    position: 'absolute',
    top: diagonalVerticalPosition,
    right: diagonalHorizontalPosition,
  };

  const fifthStamp: StyleProp<ImageStyle> = {
    height: imgSize,
    width: imgSize,
    position: 'absolute',
    top: windowWidth * 0.8 - imgSize,
  };

  const sixthStamp: StyleProp<ImageStyle> = {
    height: imgSize,
    width: imgSize,
    position: 'absolute',
    top: diagonalVerticalPosition,
    left: diagonalHorizontalPosition,
  };

  const sevenStamp: StyleProp<ImageStyle> = {
    height: imgSize,
    width: imgSize,
    position: 'absolute',
    bottom: windowWidth * 0.4 - imgSize / 2,
    left: 0,
  };

  const eightStamp: StyleProp<ImageStyle> = {
    height: imgSize,
    width: imgSize,
    position: 'absolute',
    bottom: diagonalVerticalPosition,
    left: diagonalHorizontalPosition,
  };

  return [
    firstStamp,
    secondStamp,
    thirdStamp,
    forthStamp,
    fifthStamp,
    sixthStamp,
    sevenStamp,
    eightStamp,
  ];
}

const styles = StyleSheet.create({
  stampInsideText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#d2e3e1',
  },
});
