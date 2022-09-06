import React from 'react';
import { StyleSheet, Modal } from 'react-native';

import ProUpsellDisplay from './ProUpsellDisplay';
import type { FunctionComponent } from 'react';

interface ProUpsellModalProps {
  isVisible: boolean;
  closeModal: () => void;
  navigateToWebView: (url: string) => void;
  source: string;
}

const ProUpsellModal: FunctionComponent<ProUpsellModalProps> = ({
  isVisible,
  closeModal,
  navigateToWebView,
  source,
}) => {
  React.useEffect(() => {}, []);
  return (
    <Modal
      visible={isVisible}
      onRequestClose={closeModal}
      animationType="slide"
      style={styles.modal}>
      <ProUpsellDisplay
        isModal
        navigateToWebView={navigateToWebView}
        closeAction={closeModal}
        source={source}
      />
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
