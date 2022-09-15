import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import IOIcon from 'react-native-vector-icons/Ionicons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { FieldArrayRenderProps } from 'react-final-form-arrays';
import { useTranslation } from 'react-i18next';

import ImagePickerModal from '_components/reusables/ImagePickerModal';
import GradientCircle from '_components/ui/GradientCircle';

import type { FunctionComponent } from 'react';
import { PhotoOptions } from '../utils/interfaces';
import { isBelowHeightThreshold } from '_utils/constants';

interface ImageType {
  uri: string;
  type?: string;
  name: string;
}

type FinalFormProps = FieldArrayRenderProps<ImageType, any>;

interface BaseProps { }

type ImagePickerArrayProps = BaseProps & FinalFormProps;

const ImagePickerArray: FunctionComponent<ImagePickerArrayProps> = ({
  fields,
}) => {
  const { t } = useTranslation();
  const [cameralModalIsVisible, setCameraModalVisibility] =
    React.useState(false);

  const openCameraModal = () => {
    setCameraModalVisibility(true);
  };

  const closeCameraModal = () => {
    setCameraModalVisibility(false);
  };

  const selectImageFromCamera = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
    });

    closeCameraModal();

    if (result.assets && result.assets[0].uri && result.assets[0].fileName) {
      fields.push({
        uri: result.assets[0].uri,
        type: result.assets[0].type,
        name: result.assets[0].fileName,
      });
    }
  };
  const selectImageFromGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 10,
    });

    // performance improvement: close early
    closeCameraModal();

    if (result.assets) {
      result.assets.forEach(asset => {
        if (asset.uri && asset.fileName) {
          fields.push({
            uri: asset.uri,
            type: asset.type,
            name: asset.fileName,
          });
        }
      });
    }
  };

  const photoOptions: PhotoOptions[] = [
    {
      name: 'Camera',
      action: selectImageFromCamera,
    },
    {
      name: 'Photo Library',
      action: selectImageFromGallery,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.mediaContainer}>
        <View style={styles.mediaContentLabel}>
          <Text style={styles.headerLabel}>{t('PHOTOS_AND_VIDEOS')}</Text>
          <View style={styles.optionalContainer}>
            <Text style={styles.optionaltext}>
              {fields.length ? t('10_FILES_MAX') : t('OPTIONAL')}
            </Text>
          </View>
        </View>
      </View>
      <View>
        <ScrollView
          horizontal
          style={styles.imagesContainer}
          showsHorizontalScrollIndicator={false}>
          {fields.value && fields.value.map((item, index) => (
            <View key={index} style={styles.imageContainer}>
              <Pressable
                style={{ zIndex: 4 }}
                onPress={() => {
                  fields.remove(index);
                }}>
                <View style={styles.deleteIcon}>
                  <IOIcon name="close-outline" size={25} color="black" />
                </View>
              </Pressable>
              <Image style={styles.image} source={{ uri: item.uri }} />
            </View>
          ))}
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
            </View>
          </Pressable>
        </ScrollView>
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
    marginBottom: 20,
  },
  subContainer: {
    marginTop: 8,
    height: 130,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: 130,
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
  headerLabel: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },
  mediaContainer: {
    marginTop: isBelowHeightThreshold ? 20 : 30,
  },
  optionalContainer: {},
  optionaltext: {
    color: '#aa00ff',
    fontSize: 12,
  },
  mediaContentLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imagesContainer: {
    paddingVertical: 20,
  },
  imageContainer: {
    marginRight: 20,
    position: 'relative',
    paddingVertical: 10,
    marginBottom: Platform.OS === 'android' ? 15 : 5,
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 16,
  },
  deleteIcon: {
    position: 'absolute',
    top: -10,
    right: -10,
    width: 30,
    height: 30,
    backgroundColor: 'white',
    zIndex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
});

export default ImagePickerArray;
