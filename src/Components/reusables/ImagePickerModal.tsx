import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';

import Button from '_components/ui/Buttons/Button';

import type { FunctionComponent } from 'react';

import { capitalize } from '_utils/functions';

interface PhotoOptions {
  name: string;
  action: () => Promise<void>;
}

interface ImagePickerModalProps {
  modalIsVisible: boolean;
  closeModal: () => void;
  photoOptions: PhotoOptions[];
}

const ImagePickerModal: FunctionComponent<ImagePickerModalProps> = ({
  modalIsVisible,
  closeModal,
  photoOptions,
}) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Modal isVisible={modalIsVisible} style={styles.modalView}>
        <View style={styles.sortOptionsContainer}>
          {photoOptions.map((option, index) => (
            <TouchableOpacity key={index} onPress={option.action}>
              <View style={styles.optionContainer}>
                <Text style={styles.optionText}>{capitalize(option.name)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <Button
          onPress={closeModal}
          style={{
            container: styles.buttonContainer,
            text: styles.buttonText,
          }}>
          {t('CANCEL')}
        </Button>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  modalContainer: {},
  sortOptionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  modalView: {
    marginHorizontal: 10,
    padding: 0,
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 0,
    borderRadius: 15,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    marginVertical: 7,
  },
  optionContainer: {
    alignItems: 'center',
    borderTopColor: 'grey',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
  },
  optionText: {
    color: 'black',
    fontSize: 18,
    marginVertical: 16,
  },
});

export default ImagePickerModal;
