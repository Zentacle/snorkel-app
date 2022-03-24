import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { useAppSelector } from '_redux/hooks';
import { selectUser } from '_redux/slices/user';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type {
  RootStackParamList,
  SettingStackParamList,
} from '_utils/interfaces';

import Button from '_components/ui/Buttons/Button';
import DeleteModal from './components/DeleteModal';

import ProfileDefault from '_assets/profile-placeholder.png';

type ProfileSettingsTypeNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<SettingStackParamList, 'ProfileSettings'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface ProfileSettingsTypeProps {
  navigation: ProfileSettingsTypeNavigationProps;
}

const ProfileSettings: FunctionComponent<ProfileSettingsTypeProps> = ({
  navigation,
}) => {
  const [modalIsOpen, toggleModal] = React.useState(false);
  const user = useAppSelector(selectUser);

  const navigateBack = () => {
    navigation.goBack();
  };

  const openModal = () => {
    toggleModal(true);
  };

  const modalAction = () => {
    toggleModal(false);
    // act
  };

  const modalCancelAction = () => {
    toggleModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <DeleteModal
        subtext="All your information will be saved and you can come back anytime!"
        isVisible={modalIsOpen}
        modalAction={modalAction}
        modalCancelAction={modalCancelAction}
        actionText="Delete Account"
        cancelActionText="Cancel"
      />
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Icon name="chevron-back-outline" size={30} onPress={navigateBack} />
          <Text style={styles.headerText}>Profile Settings</Text>
          <View />
        </View>

        <View style={styles.profileImageContainer}>
          {user?.profile_pic ? (
            <Image
              style={styles.profileImage}
              source={{ uri: user.profile_pic }}
            />
          ) : (
            <Image style={styles.profileImage} source={ProfileDefault} />
          )}
        </View>

        <View style={styles.namesContainer}>
          <Text style={styles.nameLabel}>Full Name</Text>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>{user?.display_name}</Text>
          </View>

          <Text style={styles.nameLabel}>Email</Text>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>email should be here</Text>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <Button
          // loading={submitting}
          // disabled={invalid && !dirtySinceLastSubmit}
          onPress={openModal}
          textGradient
          gradientColors={['#FA0E0E', '#FF9900', '#FF9900']}
          gradientLocations={[1, 1, 1]}
          start={{
            x: 0,
            y: 0,
          }}
          end={{
            x: 0.06,
            y: 6,
          }}
          style={{
            container: {
              backgroundColor: 'white',
              borderRadius: 12,
              padding: 16,
              marginVertical: 20,
              marginHorizontal: 0,
            },
            text: {
              color: '#FFF',
              fontSize: 17,
              fontWeight: '800',
            },
          }}>
          Delete Account
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF6F9',
  },
  contentContainer: {
    marginHorizontal: 25,
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: 'black',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  namesContainer: {
    marginTop: 20,
  },
  nameContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginTop: 5,
    borderRadius: 8,
    marginBottom: 10,
  },
  nameText: {
    fontSize: 16,
    color: 'black',
  },
  nameLabel: {
    fontWeight: '600',
    fontSize: 18,
    color: 'black',
  },
  footer: {
    marginHorizontal: 25,
  },
});

export default ProfileSettings;
