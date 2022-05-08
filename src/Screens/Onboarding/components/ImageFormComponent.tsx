import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import type { FieldRenderProps } from 'react-final-form';
import type { FunctionComponent } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useTranslation } from 'react-i18next';

import ImagePickerModal from '_components/reusables/ImagePickerModal';
import UploadAvatarIcon from '_assets/UploadAvatarIcon.png';

type FinalFormProps = FieldRenderProps<string, any>;

interface BaseProps {}

type ImageFormComponentProps = BaseProps & FinalFormProps;

interface PhotoOptions {
  name: string;
  action: () => Promise<void>;
}

const ImageFormComponent: FunctionComponent<ImageFormComponentProps> = ({
  input: { value, onChange },
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
      // includeBase64: true,
    });

    closeCameraModal();
    if (result.assets && result.assets[0].uri) {
      onChange(result.assets[0].uri);
    }
  };

  const handleLaunchPhotoLibrary = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      // includeBase64: true,
    });

    closeCameraModal();
    if (result.assets && result.assets[0].uri) {
      onChange(result.assets[0].uri);
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
      <View style={styles.iconAddContainer}>
        {value ? (
          <Image
            style={{ width: 168, height: 168, borderRadius: 84 }}
            source={{ uri: value }}
          />
        ) : (
          <TouchableWithoutFeedback onPress={openCameraModal}>
            <Image source={UploadAvatarIcon} />
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
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },
  iconAddContainer: {
    backgroundColor: '#FFF',
    width: 168,
    height: 168,
    borderRadius: 84,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default ImageFormComponent;
