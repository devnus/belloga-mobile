import {StyleSheet, Text, TouchableHighlight} from 'react-native';
import React from 'react';

export default function ({onPress, title, fill = false}) {
  return (
    <TouchableHighlight
      style={[
        styles.container,
        fill ? styles.fillContainer : styles.normalContainer,
      ]}
      onPress={onPress}
      underlayColor="#fff">
      <Text
        style={[styles.buttonText, fill ? styles.fillText : styles.normalText]}>
        {title}
      </Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 2,
    borderColor: '#1992fe',
    borderRadius: 25,
  },
  fillContainer: {
    backgroundColor: '#1992fe',
  },
  normalContainer: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontWeight: 'bold',
  },
  fillText: {
    color: 'white',
  },
  normalText: {
    color: '#1992fe',
  },
});
