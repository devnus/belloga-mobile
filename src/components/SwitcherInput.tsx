/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Switch, Text, StyleSheet, Pressable} from 'react-native';

export default function ({value, onChange, description}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const onToggle = value => {
    setIsEnabled(previousState => !previousState);
    onChange(value);
  };

  return (
    <Wrap>
      <Pressable onPress={onToggle(value)}>
        <ToggleContainer styles={{backgroundColor: color}}>
          <ToggleWheel
            style={[
              styles.toggleWheel,
              {transform: [{translateX: moveSwitchToggle}]},
            ]}
          />
        </ToggleContainer>
      </Pressable>
    </Wrap>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  descriptionText: {
    fontWeight: 'bold',
    color: '#1992fe',
  },
});
