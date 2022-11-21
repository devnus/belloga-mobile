/* eslint-disable prettier/prettier */
import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import SettingTitleText from './SettingTitleText';

export default function ({onChangeText, value, description, placeholder}) {
  return (
    <View style={styles.container}>
      <SettingTitleText text={description} />
      <TextInput
        style={styles.textInput}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
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
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: 'bold',
    backgroundColor: '#f2f6f7',
    color: '#000000',
  },
  descriptionContainer: {
    marginVertical: 10,
  },
  descriptionText: {
    color: '#0f5078',
  },
});
