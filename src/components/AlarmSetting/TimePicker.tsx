/* eslint-disable prettier/prettier */
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';

type timePickerProps = {
  hour: number;
  minutes: number;
  onChange: (hour: number, minutes: number) => void; // 아무것도 리턴하지 않는다는 함수를 의미합니다.
};

export default function ({
  hour,
  minutes,
  onChange = () => null,
}: timePickerProps) {
  const [date, setDate] = useState(getDate(hour, minutes));

  return (
    <View>
      <TouchableOpacity style={styles.container}>
        <DatePicker
          style={{transform: [{scale: 1.2}]}}
          date={date}
          mode={'time'}
          textColor="#0f5078"
          androidVariant="iosClone"
          fadeToColor="none"
          onDateChange={day => {
            setDate(() => day);
            onChange(day.getHours(), day.getMinutes());
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

function getDate(hour: number, minutes: number) {
  const date = new Date();
  date.setHours(hour);
  date.setMinutes(minutes);
  return date;
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clockText: {
    color: '#0f5078',
    fontWeight: 'bold',
    fontSize: 70,
  },
});
