import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../assets/colors';

function LabelingLogInfo({date, isProcessed, labeledLog}) {
  return (
    <View style={styles.labelingInfoWrapper}>
      <View style={styles.labelingInfoRow}>
        <View style={styles.labelingInfosDescribe}>
          <Text style={styles.dateInfo}>6월 29일 </Text>
        </View>
        <Text style={styles.labelingSuccess}>처리완료</Text>
      </View>
      <Text style={styles.briefResultText}> 대기 5 * 완료 8 * 반려 2</Text>
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
