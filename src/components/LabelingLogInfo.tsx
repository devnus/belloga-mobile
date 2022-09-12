import React, {useState} from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/FontAwesome';

function LabelingLogInfo({date, isProcessed, labeledLog}) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0));

  const handleAnimation = () => {
    Animated.timing(rotateAnimation, {
      toValue: isCollapsed ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {});
  };

  const cwRotating = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const ccwRotating = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '0deg'],
  });

  const animatedStyle = {
    transform: [
      {
        rotate: cwRotating,
      },
    ],
  };

  return (
    <View style={styles.labelingInfoWrapper}>
      <View style={styles.labelingInfoRow}>
        <View style={styles.labelingInfosDescribe}>
          <Text style={styles.dateInfo}>6월 29일 </Text>
        </View>
        <Text style={styles.labelingSuccess}>처리완료</Text>
      </View>
      <Text style={styles.briefResultText}> 대기 5 · 완료 8 · 반려 2</Text>
      <View style={styles.totalResultContainer}>
        <Text style={styles.totalResultText}>총 15건 </Text>
        <Text style={styles.totalResultText}> 3000P </Text>
      </View>
      <TouchableOpacity
        style={styles.labelingInfoRow}
        onPress={async () => {
          handleAnimation();
          setIsCollapsed(() => !isCollapsed);
        }}>
        <Text style={styles.briefResultText}> 상세보기 </Text>
        <Animated.View style={animatedStyle}>
          <Icon name="chevron-down" size={15} color="#a4aaac" />
        </Animated.View>
      </TouchableOpacity>

      <Collapsible collapsed={isCollapsed}>
        <Text style={styles.dateInfo}>15:00 과자 OCR </Text>
        <Text style={styles.briefResultText}> 대기 5 · 완료 8 · 반려 2</Text>
      </Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
  labelingInfoWrapper: {
    backgroundColor: 'white',
    borderRadius: 25,
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: '5%',
    display: 'flex',
    justifyContent: 'space-between',
    shadowColor: '#bcbcbc',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.02,
    elevation: 10,
  },
  userInfoDetailBtnInside: {
    color: 'white',
    textAlign: 'center',
  },
  labelingInfosDescribe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelingInfoRow: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  totalResultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: '#f2f6f7',
  },
  totalResultText: {
    color: '#0f5078',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    paddingVertical: 12,
  },
  dateInfo: {
    color: '#0f5078',
    fontSize: 14,
    fontWeight: 'bold',
  },
  labelingSuccess: {
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#57ce73',
    color: 'white',
    paddingVertical: 2,
    paddingHorizontal: 10,
    fontSize: 12,
  },
  labelingProcessing: {
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#ededed',
    color: '#bcbcbc',
    paddingVertical: 2,
    paddingHorizontal: 10,
    fontSize: 12,
  },
  briefResultText: {
    fontSize: 12,
    color: '#a4aaac',
  },
});

export default LabelingLogInfo;
