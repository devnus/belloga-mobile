import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SwitcherInput from '../SwitcherInput';

type alarmSettingDetailPropsType = {
  detailTitle: string;
  detailDescription: string;
  isActive: boolean;
  onChange: (v: boolean) => void;
};

function AlarmSettingDetail({
  detailTitle = '',
  detailDescription = '',
  isActive = false,
  onChange,
}: alarmSettingDetailPropsType) {
  return (
    <View style={styles.container}>
      <View style={styles.leftInnerContainer}>
        <View>
          <Text style={styles.settingSubject}> {detailTitle}</Text>
          <Text style={styles.settingDescribe}> {detailDescription}</Text>
        </View>
      </View>
      <View style={styles.rightInnerContainer}>
        <SwitcherInput isActive={isActive} onToggle={onChange} />
      </View>
    </View>
  );
}

export default AlarmSettingDetail;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
  },
  leftInnerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  rightInnerContainer: {
    margin: 5,
    marginRight: 0,
    flex: 1,
    alignItems: 'flex-end',
  },
  descContainer: {
    flexDirection: 'row',
    color: 'grey',
  },
  clock: {
    color: '#0f5078',
    fontSize: 25,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 12,
    color: '#8abccb',
    marginLeft: 7,
  },
  clockIcon: {
    width: 15,
    height: 15,
    marginHorizontal: 10,
  },
  settingSubject: {
    fontSize: 14,
    color: '#0f5078',
    marginBottom: 2,
  },
  settingDescribe: {
    fontSize: 11,
    color: '#a4aaac',
    marginBottom: 2,
  },
});
