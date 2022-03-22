import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import IoIcon from 'react-native-vector-icons/Ionicons';

import GradientCircle from '_components/ui/GradientCircle';
import Button from '_components/ui/Buttons/Button';

import type { FunctionComponent } from 'react';

interface DeleteModalProps {
  isVisible: boolean;
  subtext: string;
  modalAction: () => void;
  modalCancelAction: () => void;
  actionText: string;
  cancelActionText: string;
}

const DeleteModal: FunctionComponent<DeleteModalProps> = ({
  isVisible,
  subtext,
  actionText,
  cancelActionText,
  modalAction,
  modalCancelAction,
}) => {
  return (
    <View style={styles.container}>
      <Modal isVisible={isVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.gradientContainer}>
            <GradientCircle
              style={styles.gradient}
              gradientColors={['#FA0E0E', '#FF9900', '#FF9900']}>
              <IoIcon name="trash-outline" size={55} color="#fff" />
            </GradientCircle>
          </View>
          <Text style={styles.mainText}>
            Are you sure you want to delete account?
          </Text>
          <View style={styles.subtextContainer}>
            <Text style={styles.subtext}>{subtext}</Text>
          </View>
          <View style={styles.buttons}>
            <Button
              onPress={modalAction}
              gradient
              gradientColors={['#FA0E0E', '#FF9900', '#FF9900']}
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
              textGradient
              start={{
                x: 0,
                y: 1,
              }}
              end={{
                x: 0.65,
                y: 0.4,
              }}
              gradientColors={['#AA00FF', '#AA00FF', '#00E0FF']}
              style={{
                container: styles.buttonContainer,
                text: styles.buttonText,
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
    marginHorizontal: '15%',
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

export default DeleteModal;
