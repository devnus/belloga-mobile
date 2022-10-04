import React from 'react';
import {FunctionComponent, useState} from 'react';
import {
  StyleSheet,
  View,
  Modal as DefaultModal,
  Button,
  Text,
} from 'react-native';

type ModalProps = {
  activator?: FunctionComponent<{handleOpen: () => void}>;
  children: React.ReactNode;
};

export function Modal({activator: Activator, children}: ModalProps) {
  const [isVisible, setVisible] = useState(false);

  return (
    <View>
      <DefaultModal transparent={true} visible={isVisible} animationType="fade">
        <View
          style={{
            backgroundColor: '#00000099',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {children}
          <Text> 어쩔디비 </Text>
          <Button onPress={() => setVisible(false)} title="Close" />
        </View>
      </DefaultModal>
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
