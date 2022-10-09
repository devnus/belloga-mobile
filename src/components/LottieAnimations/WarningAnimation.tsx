import React, {useEffect, useRef} from 'react';
import AnimatedLottieView from 'lottie-react-native';
import {Animated, Easing} from 'react-native';

export default function WarningAnimation() {
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
      source={require('@assets/lottieAnimationJSONs/warningAnimation.json')}
    />
  );
}
