import React, {useEffect, useRef} from 'react';
import AnimatedLottieView from 'lottie-react-native';
import {Animated, Easing} from 'react-native';

export default function CoinAnimation() {
  const animationProgress = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.timing(animationProgress.current, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ).start();
  }, []);

  return (
    <AnimatedLottieView
      progress={animationProgress.current}
      source={require('@assets/lottieAnimationJSONs/coinAnimationwithParticle.json')}
    />
  );
}
