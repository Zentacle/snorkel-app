import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import IoIcon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';

import GradientCircle from '_components/ui/GradientCircle';
import Button from '_components/ui/Buttons/Button';

import type { FunctionComponent } from 'react';

interface AuthModalProps {
  isVisible: boolean;
  subtext: string;
  modalAction: () => void;
  modalCancelAction: () => void;
  actionText: string;
  cancelActionText: string;
}

const AuthModal: FunctionComponent<AuthModalProps> = ({
  isVisible,
  subtext,
  actionText,
  cancelActionText,
  modalAction,
  modalCancelAction,
}) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Modal isVisible={isVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.gradientContainer}>
            <GradientCircle style={styles.gradient}>
              <IoIcon name="close-outline" size={60} color="#fff" />
            </GradientCircle>
          </View>
          <Text style={styles.mainText}>{t('NEED_TO_BE_LOGGED_IN')}</Text>
          <View style={styles.subtextContainer}>
            <Text style={styles.subtext}>{subtext}</Text>
          </View>
          <View style={styles.buttons}>
            <Button
              onPress={modalAction}
              gradient
              gradientColors={['#AA00FF', '#00E0FF', '#00E0FF']}
              gradientLocations={[0.01, 1, 1]}
              start={{
                x: 0,
                y: 0,
              }}
              end={{
                x: 0.06,
                y: 2.2,
              }}
              style={{
                container: styles.buttonContainer,
                text: styles.buttonText,
              }}>
              {actionText}
            </Button>
            <Button
              onPress={modalCancelAction}
              style={{
                container: styles.buttonContainer,
                text: { ...styles.buttonText, color: '#AA00FF' },
              }}>
              {cancelActionText}
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  modalContainer: {
    backgroundColor: '#EFF6F9',
    borderRadius: 20,
    paddingHorizontal: 30,
  },
  mainText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 30,
    marginHorizontal: '20%',
  },
  gradientContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  gradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  subtext: {
    textAlign: 'center',
    color: 'grey',
    fontSize: 16,
  },
  subtextContainer: {
    marginVertical: 20,
  },
  buttonContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 0,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
  },
  buttons: {
    marginBottom: 20,
  },
});

export default AuthModal;
