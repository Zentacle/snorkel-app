import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  ViewStyle,
  ImageStyle,
  Text,
  Pressable,
} from 'react-native';
import type { FieldRenderProps } from 'react-final-form';
import type { FunctionComponent } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useTranslation } from 'react-i18next';

import ImagePickerModal from '_components/reusables/ImagePickerModal';
import UploadAvatarIcon from '_assets/UploadAvatarIcon.png';
import { FormImages } from '_utils/interfaces/data/logs';

type FinalFormProps = FieldRenderProps<FormImages | string, any>;

interface BaseProps {
  iconContaineStyle: ViewStyle;
  placeholderStyle?: ImageStyle;
  imageStyling?: ImageStyle;
}

type ImageFormComponentProps = BaseProps & FinalFormProps;

interface PhotoOptions {
  name: string;
  action: () => Promise<void>;
}

const ImageFormComponent: FunctionComponent<ImageFormComponentProps> = ({
  input: { value, onChange },
  iconContaineStyle,
  placeholderStyle,
  imageStyling,
}) => {
  const { t } = useTranslation();
  const [cameralModalIsVisible, setCameraModalVisibility] =
    React.useState(false);

  const openCameraModal = () => {
    console.log('triggered');
    setCameraModalVisibility(true);
  };

  const closeCameraModal = () => {
    setCameraModalVisibility(false);
  };
  const handleLaunchCamera = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
    });

    closeCameraModal();
    if (result.assets && result.assets[0].uri) {
      onChange({
        uri: result.assets[0].uri,
        type: result.assets[0].type,
        name: result.assets[0].fileName,
      });
    }
  };

  const handleLaunchPhotoLibrary = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
    });

    closeCameraModal();
    if (result.assets && result.assets[0].uri) {
      onChange({
        uri: result.assets[0].uri,
        type: result.assets[0].type,
        name: result.assets[0].fileName,
      });
    }
  };

  const photoOptions: PhotoOptions[] = [
    {
      name: t('CAMERA'),
      action: handleLaunchCamera,
    },
    {
      name: t('PHOTO_LIBRARY'),
      action: handleLaunchPhotoLibrary,
    },
  ];

  return (
    <View style={styles.container}>
      <View
        style={[
          iconContaineStyle,
          { backgroundColor: value ? 'none' : 'white' },
        ]}>
        {value ? (
          <>
            <View>
              {typeof value === 'string' ? (
                <Image
                  style={[styles.imageStyling, imageStyling]}
                  source={{ uri: value }}
                />
              ) : (
                <Image
                  style={[styles.imageStyling, imageStyling]}
                  source={{ uri: value.uri }}
                />
              )}
            </View>
            <Pressable
              onPress={openCameraModal}
              style={state => ({
                opacity: state.pressed ? 0.8 : 1,
              })}>
              <View style={styles.editContainer}>
                <Text style={styles.editText}>Edit</Text>
              </View>
            </Pressable>
          </>
        ) : (
          <TouchableWithoutFeedback onPress={openCameraModal}>
            <Image
              style={[styles.placeholderStyle, placeholderStyle]}
              source={UploadAvatarIcon}
            />
          </TouchableWithoutFeedback>
        )}
      </View>
      <ImagePickerModal
        modalIsVisible={cameralModalIsVisible}
        closeModal={closeCameraModal}
        photoOptions={photoOptions}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  imageStyling: {
    width: 168,
    height: 168,
    borderRadius: 84,
  },
  placeholderStyle: {},
  editContainer: {
    alignSelf: 'center',
    backgroundColor: '#0B94EF',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 8,
    position: 'absolute',
    bottom: -15,
  },
  editText: {
    color: 'white',
    fontSize: 14,
  },
});

export default ImageFormComponent;
