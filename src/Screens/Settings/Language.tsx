import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type {
  RootStackParamList,
  SettingStackParamList,
} from '_utils/interfaces';
import GradientCircle from '_components/ui/GradientCircle';
import GradientText from '_components/ui/GradientText';
import { languages, Language as LanguageType } from './utils';

type LanguageTypeNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<SettingStackParamList, 'Language'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface LanguageTypeProps {
  navigation: LanguageTypeNavigationProps;
}

const Language: FunctionComponent<LanguageTypeProps> = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const navigateBack = () => {
    navigation.goBack();
  };

  const handleSelectLanguage = async (language: LanguageType) => {
    i18n.changeLanguage(language.name);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Icon name="chevron-back-outline" size={30} onPress={navigateBack} />
          <Text style={styles.headerText}>{t('LANGUAGE')}</Text>
          <View />
        </View>
        <View style={styles.bodyContainer}>
          {languages.map((language, index) => (
            <Pressable
              key={index}
              onPress={() => handleSelectLanguage(language)}>
              <View style={styles.languageContainer}>
                {language.name === i18n.resolvedLanguage ? (
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
                    style={styles.languageText}>
                    {language.label}
                  </GradientText>
                ) : (
                  <Text style={styles.languageText}>{language.label}</Text>
                )}

                {language.name === i18n.resolvedLanguage ? (
                  <GradientCircle style={styles.languageCircle}>
                    <Icon name="checkmark-outline" size={18} color="#fff" />
                  </GradientCircle>
                ) : (
                  <View style={styles.languageCircle} />
                )}
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF6F9',
  },
  contentContainer: {},
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginTop: 30,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
  },
  bodyContainer: {
    marginTop: 30,
    marginHorizontal: 25,
  },
  languageContainer: {
    marginVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  languageText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
  languageCircle: {
    backgroundColor: '#fff',
    width: 25,
    height: 25,
    borderRadius: 12.5,
  },
});

export default Language;
