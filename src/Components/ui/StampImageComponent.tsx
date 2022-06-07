import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  ViewStyle,
  ImageStyle,
  Text,
  Pressable,
} from 'react-native';
import type { FieldRenderProps } from 'react-final-form';
import type { FunctionComponent } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useTranslation } from 'react-i18next';
import IOIcon from 'react-native-vector-icons/Ionicons';

import ImagePickerModal from '_components/reusables/ImagePickerModal';
import GradientText from '_components/ui/GradientText';
import GradientCircle from '_components/ui/GradientCircle';
import { FormImages } from '_utils/interfaces/data/logs';

type FinalFormProps = FieldRenderProps<FormImages, any>;

interface BaseProps {
  iconContaineStyle: ViewStyle;
  placeholderStyle?: ImageStyle;
  imageStyling?: ImageStyle;
}

type StampImageComponentProps = BaseProps & FinalFormProps;

interface PhotoOptions {
  name: string;
  action: () => Promise<void>;
}

const StampImageComponent: FunctionComponent<StampImageComponentProps> = ({
  input: { value, onChange },
  iconContaineStyle,
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
      // includeBase64: true,
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
      // includeBase64: true,
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
      <View style={iconContaineStyle}>
        {value ? (
          <View>
            <Image
              style={[
                styles.imageStyling,
                imageStyling,
                { alignSelf: 'center' },
              ]}
              source={{ uri: value.uri }}
            />
            <Pressable
              onPress={openCameraModal}
              style={state => ({
                opacity: state.pressed ? 0.8 : 1,
              })}>
              <View style={styles.editContainer}>
                <Text style={styles.editText}>Edit</Text>
              </View>
            </Pressable>
          </View>
        ) : (
          <Pressable
            onPress={openCameraModal}
            style={({ pressed }) => [
              {
                transform: pressed ? [{ scale: 0.95 }] : [{ scale: 1.0 }],
              },
            ]}>
            <View style={styles.subContainer}>
              <GradientCircle style={styles.iconContainer}>
                <IOIcon name="add-outline" size={30} color="white" />
              </GradientCircle>
              <GradientText
                gradientColors={['#AA00FF', '#00E0FF', '#00E0FF']}
                start={{
                  x: 0,
                  y: 0,
                }}
                end={{
                  x: 0.06,
                  y: 1.8,
                }}
                gradientLocations={[0.01, 1, 1]}
                style={styles.actionText}>
                {t('ADD_PHOTO')}
              </GradientText>
            </View>
          </Pressable>
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
  subContainer: {
    height: 130,
    backgroundColor: '#fff',
    marginTop: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  actionText: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: '600',
  },
});

export default StampImageComponent;
