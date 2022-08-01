import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';

import ProUpsellDisplay from './ProUpsellDisplay';
import type { FunctionComponent } from 'react';

interface ProUpsellModalProps {
  isVisible: boolean;
  closeModal: () => void;
}

const ProUpsellModal: FunctionComponent<ProUpsellModalProps> = ({
  isVisible,
  closeModal,
}) => {
  return (
    <Modal
      visible={isVisible}
      onRequestClose={closeModal}
      animationType="slide"
      style={styles.modal}>
      <ProUpsellDisplay isModal closeAction={closeModal} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  modal: {},
});

export default ProUpsellModal;
