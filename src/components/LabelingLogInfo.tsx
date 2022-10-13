import React, {useState} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
          <Text style={styles.dateInfo}>{date} </Text>
        </View>
        {/* <Text style={styles.labelingSuccess}>처리완료</Text> */}
      </View>
      <View style={styles.totalResultContainer}>
        <Text style={styles.totalResultText}>미션 알람을 </Text>
        <Text style={styles.totalResultBoldText}>총 {labeledLog.length}번</Text>
        <Text style={styles.totalResultText}> 실행했어요</Text>
        {/* <Text style={styles.totalResultText}> 3000P </Text> */}
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
        {labeledLog.map(log => (
          <View style={styles.labelingInfoRow}>
            <Text style={styles.dateInfo}>
              {log.createdDate.getHours()}:{log.createdDate.getMinutes()} 미션
              알람{' '}
            </Text>
            <Text style={styles.briefResultText}> {log.status}</Text>
          </View>
        ))}
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
    justifyContent: 'center',
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: '#f2f6f7',
  },
  totalResultText: {
    color: '#0f5078',
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 12,
  },
  totalResultBoldText: {
    color: '#0f5078',
    fontSize: 16,
    marginHorizontal: 8,
    fontWeight: 'bold',
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
