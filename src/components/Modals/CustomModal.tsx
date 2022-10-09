import React from 'react';
import {FunctionComponent, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import Modal from 'react-native-modal';
import Button from '@components/Button';

type ModalProps = {
  activator?: FunctionComponent<{handleOpen: () => void}>;
  children: React.ReactNode;
};

export function CustomModal({activator: Activator, children}: ModalProps) {
  const [isVisible, setVisible] = useState(false);

  return (
    <View>
      <Modal isVisible={isVisible} onBackdropPress={() => setVisible(false)}>
        <View style={styles.contentView}>
          <View style={styles.modalRoundWrapper}>
            {children}
            <Button
              title="닫기"
              fill={true}
              onPress={() => {
                setVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
      {Activator ? (
        <Activator handleOpen={() => setVisible(true)} />
      ) : (
        <Button onPress={() => setVisible(true)} title="Open" />
      )}
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
