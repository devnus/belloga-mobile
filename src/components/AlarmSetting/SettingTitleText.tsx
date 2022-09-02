/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

export default function ({text = ''}) {
  return (
    <View style={styles.descriptionContainer}>
      <Text style={styles.descriptionText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  descriptionContainer: {
    marginVertical: 10,
  },
  descriptionText: {
    color: '#0f5078',
  },
});
