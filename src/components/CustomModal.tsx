import React from 'react';
import {FunctionComponent, useState} from 'react';
import {StyleSheet, View, Button, Text} from 'react-native';

import Modal from 'react-native-modal';

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
          {children}
          <Button title="Hide modal" onPress={() => setVisible(false)} />
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
});
