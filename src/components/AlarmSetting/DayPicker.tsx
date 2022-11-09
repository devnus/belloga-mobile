/* eslint-disable prettier/prettier */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

export default function ({
  activeDays = [],
  onChange = (v: any) => {},
  isDisabled = false,
}) {
  // NOTICE: days doesn't change if prop activeDays changes
  function onDayChange(dayIndex) {
    let selectedBtn = getSelected(activeDays);
    selectedBtn[dayIndex] = !selectedBtn[dayIndex];
    const newDays = getDays(selectedBtn);
    onChange(newDays);
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {getSelected(activeDays).map((isSelected, index) => {
          return (
            <Day
              key={index}
              isActive={isSelected}
              dayIndex={index}
              onUpdate={onDayChange}
              isDisabled={isDisabled}
            />
          );
        })}
      </View>
    </View>
  );
}

function Day({isActive, dayIndex, onUpdate, isDisabled}) {
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        style={[
          isActive ? styles.selectedBtn : styles.unselectedBtn,
          styles.btnContainer,
        ]}
        disabled={isDisabled}
        onPress={() => onUpdate(dayIndex)}>
        <Text
          style={[
            styles.text,
            isActive ? styles.selectedText : styles.unselectedText,
          ]}>
          {getKoreanDayName(dayIndex)}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export function getSelected(activeDays) {
  let selectedBtn = new Array(7).fill(false);
  for (let i = 0; i < activeDays.length; i++) {
    selectedBtn[activeDays[i]] = true;
  }
  return selectedBtn;
}

export function getDays(selectedBtn) {
  let activeDays = [];
  for (let i = 0; i < selectedBtn.length; i++) {
    if (selectedBtn[i]) activeDays.push(i);
  }
  return activeDays;
}

export function getKoreanDayName(index: number) {
  let weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  return weekdays[index];
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f2f6f7',
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  btnContainer: {
    width: 30,
    height: 30,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedBtn: {
    color: 'black',
    fontWeight: 'bold',
    backgroundColor: '#54a5bc',
  },
  text: {
    fontSize: 14,
  },
  selectedText: {
    color: 'white',
    fontWeight: 'bold',
  },
  unselectedText: {
    color: '#8abccb',
  },
});
