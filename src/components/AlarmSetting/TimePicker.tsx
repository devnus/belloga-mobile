/* eslint-disable prettier/prettier */
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';

type datePickerProps = {
  hour: number;
  minutes: number;
  onChange: (hour: number, minutes: number) => void; // 아무것도 리턴하지 않는다는 함수를 의미합니다.
};

export default function ({
  hour,
  minutes,
  onChange = () => null,
}: datePickerProps) {
  const [date, setDate] = useState(getDate(hour, minutes));

  console.log(getDate(hour, minutes));
  console.log(date);

  return (
    <View>
      <TouchableOpacity style={styles.container}>
        <DatePicker
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
        {/* <Text style={styles.clockText}>
          {hour < 10 ? '0' + hour : hour}:
          {minutes < 10 ? '0' + minutes : minutes}
        </Text> */}
      </TouchableOpacity>

      {/* {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={getDate(hour, minutes)}
          mode={'time'}
          is24Hour={true}
          display="default"
          onChange={(e, date) => {
            setShowPicker(false);
            onChange(date.getHours(), date.getMinutes());
          }}
        />
      )} */}
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
