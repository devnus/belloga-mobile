import React, {useEffect, useRef} from 'react';
import Lottie from 'lottie-react-native';
import AnimatedLottieView from 'lottie-react-native';
import {Animated, Easing, View} from 'react-native';

export default function CheckAnimation() {
  const animationProgress = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <AnimatedLottieView
      progress={animationProgress.current}
      source={require('@assets/lottieAnimationJSONs/checkAnimation.json')}
    />
  );
}
