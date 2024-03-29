import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';

import Button from '_components/ui/Buttons/Button';

import type { FunctionComponent } from 'react';

import { capitalize } from '_utils/functions';
import { isBelowHeightThreshold } from '_utils/constants';

interface SortModalProps {
  modalIsVisible: boolean;
  closeModal: () => void;
  submit: (option: string) => Promise<void>;
}

const SortModal: FunctionComponent<SortModalProps> = ({
  modalIsVisible,
  closeModal,
  submit,
}) => {
  const { t } = useTranslation();
  const sortingOptions = [t('RATING'), t('POPULARITY')];
  const handleClick = (option: string) => {
    // do something with sort value
    submit(option.toLowerCase());
    closeModal();
  };
  return (
    <View style={styles.container}>
      <Modal isVisible={modalIsVisible} style={styles.modalView}>
        <View style={styles.sortOptionsContainer}>
          <View style={styles.sortByContainer}>
            <Text style={styles.sortByMainText}>{t('SORT_BY')}</Text>
            <Text style={styles.sortBySubtext}>Select sorting option</Text>
          </View>
          {sortingOptions.map((option) => (
            <TouchableOpacity key={option} onPress={() => handleClick(option)}>
              <View style={styles.optionContainer}>
                <Text style={styles.optionText}>{capitalize(option)}</Text>
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
    paddingVertical: isBelowHeightThreshold ? 5 : 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    marginVertical: 10,
    fontWeight: '500',
  },
  sortByContainer: {
    paddingVertical: isBelowHeightThreshold ? 12 : 20,
    alignItems: 'center',
  },
  sortByMainText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
  },
  sortBySubtext: {
    fontSize: 15,
    marginTop: 5,
    color: 'black',
  },
  optionContainer: {
    alignItems: 'center',
    borderTopColor: 'grey',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
  },
  optionText: {
    color: 'black',
    fontSize: 20,
    marginVertical: isBelowHeightThreshold ? 15 : 20,
    fontWeight: '500',
  },
});

export default SortModal;
