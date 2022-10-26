import {toStringOnlyDates} from '@/modules/calcAlarmsTime';
import React from 'react';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

function AlarmTime({hour = '00', minutes = '00'}: any) {
  return (
    <>
      <StyledDate style={styles.clockText}>
        {hour} : {minutes}{' '}
      </StyledDate>
      <StyledDate style={styles.clockDateText}>
        {' '}
        {toStringOnlyDates(new Date())}{' '}
      </StyledDate>
    </>
  );
}

const StyledDate = styled.Text`
  text-shadow-color: rgba(0, 0, 0, 0.25);
  text-shadow-offset: 0px 0px;
  text-shadow-radius: 10px;
  text-shadow-opacity: 0.5;
`;

const styles = StyleSheet.create({
  clockText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 50,
    shadowColor: '#bcbcbc',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
  },
  clockDateText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default AlarmTime;
