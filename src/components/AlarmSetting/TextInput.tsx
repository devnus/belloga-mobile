/* eslint-disable prettier/prettier */
import React from 'react';
import {TextInput, View, StyleSheet, Text} from 'react-native';
import SettingTitleText from './AlarmSetting/SettingTitleText';

export default function ({onChangeText, value, description}) {
  return (
    <View style={styles.container}>
      <SettingTitleText text={description} />
      <TextInput
        style={styles.textInput}
        onChangeText={onChangeText}
        value={value}
        placeholder="알람 이름을 입력해주세요"
        placeholderTextColor="#a4aaac"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: 5,
    alignSelf: 'stretch',
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  textInput: {
    borderRadius: 10,
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    fontWeight: 'bold',
    backgroundColor: '#f2f6f7',
  },
  descriptionContainer: {
    marginVertical: 10,
  },
  descriptionText: {
    color: '#0f5078',
  },
});
