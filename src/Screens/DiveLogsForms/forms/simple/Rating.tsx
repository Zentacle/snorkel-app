import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

import GradientCircle from '_components/ui/GradientCircle';
import GradientBox from '_components/ui/GradientBox';

import StarEmpty from '_assets/StarEmpty.png';
import StarFull from '_assets/StarFull.png';

const Rating = () => {
  const [rating, setRating] = React.useState(0);
  const [selectedDiff, selectDiff] = React.useState('Beginner');

  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.headerLabel}>Rating</Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((_item, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => setRating(index + 1)}>
              <Image
                style={[styles.star, index !== 0 && {}]}
                source={rating >= index + 1 ? StarFull : StarEmpty}
              />
            </TouchableWithoutFeedback>
          ))}
          <Text style={styles.starLabel}>{rating} of 5</Text>
        </View>
      </View>

      <View style={styles.levelContentContainer}>
        <Text style={styles.headerLabel}>Level of difficulty</Text>
        <View style={styles.levelContainer}>
          {levels.map(level => {
            if (level === selectedDiff) {
              return (
                <TouchableWithoutFeedback>
                  <View style={styles.selectedShadow}>
                    <GradientBox style={styles.selectedLevel}>
                      <View style={styles.selectBox}>
                        <View style={styles.selectedLevelCircle}>
                          <GradientCircle style={styles.selectedGradient} />
                        </View>
                        <Text style={styles.levelText}>{level}</Text>
                      </View>
                    </GradientBox>
                  </View>
                </TouchableWithoutFeedback>
              );
            }
            return (
              <TouchableWithoutFeedback onPress={() => selectDiff(level)}>
                <View style={styles.level}>
                  <View style={styles.normalLevelCircle}></View>
                  <Text style={styles.levelText}>{level}</Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginHorizontal: 25,
  },
  headerLabel: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
  },
  ratingContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  star: {},
  starLabel: {
    fontSize: 18,
    fontWeight: '500',
  },
  levelContentContainer: {
    marginVertical: 40,
  },
  levelContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  level: {
    backgroundColor: '#fff',
    borderRadius: 12,
    opacity: 0.5,
  },
  selectBox: {
    borderRadius: 12,
    backgroundColor: '#fff',
    width: '100%',
  },
  selectedShadow: {
    borderRadius: 12,
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
  },
  selectedLevel: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 1.5,
    paddingHorizontal: 1.5,
    elevation: 2,
  },
  levelText: {
    marginRight: 25,
    marginLeft: 15,
    marginBottom: 10,
  },
  normalLevelCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EFF6F9',
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10,
  },
  selectedLevelCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EFF6F9',
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedGradient: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

export default Rating;
