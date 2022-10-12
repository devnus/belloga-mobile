import React from 'react';
import {FunctionComponent, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import Modal from 'react-native-modal';
import Button from '@components/Button';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/reducer';
import WarningModalCard from './WarningModalCard';
import {useAppDispatch} from '@/store';
import alertSlice from '@/slices/alert';

export function WarningModal(props: any) {
  const isVisible = useSelector((state: RootState) => state.alert.isOpen);
  const dispatch = useAppDispatch();

  const titleText = useSelector((state: RootState) => state.alert.titleMessage);
  const middleText = useSelector(
    (state: RootState) => state.alert.middleMessage,
  );

  return (
    <View>
      <Modal
        isVisible={isVisible}
        onBackdropPress={() => alertSlice.actions.setAlert({isOpen: false})}>
        <View style={styles.contentView}>
          <View style={styles.modalRoundWrapper}>
            <WarningModalCard titleText={titleText} middleText={middleText} />
            <Button
              title="닫기"
              fill={true}
              onPress={() => {
                dispatch(alertSlice.actions.setAlert({isOpen: false}));
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  contentView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalRoundWrapper: {
    backgroundColor: '#f2f6f7',
    padding: 40,
    borderRadius: 25,
    flexDirection: 'column',
    alignItems: 'center',
  },
});
