import {StyleSheet, Text, TouchableHighlight} from 'react-native';
import React from 'react';

export default function ({
  onPress = () => {},
  title = '',
  fill = false,
  custom = false,
  textColor = 'white',
  backgroundColor = '#0f5078',
  borderColor = '#0f5078',
}) {
  if (custom) {
    const customStyles = StyleSheet.create({
      container: {
        padding: 10,
        margin: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderWidth: 1,
        borderColor: `${borderColor}`,
        borderRadius: 20,
        alignItems: 'center',
      },
      containerColor: {
        backgroundColor: `${backgroundColor}`,
      },
      buttonText: {
        fontWeight: 'bold',
      },
      textColor: {
        color: `${textColor}`,
      },
    });

    return (
      <TouchableHighlight
        style={[customStyles.container, customStyles.containerColor]}
        onPress={onPress}
        underlayColor="#fff">
        <Text style={[customStyles.buttonText, customStyles.textColor]}>
          {title}
        </Text>
      </TouchableHighlight>
    );
  } else {
    return (
      <TouchableHighlight
        style={[
          styles.container,
          fill ? styles.fillContainer : styles.normalContainer,
        ]}
        onPress={onPress}
        underlayColor="#fff">
        <Text
          style={[
            styles.buttonText,
            fill ? styles.fillText : styles.normalText,
          ]}>
          {title}
        </Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 1,
    borderColor: '#0f5078',
    borderRadius: 20,
    alignItems: 'center',
  },
  fillContainer: {
    backgroundColor: '#0f5078',
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
    color: '#0f5078',
  },
});
