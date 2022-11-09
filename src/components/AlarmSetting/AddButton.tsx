import ampInstance from '@/amplitude';
import React from 'react';
import {StyleSheet, Text, TouchableHighlight} from 'react-native';

function AddButton({title, onPress}: any) {
  const showAlarmSettingScreen = () => {
    ampInstance.logEvent('ADD_ALARM_CLICKED');
    onPress();
  };
  return (
    <TouchableHighlight
      style={styles.button}
      onPress={showAlarmSettingScreen}
      underlayColor="#fff">
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    padding: 10,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25,
  },
});

export default AddButton;
